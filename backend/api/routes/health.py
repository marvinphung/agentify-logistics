from fastapi import APIRouter

from api.models import HealthResponse
from db.database import ping_db

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def healthcheck() -> HealthResponse:
    ok, _error = await ping_db()
    if ok:
        return HealthResponse(status="ok", database="ok")
    return HealthResponse(status="degraded", database="unreachable")
