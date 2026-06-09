from datetime import datetime
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models import CreateSyncJobRequest, UpdateSyncJobRequest
from db.models import GmailConnection, SyncJob


async def create_sync_job(db: AsyncSession, payload: CreateSyncJobRequest) -> SyncJob:
    connection = await db.get(GmailConnection, payload.gmail_connection_id)
    if connection is None:
        raise ValueError("Gmail connection not found")

    job = SyncJob(
        gmail_connection_id=payload.gmail_connection_id,
        query=payload.query,
        date_from=payload.date_from,
        date_to=payload.date_to,
        max_results=payload.max_results,
        status="queued",
    )
    db.add(job)
    await db.flush()
    return job


async def update_sync_job(
    db: AsyncSession, job_id: UUID, payload: UpdateSyncJobRequest
) -> SyncJob | None:
    job = await db.get(SyncJob, job_id)
    if job is None:
        return None

    for field_name, value in payload.model_dump(exclude_unset=True).items():
        setattr(job, field_name, value)

    if payload.status == "running" and job.started_at is None:
        job.started_at = payload.started_at or datetime.utcnow()
    if payload.status in {"completed", "failed"} and job.completed_at is None:
        job.completed_at = payload.completed_at or datetime.utcnow()

    await db.flush()
    return job


async def get_sync_job(db: AsyncSession, job_id: UUID) -> SyncJob | None:
    return await db.get(SyncJob, job_id)


async def list_sync_jobs(
    db: AsyncSession,
    gmail_connection_id: UUID | None,
    page: int,
    page_size: int,
) -> tuple[list[SyncJob], int]:
    stmt = select(SyncJob)
    count_stmt = select(func.count(SyncJob.id))

    if gmail_connection_id is not None:
        stmt = stmt.where(SyncJob.gmail_connection_id == gmail_connection_id)
        count_stmt = count_stmt.where(SyncJob.gmail_connection_id == gmail_connection_id)

    stmt = (
        stmt.order_by(SyncJob.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    result = await db.execute(stmt)
    total_result = await db.execute(count_stmt)
    return list(result.scalars().all()), total_result.scalar_one()


async def get_latest_completed_sync_job(db: AsyncSession) -> SyncJob | None:
    result = await db.execute(
        select(SyncJob)
        .where(SyncJob.status == "completed")
        .order_by(SyncJob.completed_at.desc().nullslast(), SyncJob.created_at.desc())
        .limit(1)
    )
    return result.scalar_one_or_none()
