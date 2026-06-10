from datetime import UTC, datetime
from types import SimpleNamespace
from unittest import IsolatedAsyncioTestCase
from unittest.mock import AsyncMock
from uuid import uuid4

from api.models import UpdateSyncJobRequest
from services.sync_job_service import update_sync_job


class UpdateSyncJobTest(IsolatedAsyncioTestCase):
    async def test_update_sync_job_refreshes_job_before_returning(self) -> None:
        job = SimpleNamespace(
            id=uuid4(),
            status="queued",
            started_at=None,
            completed_at=None,
            emails_fetched=0,
        )
        db = AsyncMock()
        db.get.return_value = job

        result = await update_sync_job(
            db,
            job.id,
            UpdateSyncJobRequest(
                status="running",
                started_at=datetime(2026, 6, 10, 8, 30, tzinfo=UTC),
                emails_fetched=12,
            ),
        )

        self.assertIs(result, job)
        self.assertEqual(result.status, "running")
        self.assertEqual(result.emails_fetched, 12)
        db.refresh.assert_awaited_once_with(job)
