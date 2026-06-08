from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.dependencies import require_internal_api_key
from api.models import ProcessedEmailIngestRequest, ProcessedEmailIngestResponse
from db.database import get_db
from services.ingestion_service import ingest_processed_email

router = APIRouter(prefix="/api/v1/internal", tags=["internal-ingestion"])


@router.post("/processed-emails", response_model=ProcessedEmailIngestResponse)
async def ingest_processed_email_endpoint(
    payload: ProcessedEmailIngestRequest,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(require_internal_api_key),
) -> ProcessedEmailIngestResponse:
    result = await ingest_processed_email(db, payload)
    return ProcessedEmailIngestResponse(**result)
