import unittest
from uuid import uuid4

from api.models import ProcessedEmailIngestRequest
from scripts.seed_demo_data import build_demo_payloads


class BuildDemoPayloadsTest(unittest.TestCase):
    def test_build_demo_payloads_match_ingest_contract(self) -> None:
        gmail_connection_id = uuid4()
        sync_job_id = uuid4()

        payloads = build_demo_payloads(gmail_connection_id, sync_job_id)

        self.assertEqual(len(payloads), 6)
        self.assertTrue(
            all(isinstance(payload, ProcessedEmailIngestRequest) for payload in payloads)
        )
        self.assertEqual(
            {payload.gmail_connection_id for payload in payloads},
            {gmail_connection_id},
        )
        self.assertEqual({payload.sync_job_id for payload in payloads}, {sync_job_id})
        self.assertEqual(sum(len(payload.attachments) for payload in payloads), 6)
        self.assertTrue(
            any(
                fact.field_name == "eta" and fact.normalized_value == "2026-06-14"
                for payload in payloads
                for fact in payload.extracted_facts
            )
        )
        self.assertEqual(
            {
                fact.container_no
                for payload in payloads
                for fact in payload.extracted_facts
                if fact.container_no
            },
            {"MSCU1234567", "TGHU7654321", "OOLU9988776"},
        )


if __name__ == "__main__":
    unittest.main()
