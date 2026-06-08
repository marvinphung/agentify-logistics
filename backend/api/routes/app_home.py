from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.models import AppHomeResponse
from db.database import get_db
from services.app_home_service import build_app_home_payload

router = APIRouter(prefix="/api/v1/app-home", tags=["app-home"])


@router.get("", response_model=AppHomeResponse)
async def get_app_home(
    db: AsyncSession = Depends(get_db),
) -> AppHomeResponse:
    return await build_app_home_payload(db)
