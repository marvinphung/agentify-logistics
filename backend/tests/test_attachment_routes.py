from types import SimpleNamespace
from unittest import TestCase
from uuid import uuid4

from api.routes.attachments import attachment_file_url


class AttachmentRoutesTest(TestCase):
    def test_attachment_file_url_returns_none_without_storage_path(self) -> None:
        attachment = SimpleNamespace(id=uuid4(), storage_path=None)
        self.assertIsNone(attachment_file_url(attachment))

    def test_attachment_file_url_returns_file_endpoint_when_storage_exists(self) -> None:
        attachment = SimpleNamespace(id=uuid4(), storage_path="resources-test/demo.pdf")
        self.assertEqual(
            attachment_file_url(attachment),
            f"/api/v1/attachments/{attachment.id}/file",
        )
