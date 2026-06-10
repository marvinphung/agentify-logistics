import json
from typing import Any

from gmail_service.config import (
    GMAIL_CREDENTIALS_FILE,
    GMAIL_REDIRECT_URI,
)

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]


def build_authorization_url(state: str) -> str:
    from google_auth_oauthlib.flow import Flow

    flow = Flow.from_client_config(
        _load_client_config(),
        scopes=SCOPES,
        state=state,
        redirect_uri=GMAIL_REDIRECT_URI,
    )
    authorization_url, _ = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        prompt="consent",
    )
    return authorization_url


def exchange_code_for_tokens(code: str, state: str) -> dict[str, Any]:
    from google_auth_oauthlib.flow import Flow

    flow = Flow.from_client_config(
        _load_client_config(),
        scopes=SCOPES,
        state=state,
        redirect_uri=GMAIL_REDIRECT_URI,
    )
    flow.fetch_token(code=code)
    credentials = flow.credentials
    return {
        "refresh_token": credentials.refresh_token,
        "access_token": credentials.token,
        "scopes": list(credentials.scopes or []),
    }


def get_gmail_service(refresh_token: str):
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build

    creds = _build_credentials(refresh_token)
    if not creds.valid:
        creds.refresh(Request())
    return build("gmail", "v1", credentials=creds)


def get_gmail_profile(refresh_token: str) -> dict[str, Any]:
    service = get_gmail_service(refresh_token)
    return service.users().getProfile(userId="me").execute()


def _build_credentials(refresh_token: str):
    from google.oauth2.credentials import Credentials

    oauth_config = _get_oauth_section()
    return Credentials(
        token=None,
        refresh_token=refresh_token,
        token_uri=oauth_config["token_uri"],
        client_id=oauth_config["client_id"],
        client_secret=oauth_config["client_secret"],
        scopes=SCOPES,
    )


def _load_client_config() -> dict[str, Any]:
    with open(GMAIL_CREDENTIALS_FILE, "r", encoding="utf-8") as credentials_file:
        return json.load(credentials_file)


def _get_oauth_section() -> dict[str, Any]:
    config = _load_client_config()
    if "installed" in config:
        return config["installed"]
    if "web" in config:
        return config["web"]
    raise ValueError("Unsupported Google OAuth credentials format")
