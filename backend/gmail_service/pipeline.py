from gmail_service.field_extract import extract_fields
from gmail_service.models import ExtractedRecord, Source
from gmail_service.pdf_reader import read_pdf_text


def process_pdf_attachment(
    email: dict[str, str], filename: str, pdf_bytes: bytes
) -> ExtractedRecord:
    text = read_pdf_text(pdf_bytes)
    return process_text_content(email, filename, text)


def process_pdf_text(
    email: dict[str, str], filename: str, extracted_text: str
) -> ExtractedRecord:
    return process_text_content(email, filename, extracted_text)


def process_text_content(
    email: dict[str, str], source_name: str, extracted_text: str
) -> ExtractedRecord:
    extraction_error = None
    try:
        fields = extract_fields(email["subject"], email["sender"], extracted_text)
        status = "ok"
    except Exception as exc:
        fields = {
            "doc_type": "other",
            "doc_type_confidence": 0.0,
            "identifiers": {},
            "route": {},
        }
        status = "failed"
        extraction_error = str(exc)

    return ExtractedRecord(
        source=Source(
            message_id=email["message_id"],
            sender=email["sender"],
            subject=email["subject"],
            received_at=_normalize_received_at(email["received_at"]),
            attachment_name=source_name,
        ),
        extraction_status=status,
        extraction_error=extraction_error,
        **fields,
    )


def _normalize_received_at(value) -> str:
    if hasattr(value, "isoformat"):
        return value.isoformat()
    return str(value)
