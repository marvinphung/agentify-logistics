from pydantic import BaseModel

from config import root_config

gmail_service = root_config.gmail_service
gmail_oauth = gmail_service.oauth
gemini_extraction = gmail_service.extraction


class GmailServiceConfig(BaseModel):
    QUERY: str = gmail_service.query
    STATE_FILE: str = gmail_service.state_file
    GMAIL_CREDENTIALS_FILE: str = gmail_oauth.credentials_file
    GMAIL_REDIRECT_URI: str = gmail_oauth.redirect_uri
    GMAIL_FRONTEND_RETURN_URL: str = gmail_oauth.frontend_return_url
    GEMINI_API_KEY: str = gemini_extraction.api_key
    GEMINI_MODEL: str = gemini_extraction.model
