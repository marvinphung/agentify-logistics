# Gmail Service Backend Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the embedded Gmail module usable inside the current backend by adding real Gmail connection flow, sync-job execution, and an adapter into the existing ingest contract.

**Architecture:** Keep `backend/gmail_service` as the Gmail-specific integration layer. Add a backend service that orchestrates OAuth, Gmail API reads, PDF extraction, and conversion into `ProcessedEmailIngestRequest`, then reuses the existing ingestion and aggregation services. Update the setup UI to use the new Gmail connection and sync execution endpoints instead of the demo-only manual mailbox form.

**Tech Stack:** FastAPI, SQLAlchemy async, Pydantic, Google OAuth/Gmail API, React, TypeScript

---

### Task 1: Add Gmail OAuth and API client support

**Files:**
- Modify: `backend/config/models.py`
- Modify: `backend/config/gmail_config.py`
- Modify: `backend/app-config.yaml`
- Modify: `backend/app-config-template.yaml`
- Modify: `backend/.env.example`
- Modify: `backend/gmail_service/auth.py`
- Create: `backend/tests/test_gmail_auth_config.py`

- [ ] Define config fields for Gmail OAuth web flow and frontend return URL.
- [ ] Refactor Gmail auth helpers so they can build an auth URL, exchange an auth code, and create a Gmail API client from a stored refresh token.
- [ ] Add a backend test that validates the config model exposes the new Gmail OAuth settings.

### Task 2: Add adapter from Gmail extraction output to ingest contract

**Files:**
- Create: `backend/gmail_service/adapter.py`
- Modify: `backend/gmail_service/fetcher.py`
- Modify: `backend/gmail_service/pipeline.py`
- Create: `backend/tests/test_gmail_adapter.py`

- [ ] Add a normalized email payload shape with headers, body text/html, labels, and PDF attachments.
- [ ] Convert `ExtractedRecord` output into `ProcessedEmailIngestRequest` with flat `attachments` and `extracted_facts`.
- [ ] Add a failing adapter test first, then implement the minimal mapping needed by the current DB schema and aggregation logic.

### Task 3: Add backend Gmail connection and sync execution endpoints

**Files:**
- Modify: `backend/api/models.py`
- Modify: `backend/api/routes/gmail_connections.py`
- Modify: `backend/api/routes/sync_jobs.py`
- Modify: `backend/api/config.py`
- Modify: `backend/endpoints.py`
- Modify: `backend/services/gmail_connection_service.py`
- Modify: `backend/services/gmail_ingestion_service.py`
- Create: `backend/tests/test_gmail_sync_service.py`

- [ ] Add API models for `start Gmail OAuth`, `complete Gmail OAuth`, and `run sync job`.
- [ ] Expose endpoints to start Gmail OAuth and execute a queued sync job from the backend.
- [ ] Update service code so sync execution updates `sync_jobs`, `gmail_connections.last_synced_at`, and ingests processed emails through the existing DB path.
- [ ] Add tests around the sync orchestration using fake Gmail payloads and mocked dependencies.

### Task 4: Update setup UI to use the new Gmail flow

**Files:**
- Modify: `frontend/src/app/lib/agentify-api.ts`
- Modify: `frontend/src/app/types/api.ts`
- Modify: `frontend/src/app/pages/Setup.tsx`
- Create: `frontend/src/app/pages/Setup.test.tsx`

- [ ] Replace the demo-only mailbox save flow with a Gmail connect action that starts OAuth via backend.
- [ ] Add a “run sync now” action on queued connections/jobs so the UI matches the new backend flow.
- [ ] Keep the rest of the search-first IA intact.

### Task 5: Verification

**Files:**
- Modify: `backend/README.md`

- [ ] Update backend docs to describe the embedded Gmail module and required OAuth env vars.
- [ ] Run targeted backend and frontend tests for the new integration.
- [ ] Report any gaps honestly if verification fails or cannot be completed.
