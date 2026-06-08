# Task 3-4 DB + API Contract

> **Scope note:** file này chỉ bám prototype hẹp hiện tại: `Gmail read-only -> sync email -> parse email/PDF text -> extract field -> lưu PostgreSQL -> tra cứu theo container`.
>
> **Codebase convention note:** backend implementation phải follow structure và coding style của repo mẫu `~/Documents/a-star/hackathon-aggregator/search-engine`, đặc biệt ở các phần:
> - `.env` + `app-config.yaml`
> - `config/` loader + typed config objects
> - `db/database.py` cho async engine/session handling
> - `db/models.py` cho SQLAlchemy models
> - `api/routes/*` cho FastAPI routers
> - dependency-based DB injection và error handling theo pattern tương tự

**Mục tiêu:** chốt data shape và API contract cho `task 3` (backend + database) và `task 4` (aggregation + search service), theo hướng `container-centric`.

**Nguyên tắc:** database thiết kế trước, dùng `PostgreSQL`, giữ `source provenance` ở mức field, và không mở rộng sang `OCR`, `chat`, `review queue`, `Excel`, `Zalo`.

---

## 1. Quyết định thiết kế

### Vì sao lấy `container` làm trung tâm

- User tra cứu chủ yếu bằng `container_no`
- Một container có thể nhận dữ liệu từ nhiều email và nhiều PDF
- UI prototype cần một trang detail gọn, đọc nhanh, không phải tự ghép dữ liệu ở frontend

### Mô hình dữ liệu đề xuất

Giữ 2 lớp dữ liệu:

1. `raw layer`
- lưu email và attachment gốc để audit/debug

2. `read layer`
- gom dữ liệu đã extract thành hồ sơ `container`
- lưu lịch sử field theo nguồn để truy vết

### Bảng cốt lõi

- `gmail_connections`
- `sync_jobs`
- `emails`
- `attachments`
- `containers`
- `container_facts`

Không cần các bảng `shipments`, `review_queue`, `timeline_events`, `chat_messages` trong v0.1.

---

## 1.1 Convention phải follow từ repo mẫu

Repo target nên bám cách tổ chức của `search-engine`, không nên tự nghĩ structure mới.

### Config loading

Follow pattern:

- `.env` chứa secret và environment-specific values
- `app-config.yaml` chứa config tree chính
- `config/__init__.py` load `.env`, expand env vars trong YAML, validate bằng Pydantic models
- `config/settings.py` expose singleton config objects để nơi khác import dùng

### Database handling

Follow pattern:

- `config/database_config.py` đọc `postgres.url` và pool settings từ config
- `db/database.py` tạo `create_async_engine(...)`
- `AsyncSessionLocal = async_sessionmaker(...)`
- `get_db()` là FastAPI dependency để yield `AsyncSession`
- request-level transaction commit/rollback trong `get_db()`

### API structure

Follow pattern:

- `api/` chứa FastAPI app-level code
- `api/routes/*.py` chia router theo domain
- `api/dependencies.py` chứa shared dependencies
- `api/models.py` hoặc `api/models/*.py` chứa request/response schemas

### ORM models

Follow pattern:

- `db/models.py` là nơi khai báo `Base` và các SQLAlchemy models chính
- dùng `UUID(as_uuid=True)`, `DateTime(timezone=True)`, `JSONB` giống repo mẫu
- dùng `server_default=func.now()` cho timestamps khi hợp lý

### Migration

Follow pattern:

- dùng `alembic/`
- schema chính đi qua migration, không rely vào `create_all()` cho production path

### Service / repository layering

Follow pattern mềm:

- `services/` chứa business logic
- logic lưu raw email, upsert container, aggregate facts nên đặt trong `services/`
- query phục vụ UI có thể đặt ở service layer hoặc repository layer, nhưng API route không nên chứa logic DB dài

---

## 2. Contract giữa Task 1-2 và Task 3

Task 1-2 không nên ghi DB trực tiếp theo logic riêng. Thay vào đó, backend task 3 nên nhận một payload chuẩn như sau.

### 2.1 Email payload sau sync

