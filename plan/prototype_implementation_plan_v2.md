# Agentify Prototype v0.1 Implementation Plan

> **For agentic workers:** ưu tiên bám đúng scope trong file này, không tự mở rộng sang OCR, chat Q&A, embeddings, Zalo, Excel import hay tích hợp hệ thống ngoài Gmail.

**Goal:** Xây prototype cho phép connect Gmail read-only, đọc metadata email và nội dung PDF text-based attachment, extract thông tin logistics chính, lưu vào database, rồi hiển thị lên giao diện tra cứu theo container để giảm nhập tay và giảm thời gian tìm dữ liệu.

**Architecture:** Backend đồng bộ email từ Gmail API, lưu email và attachment metadata, parse text từ PDF có text layer, chạy extraction để lấy các field logistics, sau đó gom dữ liệu vào hồ sơ container-centric trong database. Frontend chỉ cần các màn hình connect Gmail, sync trạng thái, danh sách container, và trang chi tiết container.

**Tech Stack:** Next.js + TypeScript, FastAPI + Python, PostgreSQL, SQLAlchemy + Alembic, Gmail API OAuth, PyMuPDF/pdfplumber.

---

## 1. Scope prototype

Prototype này chỉ cần chứng minh 1 giá trị:

> Khi team CS/Ops connect mailbox logistics, hệ thống tự đọc email và file PDF text-based để tạo hồ sơ dữ liệu theo container, giúp user tra cứu nhanh thay vì mở nhiều email và file thủ công.

### In scope

- Connect Gmail bằng `gmail.readonly`
- Sync email theo mailbox và query giới hạn
- Lưu metadata email: subject, sender, recipients, sent time, snippet
- Download attachment PDF
- Parse text từ PDF có text layer
- Extract các field logistics chính
- Lưu dữ liệu vào DB
- Hiển thị danh sách container và chi tiết thông tin theo container

### Out of scope

- OCR cho scan PDF hoặc ảnh
- Chat Q&A
- Embeddings / vector search
- Zalo ingestion
- Excel / Google Sheet import
- Tự động gửi email
- Workflow approval phức tạp
- Matching AI đa nghĩa với review queue đầy đủ

---

## 2. Product behavior

### Core user flow

```text
User connect Gmail
→ User bấm sync mailbox
→ Backend lấy email theo query/date range
→ Backend lưu email metadata
→ Backend tải PDF attachment
→ Backend parse text từ PDF
→ Backend extract container_id và các field logistics chính
→ Backend lưu vào DB
→ UI hiển thị danh sách container
→ User bấm vào một container để xem tất cả thông tin liên quan
```

### Success condition

User không cần mở từng email và từng PDF để tra mã container, ETA, B/L, booking, trạng thái cơ bản nữa; chỉ cần vào Agentify để xem thông tin đã được gom sẵn.

---

## 3. Prototype principles

1. Gmail là nguồn dữ liệu đầu tiên và duy nhất trong bản này.
2. Chỉ dùng Gmail read-only.
3. Chỉ hỗ trợ PDF text-based; file scan coi như unsupported trong v0.1.
4. Ưu tiên extraction deterministic + schema rõ ràng hơn là AI workflow phức tạp.
5. Mọi field extract được phải gắn source email/attachment.
6. UI tập trung vào tra cứu theo container trước.
7. Nếu không extract được thì vẫn lưu email/attachment để user xem lại.
8. Không cố “tóm tắt thông minh” nếu dữ liệu nền chưa chắc.

---

## 4. Data model approach

Prototype này nên lấy `container` làm entry point chính cho UI.

### Vì sao lấy container làm trung tâm

- User thường tra cứu theo `container_no`
- Nhiều email/PDF sẽ cùng quy về một container
- Cách trình bày này bám đúng mục tiêu “đỡ phải tra nhiều chỗ”

### Mức độ modeling cần có

Chưa cần shipment graph phức tạp. Chỉ cần:

- `gmail_connections`
- `emails`
- `attachments`
- `container_records`
- `container_document_facts`

`container_records` là bảng tổng hợp mức container để UI tra cứu nhanh.  
`container_document_facts` là bảng lưu từng fact extract được từ từng nguồn để giữ provenance.

---

## 5. Fields cần extract

### Required

- `container_no`

### High-value if found

