# implementation_plan.md

# Agentify Prototype Implementation Plan

- Project: Agentify Shipment Data Hub
- Version: Prototype v0.1
- Goal: Build a fast prototype that connects Gmail, reads logistics emails, extracts shipment/container data, stores it in a database, and lets users ask natural language questions over shipment data.
- Target users: CS/Ops/Docs/Account teams in forwarder/3PL SMEs.
- Prototype scope: Gmail + email body + attachments + PDF text extraction + OCR/vision for images/scanned PDFs + structured extraction + shipment profile + natural language Q&A.

---

## 1. Product goal

Agentify v0.1 should prove one thing:

> A logistics user can search a container/booking/B/L/PO and immediately see the related emails, documents, timeline, extracted fields, status summary, and missing information.

The prototype should not try to replace TMS, WMS, ERP, customs software, ePort, or forwarding software. It should act as a data layer above messy communication channels.

Core demo flow:

```text
User connects Gmail
→ Agentify syncs logistics emails
→ Agentify parses email body and attachments
→ Agentify extracts container/booking/B/L/PO/ETA/status fields
→ Agentify creates shipment/container profiles
→ User asks a natural language question
→ Agentify answers with source references
```

---

## 2. Prototype principles

1. Start with **Gmail read-only**.
2. Do not send emails automatically.
3. Do not modify Gmail mailbox in prototype.
4. Do not integrate Zalo automatically yet.
5. Do not integrate customs/ePort/TMS/WMS yet.
6. Do not let the LLM query the production database directly.
7. Every extracted field must keep its source: email, attachment, file, timestamp.
8. If the data is missing, the AI must answer: **“Not found in Agentify data”** instead of guessing.
9. AI matching must have confidence score and review queue.
10. Build with real-looking mock logistics data first, then test with consented mailbox data.

---

## 3. Recommended tech stack

| Layer | Recommended tech | Reason |
|---|---|---|
| Frontend | Next.js + TypeScript | Fast SaaS UI, good routing, easy deployment |
| UI kit | Tailwind CSS + shadcn/ui | Fast dashboard components, tables, cards, dialogs |
| Backend | FastAPI + Python | Good for AI pipeline, Gmail parsing, PDF/OCR, async workers |
| Database | PostgreSQL + pgvector | Relational shipment data + vector search in one database |
| ORM/migrations | SQLAlchemy + Alembic | Clear schema and migration control |
| Queue | Redis + RQ or Celery | Async email sync, PDF parsing, OCR, extraction, embedding |
| Email | Gmail API OAuth | Official Gmail integration; use read-only scope first |
| LLM | OpenAI GPT-4.1 mini / GPT-4o mini | Structured extraction and Q&A |
| Embeddings | text-embedding-3-small or equivalent | Search over email/document chunks |
| PDF parser | PyMuPDF or pdfplumber | Extract text from text-based PDFs |
| OCR/vision | Google Cloud Vision / Azure Document Intelligence / OpenAI vision | Read scanned PDFs/images such as POD/EIR |
| Storage | Supabase Storage / S3 / MinIO | Store attachments, PDFs, images |
| Deployment | Render/Railway/Fly.io + Neon/Supabase | Fast prototype deployment |

---

## 4. Gmail integration decision

### 4.1. Use Gmail API directly

Use Gmail API directly for the prototype backend.

Do not use Gmail MCP as the main integration layer.

Reason:

- Gmail API gives more control over OAuth, refresh tokens, sync state, rate limits, retries, audit logs, and tenant-level access.
- Agentify needs to store processed data into its own database, not just let an AI agent read Gmail on demand.
- The backend should control what is read, stored, parsed, and exposed to the LLM.

### 4.2. Gmail scopes

Use the minimum scope first:

```text
https://www.googleapis.com/auth/gmail.readonly
```

Do not request send/modify scopes in prototype.

### 4.3. Sync methods

Prototype phase:

```text
Manual sync button
+ Gmail search query
+ limited date range, e.g. last 90 days
```

Later phase:

```text
Gmail push notifications using users.watch + Google Cloud Pub/Sub
```

