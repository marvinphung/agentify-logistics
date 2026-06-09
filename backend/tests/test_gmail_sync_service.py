from datetime import UTC, datetime
from types import SimpleNamespace
from unittest import IsolatedAsyncioTestCase
from unittest.mock import AsyncMock, Mock
from uuid import uuid4

from api.models import ProcessedEmailIngestRequest
from services.gmail_ingestion_service import execute_sync_job


class ExecuteSyncJobTest(IsolatedAsyncioTestCase):
    async def test_execute_sync_job_updates_job_and_connection_from_processed_emails(
        self,
    ) -> None:
        sent_at = datetime(2026, 6, 9, 3, 45, tzinfo=UTC)
        connection = SimpleNamespace(
            id=uuid4(),
            account_email="demo-logistics@agentify.vn",
            encrypted_refresh_token="refresh-token",
            last_synced_at=None,
        )
        job = SimpleNamespace(
            id=uuid4(),
            gmail_connection_id=connection.id,
            query="label:inbox newer_than:7d",
            max_results=25,
            status="queued",
            emails_fetched=0,
            attachments_found=0,
            pdf_text_extracted=0,
            containers_upserted=0,
            error_message=None,
            started_at=None,
            completed_at=None,
        )
        processed_email = ProcessedEmailIngestRequest(
            gmail_connection_id=connection.id,
            sync_job_id=job.id,
            gmail_message_id="msg-001",
            gmail_thread_id="thread-001",
            subject="Arrival Notice - MSCU1234567",
            from_email="ops@carrier.com",
            to_emails=["cs@agentify.vn"],
            sent_at=sent_at,
            has_pdf_attachments=True,
        )

        result = await execute_sync_job(
            db=AsyncMock(),
            connection=connection,
            job=job,
            create_service=Mock(return_value=object()),
            list_message_ids=Mock(return_value=["msg-001"]),
            fetch_email=Mock(return_value={"gmail_message_id": "msg-001"}),
            process_email=Mock(return_value=processed_email),
            ingest_email=AsyncMock(
                return_value={
                    "email_id": uuid4(),
                    "created": True,
                    "attachment_count": 1,
                    "fact_count": 5,
                    "linked_containers": ["MSCU1234567"],
                }
            ),
        )

        self.assertEqual(result.status, "completed")
        self.assertEqual(result.emails_fetched, 1)
        self.assertEqual(result.attachments_found, 1)
        self.assertEqual(result.pdf_text_extracted, 1)
        self.assertEqual(result.containers_upserted, 1)
        self.assertIsNotNone(result.started_at)
        self.assertIsNotNone(result.completed_at)
        self.assertEqual(connection.last_synced_at, result.completed_at)
