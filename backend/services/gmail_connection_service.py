from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models import GmailConnectionUpsertRequest
from db.models import GmailConnection


async def upsert_gmail_connection(
    db: AsyncSession, payload: GmailConnectionUpsertRequest
) -> GmailConnection:
    result = await db.execute(
        select(GmailConnection).where(
            GmailConnection.account_email == payload.account_email
        )
    )
    connection = result.scalar_one_or_none()
    if connection is None:
        connection = GmailConnection(
            account_email=payload.account_email,
            display_name=payload.display_name,
            google_account_id=payload.google_account_id,
            encrypted_refresh_token=payload.encrypted_refresh_token,
            access_scope=payload.access_scope,
            status=payload.status,
        )
        db.add(connection)
        await db.flush()
        return connection

    connection.display_name = payload.display_name
    connection.google_account_id = payload.google_account_id
    connection.encrypted_refresh_token = payload.encrypted_refresh_token
    connection.access_scope = payload.access_scope
    connection.status = payload.status
    await db.flush()
    return connection


async def list_gmail_connections(db: AsyncSession) -> list[GmailConnection]:
    result = await db.execute(
        select(GmailConnection).order_by(GmailConnection.created_at.desc())
    )
    return list(result.scalars().all())