Gmail push notifications can notify backend when a mailbox changes, reducing polling overhead. However, initial prototype can start with manual sync because it is simpler.

References:

- Gmail API Push Notifications: https://developers.google.com/workspace/gmail/api/guides/push
- Gmail users.watch method: https://developers.google.com/workspace/gmail/api/reference/rest/v1/users/watch
- Gmail API scopes: https://developers.google.com/workspace/gmail/api/auth/scopes

---

## 5. MCP decision

### 5.1. Should we use Gmail MCP?

Recommendation:

```text
Do not use Gmail MCP as the production/prototype core.
Use Gmail API directly.
```

Gmail MCP can be useful for:

- Local experiments.
- Internal AI agent demo.
- Developer-only exploration.

But it is not ideal as the core product integration because Agentify needs controlled sync, token management, source logging, permission, retry, and storage.

### 5.2. Should we use DB MCP?

Recommendation:

```text
Do not allow LLM to query the production database through DB MCP.
```

Instead, expose safe backend functions:

```text
search_shipments(query)
get_shipment_profile(shipment_id)
get_related_emails(shipment_id)
get_timeline_events(shipment_id)
get_documents(shipment_id)
answer_question(question, context)
```

DB MCP can be used only for:

- Local dev.
- Debugging.
- Admin-only experiments.

Production Q&A should use controlled APIs, not unrestricted SQL generation.

---

## 6. Prototype architecture

```text
                    ┌──────────────────────┐
                    │      Next.js UI       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend    │
                    └───────┬──────┬───────┘
                            │      │
              ┌─────────────┘      └──────────────┐
              ▼                                   ▼
    ┌────────────────────┐             ┌────────────────────┐
    │     Gmail API       │             │      OpenAI API     │
    └────────────────────┘             └────────────────────┘
              │                                   │
              ▼                                   ▼
    ┌────────────────────┐             ┌────────────────────┐
    │ Email Sync Worker   │             │ Extract / Q&A       │
    └─────────┬──────────┘             └────────────────────┘
              │
              ▼
    ┌─────────────────────────────────────────────┐
    │ PostgreSQL + pgvector                       │
    │ users / emails / attachments / shipments    │
    │ containers / events / documents / chunks    │
    └─────────────────────────────────────────────┘
              │
              ▼
    ┌────────────────────┐
    │ S3/Supabase Storage │
    │ PDFs / Images       │
    └────────────────────┘
```

---

## 7. Data sources in prototype

### 7.1. Primary source

Gmail mailbox:

- Shared CS/Ops mailbox.
- Docs mailbox.
- Test mailbox with mock logistics emails.

### 7.2. Email types to support first

Support these five types first:

1. Booking Confirmation.
2. Arrival Notice.
3. Draft B/L.
4. ETA Change / Delay Notice.
5. POD/EIR / Delivery Confirmation.

Optional after core works:

6. Debit Note / Local Charge Notice.
7. D/O Release / D/O Pending Notice.
8. Customs Update.
9. Warehouse Confirmation.

---

## 8. Email processing pipeline

### Step 1: Gmail OAuth

User clicks:

```text
Connect Gmail
```

Backend flow:

```text
Start OAuth
→ user grants gmail.readonly
→ backend receives auth code
→ exchange auth code for access token + refresh token
→ encrypt refresh token
→ store gmail connection
```

### Step 2: Email search and sync

For prototype, sync only likely logistics emails.

Example Gmail query:

```text
newer_than:90d (container OR booking OR "arrival notice" OR "bill of lading" OR "delivery order" OR "debit note" OR POD OR EIR OR ETA OR ETD)
```

Alternative queries:

```text
subject:("Arrival Notice" OR "Booking Confirmation" OR "Draft B/L" OR "POD" OR "EIR")
newer_than:90d has:attachment
from:(maersk.com OR cma-cgm.com OR one-line.com OR hapag-lloyd.com)
```

Sync fields:

- Gmail message ID.
- Thread ID.
- Sender.
- Recipients.
- Subject.
- Sent time.
- Snippet.
- Body HTML.
- Body text.
- Attachments metadata.