```json
{
  "gmail_message_id": "18c8f2...",
  "gmail_thread_id": "18c8f1...",
  "subject": "Arrival Notice - MSCU1234567 - ETA 12 Jun",
  "from": "ops@carrier.com",
  "to": ["cs@company.com"],
  "cc": ["ops@company.com"],
  "sent_at": "2026-06-08T09:12:00Z",
  "snippet": "Please find attached arrival notice...",
  "body_text": "Please find attached arrival notice...",
  "body_html": "<html>...</html>",
  "attachments": [
    {
      "gmail_attachment_id": "ANGjdJ...",
      "filename": "arrival_notice.pdf",
      "mime_type": "application/pdf",
      "size_bytes": 245123
    }
  ]
}
```

### 2.2 Extraction payload sau parse email + PDF

```json
{
  "gmail_message_id": "18c8f2...",
  "email_fields": [
    {
      "field_name": "container_no",
      "field_value": "MSCU1234567",
      "normalized_value": "MSCU1234567",
      "source_type": "email_subject",
      "source_label": "Arrival Notice - MSCU1234567 - ETA 12 Jun"
    },
    {
      "field_name": "eta",
      "field_value": "12 Jun 2026",
      "normalized_value": "2026-06-12",
      "source_type": "email_body",
      "source_label": "ETA Hai Phong: 12 June 2026"
    }
  ],
  "attachment_extractions": [
    {
      "attachment_key": "arrival_notice.pdf",
      "document_type": "arrival_notice",
      "text_extract_status": "extracted",
      "extracted_fields": [
        {
          "field_name": "booking_no",
          "field_value": "BKG-88921",
          "normalized_value": "BKG-88921",
          "source_type": "pdf_text",
          "source_label": "Booking No: BKG-88921"
        },
        {
          "field_name": "bl_no",
          "field_value": "HLCUSHA250601234",
          "normalized_value": "HLCUSHA250601234",
          "source_type": "pdf_text",
          "source_label": "B/L No: HLCUSHA250601234"
        }
      ]
    }
  ]
}
```

### 2.3 Rule ghép dữ liệu

- `task 1` chịu trách nhiệm sync email và attachment metadata
- `task 2` chịu trách nhiệm parse/extract
- `task 3` là nơi duy nhất ghi chuẩn vào PostgreSQL
- `task 4` đọc từ PostgreSQL và trả search/detail API

---

## 3. PostgreSQL schema đề xuất

## 3.0 Project structure đề xuất theo repo mẫu

```text
agentify-logistics/
  app-config.yaml
  .env
  alembic.ini
  endpoints.py
  config/
    __init__.py
    models.py
    settings.py
    app.py
    database_config.py
    gmail_config.py
  db/
    database.py
    models.py
  api/
    __init__.py
    dependencies.py
    models.py
    routes/
      api_main.py
      gmail.py
      containers.py
      emails.py
  services/
    gmail_sync_service.py
    email_ingest_service.py
    extraction_ingest_service.py
    container_service.py
  alembic/
    env.py
    versions/
```

### Trách nhiệm từng cụm

- `config/`: load và validate config từ `.env` + `app-config.yaml`
- `db/`: async engine, session, SQLAlchemy models
- `api/routes/`: router FastAPI
- `services/`: business logic
- `endpoints.py`: register routers, exception handlers, bootstrap app giống repo mẫu

### `app-config.yaml` tối thiểu nên có

```yaml
authentication:
  cors:
    allow_origins: []
    allow_methods:
      - "*"
    allow_headers:
      - "*"
    allow_ips:
      - "*"
    allow_origins_regex: ".*"
  google_oauth:
    client_id: "${GOOGLE_CLIENT_ID}"
    client_secret: "${GOOGLE_CLIENT_SECRET}"
    redirect_uri: "${GOOGLE_REDIRECT_URI}"

databases:
  postgres:
    url: "${POSTGRES_URL}"
    pool:
      size: 10
      max_overflow: 20
      timeout: 30
      recycle: 1800

app:
  name: "agentify-logistics"
  title: "Agentify Logistics API"
  description: "Gmail-first container lookup prototype"
  admin_emails: []
  proxy_root_path: ""
  uvicorn_logging_format: "%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] - %(message)s"
```

