from typing import Any

from config import root_config

postgres = root_config.databases.postgres
pool = postgres.pool


class BaseConfig:
    @staticmethod
    def _check_none(value: Any) -> Any:
        if value is None:
            raise ValueError("Value cannot be None")
        return value


class PostgresDatabaseConfig(BaseConfig):
    def __init__(self):
        self.URL: str = self._check_none(postgres.url)
        self.SYNC_URL: str = self._to_sync_url(self.URL)
        self.ASYNC_URL: str = self._to_async_url(self.URL)
        self.POOL_SIZE: int = pool.size
        self.MAX_OVERFLOW: int = pool.max_overflow
        self.TIMEOUT: int = pool.timeout
        self.RECYCLE: int = pool.recycle

    @staticmethod
    def _to_sync_url(url: str) -> str:
        if "+psycopg" in url:
            return url
        if "+asyncpg" in url:
            return url.replace("+asyncpg", "+psycopg")
        return url.replace("postgresql://", "postgresql+psycopg://", 1)

    @staticmethod
    def _to_async_url(url: str) -> str:
        if "+asyncpg" in url:
            return url
        if "+psycopg" in url:
            return url.replace("+psycopg", "+asyncpg")
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