- `booking_no`
- `bl_no`
- `po_no`
- `vessel`
- `voyage`
- `pol`
- `pod`
- `etd`
- `eta`
- `document_type`
- `status_text`

### Optional

- `shipper`
- `consignee`
- `seal_no`
- `package_count`
- `gross_weight`

### Extraction rule

- Nếu không có `container_no`, không đưa vào danh sách container chính
- Nhưng vẫn lưu email/attachment/extracted payload để xử lý sau
- Không đoán container từ ngữ cảnh mơ hồ

---

## 6. Proposed architecture

```text
Next.js UI
   ↓
FastAPI Backend
   ├─ Gmail OAuth + Sync
   ├─ Email metadata parser
   ├─ PDF text extraction
   ├─ Field extraction service
   └─ Container aggregation service
   ↓
PostgreSQL
```

### Backend responsibilities

- Quản lý Gmail OAuth
- Sync email theo mailbox/query/date range
- Lưu raw metadata và attachment metadata
- Parse text từ PDF
- Extract fields từ email subject/body/PDF text
- Upsert dữ liệu vào `container_records`
- Trả API cho frontend tra cứu

### Frontend responsibilities

- Connect Gmail
- Trigger sync
- Xem trạng thái sync
- Xem danh sách container
- Xem trang chi tiết container

---

## 7. Database schema

### 7.1 `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

### 7.2 `workspaces`

