# AGENTS.md

## Project Snapshot

- Project name: `Agentify Logistics`
- Current product direction: `Agentify Shipment Data Hub`
- Core idea: build a data layer above fragmented logistics communication channels so each shipment/container has one searchable profile.
- Target users: `CS`, `Ops`, `Docs`, `Account` teams in forwarder/`3PL` SMEs in Vietnam.
- Primary user value: search a `container`, `booking`, `B/L`, or `PO` and immediately see status, related emails/documents, timeline, missing items, and source references.

## Product Positioning

Agentify is not trying to replace:

- `TMS`
- `WMS`
- `ERP`
- customs software
- ePort systems
- forwarding software

Agentify should act as an operational data hub that sits above `email`, `Excel`, `PDF`, image evidence, and later adjacent logistics systems.

## Prototype Goal

Prototype `v0.1` should prove this:

> A logistics user can search a shipment/container identifier and quickly see the related emails, documents, extracted fields, timeline, status summary, and missing information.

Core prototype flow:

1. User connects `Gmail` with read-only access.
2. System syncs logistics emails and attachments.
3. System extracts shipment/container fields from email bodies and files.
4. System matches extracted data into shipment/container profiles.
5. User asks a natural-language question or searches by logistics code.
6. System answers with explicit source references.

## In Scope Right Now

- `Gmail API` integration with `gmail.readonly`
- Email sync with limited query/date range
- Email body parsing
- Attachment ingestion
- PDF text extraction
- OCR/vision for images and scanned PDFs
- Structured extraction of logistics fields
- Shipment/container matching with confidence handling
- Shipment profile page
- Timeline event creation with source traceability
- Natural-language search and Q&A over stored data

## Out of Scope Right Now

- Sending or modifying emails automatically
- Full `Zalo` auto-ingestion
- Direct integrations with customs, ePort, carrier portals, `TMS`, `WMS`, or `ERP`
- Replacing core forwarding software
- Letting the `LLM` query the database directly
- AI making up missing facts

## Working Rules

- Always preserve source provenance for extracted data: email, attachment, uploader, and timestamp.
- If data is missing, the assistant/product should say `Not found in Agentify data` rather than guess.
- Matching must use confidence thresholds and a review path for uncertain results.
- Do not overwrite trusted existing data without source-aware comparison.
- Keep the product human-in-the-loop for sensitive operational conclusions.
- Favor narrow, working prototype slices over broad logistics platform scope.

## Data Reality To Respect

- In this market, the real operational data is often spread across `email`, `Zalo`, `Excel`, `Google Sheets`, `PDF`, scans, and photos.
- `CS/Ops/Docs/Account` users are the first audience because they repeatedly answer shipment-status questions from fragmented sources.
- The most important early value is faster, more reliable retrieval, not end-to-end workflow automation.

## Recommended Reading Order

Read these before major product or architecture changes:

1. `docs/context-logistics/de_xuat_agentify_v3.md`
2. `plan/prototype_implementation_plan.md`
3. `docs/context-logistics/README_CONTEXT.md`
4. `docs/context-logistics/cum_8_cs_ops_account_tra_loi_khach.md`
5. `docs/context-logistics/cum_9_excel_email_zalo_file_thu_cong.md`
6. `docs/context-logistics/cum_4_chung_tu_xuat_nhap_khau.md`

## Current Build Priorities

Prioritize work in this order unless the user directs otherwise:

1. `Gmail` connection and sync
2. Email and attachment ingestion pipeline
3. Field extraction and document classification
4. Shipment/container matching
5. Shipment profile and timeline
6. Search and natural-language Q&A with source references
7. Review queue, alerts, and missing-data surfaces

## Implementation Bias

- Prefer decisions that support a real prototype demo with consented or realistic logistics data.
- Optimize for showing a believable `shipment profile` and `timeline` early.
- Keep architecture ready for later sources, but do not pre-build broad integrations before the Gmail-driven prototype works.
