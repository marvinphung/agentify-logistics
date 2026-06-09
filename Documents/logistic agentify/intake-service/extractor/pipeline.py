from .field_extract import extract_fields
from .pdf_reader import read_pdf_text
from .schema import ExtractedRecord, Source


def process_pdf(email: dict, filename: str, pdf_bytes: bytes) -> ExtractedRecord:
    text = read_pdf_text(pdf_bytes)
    try:
        fields = extract_fields(email["subject"], email["sender"], text)
        status = "ok"
    except Exception:
        fields = {
            "doc_type": "other",
            "doc_type_confidence": 0.0,
            "identifiers": {},
            "route": {},
        }
        status = "failed"
    return ExtractedRecord(
        source=Source(
            message_id=email["message_id"],
            sender=email["sender"],
            subject=email["subject"],
            received_at=email["received_at"],
            attachment_name=filename,
        ),
        extraction_status=status,
        **fields,
    )
