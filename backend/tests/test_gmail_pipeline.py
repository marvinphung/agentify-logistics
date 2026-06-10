import unittest
from datetime import UTC, datetime
from unittest.mock import patch

from gmail_service.pipeline import process_text_content


class GmailPipelineTest(unittest.TestCase):
    def test_process_text_content_normalizes_received_at_datetime(self) -> None:
        sent_at = datetime(2026, 6, 10, 9, 12, tzinfo=UTC)

        with patch(
            "gmail_service.pipeline.extract_fields",
            return_value={
                "doc_type": "other",
                "doc_type_confidence": 0.5,
                "identifiers": {},
                "route": {},
            },
        ):
            record = process_text_content(
                {
                    "message_id": "msg-001",
                    "sender": "ops@carrier.com",
                    "subject": "Delivery update",
                    "received_at": sent_at,
                },
                "email_body",
                "Container no: TCKU1234567",
            )

        self.assertEqual(record.source.received_at, sent_at.isoformat())

    def test_process_text_content_records_extraction_error(self) -> None:
        with patch(
            "gmail_service.pipeline.extract_fields",
            side_effect=RuntimeError("429 RESOURCE_EXHAUSTED"),
        ):
            record = process_text_content(
                {
                    "message_id": "msg-002",
                    "sender": "ops@carrier.com",
                    "subject": "Booking note",
                    "received_at": "2026-06-10T09:12:00+00:00",
                },
                "booking_note.pdf",
                "Booking No: OOL-BKG-260609",
            )

        self.assertEqual(record.extraction_status, "failed")
        self.assertEqual(record.extraction_error, "429 RESOURCE_EXHAUSTED")


if __name__ == "__main__":
    unittest.main()
