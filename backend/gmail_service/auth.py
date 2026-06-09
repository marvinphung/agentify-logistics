import os

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

from gmail_service.config import (
    GMAIL_AUTH_PORT,
    GMAIL_CREDENTIALS_FILE,
    GMAIL_TOKEN_FILE,
)

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]


def get_gmail_service():
    creds = None
    if os.path.exists(GMAIL_TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(GMAIL_TOKEN_FILE, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                GMAIL_CREDENTIALS_FILE, SCOPES
            )
            creds = flow.run_local_server(port=GMAIL_AUTH_PORT, open_browser=False)
        with open(GMAIL_TOKEN_FILE, "w", encoding="utf-8") as token_file:
            token_file.write(creds.to_json())
    return build("gmail", "v1", credentials=creds)
