from pydantic import BaseModel


class CORSConfig(BaseModel):
    allow_ips: list[str] | None
    allow_origins: list[str] | None
    allow_origins_regex: str | None


class APIKeyConfig(BaseModel):
    name: str
    value: str


class AuthenticationConfig(BaseModel):
    api_key: APIKeyConfig
    cors: CORSConfig


class DatabasePoolConfig(BaseModel):
    size: int
    max_overflow: int
    timeout: int
    recycle: int


class PostgresConfig(BaseModel):
    url: str
    pool: DatabasePoolConfig


class DatabaseConfig(BaseModel):
    postgres: PostgresConfig


class AppConfig(BaseModel):
    name: str
    title: str
    description: str
    proxy_root_path: str = ""
    uvicorn_logging_format: str


class RootConfig(BaseModel):
    authentication: AuthenticationConfig
    databases: DatabaseConfig
    app: AppConfig
