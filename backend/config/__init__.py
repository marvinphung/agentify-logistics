import logging
import os

import yaml
from dotenv import load_dotenv

from config.models import RootConfig

_ = load_dotenv()

APP_CONFIG_FILE = "app-config.yaml"

logger = logging.getLogger(__name__)


def load_config(app_config_path: str) -> RootConfig:
    full_path_app_config = os.path.abspath(app_config_path)

    if not os.path.exists(full_path_app_config):
        raise FileNotFoundError(
            f"Application configuration file not found: {full_path_app_config}"
        )

    with open(full_path_app_config, "r", encoding="utf-8") as file:
        raw_content = file.read()

    expanded_content = os.path.expandvars(raw_content)
    config = yaml.safe_load(expanded_content)
    validated_config = RootConfig(**config)
    logger.info("Configuration loaded successfully from %s", full_path_app_config)
    return validated_config


config_file = os.path.join(os.path.dirname(__file__), os.pardir, APP_CONFIG_FILE)
root_config = load_config(config_file)
