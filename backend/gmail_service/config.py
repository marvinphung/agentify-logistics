from config.settings import Configs

settings = Configs.get_gmail_service_config()

GEMINI_API_KEY = settings.GEMINI_API_KEY
GEMINI_MODEL = settings.GEMINI_MODEL
GMAIL_CREDENTIALS_FILE = settings.GMAIL_CREDENTIALS_FILE
GMAIL_TOKEN_FILE = settings.GMAIL_TOKEN_FILE
GMAIL_AUTH_PORT = settings.GMAIL_AUTH_PORT
GMAIL_QUERY = settings.QUERY
STATE_FILE = settings.STATE_FILE
