from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.models import (
    GmailConnectionResponse,
    GmailConnectionUpsertRequest,
)
from db.database import get_db
from services.gmail_connection_service import (
    list_gmail_connections,
    upsert_gmail_connection,
)

router = APIRouter(prefix="/api/v1/gmail-connections", tags=["gmail-connections"])


@router.get("", response_model=list[GmailConnectionResponse])
async def get_gmail_connections(
    db: AsyncSession = Depends(get_db),
) -> list[GmailConnectionResponse]:
    return await list_gmail_connections(db)


@router.post("", response_model=GmailConnectionResponse)
async def create_or_update_gmail_connection(
    payload: GmailConnectionUpsertRequest,
    db: AsyncSession = Depends(get_db),
) -> GmailConnectionResponse:
    return await upsert_gmail_connection(db, payload)