### Step 3: Email body extraction

Convert email HTML to clean text.

Store:

- Raw HTML.
- Clean text.
- Short snippet.
- Extracted metadata.

### Step 4: Attachment processing

For every attachment:

```text
If PDF has text layer:
  Use PyMuPDF/pdfplumber to extract text

If PDF is scanned/image-based:
  Render pages to images
  Run OCR/vision extraction

If image JPG/PNG:
  Run OCR/vision extraction

If Excel/CSV later:
  Parse rows and map to shipment fields
```

### Step 5: Document classification

Classify each email/attachment as one of:

```text
booking_confirmation
arrival_notice
bl_draft
eta_change_notice
delivery_order_notice
do_pending_notice
debit_note
pod
eir
customs_update
warehouse_confirmation
customer_question
unknown
```

### Step 6: Field extraction

Use LLM structured output with JSON schema.

Extract:

```text
container_numbers
booking_numbers
bl_numbers
po_numbers
job_numbers
vessel
voyage
pol
pod
place_of_delivery
etd
eta
atd
ata
shipper
consignee
notify_party
customer_name
seal_numbers
gross_weight
measurement
package_count
charge_items
amount
currency
event_type
event_time
action_required
confidence
```

OpenAI Structured Outputs can constrain model outputs to a supplied JSON Schema, which is useful for reliable extraction.

Reference:

- OpenAI Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs

### Step 7: Shipment/container matching

Matching priority:

```text
1. container_no exact match
2. bl_no exact match
3. booking_no exact match
4. po_no exact match
5. customer_name + route + date fuzzy match
6. manual review
```

Rules:

- If confidence >= 0.85: auto-link.
- If 0.55 <= confidence < 0.85: review queue.
- If confidence < 0.55: create unassigned extracted item.
- Never overwrite high-confidence existing data without source comparison.
- Always keep source history.

### Step 8: Timeline event creation

Examples:

```text
booking_confirmed
bl_draft_received
arrival_notice_received
eta_changed
do_pending_payment
delivery_order_released
customs_cleared
truck_gate_out
pod_received
eir_received
warehouse_received
customer_asked_status
```

Every event must store:

```text
event_type
event_time
event_text
source_type
source_id
confidence
created_at
```

### Step 9: Chunking and embedding

Create chunks from:

- Email body.
- Extracted attachment text.
- Important timeline event text.
- Document extracted fields.

Store embedding in `chunks` table using pgvector.

pgvector allows vector similarity search directly inside PostgreSQL, while keeping relational tables and JOINs together.

Reference:

- pgvector: https://github.com/pgvector/pgvector

---

## 9. Database schema

### 9.1. `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

### 9.2. `workspaces`

```sql
CREATE TABLE workspaces (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

### 9.3. `workspace_members`

```sql
CREATE TABLE workspace_members (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  user_id UUID REFERENCES users(id),
  role TEXT CHECK (role IN ('admin', 'manager', 'member')),
  created_at TIMESTAMP DEFAULT now()
);
```

### 9.4. `gmail_connections`

```sql
CREATE TABLE gmail_connections (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  connected_by UUID REFERENCES users(id),
  gmail_email TEXT NOT NULL,
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT NOT NULL,
  last_history_id TEXT,
  sync_status TEXT DEFAULT 'idle',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 9.5. `emails`

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
  raw_payload_json JSONB,
  processed_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE (gmail_connection_id, gmail_message_id)
);
```

### 9.6. `attachments`

```sql
CREATE TABLE attachments (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  email_id UUID REFERENCES emails(id),
  filename TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  storage_url TEXT,
  extracted_text TEXT,
  extraction_method TEXT,
  processed_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);
