import unittest
from datetime import UTC, datetime
from uuid import uuid4

from api.models import ProcessedEmailIngestRequest
from gmail_service.adapter import (
    AttachmentExtractionResult,
    GmailAttachmentPayload,
    GmailEmailPayload,
    build_processed_email_request,
)
from gmail_service.models import Cargo, ExtractedRecord, Identifiers, Route, Source


class GmailAdapterTest(unittest.TestCase):
    def test_build_processed_email_request_flattens_gmail_extraction_output(self) -> None:
        gmail_connection_id = uuid4()
        sync_job_id = uuid4()
        sent_at = datetime(2026, 6, 9, 3, 45, tzinfo=UTC)
        email = GmailEmailPayload(
            gmail_message_id="msg-001",
            gmail_thread_id="thread-001",
            subject="Arrival Notice - MSCU1234567",
            from_email="ops@carrier.com",
            to_emails=["cs@agentify.vn"],
            cc_emails=["ops@agentify.vn"],
            sent_at=sent_at,
            snippet="Please find attached arrival notice",
            body_text="Attached is the latest arrival notice for MSCU1234567.",
            body_html="<p>Attached is the latest arrival notice for MSCU1234567.</p>",
            raw_labels=["INBOX"],
            attachments=[
                GmailAttachmentPayload(
                    gmail_attachment_id="att-001",
                    filename="arrival_notice.pdf",
                    mime_type="application/pdf",
                    size_bytes=4096,
                    attachment_bytes=b"%PDF",
                )
            ],
        )
        record = ExtractedRecord(
            source=Source(
                message_id="msg-001",
                sender="ops@carrier.com",
                subject="Arrival Notice - MSCU1234567",
                received_at=sent_at.isoformat(),
                attachment_name="arrival_notice.pdf",
            ),
            doc_type="arrival_notice",
            doc_type_confidence=0.97,
            identifiers=Identifiers(
                container_no=["MSCU1234567"],
                booking_no="BKG-001",
                bl_no="BL-001",
                po_no="PO-001",
                seal_no=["SEAL-01"],
            ),
            route=Route(
                vessel="WAN HAI 517",
                voyage="V12E",
                pol="Shanghai",
                pod="Hai Phong",
                eta="2026-06-12",
                etd="2026-06-10",
            ),
            cargo=Cargo(
                gross_weight_kg=1234.5,
                packages="42 CTNS",
            ),
            extraction_status="ok",
        )

        payload = build_processed_email_request(
            gmail_connection_id=gmail_connection_id,
            sync_job_id=sync_job_id,
            email=email,
            attachment_results=[
                AttachmentExtractionResult(
                    attachment=email.attachments[0],
                    extracted_text="Container No: MSCU1234567",
                    text_extract_status="extracted",
                    record=record,
                )
            ],
        )

        self.assertIsInstance(payload, ProcessedEmailIngestRequest)
        self.assertEqual(payload.gmail_connection_id, gmail_connection_id)
        self.assertEqual(payload.sync_job_id, sync_job_id)
        self.assertEqual(payload.gmail_message_id, "msg-001")
        self.assertTrue(payload.has_pdf_attachments)
        self.assertEqual(len(payload.attachments), 1)
        self.assertEqual(payload.attachments[0].document_type, "arrival_notice")
        self.assertEqual(payload.attachments[0].extracted_text, "Container No: MSCU1234567")

        facts = {
            (fact.field_name, fact.normalized_value, fact.container_no)
            for fact in payload.extracted_facts
        }
        self.assertIn(("container_no", "MSCU1234567", "MSCU1234567"), facts)
        self.assertIn(("booking_no", "BKG-001", "MSCU1234567"), facts)
        self.assertIn(("bl_no", "BL-001", "MSCU1234567"), facts)
        self.assertIn(("eta", "2026-06-12", "MSCU1234567"), facts)
        self.assertIn(("status_text", "arrival_notice", "MSCU1234567"), facts)


if __name__ == "__main__":
    unittest.main()
