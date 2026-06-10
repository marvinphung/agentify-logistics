from unittest import TestCase

from sqlalchemy import Text
from sqlalchemy.dialects.postgresql import JSONB

from db.models import Attachment


class AttachmentModelTest(TestCase):
    def test_gmail_attachment_id_uses_text_column(self) -> None:
        column_type = Attachment.__table__.c.gmail_attachment_id.type
        self.assertIsInstance(column_type, Text)

    def test_extracted_record_uses_jsonb_column(self) -> None:
        column_type = Attachment.__table__.c.extracted_record.type
        self.assertIsInstance(column_type, JSONB)
