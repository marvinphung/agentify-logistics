from __future__ import annotations

import argparse
import asyncio
from datetime import UTC, datetime
from decimal import Decimal
from pathlib import Path
from uuid import UUID

from sqlalchemy import text

from api.models import (
    IngestAttachmentRequest,
    IngestFactRequest,
    ProcessedEmailIngestRequest,
)
from db.database import AsyncSessionLocal
from db.models import GmailConnection, SyncJob
from services.ingestion_service import ingest_processed_email

DEMO_ACCOUNT_EMAIL = "demo-logistics@agentify.vn"
DEMO_DISPLAY_NAME = "Agentify Demo Logistics"
DEMO_GOOGLE_ACCOUNT_ID = "agentify-demo-google-account"
BACKEND_ROOT = Path(__file__).resolve().parents[1]
DEMO_PDF_DIR = BACKEND_ROOT / "storage" / "demo_pdfs"


def _dt(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00")).astimezone(UTC)


def _escape_pdf_text(value: str) -> str:
    return value.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def _build_text_pdf_bytes(lines: list[str]) -> bytes:
    text_lines = [_escape_pdf_text(line) for line in lines if line.strip()]
    if not text_lines:
        text_lines = ["Agentify demo PDF"]

    content_lines = ["BT", "/F1 12 Tf", "50 780 Td", "14 TL"]
    for index, line in enumerate(text_lines):
        if index == 0:
            content_lines.append(f"({line}) Tj")
        else:
            content_lines.append("T*")
            content_lines.append(f"({line}) Tj")
    content_lines.append("ET")
    stream = "\n".join(content_lines).encode("latin-1", errors="replace")

    objects = [
        b"1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
        b"2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
        b"3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj",
        b"4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
        b"5 0 obj << /Length %d >> stream\n%b\nendstream endobj" % (len(stream), stream),
    ]

    pdf = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for obj in objects:
        offsets.append(len(pdf))
        pdf.extend(obj)
        pdf.extend(b"\n")

    xref_offset = len(pdf)
    pdf.extend(f"xref\n0 {len(offsets)}\n".encode("ascii"))
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    pdf.extend(
        (
            f"trailer << /Size {len(offsets)} /Root 1 0 R >>\n"
            f"startxref\n{xref_offset}\n%%EOF\n"
        ).encode("ascii")
    )
    return bytes(pdf)


def _materialize_demo_pdf(filename: str, extracted_text: str | None) -> tuple[str, int]:
    DEMO_PDF_DIR.mkdir(parents=True, exist_ok=True)
    relative_path = Path("storage") / "demo_pdfs" / filename
    absolute_path = BACKEND_ROOT / relative_path
    lines = (extracted_text or filename).splitlines()
    absolute_path.write_bytes(_build_text_pdf_bytes(lines))
    return relative_path.as_posix(), absolute_path.stat().st_size


def build_demo_payloads(
    gmail_connection_id: UUID,
    sync_job_id: UUID,
) -> list[ProcessedEmailIngestRequest]:
    payloads = [
        ProcessedEmailIngestRequest(
            gmail_connection_id=gmail_connection_id,
            sync_job_id=sync_job_id,
            gmail_message_id="demo-msg-001",
            gmail_thread_id="demo-thread-001",
            subject="Booking Confirmation - MSCU1234567 - BKG-88921",
            from_email="booking@maersk-demo.com",
            to_emails=["ops@agentify.vn"],
            sent_at=_dt("2026-06-05T08:15:00Z"),
            snippet="Booking confirmed for MSCU1234567 on MAERSK HANOI 126E.",
            body_text=(
                "Container MSCU1234567 booked. Vessel MAERSK HANOI 126E. "
                "ETD 2026-06-06 from Shanghai to Hai Phong."
            ),
            raw_labels=["INBOX", "LOGISTICS"],
            has_pdf_attachments=True,
            attachments=[
                IngestAttachmentRequest(
                    gmail_attachment_id="demo-att-001",
                    filename="booking_confirmation_mscu1234567.pdf",
                    mime_type="application/pdf",
                    size_bytes=212_548,
                    storage_path="/demo/booking_confirmation_mscu1234567.pdf",
                    is_text_pdf=True,
                    text_extract_status="extracted",
                    extracted_text=(
                        "Container: MSCU1234567\n"
                        "Booking No: BKG-88921\n"
                        "POL: Shanghai\n"
                        "POD: Hai Phong\n"
                        "Vessel/Voyage: MAERSK HANOI / 126E\n"
                        "ETD: 2026-06-06"
                    ),
                    document_type="booking_confirmation",
                )
            ],
            extracted_facts=[
                IngestFactRequest(
                    field_name="container_no",
                    field_value="MSCU1234567",
                    normalized_value="MSCU1234567",
                    container_no="MSCU1234567",
                    source_type="email_subject",
                    source_label="Booking Confirmation - MSCU1234567 - BKG-88921",
                    document_type="booking_confirmation",
                    confidence=Decimal("0.9900"),
                ),
                IngestFactRequest(
                    field_name="booking_no",
                    field_value="BKG-88921",
                    normalized_value="BKG-88921",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="Booking No: BKG-88921",
                    document_type="booking_confirmation",
                    confidence=Decimal("0.9800"),
                    attachment_filename="booking_confirmation_mscu1234567.pdf",
                ),
                IngestFactRequest(
                    field_name="vessel",
                    field_value="MAERSK HANOI",
                    normalized_value="MAERSK HANOI",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="Vessel/Voyage: MAERSK HANOI / 126E",
                    document_type="booking_confirmation",
                    confidence=Decimal("0.9700"),
                    attachment_filename="booking_confirmation_mscu1234567.pdf",
                ),
                IngestFactRequest(
                    field_name="voyage",
                    field_value="126E",
                    normalized_value="126E",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="Vessel/Voyage: MAERSK HANOI / 126E",
                    document_type="booking_confirmation",
                    confidence=Decimal("0.9700"),
                    attachment_filename="booking_confirmation_mscu1234567.pdf",
                ),
                IngestFactRequest(
                    field_name="pol",
                    field_value="Shanghai",
                    normalized_value="Shanghai",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="POL: Shanghai",
                    document_type="booking_confirmation",
                    confidence=Decimal("0.9600"),
                    attachment_filename="booking_confirmation_mscu1234567.pdf",
                ),
                IngestFactRequest(
                    field_name="pod",
                    field_value="Hai Phong",
                    normalized_value="Hai Phong",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="POD: Hai Phong",
                    document_type="booking_confirmation",
                    confidence=Decimal("0.9600"),
                    attachment_filename="booking_confirmation_mscu1234567.pdf",
                ),
                IngestFactRequest(
                    field_name="etd",
                    field_value="2026-06-06",
                    normalized_value="2026-06-06",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="ETD: 2026-06-06",
                    document_type="booking_confirmation",
                    confidence=Decimal("0.9600"),
                    attachment_filename="booking_confirmation_mscu1234567.pdf",
                ),
                IngestFactRequest(
                    field_name="status_text",
                    field_value="Booking confirmed",
                    normalized_value="Booking confirmed",
                    container_no="MSCU1234567",
                    source_type="email_body",
                    source_label="Container MSCU1234567 booked.",
                    document_type="booking_confirmation",
                    confidence=Decimal("0.9500"),
                ),
            ],
        ),
        ProcessedEmailIngestRequest(
            gmail_connection_id=gmail_connection_id,
            sync_job_id=sync_job_id,
            gmail_message_id="demo-msg-002",
            gmail_thread_id="demo-thread-001",
            subject="Arrival Notice - MSCU1234567 - ETA 2026-06-12",
            from_email="arrival@maersk-demo.com",
            to_emails=["cs@agentify.vn"],
            sent_at=_dt("2026-06-08T03:40:00Z"),
            snippet="Arrival notice for MSCU1234567 ETA 12 Jun.",
            body_text="Please find attached arrival notice for container MSCU1234567.",
            raw_labels=["INBOX", "ARRIVAL"],
            has_pdf_attachments=True,
            attachments=[
                IngestAttachmentRequest(
                    gmail_attachment_id="demo-att-002",
                    filename="arrival_notice_mscu1234567_v1.pdf",
                    mime_type="application/pdf",
                    size_bytes=148_210,
                    storage_path="/demo/arrival_notice_mscu1234567_v1.pdf",
                    is_text_pdf=True,
                    text_extract_status="extracted",
                    extracted_text=(
                        "Container No: MSCU1234567\n"
                        "B/L No: HLCUSHA250601234\n"
                        "ETA: 2026-06-12\n"
                        "Status: Arrival Notice received"
                    ),
                    document_type="arrival_notice",
                )
            ],
            extracted_facts=[
                IngestFactRequest(
                    field_name="container_no",
                    field_value="MSCU1234567",
                    normalized_value="MSCU1234567",
                    container_no="MSCU1234567",
                    source_type="email_subject",
                    source_label="Arrival Notice - MSCU1234567 - ETA 2026-06-12",
                    document_type="arrival_notice",
                    confidence=Decimal("0.9900"),
                ),
                IngestFactRequest(
                    field_name="bl_no",
                    field_value="HLCUSHA250601234",
                    normalized_value="HLCUSHA250601234",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="B/L No: HLCUSHA250601234",
                    document_type="arrival_notice",
                    confidence=Decimal("0.9800"),
                    attachment_filename="arrival_notice_mscu1234567_v1.pdf",
                ),
                IngestFactRequest(
                    field_name="eta",
                    field_value="2026-06-12",
                    normalized_value="2026-06-12",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="ETA: 2026-06-12",
                    document_type="arrival_notice",
                    confidence=Decimal("0.9800"),
                    attachment_filename="arrival_notice_mscu1234567_v1.pdf",
                ),
                IngestFactRequest(
                    field_name="status_text",
                    field_value="Arrival Notice received",
                    normalized_value="Arrival Notice received",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="Status: Arrival Notice received",
                    document_type="arrival_notice",
                    confidence=Decimal("0.9600"),
                    attachment_filename="arrival_notice_mscu1234567_v1.pdf",
                ),
            ],
        ),
        ProcessedEmailIngestRequest(
            gmail_connection_id=gmail_connection_id,
            sync_job_id=sync_job_id,
            gmail_message_id="demo-msg-003",
            gmail_thread_id="demo-thread-001",
            subject="Revised Arrival Notice - MSCU1234567 - ETA 2026-06-14",
            from_email="arrival@maersk-demo.com",
            to_emails=["cs@agentify.vn"],
            sent_at=_dt("2026-06-09T05:10:00Z"),
            snippet="ETA updated to 14 Jun for MSCU1234567.",
            body_text="ETA revised due to port congestion.",
            raw_labels=["INBOX", "ARRIVAL"],
            has_pdf_attachments=True,
            attachments=[
                IngestAttachmentRequest(
                    gmail_attachment_id="demo-att-003",
                    filename="arrival_notice_mscu1234567_v2.pdf",
                    mime_type="application/pdf",
                    size_bytes=149_882,
                    storage_path="/demo/arrival_notice_mscu1234567_v2.pdf",
                    is_text_pdf=True,
                    text_extract_status="extracted",
                    extracted_text=(
                        "Container No: MSCU1234567\n"
                        "ETA revised: 2026-06-14\n"
                        "Status: ETA revised due to congestion"
                    ),
                    document_type="arrival_notice",
                )
            ],
            extracted_facts=[
                IngestFactRequest(
                    field_name="container_no",
                    field_value="MSCU1234567",
                    normalized_value="MSCU1234567",
                    container_no="MSCU1234567",
                    source_type="email_subject",
                    source_label="Revised Arrival Notice - MSCU1234567 - ETA 2026-06-14",
                    document_type="arrival_notice",
                    confidence=Decimal("0.9900"),
                ),
                IngestFactRequest(
                    field_name="eta",
                    field_value="2026-06-14",
                    normalized_value="2026-06-14",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="ETA revised: 2026-06-14",
                    document_type="arrival_notice",
                    confidence=Decimal("0.9800"),
                    attachment_filename="arrival_notice_mscu1234567_v2.pdf",
                ),
                IngestFactRequest(
                    field_name="status_text",
                    field_value="ETA revised due to congestion",
                    normalized_value="ETA revised due to congestion",
                    container_no="MSCU1234567",
                    source_type="pdf_text",
                    source_label="Status: ETA revised due to congestion",
                    document_type="arrival_notice",
                    confidence=Decimal("0.9700"),
                    attachment_filename="arrival_notice_mscu1234567_v2.pdf",
                ),
            ],
        ),
        ProcessedEmailIngestRequest(
            gmail_connection_id=gmail_connection_id,
            sync_job_id=sync_job_id,
            gmail_message_id="demo-msg-004",
            gmail_thread_id="demo-thread-002",
            subject="Shipping Instruction - TGHU7654321 - PO 450012345",
            from_email="docs@shipper-demo.com",
            to_emails=["docs@agentify.vn"],
            sent_at=_dt("2026-06-07T01:25:00Z"),
            snippet="Shipping instruction for TGHU7654321.",
            body_text="Please process SI for container TGHU7654321.",
            raw_labels=["INBOX", "DOCS"],
            has_pdf_attachments=True,
            attachments=[
                IngestAttachmentRequest(
                    gmail_attachment_id="demo-att-004",
                    filename="shipping_instruction_tghu7654321.pdf",
                    mime_type="application/pdf",
                    size_bytes=175_320,
                    storage_path="/demo/shipping_instruction_tghu7654321.pdf",
                    is_text_pdf=True,
                    text_extract_status="extracted",
                    extracted_text=(
                        "Container: TGHU7654321\n"
                        "PO No: 450012345\n"
                        "Booking No: BKG-99100\n"
                        "POL: Ningbo\n"
                        "POD: Ho Chi Minh\n"
                        "Vessel/Voyage: ONE FOCUS / 019S"
                    ),
                    document_type="shipping_instruction",
                )
            ],
            extracted_facts=[
                IngestFactRequest(
                    field_name="container_no",
                    field_value="TGHU7654321",
                    normalized_value="TGHU7654321",
                    container_no="TGHU7654321",
                    source_type="email_subject",
                    source_label="Shipping Instruction - TGHU7654321 - PO 450012345",
                    document_type="shipping_instruction",
                    confidence=Decimal("0.9900"),
                ),
                IngestFactRequest(
                    field_name="po_no",
                    field_value="450012345",
                    normalized_value="450012345",
                    container_no="TGHU7654321",
                    source_type="pdf_text",
                    source_label="PO No: 450012345",
                    document_type="shipping_instruction",
                    confidence=Decimal("0.9800"),
                    attachment_filename="shipping_instruction_tghu7654321.pdf",
                ),
                IngestFactRequest(
                    field_name="booking_no",
                    field_value="BKG-99100",
                    normalized_value="BKG-99100",
                    container_no="TGHU7654321",
                    source_type="pdf_text",
                    source_label="Booking No: BKG-99100",
                    document_type="shipping_instruction",
                    confidence=Decimal("0.9700"),
                    attachment_filename="shipping_instruction_tghu7654321.pdf",
                ),
                IngestFactRequest(
                    field_name="pol",
                    field_value="Ningbo",
                    normalized_value="Ningbo",
                    container_no="TGHU7654321",
                    source_type="pdf_text",
                    source_label="POL: Ningbo",
                    document_type="shipping_instruction",
                    confidence=Decimal("0.9700"),
                    attachment_filename="shipping_instruction_tghu7654321.pdf",
                ),
                IngestFactRequest(
                    field_name="pod",
                    field_value="Ho Chi Minh",
                    normalized_value="Ho Chi Minh",
                    container_no="TGHU7654321",
                    source_type="pdf_text",
                    source_label="POD: Ho Chi Minh",
                    document_type="shipping_instruction",
                    confidence=Decimal("0.9700"),
                    attachment_filename="shipping_instruction_tghu7654321.pdf",
                ),
                IngestFactRequest(
                    field_name="vessel",
                    field_value="ONE FOCUS",
                    normalized_value="ONE FOCUS",
                    container_no="TGHU7654321",
                    source_type="pdf_text",
                    source_label="Vessel/Voyage: ONE FOCUS / 019S",
                    document_type="shipping_instruction",
                    confidence=Decimal("0.9700"),
                    attachment_filename="shipping_instruction_tghu7654321.pdf",
                ),
                IngestFactRequest(
                    field_name="voyage",
                    field_value="019S",
                    normalized_value="019S",
                    container_no="TGHU7654321",
                    source_type="pdf_text",
                    source_label="Vessel/Voyage: ONE FOCUS / 019S",
                    document_type="shipping_instruction",
                    confidence=Decimal("0.9700"),
                    attachment_filename="shipping_instruction_tghu7654321.pdf",
                ),
                IngestFactRequest(
                    field_name="status_text",
                    field_value="Shipping instruction received",
                    normalized_value="Shipping instruction received",
                    container_no="TGHU7654321",
                    source_type="email_body",
                    source_label="Please process SI for container TGHU7654321.",
                    document_type="shipping_instruction",
                    confidence=Decimal("0.9400"),
                ),
            ],
        ),
        ProcessedEmailIngestRequest(
            gmail_connection_id=gmail_connection_id,
            sync_job_id=sync_job_id,
            gmail_message_id="demo-msg-005",
            gmail_thread_id="demo-thread-002",
            subject="Draft BL - TGHU7654321 - BL OOLUNB26060077",
            from_email="docs@carrier-demo.com",
            to_emails=["docs@agentify.vn"],
            sent_at=_dt("2026-06-08T10:55:00Z"),
            snippet="Draft BL attached for TGHU7654321.",
            body_text="Draft BL for review.",
            raw_labels=["INBOX", "DOCS"],
            has_pdf_attachments=True,
            attachments=[
                IngestAttachmentRequest(
                    gmail_attachment_id="demo-att-005",
                    filename="draft_bl_tghu7654321.pdf",
                    mime_type="application/pdf",
                    size_bytes=196_480,
                    storage_path="/demo/draft_bl_tghu7654321.pdf",
                    is_text_pdf=True,
                    text_extract_status="extracted",
                    extracted_text=(
                        "Container No: TGHU7654321\n"
                        "B/L No: OOLUNB26060077\n"
                        "Seal No: SL998821\n"
                        "ETD: 2026-06-10\n"
                        "ETA: 2026-06-15"
                    ),
                    document_type="draft_bl",
                )
            ],
            extracted_facts=[
                IngestFactRequest(
                    field_name="container_no",
                    field_value="TGHU7654321",
                    normalized_value="TGHU7654321",
                    container_no="TGHU7654321",
                    source_type="email_subject",
                    source_label="Draft BL - TGHU7654321 - BL OOLUNB26060077",
                    document_type="draft_bl",
                    confidence=Decimal("0.9900"),
                ),
                IngestFactRequest(
                    field_name="bl_no",
                    field_value="OOLUNB26060077",
                    normalized_value="OOLUNB26060077",
                    container_no="TGHU7654321",
                    source_type="pdf_text",
                    source_label="B/L No: OOLUNB26060077",
                    document_type="draft_bl",
                    confidence=Decimal("0.9800"),
                    attachment_filename="draft_bl_tghu7654321.pdf",
                ),
                IngestFactRequest(
                    field_name="seal_no",
                    field_value="SL998821",
                    normalized_value="SL998821",
                    container_no="TGHU7654321",
                    source_type="pdf_text",
                    source_label="Seal No: SL998821",
                    document_type="draft_bl",
                    confidence=Decimal("0.9700"),
                    attachment_filename="draft_bl_tghu7654321.pdf",
                ),
                IngestFactRequest(
                    field_name="etd",
                    field_value="2026-06-10",
                    normalized_value="2026-06-10",
                    container_no="TGHU7654321",
                    source_type="pdf_text",
                    source_label="ETD: 2026-06-10",
                    document_type="draft_bl",
                    confidence=Decimal("0.9700"),
                    attachment_filename="draft_bl_tghu7654321.pdf",
                ),
                IngestFactRequest(
                    field_name="eta",
                    field_value="2026-06-15",
                    normalized_value="2026-06-15",
                    container_no="TGHU7654321",
                    source_type="pdf_text",
                    source_label="ETA: 2026-06-15",
                    document_type="draft_bl",
                    confidence=Decimal("0.9700"),
                    attachment_filename="draft_bl_tghu7654321.pdf",
                ),
                IngestFactRequest(
                    field_name="status_text",
                    field_value="Draft BL received",
                    normalized_value="Draft BL received",
                    container_no="TGHU7654321",
                    source_type="email_body",
                    source_label="Draft BL for review.",
                    document_type="draft_bl",
                    confidence=Decimal("0.9400"),
                ),
            ],
        ),
        ProcessedEmailIngestRequest(
            gmail_connection_id=gmail_connection_id,
            sync_job_id=sync_job_id,
            gmail_message_id="demo-msg-006",
            gmail_thread_id="demo-thread-003",
            subject="Delivery Order Release - OOLU9988776",
            from_email="release@forwarder-demo.com",
            to_emails=["account@agentify.vn"],
            sent_at=_dt("2026-06-08T13:20:00Z"),
            snippet="Delivery order released for OOLU9988776.",
            body_text="Delivery order released after payment confirmation.",
            raw_labels=["INBOX", "RELEASE"],
            has_pdf_attachments=True,
            attachments=[
                IngestAttachmentRequest(
                    gmail_attachment_id="demo-att-006",
                    filename="delivery_order_oolu9988776.pdf",
                    mime_type="application/pdf",
                    size_bytes=126_940,
                    storage_path="/demo/delivery_order_oolu9988776.pdf",
                    is_text_pdf=True,
                    text_extract_status="extracted",
                    extracted_text=(
                        "Container No: OOLU9988776\n"
                        "Booking No: BKG-55678\n"
                        "B/L No: EMCNSZX26061199\n"
                        "POD: Cat Lai\n"
                        "Status: Delivery order released"
                    ),
                    document_type="delivery_order",
                )
            ],
            extracted_facts=[
                IngestFactRequest(
                    field_name="container_no",
                    field_value="OOLU9988776",
                    normalized_value="OOLU9988776",
                    container_no="OOLU9988776",
                    source_type="email_subject",
                    source_label="Delivery Order Release - OOLU9988776",
                    document_type="delivery_order",
                    confidence=Decimal("0.9900"),
                ),
                IngestFactRequest(
                    field_name="booking_no",
                    field_value="BKG-55678",
                    normalized_value="BKG-55678",
                    container_no="OOLU9988776",
                    source_type="pdf_text",
                    source_label="Booking No: BKG-55678",
                    document_type="delivery_order",
                    confidence=Decimal("0.9700"),
                    attachment_filename="delivery_order_oolu9988776.pdf",
                ),
                IngestFactRequest(
                    field_name="bl_no",
                    field_value="EMCNSZX26061199",
                    normalized_value="EMCNSZX26061199",
                    container_no="OOLU9988776",
                    source_type="pdf_text",
                    source_label="B/L No: EMCNSZX26061199",
                    document_type="delivery_order",
                    confidence=Decimal("0.9700"),
                    attachment_filename="delivery_order_oolu9988776.pdf",
                ),
                IngestFactRequest(
                    field_name="pod",
                    field_value="Cat Lai",
                    normalized_value="Cat Lai",
                    container_no="OOLU9988776",
                    source_type="pdf_text",
                    source_label="POD: Cat Lai",
                    document_type="delivery_order",
                    confidence=Decimal("0.9600"),
                    attachment_filename="delivery_order_oolu9988776.pdf",
                ),
                IngestFactRequest(
                    field_name="status_text",
                    field_value="Delivery order released",
                    normalized_value="Delivery order released",
                    container_no="OOLU9988776",
                    source_type="pdf_text",
                    source_label="Status: Delivery order released",
                    document_type="delivery_order",
                    confidence=Decimal("0.9600"),
                    attachment_filename="delivery_order_oolu9988776.pdf",
                ),
            ],
        ),
    ]

    for payload in payloads:
        for attachment in payload.attachments:
            attachment.storage_path, attachment.size_bytes = _materialize_demo_pdf(
                attachment.filename,
                attachment.extracted_text,
            )

    return payloads


async def _get_or_create_demo_connection(session) -> GmailConnection:
    result = await session.execute(
        text(
            """
            SELECT id
            FROM gmail_connections
            WHERE account_email = :account_email
            LIMIT 1
            """
        ),
        {"account_email": DEMO_ACCOUNT_EMAIL},
    )
    row = result.first()
    if row:
        connection = await session.get(GmailConnection, row.id)
        assert connection is not None
        connection.display_name = DEMO_DISPLAY_NAME
        connection.google_account_id = DEMO_GOOGLE_ACCOUNT_ID
        connection.status = "connected"
        connection.access_scope = "gmail.readonly"
        connection.encrypted_refresh_token = "demo-refresh-token"
        connection.sync_cursor = "demo-history-id-20260608"
        connection.extra_metadata = {"seeded_by": "seed_demo_data.py"}
        return connection

    connection = GmailConnection(
        account_email=DEMO_ACCOUNT_EMAIL,
        display_name=DEMO_DISPLAY_NAME,
        google_account_id=DEMO_GOOGLE_ACCOUNT_ID,
        encrypted_refresh_token="demo-refresh-token",
        access_scope="gmail.readonly",
        status="connected",
        sync_cursor="demo-history-id-20260608",
        extra_metadata={"seeded_by": "seed_demo_data.py"},
    )
    session.add(connection)
    await session.flush()
    return connection


async def _create_sync_jobs(
    session,
    gmail_connection_id: UUID,
    email_count: int,
    attachment_count: int,
    container_count: int,
) -> tuple[SyncJob, SyncJob]:
    completed_job = SyncJob(
        gmail_connection_id=gmail_connection_id,
        query="label:LOGISTICS newer_than:30d",
        max_results=200,
        status="completed",
        emails_fetched=email_count,
        attachments_found=attachment_count,
        pdf_text_extracted=attachment_count,
        containers_upserted=container_count,
        started_at=_dt("2026-06-08T03:00:00Z"),
        completed_at=_dt("2026-06-08T03:02:30Z"),
    )
    queued_job = SyncJob(
        gmail_connection_id=gmail_connection_id,
        query="label:LOGISTICS newer_than:7d",
        max_results=100,
        status="queued",
        emails_fetched=0,
        attachments_found=0,
        pdf_text_extracted=0,
        containers_upserted=0,
    )
    session.add_all([completed_job, queued_job])
    await session.flush()
    return completed_job, queued_job


async def _truncate_all(session) -> None:
    await session.execute(
        text(
            "TRUNCATE TABLE "
            "container_facts, attachments, emails, sync_jobs, gmail_connections, containers "
            "RESTART IDENTITY CASCADE"
        )
    )


async def _delete_demo_only(session) -> None:
    await session.execute(
        text(
            """
            DELETE FROM container_facts
            WHERE email_id IN (
                SELECT id FROM emails WHERE gmail_message_id LIKE 'demo-msg-%'
            )
            """
        )
    )
    await session.execute(
        text(
            """
            DELETE FROM attachments
            WHERE email_id IN (
                SELECT id FROM emails WHERE gmail_message_id LIKE 'demo-msg-%'
            )
            """
        )
    )
    await session.execute(
        text("DELETE FROM emails WHERE gmail_message_id LIKE 'demo-msg-%'")
    )
    await session.execute(
        text(
            """
            DELETE FROM sync_jobs
            WHERE gmail_connection_id IN (
                SELECT id FROM gmail_connections
                WHERE account_email = :account_email
            )
            """
        )
        ,
        {"account_email": DEMO_ACCOUNT_EMAIL},
    )
    await session.execute(
        text("DELETE FROM gmail_connections WHERE account_email = :account_email"),
        {"account_email": DEMO_ACCOUNT_EMAIL},
    )
    await session.execute(
        text(
            """
            DELETE FROM containers
            WHERE container_no = ANY(:container_nos)
            """
        )
        ,
        {"container_nos": ["MSCU1234567", "TGHU7654321", "OOLU9988776"]},
    )


async def seed_demo_data(truncate: bool) -> dict[str, int]:
    async with AsyncSessionLocal() as session:
        if truncate:
            await _truncate_all(session)
        else:
            await _delete_demo_only(session)

        connection = await _get_or_create_demo_connection(session)
        payloads = build_demo_payloads(connection.id, UUID(int=0))
        completed_job, _ = await _create_sync_jobs(
            session,
            connection.id,
            email_count=len(payloads),
            attachment_count=sum(len(payload.attachments) for payload in payloads),
            container_count=3,
        )

        for payload in payloads:
            payload.sync_job_id = completed_job.id
            await ingest_processed_email(session, payload)

        connection.last_synced_at = _dt("2026-06-08T03:02:30Z")
        await session.commit()

        return {
            "gmail_connections": 1,
            "sync_jobs": 2,
            "emails": len(payloads),
            "attachments": sum(len(payload.attachments) for payload in payloads),
            "containers": 3,
            "container_facts": sum(len(payload.extracted_facts) for payload in payloads),
        }


def main() -> None:
    parser = argparse.ArgumentParser(description="Seed demo logistics data.")
    parser.add_argument(
        "--truncate",
        action="store_true",
        help="Truncate all prototype tables before inserting demo data.",
    )
    args = parser.parse_args()
    summary = asyncio.run(seed_demo_data(truncate=args.truncate))
    for key, value in summary.items():
        print(f"{key}: {value}")


if __name__ == "__main__":
    main()
