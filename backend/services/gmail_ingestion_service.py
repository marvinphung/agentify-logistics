from datetime import UTC, datetime

from sqlalchemy.ext.asyncio import AsyncSession

from api.models import ProcessedEmailIngestRequest, UpdateSyncJobRequest
from db.models import GmailConnection, SyncJob
from gmail_service.adapter import (
    AttachmentExtractionResult,
    build_processed_email_request,
)
from gmail_service.auth import get_gmail_profile, get_gmail_service
from gmail_service.fetcher import get_email, list_new_messages
from gmail_service.models import ExtractedRecord, GmailEmailPayload
from gmail_service.pdf_reader import read_pdf_text
from gmail_service.pipeline import process_pdf_attachment, process_pdf_text
from services.ingestion_service import ingest_processed_email
from services.sync_job_service import update_sync_job


def build_gmail_oauth_payload(
    refresh_token: str, scopes: list[str] | None = None
) -> dict[str, str]:
    profile = get_gmail_profile(refresh_token)
    return {
        "account_email": profile["emailAddress"],
        "google_account_id": profile["emailAddress"],
        "access_scope": " ".join(scopes or ["gmail.readonly"]),
        "encrypted_refresh_token": refresh_token,
        "status": "connected",
    }


def process_gmail_pdf_attachment(
    email: dict[str, str], filename: str, pdf_bytes: bytes
) -> ExtractedRecord:
    return process_pdf_attachment(email, filename, pdf_bytes)


def build_processed_email_from_gmail_payload(
    gmail_connection_id,
    sync_job_id,
    email: GmailEmailPayload,
) -> ProcessedEmailIngestRequest:
    results: list[AttachmentExtractionResult] = []
    for attachment in email.attachments:
        extracted_text = read_pdf_text(attachment.attachment_bytes)
        text_extract_status = "extracted" if extracted_text.strip() else "empty"
        record = process_pdf_text(
            {
                "message_id": email.gmail_message_id,
                "sender": email.from_email,
                "subject": email.subject,
                "received_at": email.sent_at,
            },
            attachment.filename,
            extracted_text,
        )
        results.append(
            AttachmentExtractionResult(
                attachment=attachment,
                extracted_text=extracted_text,
                text_extract_status=text_extract_status,
                record=record,
            )
        )

    return build_processed_email_request(
        gmail_connection_id=gmail_connection_id,
        sync_job_id=sync_job_id,
        email=email,
        attachment_results=results,
    )


async def execute_sync_job(
    db: AsyncSession,
    connection: GmailConnection,
    job: SyncJob,
    create_service=get_gmail_service,
    list_message_ids=list_new_messages,
    fetch_email=get_email,
    process_email=build_processed_email_from_gmail_payload,
    ingest_email=ingest_processed_email,
) -> SyncJob:
    if not connection.encrypted_refresh_token:
        job.status = "failed"
        job.error_message = "Gmail connection is missing a refresh token"
        job.completed_at = datetime.now(UTC)
        return job

    started_at = datetime.now(UTC)
    await update_sync_job(
        db,
        job.id,
        UpdateSyncJobRequest(
            status="running",
            started_at=started_at,
            error_message=None,
        ),
    )

    try:
        gmail_api = create_service(connection.encrypted_refresh_token)
        message_ids = list_message_ids(
            gmail_api,
            query=job.query,
            max_results=job.max_results,
        )
        linked_containers: set[str] = set()
        attachments_found = 0
        pdf_text_extracted = 0

        for message_id in message_ids:
            email = fetch_email(gmail_api, message_id)
            processed_email = process_email(connection.id, job.id, email)
            ingest_result = await ingest_email(db, processed_email)
            attachments_found += ingest_result["attachment_count"]
            pdf_text_extracted += (
                sum(
                    1
                    for attachment in processed_email.attachments
                    if attachment.text_extract_status == "extracted"
                )
                or ingest_result["attachment_count"]
            )
            linked_containers.update(ingest_result["linked_containers"])

        completed_at = datetime.now(UTC)
        job.status = "completed"
        job.emails_fetched = len(message_ids)
        job.attachments_found = attachments_found
        job.pdf_text_extracted = pdf_text_extracted
        job.containers_upserted = len(linked_containers)
        job.error_message = None
        job.started_at = job.started_at or started_at
        job.completed_at = completed_at
        connection.last_synced_at = completed_at
        return job
    except Exception as exc:
        job.status = "failed"
        job.error_message = str(exc)
        job.started_at = job.started_at or started_at
        job.completed_at = datetime.now(UTC)
        return job
