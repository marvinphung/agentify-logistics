from pydantic import BaseModel

from config import root_config


class AuthConfig(BaseModel):
    API_KEY_NAME: str = root_config.authentication.api_key.name
    API_KEY_VALUE: str = root_config.authentication.api_key.value
    ALLOW_ORIGINS: list[str] = root_config.authentication.cors.allow_origins or []
    ALLOW_ORIGINS_REGEX: str | None = (
        root_config.authentication.cors.allow_origins_regex
    )
