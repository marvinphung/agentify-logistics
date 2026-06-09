"""initial schema for agentify logistics prototype"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = "20260608_0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "gmail_connections",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("account_email", sa.String(length=255), nullable=False),
        sa.Column("display_name", sa.String(length=255), nullable=True),
        sa.Column("google_account_id", sa.String(length=255), nullable=True),
        sa.Column("encrypted_refresh_token", sa.Text(), nullable=True),
        sa.Column("access_scope", sa.Text(), nullable=True),
        sa.Column("status", sa.String(length=50), nullable=False),
        sa.Column("sync_cursor", sa.Text(), nullable=True),
        sa.Column("last_synced_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("extra_metadata", postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("account_email", name="uq_gmail_connections_account_email"),
        sa.UniqueConstraint("google_account_id", name="uq_gmail_connections_google_account_id"),
    )
    op.create_index(op.f("ix_gmail_connections_account_email"), "gmail_connections", ["account_email"], unique=False)

    op.create_table(
        "sync_jobs",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("gmail_connection_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("query", sa.Text(), nullable=True),
        sa.Column("date_from", sa.Date(), nullable=True),
        sa.Column("date_to", sa.Date(), nullable=True),
        sa.Column("max_results", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=50), nullable=False),
        sa.Column("emails_fetched", sa.Integer(), nullable=False),
        sa.Column("attachments_found", sa.Integer(), nullable=False),
        sa.Column("pdf_text_extracted", sa.Integer(), nullable=False),
        sa.Column("containers_upserted", sa.Integer(), nullable=False),
        sa.Column("error_message", sa.Text(), nullable=True),
        sa.Column("started_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(["gmail_connection_id"], ["gmail_connections.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_sync_jobs_gmail_connection_id"), "sync_jobs", ["gmail_connection_id"], unique=False)
    op.create_index(op.f("ix_sync_jobs_status"), "sync_jobs", ["status"], unique=False)

    op.create_table(
        "emails",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("gmail_connection_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("sync_job_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("gmail_message_id", sa.String(length=255), nullable=False),
        sa.Column("gmail_thread_id", sa.String(length=255), nullable=True),
        sa.Column("subject", sa.Text(), nullable=False),
        sa.Column("from_email", sa.String(length=255), nullable=False),
        sa.Column("to_emails", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("cc_emails", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("sent_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("snippet", sa.Text(), nullable=True),
        sa.Column("body_text", sa.Text(), nullable=True),
        sa.Column("body_html", sa.Text(), nullable=True),
        sa.Column("raw_labels", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("has_pdf_attachments", sa.Boolean(), nullable=False),
        sa.Column("processing_status", sa.String(length=50), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(["gmail_connection_id"], ["gmail_connections.id"]),
        sa.ForeignKeyConstraint(["sync_job_id"], ["sync_jobs.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("gmail_message_id", name="uq_emails_gmail_message_id"),
    )
    op.create_index(op.f("ix_emails_gmail_connection_id"), "emails", ["gmail_connection_id"], unique=False)
    op.create_index(op.f("ix_emails_gmail_message_id"), "emails", ["gmail_message_id"], unique=False)
    op.create_index(op.f("ix_emails_sent_at"), "emails", ["sent_at"], unique=False)

    op.create_table(
        "attachments",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("email_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("gmail_attachment_id", sa.String(length=255), nullable=True),
        sa.Column("filename", sa.String(length=500), nullable=False),
        sa.Column("mime_type", sa.String(length=255), nullable=False),
        sa.Column("size_bytes", sa.Integer(), nullable=True),
        sa.Column("storage_path", sa.Text(), nullable=True),
        sa.Column("is_text_pdf", sa.Boolean(), nullable=False),
        sa.Column("text_extract_status", sa.String(length=50), nullable=False),
        sa.Column("extracted_text", sa.Text(), nullable=True),
        sa.Column("document_type", sa.String(length=100), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(["email_id"], ["emails.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email_id", "filename", name="uq_attachments_email_filename"),
    )
    op.create_index(op.f("ix_attachments_email_id"), "attachments", ["email_id"], unique=False)

    op.create_table(
        "containers",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("container_no", sa.String(length=32), nullable=False),
        sa.Column("booking_no", sa.String(length=255), nullable=True),
        sa.Column("bl_no", sa.String(length=255), nullable=True),
        sa.Column("po_no", sa.String(length=255), nullable=True),
        sa.Column("seal_no", sa.String(length=255), nullable=True),
        sa.Column("vessel", sa.String(length=255), nullable=True),
        sa.Column("voyage", sa.String(length=255), nullable=True),
        sa.Column("pol", sa.String(length=255), nullable=True),
        sa.Column("pod", sa.String(length=255), nullable=True),
        sa.Column("etd", sa.Date(), nullable=True),
        sa.Column("eta", sa.Date(), nullable=True),
        sa.Column("status_text", sa.Text(), nullable=True),
        sa.Column("source_count", sa.Integer(), nullable=False),
        sa.Column("attachment_count", sa.Integer(), nullable=False),
        sa.Column("first_seen_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("last_seen_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("container_no", name="uq_containers_container_no"),
    )
    op.create_index(op.f("ix_containers_booking_no"), "containers", ["booking_no"], unique=False)
    op.create_index(op.f("ix_containers_bl_no"), "containers", ["bl_no"], unique=False)
    op.create_index(op.f("ix_containers_container_no"), "containers", ["container_no"], unique=False)
    op.create_index(op.f("ix_containers_po_no"), "containers", ["po_no"], unique=False)

    op.create_table(
        "container_facts",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("container_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("email_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("attachment_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("field_name", sa.String(length=100), nullable=False),
        sa.Column("field_value", sa.Text(), nullable=False),
        sa.Column("normalized_value", sa.Text(), nullable=True),
        sa.Column("source_type", sa.String(length=100), nullable=False),
        sa.Column("source_label", sa.Text(), nullable=True),
        sa.Column("document_type", sa.String(length=100), nullable=True),
        sa.Column("confidence", sa.Numeric(5, 4), nullable=True),
        sa.Column("source_sent_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["attachment_id"], ["attachments.id"]),
        sa.ForeignKeyConstraint(["container_id"], ["containers.id"]),
        sa.ForeignKeyConstraint(["email_id"], ["emails.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_container_facts_attachment_id"), "container_facts", ["attachment_id"], unique=False)
    op.create_index(op.f("ix_container_facts_container_id"), "container_facts", ["container_id"], unique=False)
    op.create_index(op.f("ix_container_facts_email_id"), "container_facts", ["email_id"], unique=False)
    op.create_index(op.f("ix_container_facts_field_name"), "container_facts", ["field_name"], unique=False)
    op.create_index(op.f("ix_container_facts_source_sent_at"), "container_facts", ["source_sent_at"], unique=False)
    op.create_index("ix_container_facts_container_field_sent_at", "container_facts", ["container_id", "field_name", "source_sent_at"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_container_facts_container_field_sent_at", table_name="container_facts")
    op.drop_index(op.f("ix_container_facts_source_sent_at"), table_name="container_facts")
    op.drop_index(op.f("ix_container_facts_field_name"), table_name="container_facts")
    op.drop_index(op.f("ix_container_facts_email_id"), table_name="container_facts")
    op.drop_index(op.f("ix_container_facts_container_id"), table_name="container_facts")
    op.drop_index(op.f("ix_container_facts_attachment_id"), table_name="container_facts")
    op.drop_table("container_facts")
    op.drop_index(op.f("ix_containers_po_no"), table_name="containers")
    op.drop_index(op.f("ix_containers_container_no"), table_name="containers")
    op.drop_index(op.f("ix_containers_bl_no"), table_name="containers")
    op.drop_index(op.f("ix_containers_booking_no"), table_name="containers")
    op.drop_table("containers")
    op.drop_index(op.f("ix_attachments_email_id"), table_name="attachments")
    op.drop_table("attachments")
    op.drop_index(op.f("ix_emails_sent_at"), table_name="emails")
    op.drop_index(op.f("ix_emails_gmail_message_id"), table_name="emails")
    op.drop_index(op.f("ix_emails_gmail_connection_id"), table_name="emails")
    op.drop_table("emails")
    op.drop_index(op.f("ix_sync_jobs_status"), table_name="sync_jobs")
    op.drop_index(op.f("ix_sync_jobs_gmail_connection_id"), table_name="sync_jobs")
    op.drop_table("sync_jobs")
    op.drop_index(op.f("ix_gmail_connections_account_email"), table_name="gmail_connections")
    op.drop_table("gmail_connections")
