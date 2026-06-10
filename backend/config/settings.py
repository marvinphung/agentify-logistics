from config.app import AppConfig
from config.auth import AuthConfig
from config.database_config import PostgresDatabaseConfig
from config.gmail_config import GmailServiceConfig

app_config = AppConfig()
auth_config = AuthConfig()
postgres_config = PostgresDatabaseConfig()
gmail_service_config = GmailServiceConfig()


class Configs:
    @staticmethod
    def get_app_config() -> AppConfig:
        return app_config

    @staticmethod
    def get_auth_config() -> AuthConfig:
        return auth_config

    @staticmethod
    def get_postgres_config() -> PostgresDatabaseConfig:
        return postgres_config

    @staticmethod
    def get_gmail_service_config() -> GmailServiceConfig:
        return gmail_service_config
