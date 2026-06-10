from pydantic import BaseModel, Field


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


class GmailOAuthConfig(BaseModel):
    credentials_file: str = "credentials.json"
    redirect_uri: str = "http://localhost:8766/api/v1/gmail-connections/oauth/callback"
    frontend_return_url: str = "http://localhost:5173/setup"


class GeminiExtractionConfig(BaseModel):
    api_key: str = ""
    model: str = "gemini-2.0-flash"


class GmailServiceConfig(BaseModel):
    query: str = "has:attachment newer_than:7d"
    state_file: str = "processed.json"
    oauth: GmailOAuthConfig = Field(default_factory=GmailOAuthConfig)
    extraction: GeminiExtractionConfig = Field(default_factory=GeminiExtractionConfig)


class RootConfig(BaseModel):
    authentication: AuthenticationConfig
    databases: DatabaseConfig
    app: AppConfig
    gmail_service: GmailServiceConfig = Field(default_factory=GmailServiceConfig)
