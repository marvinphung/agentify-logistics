# Demo Email Corpus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a reproducible `demo_email/` corpus with realistic logistics email threads and text-based PDF attachments for parser, matching, and timeline testing.

**Architecture:** Add a standalone generator script under `backend/scripts/` that owns the scenario definitions, writes each email into its own folder, and renders plain-text PDFs with a minimal PDF writer compatible with the current ingestion stack. Keep the generated output outside app code in `demo_email/` so the corpus can be regenerated without touching backend or frontend logic.

**Tech Stack:** Python 3.12, stdlib `pathlib`, `dataclasses`, `shutil`, existing minimal PDF byte structure compatible with `pdfplumber`/`pymupdf`

---

### Task 1: Define corpus structure and generation script

**Files:**
- Create: `backend/scripts/generate_demo_email_corpus.py`
- Create: `demo_email/README.md`

- [ ] **Step 1: Define corpus scenarios in the generator**

Use a small in-script data model with:
- container profile
- shipment status bucket
- per-email subject/body/meta
- PDF attachment filename and extracted text lines

- [ ] **Step 2: Reuse the existing text-based PDF pattern**

Copy the minimal PDF writer approach from `backend/scripts/seed_demo_data.py` so every attachment is text-based and extractable by the existing parser stack.

- [ ] **Step 3: Materialize one folder per email**

Write:
- `demo_email/email_XX_<slug>/title.txt`
- `demo_email/email_XX_<slug>/body.txt`
- `demo_email/email_XX_<slug>/meta.txt`
- `demo_email/email_XX_<slug>/attachments/<file>.pdf`

- [ ] **Step 4: Document the generated corpus**

Create `demo_email/README.md` with status coverage, container list, and regeneration command.

### Task 2: Generate and verify the corpus

**Files:**
- Run: `backend/scripts/generate_demo_email_corpus.py`

- [ ] **Step 1: Run the generator**

Run:
```bash
python3 backend/scripts/generate_demo_email_corpus.py
```

Expected:
- `demo_email/` contains 36 email folders
- every email folder contains `title.txt`, `body.txt`, `meta.txt`
- every email folder contains one PDF attachment

- [ ] **Step 2: Verify folder count and key files**

Run:
```bash
find demo_email -maxdepth 1 -type d | wc -l
find demo_email -path '*/attachments/*.pdf' | wc -l
```

Expected:
- 37 directories total including `demo_email`
- 36 PDF attachments

- [ ] **Step 3: Verify PDF text extraction**

Run a small extraction check against a few generated PDFs with the repo’s current PDF tooling to confirm the attachments are truly text-based and not image-only.

- [ ] **Step 4: Spot-check status coverage**

Confirm the corpus includes shipments for:
- `Đã hoàn tất`
- `Đang vận chuyển`
- `Chờ xuất cảng`
- `Chờ thông quan`
- `Chờ chứng từ`
- `Thiếu dữ liệu`