```

### 9.7. `shipments`

```sql
CREATE TABLE shipments (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  customer_name TEXT,
  job_no TEXT,
  po_number TEXT,
  booking_no TEXT,
  bl_number TEXT,
  awb_number TEXT,
  shipment_type TEXT,
  mode TEXT,
  origin TEXT,
  destination TEXT,
  pol TEXT,
  pod TEXT,
  etd TIMESTAMP,
  eta TIMESTAMP,
  status TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 9.8. `containers`

```sql
CREATE TABLE containers (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  shipment_id UUID REFERENCES shipments(id),
  container_no TEXT NOT NULL,
  seal_no TEXT,
  container_type TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 9.9. `shipment_events`

```sql
CREATE TABLE shipment_events (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  shipment_id UUID REFERENCES shipments(id),
  container_id UUID REFERENCES containers(id),
  event_type TEXT NOT NULL,
  event_time TIMESTAMP,
  event_text TEXT,
  source_type TEXT CHECK (source_type IN ('email', 'attachment', 'manual', 'system')),
  source_id UUID,
  confidence NUMERIC,
  created_at TIMESTAMP DEFAULT now()
);
```

### 9.10. `documents`

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  shipment_id UUID REFERENCES shipments(id),
  container_id UUID REFERENCES containers(id),
  document_type TEXT,
  file_name TEXT,
  source_attachment_id UUID REFERENCES attachments(id),
  extracted_fields_json JSONB,
  confidence NUMERIC,
  created_at TIMESTAMP DEFAULT now()
);
```

### 9.11. `extracted_items`

```sql
CREATE TABLE extracted_items (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  source_type TEXT,
  source_id UUID,
  extracted_json JSONB,
  matched_shipment_id UUID REFERENCES shipments(id),
  matched_container_id UUID REFERENCES containers(id),
  match_confidence NUMERIC,
  review_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);
```

### 9.12. `chunks`

```sql
CREATE TABLE chunks (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  source_type TEXT,
  source_id UUID,
  shipment_id UUID REFERENCES shipments(id),
  container_id UUID REFERENCES containers(id),
  text TEXT NOT NULL,
  embedding VECTOR,
  metadata_json JSONB,
  created_at TIMESTAMP DEFAULT now()
);
```

---

## 10. APIs to build

### 10.1. Auth and Gmail

```text
POST /auth/google/start
GET  /auth/google/callback
GET  /gmail/connections
POST /gmail/sync
GET  /gmail/sync/status
```

### 10.2. Email and processing

```text
GET  /emails
GET  /emails/{email_id}
POST /emails/{email_id}/reprocess
GET  /attachments/{attachment_id}
```

### 10.3. Shipments

```text
GET  /shipments
GET  /shipments/search?q=
GET  /shipments/{shipment_id}
GET  /shipments/{shipment_id}/timeline
GET  /shipments/{shipment_id}/documents
GET  /shipments/{shipment_id}/emails
```

### 10.4. Review queue

```text
GET  /review/items
POST /review/items/{item_id}/confirm
POST /review/items/{item_id}/assign-shipment
POST /review/items/{item_id}/ignore
```

### 10.5. Q&A

```text
POST /ask
POST /shipments/{shipment_id}/ask
```

Request:

```json
{
  "question": "Container MSCU1234567 đã giao kho chưa?"
}
```

Response:

```json
{
  "answer": "Chưa thấy POD hoặc warehouse confirmation trong dữ liệu Agentify...",
  "sources": [
    {
      "type": "email",
      "id": "...",
      "title": "Arrival Notice - MSCU1234567",
      "timestamp": "2026-06-11T09:12:00"
    }
  ],
  "missing_data": ["POD", "warehouse confirmation"]
}
```

---

## 11. LLM extraction schema

Use structured output.

```json
{
  "document_type": "arrival_notice",
  "identifiers": {
    "container_numbers": ["MSCU1234567"],
    "booking_numbers": ["BKG-88921"],
    "bl_numbers": ["HLCUSHA250601234"],
    "po_numbers": ["450012345"],
    "job_numbers": []
  },
  "parties": {
    "shipper": "Shanghai Auto Components Co., Ltd.",
    "consignee": "ABC Manufacturing Vietnam",
    "notify_party": "Same as consignee",
    "customer_name": "ABC Manufacturing Vietnam"
  },
  "route": {
    "pol": "Shanghai",
    "pod": "Hai Phong",
    "place_of_delivery": "Hai Phong CY",
    "vessel": "MAERSK HANOI",
    "voyage": "126E"
  },
  "dates": {
    "etd": "2026-06-06",
    "eta": "2026-06-12",
    "event_time": "2026-06-11T09:12:00"
  },
  "cargo": {
    "description": "Auto parts",
    "packages": "18 pallets",
    "gross_weight": "12450 KGS",
    "measurement": "58.2 CBM"
  },
  "event": {
    "event_type": "arrival_notice_received",
    "summary": "Arrival Notice received for container MSCU1234567, ETA 12 Jun 2026",
    "action_required": "Arrange customs clearance and local charge payment"
  },
  "charges": [],
  "confidence": 0.92
}
```

---

## 12. Natural language Q&A design

### 12.1. Query flow

```text
User question
→ detect logistics identifiers using regex + LLM
→ if identifier found: query structured DB first
→ retrieve shipment profile + events + documents + related emails
→ if needed: vector search related chunks
→ LLM composes answer
→ answer includes source references
```

### 12.2. Examples

Question:

```text
Container MSCU1234567 đã giao kho chưa?
```

Expected answer:

```text
Chưa thấy dữ liệu xác nhận đã giao kho trong Agentify.
Hiện có Arrival Notice ngày 11 Jun 09:12 và ETA là 12 Jun 2026.
Chưa thấy POD, EIR giao hàng hoặc xác nhận kho đã nhận hàng.

Nguồn:
1. Email Arrival Notice từ Maersk, 11 Jun 09:12
2. File tracking import ngày 10 Jun 18:20
```

Question:

```text
Shipment này còn thiếu chứng từ gì?
```

Expected answer:

```text
Theo dữ liệu hiện tại, shipment SHP-2026-001 đã có Booking Confirmation, B/L Draft và Arrival Notice.
Chưa thấy Delivery Order, POD và Warehouse Confirmation.
```

---

## 13. Frontend screens

### 13.1. Screen 1: Connect Gmail

Components:

- Agentify logo.
- Connect Gmail button.
- Read-only permission note.
- Security checklist.
- Sync scope selection.

### 13.2. Screen 2: Sync dashboard

Components:

- Emails scanned.
- Attachments processed.
- Shipments created.
- Items needing review.
- Recent processed emails table.

### 13.3. Screen 3: Shipment search

Components:

- Search bar.
- Filter chips.
- Shipment table.
- Status badges.
- Missing item badges.

### 13.4. Screen 4: Shipment profile

Components:

- Shipment header.
- Identifier cards.
- Route card.
- Timeline.
- Related emails.
- Documents.
- AI summary.
- Missing checklist.
- Ask about this shipment.

### 13.5. Screen 5: Ask Agentify

Components:

- Chat UI.
- Suggested questions.
- Answer with source cards.
- Missing data indicators.

### 13.6. Screen 6: Review queue

Components:

- Unmatched items table.
- Source preview.
- Suggested matches.
- Confirm/assign/ignore buttons.

---

## 14. Folder structure

```text
agentify-prototype/
  apps/
    web/                    # Next.js frontend
    api/                    # FastAPI backend
  workers/
    email_sync_worker.py
    document_worker.py
    extraction_worker.py
    embedding_worker.py
  packages/
    shared_types/
  migrations/
  docker-compose.yml
  .env.example
  README.md
```

Backend structure:

```text
api/
  app/
    main.py
    config.py
    db.py
    models/
    schemas/
    routes/
      auth.py
      gmail.py
      emails.py
      shipments.py
      review.py
      ask.py
    services/
      gmail_service.py
      email_parser.py
      attachment_service.py
      pdf_parser.py
      ocr_service.py
      extraction_service.py
      matching_service.py
      embedding_service.py
      qa_service.py
    workers/
```

---

## 15. Environment variables

```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
OPENAI_API_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
STORAGE_ENDPOINT=...
STORAGE_ACCESS_KEY=...
STORAGE_SECRET_KEY=...
STORAGE_BUCKET=agentify-files
ENCRYPTION_KEY=...
```

---

## 16. Two-week build plan

## Week 1: Gmail ingestion + extraction

### Day 1: Project setup

Tasks:

- Create monorepo.
- Setup FastAPI.
- Setup Next.js.
- Setup Postgres + pgvector.
- Setup Redis.
- Setup SQLAlchemy + Alembic.
- Create initial DB schema.

Deliverable:

- App runs locally with Docker Compose.
- API health check works.
- DB migration works.

### Day 2: Gmail OAuth

Tasks:

- Create Google Cloud OAuth app.
- Implement Gmail OAuth start/callback.
- Store encrypted refresh token.
- Build simple Connect Gmail UI.

Deliverable:

- User can connect Gmail read-only.
- Gmail connection appears in dashboard.

### Day 3: Gmail sync

Tasks:

- Implement Gmail `messages.list` with query.
- Implement `messages.get`.
- Parse subject, sender, recipients, date, snippet, body HTML/text.
- Save emails to DB.
- Download attachment metadata.

Deliverable:

- Sync 50-100 emails into DB.
- Show processed emails table.

### Day 4: Attachment processing

Tasks:

- Download attachments.
- Store attachments in S3/Supabase/MinIO.
- Extract text from PDF using PyMuPDF/pdfplumber.
- Add basic OCR/vision path for images/scanned PDFs.

Deliverable:

- Attachments stored.
- Extracted text available in DB.

### Day 5: LLM extraction

Tasks:

- Implement structured extraction prompt.
- Extract identifiers and document type.
- Extract ETA/ETD, B/L, booking, container, parties, route.
- Save extracted JSON.

Deliverable:

- Email/file creates extracted item with structured fields.

## Week 2: Shipment profile + Q&A

### Day 6: Matching and shipment creation

Tasks:

- Implement matching rules.
- Create shipment/container if not exists.
- Attach emails/documents/events to shipment.
- Add confidence score.

Deliverable:

- Emails and documents are linked to shipment profiles.

### Day 7: Shipment profile UI

Tasks:

- Build shipment search page.
- Build shipment detail page.
- Show identifiers, route, ETA, timeline, emails, documents.

Deliverable:

- Search container number and open shipment profile.

### Day 8: Embeddings and retrieval

Tasks:

- Chunk email body and attachment text.
- Generate embeddings.
- Store in pgvector.
- Implement vector search endpoint.

Deliverable:

- Relevant emails/documents retrieved by natural language query.

### Day 9: Ask Agentify

Tasks:

- Implement `/ask` endpoint.
- Detect identifiers.
- Fetch structured DB context first.
- Add vector search fallback.
- Generate answer with source cards.

Deliverable:

- User can ask: “Container MSCU1234567 đã giao kho chưa?”
- AI answers with sources and missing data.

### Day 10: Review queue + demo polish

Tasks:

- Build review queue for low-confidence matches.
- Add confirm/assign/ignore actions.
- Add mock alert badges.
- Prepare demo dataset.
- Fix UI and edge cases.

Deliverable:

- End-to-end demo works.

---

## 17. Demo dataset

Create 10-20 mock emails/files:

1. Booking Confirmation - BKG-88921.
2. Draft B/L - HLCUSHA250601234.
3. Arrival Notice - MSCU1234567.
4. ETA Change - ONEU9988776.
5. D/O Pending - payment required.
6. POD attached - MSCU1234567 delivered.
7. EIR image - MSCU1234567 gate-out.
8. Customs cleared email.
9. Warehouse received confirmation.
10. Customer asks: “container đã giao kho chưa?”.

Mock customers:

```text
ABC Manufacturing
Delta Electronics
Viet Auto Parts
Green Textile
```

Mock containers:

```text
MSCU1234567
ONEU9988776
TGHU7654321
CMAU1122334
```

---

## 18. Acceptance criteria

Prototype is successful if:

1. User can connect Gmail read-only.
2. System can sync selected logistics emails.
3. System can extract container/booking/B/L/PO from subject/body/PDF/image.
4. System can create shipment/container profiles.
5. User can search by container number.
6. Shipment profile shows timeline + emails + documents + source links.
7. User can ask natural language questions.
8. AI answer includes source references.
9. AI says “not found in Agentify data” when data is missing.
10. Low-confidence matches go to review queue.

---

## 19. Security and privacy requirements

For prototype:

- Use Gmail read-only.
- Encrypt refresh tokens.
- Do not send email.
- Do not modify/delete labels/messages.
- Keep workspace-level data isolation.
- Log every email/attachment processed.
- Show sources for every AI answer.
- Do not train models on customer data.
- Allow deleting synced mailbox data.

Important note:

Gmail scopes such as `gmail.readonly` are sensitive/restricted Google API scopes and may require verification for public production apps. For prototype/testing, use test users in Google Cloud OAuth consent screen.

Reference:

- Google OAuth scopes and Gmail API scopes: https://developers.google.com/workspace/gmail/api/auth/scopes
- Google restricted scopes help: https://support.google.com/cloud/answer/13464325

---

## 20. Main risks and mitigations

| Risk | Description | Mitigation |
|---|---|---|
| Gmail verification | Public app may require Google OAuth verification | Prototype with test users first; use minimal read-only scope |
| Email data sensitivity | Emails contain customer/commercial info | Encryption, access control, audit log, consent |
| AI extraction errors | Wrong ETA/container/document type | Structured outputs, regex validation, human review queue |
| Wrong shipment matching | Document linked to wrong container | Confidence score, manual confirmation, undo |
| OCR errors | Scanned EIR/POD can be unclear | Start with clear docs; store raw file; allow manual correction |
| Scope creep | Product becomes TMS/WMS/ERP | Keep v0.1 as Shipment Data Hub only |
| Missing source data | AI may be expected to know everything | Always answer with “not found in Agentify data” when missing |

---

## 21. What not to build in prototype

Do not build:

- Automatic Zalo personal message ingestion.
- ePort integration.
- VNACCS/ECUS integration.
- TMS/WMS/ERP integration.
- Route optimization.
- Accounting approval.
- Customs declaration automation.
- Auto-send email to customers.
- Complex role-based permission model beyond admin/member.
- Full mobile app.

---

## 22. Prototype pitch script

Use this script for demo:

```text
A forwarder receives dozens of emails, PDFs, Excel files, and Zalo evidence every day.
A single shipment may have a booking confirmation, B/L draft, arrival notice, ETA update, POD, EIR, and customer messages scattered across different places.

Agentify connects to the logistics mailbox, reads these documents, extracts shipment identifiers like container number, booking number, B/L and PO, then creates a single shipment profile.

Now, when CS asks “Container MSCU1234567 đã giao kho chưa?”, Agentify checks the shipment profile, related emails, PDFs, POD/EIR evidence and timeline, then answers with sources.

If data is missing, Agentify does not guess. It tells the user what has not been found.
```

---

## 23. Future roadmap after prototype

After v0.1 works:

### v0.2

- Excel/Google Sheet import.
- Manual upload portal.
- More document types: debit note, D/O, customs update.
- Better review queue.
- Export report.

### v0.3

- Workspace/team collaboration.
- Checklist by shipment type: import FCL, export FCL, LCL, air cargo.
- Simple alerts: missing POD, ETA changed, no update > 24h.
- Customer update draft.

### v1.0

- Paid pilot with 1-3 forwarder/3PL SMEs.
- Gmail push notifications.
- Google Drive/OneDrive integration.
- Optional Zalo OA/API or safe manual Zalo evidence flow.
- TMS/WMS connector via file/API if requested.

---

## 24. Source references

- Agentify v3 proposal: internal uploaded document `de_xuat_agentify_v3.md`.
- Gmail API Push Notifications: https://developers.google.com/workspace/gmail/api/guides/push
- Gmail users.watch API: https://developers.google.com/workspace/gmail/api/reference/rest/v1/users/watch
- Gmail API scopes: https://developers.google.com/workspace/gmail/api/auth/scopes
- Google restricted scopes: https://support.google.com/cloud/answer/13464325
- pgvector: https://github.com/pgvector/pgvector
- OpenAI Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- PyMuPDF documentation: https://pymupdf.readthedocs.io/
