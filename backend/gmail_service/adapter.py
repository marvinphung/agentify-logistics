from decimal import Decimal
from uuid import UUID

from api.models import (
    IngestAttachmentRequest,
    IngestFactRequest,
    ProcessedEmailIngestRequest,
)
from gmail_service.models import (
    ExtractedRecord,
    GmailAttachmentPayload,
    GmailEmailPayload,
)

SUMMARY_FIELDS = (
    "booking_no",
    "bl_no",
    "po_no",
    "vessel",
    "voyage",
    "pol",
    "pod",
    "etd",
    "eta",
)


class AttachmentExtractionResult:
    def __init__(
        self,
        attachment: GmailAttachmentPayload,
        extracted_text: str,
        text_extract_status: str,
        record: ExtractedRecord,
    ) -> None:
        self.attachment = attachment
        self.extracted_text = extracted_text
        self.text_extract_status = text_extract_status
        self.record = record


def build_processed_email_request(
    gmail_connection_id: UUID,
    sync_job_id: UUID,
    email: GmailEmailPayload,
    attachment_results: list[AttachmentExtractionResult],
) -> ProcessedEmailIngestRequest:
    attachments = [
        IngestAttachmentRequest(
            gmail_attachment_id=result.attachment.gmail_attachment_id,
            filename=result.attachment.filename,
            mime_type=result.attachment.mime_type,
            size_bytes=result.attachment.size_bytes,
            storage_path=None,
            is_text_pdf=result.text_extract_status == "extracted",
            text_extract_status=result.text_extract_status,
            extracted_text=result.extracted_text,
            document_type=result.record.doc_type,
        )
        for result in attachment_results
    ]

    extracted_facts: list[IngestFactRequest] = []
    for result in attachment_results:
        record = result.record
        container_nos = [
            container_no.strip().upper()
            for container_no in record.identifiers.container_no
            if container_no
        ]
        for container_no in container_nos:
            extracted_facts.append(
                _build_fact(
                    field_name="container_no",
                    normalized_value=container_no,
                    container_no=container_no,
                    result=result,
                )
            )

        for field_name in SUMMARY_FIELDS:
            value = _get_record_value(record, field_name)
            if not value:
                continue
            if container_nos:
                for container_no in container_nos:
                    extracted_facts.append(
                        _build_fact(
                            field_name=field_name,
                            normalized_value=str(value),
                            container_no=container_no,
                            result=result,
                        )
                    )
            else:
                extracted_facts.append(
                    _build_fact(
                        field_name=field_name,
                        normalized_value=str(value),
                        container_no=None,
                        result=result,
                    )
                )

        if record.identifiers.seal_no:
            for seal_no in record.identifiers.seal_no:
                for container_no in container_nos or [None]:
                    extracted_facts.append(
                        _build_fact(
                            field_name="seal_no",
                            normalized_value=seal_no,
                            container_no=container_no,
                            result=result,
                        )
                    )

        status_value = record.doc_type
        for container_no in container_nos or [None]:
            extracted_facts.append(
                _build_fact(
                    field_name="status_text",
                    normalized_value=status_value,
                    container_no=container_no,
                    result=result,
                )
            )

    return ProcessedEmailIngestRequest(
        gmail_connection_id=gmail_connection_id,
        sync_job_id=sync_job_id,
        gmail_message_id=email.gmail_message_id,
        gmail_thread_id=email.gmail_thread_id,
        subject=email.subject,
        from_email=email.from_email,
        to_emails=email.to_emails,
        cc_emails=email.cc_emails,
        sent_at=email.sent_at,
        snippet=email.snippet,
        body_text=email.body_text,
        body_html=email.body_html,
        raw_labels=email.raw_labels,
        has_pdf_attachments=bool(email.attachments),
        attachments=attachments,
        extracted_facts=extracted_facts,
    )


def _build_fact(
    field_name: str,
    normalized_value: str,
    container_no: str | None,
    result: AttachmentExtractionResult,
) -> IngestFactRequest:
    return IngestFactRequest(
        field_name=field_name,
        field_value=normalized_value,
        normalized_value=normalized_value,
        container_no=container_no,
        source_type="pdf_text",
        source_label=result.attachment.filename,
        document_type=result.record.doc_type,
        confidence=Decimal(str(result.record.doc_type_confidence)),
        attachment_filename=result.attachment.filename,
    )


def _get_record_value(record: ExtractedRecord, field_name: str) -> str | None:
    if hasattr(record.identifiers, field_name):
        return getattr(record.identifiers, field_name)
    if hasattr(record.route, field_name):
        return getattr(record.route, field_name)
    return None
