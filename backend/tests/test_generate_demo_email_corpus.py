import tempfile
import unittest
from email import policy
from email.parser import BytesParser
from pathlib import Path

from scripts.generate_demo_email_corpus import build_records, write_corpus


class GenerateDemoEmailCorpusTest(unittest.TestCase):
    def test_write_corpus_creates_eml_with_pdf_attachment(self) -> None:
        records = build_records()[:1]

        with tempfile.TemporaryDirectory() as tmp_dir:
            output_dir = Path(tmp_dir) / "demo_email"

            write_corpus(records, output_dir=output_dir)

            email_dir = output_dir / "email_01_completed-booking-confirmation"
            eml_path = email_dir / "email.eml"

            self.assertTrue(eml_path.exists())

            message = BytesParser(policy=policy.default).parsebytes(eml_path.read_bytes())

            self.assertEqual(message["Subject"], records[0].title)
            self.assertEqual(message["To"], "vuphungminh250@gmail.com")
            self.assertEqual(message["From"], records[0].from_email)

            attachments = list(message.iter_attachments())
            self.assertEqual(len(attachments), 1)
            self.assertEqual(attachments[0].get_filename(), records[0].pdf_name)
            self.assertEqual(attachments[0].get_content_type(), "application/pdf")


if __name__ == "__main__":
    unittest.main()