### `.env` tối thiểu nên có

```dotenv
POSTGRES_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/agentify_logistics
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

## 3.1 `gmail_connections`

Mục đích: lưu kết nối Gmail read-only của một workspace.

```sql
CREATE TABLE gmail_connections (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL,
  gmail_email TEXT NOT NULL,
  refresh_token_encrypted TEXT NOT NULL,
  scopes TEXT[] NOT NULL DEFAULT ARRAY['gmail.readonly'],
  sync_status TEXT NOT NULL DEFAULT 'idle',
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Index:

```sql
CREATE INDEX idx_gmail_connections_workspace_id
ON gmail_connections (workspace_id);
```

## 3.2 `sync_jobs`

Mục đích: theo dõi một lần sync để UI sync dashboard có số liệu rõ ràng.

```sql
CREATE TABLE sync_jobs (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL,
  gmail_connection_id UUID NOT NULL REFERENCES gmail_connections(id),
  status TEXT NOT NULL DEFAULT 'queued',
  gmail_query TEXT,
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,
  emails_fetched_count INTEGER NOT NULL DEFAULT 0,
  attachments_found_count INTEGER NOT NULL DEFAULT 0,
  pdf_text_extracted_count INTEGER NOT NULL DEFAULT 0,
  containers_upserted_count INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Index:

```sql
CREATE INDEX idx_sync_jobs_connection_created_at
ON sync_jobs (gmail_connection_id, created_at DESC);
```

## 3.3 `emails`

Mục đích: lưu raw email data đã sync từ Gmail.

```sql
CREATE TABLE emails (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL,
  gmail_connection_id UUID NOT NULL REFERENCES gmail_connections(id),
  sync_job_id UUID REFERENCES sync_jobs(id),
  gmail_message_id TEXT NOT NULL,
  gmail_thread_id TEXT,
  subject TEXT,
  sender TEXT,
  recipients_to TEXT[] NOT NULL DEFAULT '{}',
  recipients_cc TEXT[] NOT NULL DEFAULT '{}',
  sent_at TIMESTAMPTZ,
  snippet TEXT,
  body_text TEXT,
  body_html TEXT,
  has_pdf_attachments BOOLEAN NOT NULL DEFAULT false,
  processing_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (gmail_connection_id, gmail_message_id)
);
```

Index:

```sql
CREATE INDEX idx_emails_workspace_sent_at
ON emails (workspace_id, sent_at DESC);

CREATE INDEX idx_emails_processing_status
ON emails (processing_status);
```

## 3.4 `attachments`

Mục đích: lưu PDF attachment và trạng thái text extraction.

```sql
CREATE TABLE attachments (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL,
  email_id UUID NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
  gmail_attachment_id TEXT,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT,
  storage_url TEXT,
  is_pdf BOOLEAN NOT NULL DEFAULT false,
  is_text_pdf BOOLEAN,
  text_extract_status TEXT NOT NULL DEFAULT 'pending',
  extracted_text TEXT,
  extraction_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Index:

```sql
CREATE INDEX idx_attachments_email_id
ON attachments (email_id);

CREATE INDEX idx_attachments_text_extract_status
ON attachments (text_extract_status);
```

## 3.5 `containers`

Mục đích: read model cho UI container list và container detail.

```sql
CREATE TABLE containers (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL,
  container_no TEXT NOT NULL,
  booking_no TEXT,
  bl_no TEXT,
  po_no TEXT,
  vessel TEXT,
  voyage TEXT,
  pol TEXT,
  pod TEXT,
  etd DATE,
  eta DATE,
  status_text TEXT,
  first_seen_at TIMESTAMPTZ,
  last_seen_at TIMESTAMPTZ,
  source_count INTEGER NOT NULL DEFAULT 0,
  attachment_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, container_no)
);
```

Index:

```sql
CREATE INDEX idx_containers_workspace_container_no
ON containers (workspace_id, container_no);

CREATE INDEX idx_containers_workspace_updated_at
ON containers (workspace_id, updated_at DESC);
```

## 3.6 `container_facts`

Mục đích: lưu từng field extract được, gắn đúng source email hoặc PDF.

```sql
CREATE TABLE container_facts (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL,
  container_id UUID NOT NULL REFERENCES containers(id) ON DELETE CASCADE,
  email_id UUID REFERENCES emails(id) ON DELETE SET NULL,
  attachment_id UUID REFERENCES attachments(id) ON DELETE SET NULL,
  document_type TEXT,
  field_name TEXT NOT NULL,
  field_value TEXT,
  normalized_value TEXT,
  source_type TEXT NOT NULL,
  source_label TEXT,
  source_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Index:

```sql
CREATE INDEX idx_container_facts_container_id
ON container_facts (container_id);

CREATE INDEX idx_container_facts_container_field_name
ON container_facts (container_id, field_name);

CREATE INDEX idx_container_facts_source_sent_at
ON container_facts (source_sent_at DESC);
```

---

## 4. Danh sách field được hỗ trợ trong v0.1

### Required để tạo `container`

- `container_no`

### High-value fields

- `booking_no`
- `bl_no`
- `po_no`
- `vessel`
- `voyage`
- `pol`
- `pod`
- `etd`
- `eta`
- `status_text`
- `document_type`

### Optional

- `shipper`
- `consignee`
- `seal_no`

Lưu ý:

- chỉ tạo/upsert `containers` nếu extract được `container_no`
- nếu không có `container_no`, vẫn lưu `emails` và `attachments`
- `container_facts` luôn là lớp lưu gốc để debug và truy vết

---

## 5. Aggregation rules cho Task 4

### Rule 1: Tạo hoặc tìm `container`

- normalize `container_no` về uppercase, bỏ khoảng trắng thừa
- tìm `containers` theo `(workspace_id, container_no)`
- nếu chưa có thì tạo mới

### Rule 2: Ghi `container_facts`

- mỗi field extract được tạo 1 record riêng trong `container_facts`
- nếu field đến từ email subject/body thì `attachment_id = null`
- nếu field đến từ PDF thì gắn cả `email_id` và `attachment_id`

### Rule 3: Cập nhật `containers`

`containers` chỉ giữ giá trị mới nhất để UI đọc nhanh.

Logic:

- so sánh theo `source_sent_at`
- nếu fact mới hơn thì ghi đè vào field tương ứng trong `containers`
- `first_seen_at` lấy giá trị cũ nhất
- `last_seen_at` lấy giá trị mới nhất

### Rule 4: Nhiều container trong một email

- cho phép một email liên quan nhiều container
- mỗi container được ghi fact riêng
- không cần bảng trung gian riêng trong v0.1 vì có thể suy ra từ `container_facts`

### Rule 5: Không có container

- email vẫn hiện trong màn debug/email detail
- không vào container list chính

---

## 6. API contract đề xuất

## 6.1 Gmail / Sync

### `POST /gmail/sync`

Mục đích: tạo một sync job mới.

Request:

```json
{
  "connection_id": "gcn_01",
  "query": "newer_than:30d",
  "max_results": 200
}
```

Response:

```json
{
  "job_id": "job_01",
  "status": "queued"
}
```

### `GET /gmail/sync/{job_id}`

Response:

```json
{
  "job_id": "job_01",
  "status": "running",
  "counts": {
    "emails_fetched": 120,
    "attachments_found": 35,
    "pdf_text_extracted": 28,
    "containers_upserted": 14
  },
  "started_at": "2026-06-08T09:00:00Z",
  "finished_at": null,
  "error_message": null
}
```

## 6.2 Containers

### `GET /containers`

Query params:

- `q`: search theo container number
- `page`
- `page_size`

Response:

```json
{
  "items": [
    {
      "id": "ctr_01",
      "container_no": "MSCU1234567",
      "booking_no": "BKG-88921",
      "bl_no": "HLCUSHA250601234",
      "etd": "2026-06-06",
      "eta": "2026-06-12",
      "vessel": "MAERSK HANOI",
      "voyage": "126E",
      "updated_at": "2026-06-08T09:12:00Z"
    }
  ],
  "total": 14,
  "page": 1,
  "page_size": 20
}
```

### `GET /containers/{container_no}`

Response:

```json
{
  "container": {
    "id": "ctr_01",
    "container_no": "MSCU1234567",
    "booking_no": "BKG-88921",
    "bl_no": "HLCUSHA250601234",
    "po_no": "450012345",
    "vessel": "MAERSK HANOI",
    "voyage": "126E",
    "pol": "Shanghai",
    "pod": "Hai Phong",
    "etd": "2026-06-06",
    "eta": "2026-06-12",
    "status_text": "Arrival Notice received",
    "source_count": 4,
    "attachment_count": 3,
    "updated_at": "2026-06-08T09:12:00Z"
  },
  "related_emails": [
    {
      "id": "eml_01",
      "subject": "Arrival Notice - MSCU1234567 - ETA 12 Jun",
      "sender": "ops@carrier.com",
      "sent_at": "2026-06-08T09:12:00Z"
    }
  ],
  "related_attachments": [
    {
      "id": "att_01",
      "filename": "arrival_notice.pdf",
      "text_extract_status": "extracted"
    }
  ]
}
```

### `GET /containers/{container_no}/facts`

Response:

```json
{
  "items": [
    {
      "id": "fact_01",
      "field_name": "eta",
      "field_value": "12 Jun 2026",
      "normalized_value": "2026-06-12",
      "document_type": "arrival_notice",
      "source_type": "pdf_text",
      "source_label": "ETA: 12 Jun 2026",
      "source_sent_at": "2026-06-08T09:12:00Z",
      "email_id": "eml_01",
      "attachment_id": "att_01"
    }
  ]
}
```

## 6.3 Emails

### `GET /emails/{email_id}`

Response:

```json
{
  "email": {
    "id": "eml_01",
    "subject": "Arrival Notice - MSCU1234567 - ETA 12 Jun",
    "sender": "ops@carrier.com",
    "sent_at": "2026-06-08T09:12:00Z",
    "snippet": "Please find attached arrival notice...",
    "body_text": "Please find attached arrival notice..."
  },
  "attachments": [
    {
      "id": "att_01",
      "filename": "arrival_notice.pdf",
      "text_extract_status": "extracted"
    }
  ],
  "linked_containers": [
    "MSCU1234567"
  ]
}
```

---

## 7. Mapping từ API sang UI prototype

### Màn container list

Dùng:

- `GET /containers`

Columns nên giữ:

- `container_no`
- `booking_no`
- `bl_no`
- `eta`
- `etd`
- `vessel / voyage`
- `updated_at`

### Màn container detail

Dùng:

- `GET /containers/{container_no}`
- `GET /containers/{container_no}/facts`

Sections nên giữ:

- header container
- summary cards
- related emails
- related attachments
- extracted facts with source

### Màn sync dashboard

Dùng:

- `GET /gmail/sync/{job_id}`

Metrics nên giữ:

- emails fetched
- attachments found
- pdf text extracted
- containers upserted

### Những màn nên tạm bỏ khỏi v0.1

- `AI chat`
- `Review queue`
- `Advanced search`
- bất kỳ UI nào nhắc `OCR`, `Excel import`, `Zalo`

---

## 8. Plan thực hiện dạng todo

## Phase A: Chốt database trước

- [ ] Tạo `app-config.yaml` theo shape của repo mẫu
- [ ] Tạo `.env` với `POSTGRES_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`
- [ ] Tạo `config/models.py` cho root config schema
- [ ] Tạo `config/__init__.py` để load `.env` + expand env vars trong YAML
- [ ] Tạo `config/settings.py` expose singleton config objects
- [ ] Tạo `config/database_config.py` để đọc `postgres.url` và pool settings
- [ ] Chốt tên bảng cuối cùng: `gmail_connections`, `sync_jobs`, `emails`, `attachments`, `containers`, `container_facts`
- [ ] Chốt kiểu dữ liệu cuối cùng cho từng cột, đặc biệt là `TIMESTAMPTZ`, `DATE`, `TEXT[]`
- [ ] Chốt unique key của `emails` là `(gmail_connection_id, gmail_message_id)`
- [ ] Chốt unique key của `containers` là `(workspace_id, container_no)`
- [ ] Chốt index cần có cho `sent_at`, `container_no`, `processing_status`, `text_extract_status`
- [ ] Tạo `db/database.py` theo async session pattern của repo mẫu
- [ ] Tạo `db/models.py` và khai báo toàn bộ SQLAlchemy models ở đây
- [ ] Tạo Alembic config và viết migration PostgreSQL đầu tiên
- [ ] Seed 3-5 email mẫu và 2-3 container mẫu để test UI

## Phase B: Viết contract ingest cho task 1-2

- [ ] Chốt JSON payload cho email sync input
- [ ] Chốt JSON payload cho extraction output
- [ ] Chốt rule normalize `container_no`, `booking_no`, `bl_no`, `eta`, `etd`
- [ ] Chốt rule: không có `container_no` thì không tạo `container`
- [ ] Chốt rule: mỗi field extract tạo 1 `container_fact`

## Phase C: Build backend task 3

- [ ] Tạo `api/models.py` cho request/response schemas
- [ ] Tạo `api/dependencies.py` và expose `get_db` dependency usage
- [ ] Tạo `services/gmail_sync_service.py`
- [ ] Tạo `services/email_ingest_service.py`
- [ ] Tạo `services/extraction_ingest_service.py`
- [ ] Tạo `services/container_service.py`
- [ ] Viết service lưu raw email và attachment metadata
- [ ] Viết service nhận extraction payload và ghi `container_facts`
- [ ] Viết logic upsert `containers` theo `container_no`
- [ ] Viết logic cập nhật `latest known fields` bằng `source_sent_at`
- [ ] Tạo `api/routes/gmail.py` cho `POST /gmail/sync`, `GET /gmail/sync/{job_id}`
- [ ] Tạo `api/routes/emails.py` cho `GET /emails/{email_id}`
- [ ] Tạo `api/routes/api_main.py` hoặc `endpoints.py` để register routers và exception handlers giống repo mẫu

## Phase D: Build aggregation + search task 4

- [ ] Tạo `api/routes/containers.py`
- [ ] Viết query `GET /containers` có search theo `q`
- [ ] Viết query `GET /containers/{container_no}`
- [ ] Viết query `GET /containers/{container_no}/facts`
- [ ] Tối ưu query để container detail không bị N+1
- [ ] Kiểm tra trường hợp một email gắn nhiều container
- [ ] Kiểm tra trường hợp nhiều email cập nhật `ETA` khác nhau cho cùng container

## Phase E: Ghép với UI task 5

- [ ] Map container list UI sang `GET /containers`
- [ ] Map container detail UI sang `GET /containers/{container_no}`
- [ ] Map fact/source section sang `GET /containers/{container_no}/facts`
- [ ] Map sync dashboard sang `GET /gmail/sync/{job_id}`
- [ ] Ẩn hoặc bỏ các màn ngoài scope: `AI`, `Review`, `Advanced Search`

## Phase F: Test dữ liệu thật ở mức prototype

- [ ] Test với email chỉ có subject/body, không có PDF
- [ ] Test với email có 1 PDF text-based
- [ ] Test với email có nhiều PDF
- [ ] Test với email có nhiều container
- [ ] Test với email không extract được `container_no`
- [ ] Test với 2 email cùng container nhưng `ETA` khác nhau
- [ ] Verify UI hiển thị đúng field và đúng source

---

## 9. Khuyến nghị thực hiện

Thứ tự nên làm:

1. khóa DB schema PostgreSQL
2. khóa ingest contract với người làm task 1-2
3. build migration + models
4. build aggregation service
5. build search/detail API
6. mới ghép UI

Nếu phải cắt thêm scope để demo nhanh hơn nữa, vẫn nên giữ:

- `emails`
- `attachments`
- `containers`
- `container_facts`

và bỏ hẳn:

- `sync_jobs` chi tiết
- email detail page nâng cao

Nhưng tôi khuyên vẫn giữ `sync_jobs`, vì màn sync dashboard của prototype cần nó để nhìn “thật”.
