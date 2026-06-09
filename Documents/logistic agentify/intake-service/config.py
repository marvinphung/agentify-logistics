import os

from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

GMAIL_CREDENTIALS_FILE = os.getenv("GMAIL_CREDENTIALS_FILE", "credentials.json")
GMAIL_TOKEN_FILE = os.getenv("GMAIL_TOKEN_FILE", "token.json")
GMAIL_AUTH_PORT = int(os.getenv("GMAIL_AUTH_PORT", "8080"))
GMAIL_QUERY = os.getenv("GMAIL_QUERY", "has:attachment newer_than:7d")

STATE_FILE = os.getenv("STATE_FILE", "processed.json")
POLL_INTERVAL = int(os.getenv("POLL_INTERVAL", "300"))
