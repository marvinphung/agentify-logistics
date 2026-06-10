import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.config import Configs as APIConfig
from config.settings import auth_config, app_config

app = FastAPI(
    root_path=app_config.PROXY_ROOT_PATH,
    title=app_config.TITLE,
    description=app_config.DESCRIPTION,
    openapi_tags=APIConfig.get_tags_metadata(),
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=auth_config.ALLOW_ORIGINS,
    allow_origin_regex=auth_config.ALLOW_ORIGINS_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.getLogger("uvicorn.access").setLevel(logging.INFO)
logger = logging.getLogger(__name__)