```sql
CREATE TABLE workspaces (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

### 7.3 `gmail_connections`

```sql
CREATE TABLE gmail_connections (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  connected_by UUID REFERENCES users(id),
  gmail_email TEXT NOT NULL,
  refresh_token_encrypted TEXT NOT NULL,
  sync_status TEXT DEFAULT 'idle',
  last_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 7.4 `emails`

```sql
CREATE TABLE emails (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  gmail_connection_id UUID REFERENCES gmail_connections(id),
  gmail_message_id TEXT NOT NULL,
  gmail_thread_id TEXT,
  subject TEXT,
  sender TEXT,
  recipients TEXT[],
  sent_at TIMESTAMP,
  snippet TEXT,
  body_text TEXT,
  body_html TEXT,
  has_pdf_attachment BOOLEAN DEFAULT false,
  processed_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE (gmail_connection_id, gmail_message_id)
);
```

### 7.5 `attachments`

```sql
CREATE TABLE attachments (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  email_id UUID REFERENCES emails(id),
  gmail_attachment_id TEXT,
  filename TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  storage_url TEXT,
  extracted_text TEXT,
  extraction_status TEXT DEFAULT 'pending',
  extraction_error TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

### 7.6 `container_records`

```sql
CREATE TABLE container_records (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  container_no TEXT NOT NULL,
  latest_booking_no TEXT,
  latest_bl_no TEXT,
  latest_po_no TEXT,
  latest_vessel TEXT,
  latest_voyage TEXT,
  latest_pol TEXT,
  latest_pod TEXT,
  latest_etd TIMESTAMP,
  latest_eta TIMESTAMP,
  latest_status_text TEXT,
  first_seen_at TIMESTAMP,
  last_seen_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE (workspace_id, container_no)
);
```

### 7.7 `container_document_facts`

```sql
CREATE TABLE container_document_facts (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  container_record_id UUID REFERENCES container_records(id),
  email_id UUID REFERENCES emails(id),
  attachment_id UUID REFERENCES attachments(id),
  document_type TEXT,
  field_name TEXT NOT NULL,
  field_value TEXT,
  field_value_json JSONB,
  source_label TEXT,
  source_sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);
```

### Ghi chú modeling

- `container_records` là bảng phục vụ UI
- `container_document_facts` là bảng phục vụ truy vết nguồn
- Chưa cần `shipments`, `events`, `chunks`, `documents` trong bản này

---

## 8. Extraction strategy

### Phase 1: deterministic extraction first

Ưu tiên regex/rule-based cho:

- container number
- booking number
- B/L number
- PO number
- ETD / ETA date labels

### Phase 2: LLM extraction only where needed

Chỉ dùng LLM cho:

- document type classification
- chuẩn hóa một số field khó hơn như `status_text`, `vessel`, `voyage`, `pol`, `pod`

### Recommendation

Prototype nên bắt đầu bằng:

1. regex extraction từ `subject`
2. regex extraction từ `body_text`
3. regex extraction từ `PDF extracted_text`
4. chỉ gọi LLM khi deterministic path không đủ

Lý do:

- rẻ hơn
- ổn định hơn
- dễ debug hơn
- phù hợp với prototype chứng minh giá trị nhập liệu tự động

---

## 9. Aggregation logic

### Container resolution rule

1. Nếu tìm thấy đúng 1 `container_no`, upsert vào `container_records`
2. Nếu có nhiều `container_no` trong cùng email/PDF:
   - tạo fact cho từng container
   - cho phép một email/attachment liên kết nhiều container
3. Nếu không có `container_no`:
   - không upsert `container_records`
   - vẫn lưu email và attachment để audit/debug

### Latest value rule

`container_records` chỉ giữ giá trị “latest known” để UI dễ đọc.

Rule cập nhật:

- Giá trị mới hơn theo `source_sent_at` sẽ ghi đè `latest_*`
- Toàn bộ lịch sử fact vẫn nằm ở `container_document_facts`

Ví dụ:

- Email A ngày 10/06 có ETA 12/06
- Email B ngày 11/06 có ETA 14/06
- `container_records.latest_eta = 14/06`
- `container_document_facts` vẫn lưu cả hai record

---

## 10. APIs to build

### Auth / Gmail

```text
POST /auth/google/start
GET  /auth/google/callback
GET  /gmail/connections
POST /gmail/sync
GET  /gmail/sync/status
```

### Containers

```text
GET /containers
GET /containers/search?q=
GET /containers/{container_no}
GET /containers/{container_no}/facts
```

### Emails / Attachments

```text
GET /emails
GET /emails/{email_id}
GET /attachments/{attachment_id}
POST /emails/{email_id}/reprocess
```

---

## 11. Frontend screens

### Screen 1: Connect Gmail

- Connect Gmail button
- Read-only scope note
- Connected mailbox info

### Screen 2: Sync dashboard

- Mailbox connected
- Last sync time
- Emails synced count
- Attachments parsed count
- Containers found count
- Sync trigger button

### Screen 3: Container list

- Search by container number
- Table columns:
  - container number
  - booking
  - B/L
  - ETA
  - ETD
  - vessel/voyage
  - updated at

### Screen 4: Container detail

- Container header
- Summary cards
  - booking
  - B/L
  - PO
  - ETA / ETD
  - POL / POD
  - vessel / voyage
- Related emails
- Related attachments
- Extracted facts with source

---

## 12. Proposed project structure

```text
agentify-prototype/
  apps/
    web/
    api/
  packages/
    shared/
  migrations/
  README.md
```

### Backend structure

```text
apps/api/app/
  main.py
  config.py
  db.py
  models/
    gmail_connection.py
    email.py
    attachment.py
    container_record.py
    container_document_fact.py
  routes/
    auth.py
    gmail.py
    emails.py
    containers.py
  services/
    gmail_service.py
    email_sync_service.py
    pdf_text_service.py
    extraction_service.py
    container_aggregation_service.py
```

### Frontend structure

```text
apps/web/
  app/
    gmail/page.tsx
    dashboard/page.tsx
    containers/page.tsx
    containers/[containerNo]/page.tsx
  components/
    gmail-connect-card.tsx
    sync-status-card.tsx
    container-table.tsx
    container-summary.tsx
    fact-list.tsx
```

---

## 13. Delivery phases

### Phase 1: foundation

- Setup monorepo
- Setup backend/frontend
- Setup PostgreSQL + migrations
- Setup basic auth/session scaffolding nếu cần

### Phase 2: Gmail integration

- Google OAuth app
- Gmail read-only connect
- Manual sync endpoint
- Fetch email metadata

### Phase 3: PDF parsing

- Download PDF attachments
- Parse text from text-based PDFs
- Persist attachment text

### Phase 4: extraction + DB persistence

- Extract `container_no`
- Extract major fields
- Upsert `container_records`
- Persist source facts

### Phase 5: UI

- Sync dashboard
- Container list
- Container detail

### Phase 6: stabilization

- Error handling cho attachment parse fail
- Reprocess email
- Demo dataset / test mailbox

---

## 14. Two-week build plan

### Week 1

#### Day 1: project setup

- Create repo structure for `apps/web` and `apps/api`
- Bootstrap Next.js
- Bootstrap FastAPI
- Setup Postgres
- Add Alembic
- Create initial tables

#### Day 2: Gmail connect

- Create Google OAuth app
- Implement `POST /auth/google/start`
- Implement `GET /auth/google/callback`
- Store encrypted refresh token
- Build connect Gmail screen

#### Day 3: email sync metadata

- Implement Gmail sync service
- Fetch message list by query/date range
- Fetch message detail
- Save subject/sender/recipients/sent_at/snippet/body
- Mark emails with PDF attachment presence

#### Day 4: attachment download + parse

- Download PDF attachments
- Store file
- Parse text from PDF text layer
- Save `extracted_text`
- Mark unsupported/non-PDF attachments clearly

#### Day 5: deterministic extraction

- Add regex extraction for container, booking, B/L, PO
- Extract first-pass ETA/ETD labels
- Save facts to DB
- Upsert container summary rows

### Week 2

#### Day 6: fallback LLM extraction

- Add optional LLM call for document type and normalized fields
- Store raw extracted payload
- Ensure system still works if LLM disabled

#### Day 7: container APIs

- Build `/containers`
- Build `/containers/search`
- Build `/containers/{container_no}`
- Build `/containers/{container_no}/facts`

#### Day 8: container list UI

- Build dashboard summary cards
- Build container table
- Build search input

#### Day 9: container detail UI

- Show container summary
- Show related email list
- Show related attachment list
- Show extracted facts with source email/date

#### Day 10: polish and demo

- Add reprocess flow
- Fix parsing edge cases
- Prepare demo mailbox/data
- Run end-to-end demo

---

## 15. Acceptance criteria

Prototype đạt yêu cầu nếu:

1. User connect được Gmail bằng `gmail.readonly`
2. System sync được email trong phạm vi query/date range chỉ định
3. System lưu được metadata email vào DB
4. System tải được PDF attachment
5. System parse được text từ PDF có text layer
6. System extract được `container_no` từ ít nhất một phần đáng kể email/PDF mẫu
7. System lưu được dữ liệu container vào DB
8. User search được theo `container_no`
9. Trang container detail hiển thị được thông tin tổng hợp và source liên quan
10. Khi parse/extract fail, email/attachment vẫn được lưu để user hoặc dev kiểm tra lại

---

## 16. Main risks

| Risk | Description | Mitigation |
|---|---|---|
| PDF không có text layer | File thực tế là scan dù đuôi là PDF | Detect sớm và đánh dấu unsupported trong v0.1 |
| Subject không đủ dữ liệu | Nhiều email chỉ có container trong PDF | Parse cả body và attachment text |
| Regex miss format lạ | Mã container/BL/booking nhiều format khác nhau | Bắt đầu với 10-20 mẫu thật rồi bổ sung pattern |
| LLM không ổn định | Trích field không nhất quán | Chỉ dùng LLM cho field phụ, deterministic path là chính |
| Dữ liệu trùng lặp | Mail thread/forward làm lưu fact lặp | Unique theo source + field + value nếu cần |
| Scope creep | Dễ bị kéo sang chatbot/logistics platform | Giữ chặt acceptance criteria của file này |

---

## 17. What not to build now

- OCR
- Ask Agentify chat
- Embedding/vector search
- Shipment timeline thông minh
- Zalo import
- Excel import
- Review queue phức tạp
- Shipment matching đa thực thể
- Alerting/notification

---

## 18. Demo script

```text
Đây là mailbox logistics của team.
Agentify connect Gmail ở chế độ read-only, sync email và đọc metadata như subject, sender, thời gian gửi.

Nếu email có PDF attachment dạng text-based, hệ thống tự parse nội dung file, extract các field như container number, booking number, B/L, ETA và các thông tin liên quan.

Sau đó Agentify lưu toàn bộ vào database và gom lại theo container.

Ví dụ khi mở container MSCU1234567, user thấy ngay booking, B/L, ETA, vessel, các email liên quan và file PDF liên quan, không cần mở từng email để tra tay nữa.
```

---

## 19. Next step after v0.1

Sau khi prototype này chạy ổn, thứ tự mở rộng hợp lý là:

1. hỗ trợ thêm PDF scan bằng OCR
2. thêm file upload thủ công
3. thêm Excel import
4. thêm shipment-level grouping
5. thêm Q&A trên dữ liệu đã gom
