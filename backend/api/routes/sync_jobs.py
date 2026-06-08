from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from fastapi import Query
from sqlalchemy.ext.asyncio import AsyncSession

from api.dependencies import require_internal_api_key
from api.models import (
    CreateSyncJobRequest,
    SyncJobListResponse,
    SyncJobResponse,
    UpdateSyncJobRequest,
)
from db.database import get_db
from services.sync_job_service import (
    create_sync_job,
    get_sync_job,
    list_sync_jobs,
    update_sync_job,
)

router = APIRouter(prefix="/api/v1/sync-jobs", tags=["sync-jobs"])


@router.get("", response_model=SyncJobListResponse)
async def list_sync_jobs_endpoint(
    gmail_connection_id: UUID | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
) -> SyncJobListResponse:
    items, total = await list_sync_jobs(
        db,
        gmail_connection_id=gmail_connection_id,
        page=page,
        page_size=page_size,
    )
    return SyncJobListResponse(items=items, total=total, page=page, page_size=page_size)


@router.post("", response_model=SyncJobResponse)
async def create_sync_job_endpoint(
    payload: CreateSyncJobRequest,
    db: AsyncSession = Depends(get_db),
) -> SyncJobResponse:
    try:
        return await create_sync_job(db, payload)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.get("/{job_id}", response_model=SyncJobResponse)
async def get_sync_job_endpoint(
    job_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> SyncJobResponse:
    job = await get_sync_job(db, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Sync job not found")
    return job


@router.patch("/{job_id}", response_model=SyncJobResponse)
async def update_sync_job_endpoint(
    job_id: UUID,
    payload: UpdateSyncJobRequest,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(require_internal_api_key),
) -> SyncJobResponse:
    job = await update_sync_job(db, job_id, payload)
    if job is None:
        raise HTTPException(status_code=404, detail="Sync job not found")
    return job
