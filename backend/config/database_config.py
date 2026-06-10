import os
from typing import Any
from urllib.parse import urlsplit, urlunsplit

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
        self.URL: str = self._normalize_runtime_url(self._check_none(postgres.url))
        self.SYNC_URL: str = self._to_sync_url(self.URL)
        self.ASYNC_URL: str = self._to_async_url(self.URL)
        self.POOL_SIZE: int = pool.size
        self.MAX_OVERFLOW: int = pool.max_overflow
        self.TIMEOUT: int = pool.timeout
        self.RECYCLE: int = pool.recycle

    @staticmethod
    def _normalize_runtime_url(
        url: str,
        *,
        is_docker: bool | None = None,
        docker_host: str | None = None,
    ) -> str:
        docker_runtime = is_docker if is_docker is not None else os.path.exists(
            "/.dockerenv"
        )
        if not docker_runtime:
            return url

        parsed = urlsplit(url)
        if parsed.hostname not in {"localhost", "127.0.0.1", "::1"}:
            return url

        runtime_host = docker_host or os.getenv(
            "DOCKER_HOST_GATEWAY", "host.docker.internal"
        )
        if not runtime_host:
            return url

        credentials = ""
        if parsed.username is not None:
            credentials = parsed.username
            if parsed.password is not None:
                credentials = f"{credentials}:{parsed.password}"
            credentials = f"{credentials}@"

        host = runtime_host
        if ":" in host and not host.startswith("["):
            host = f"[{host}]"

        port = f":{parsed.port}" if parsed.port is not None else ""
        netloc = f"{credentials}{host}{port}"
        return urlunsplit(
            (parsed.scheme, netloc, parsed.path, parsed.query, parsed.fragment)
        )

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
