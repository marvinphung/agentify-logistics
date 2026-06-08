from pydantic import BaseModel

from config import root_config


class AppConfig(BaseModel):
    NAME: str = root_config.app.name
    TITLE: str = root_config.app.title
    DESCRIPTION: str = root_config.app.description
    PROXY_ROOT_PATH: str = root_config.app.proxy_root_path
    UVICORN_LOGGING_FORMAT: str = root_config.app.uvicorn_logging_format
