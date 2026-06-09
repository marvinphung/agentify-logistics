from gmail_service.models import ExtractedRecord
from gmail_service.pipeline import process_pdf_attachment
from gmail_service.runner import run_once


def run_gmail_intake_once() -> list[dict]:
    return run_once()


def process_gmail_pdf_attachment(
    email: dict[str, str], filename: str, pdf_bytes: bytes
) -> ExtractedRecord:
    return process_pdf_attachment(email, filename, pdf_bytes)
