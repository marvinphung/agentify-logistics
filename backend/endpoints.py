from enum import Enum


class InternalIngestionEndpoint(str, Enum):
    PROCESSED_EMAILS = "/api/v1/internal/processed-emails"
