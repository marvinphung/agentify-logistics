import tempfile
import unittest
from email import policy
from email.parser import BytesParser
from pathlib import Path

from scripts.generate_demo_email_corpus import build_records, write_corpus
from scripts.send_demo_emails import discover_email_jobs, prepare_message_for_send


class SendDemoEmailsTest(unittest.TestCase):
    def test_discover_jobs_returns_sorted_eml_paths(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            output_dir = Path(tmp_dir) / "demo_email"
            write_corpus(build_records()[:2], output_dir=output_dir)

            jobs = discover_email_jobs(output_dir)

            self.assertEqual(len(jobs), 2)
            self.assertEqual(jobs[0].folder_name, "email_01_completed-booking-confirmation")
            self.assertEqual(jobs[1].folder_name, "email_02_completed-si-submission")
            self.assertTrue(jobs[0].eml_path.name == "email.eml")

    def test_prepare_message_for_send_overrides_from_to_and_keeps_attachment(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            output_dir = Path(tmp_dir) / "demo_email"
            write_corpus(build_records()[:1], output_dir=output_dir)
            eml_path = output_dir / "email_01_completed-booking-confirmation" / "email.eml"

            prepared_bytes = prepare_message_for_send(
                eml_path,
                from_email="minhvu2592005@gmail.com",
                to_email="vuphungminh250@gmail.com",
            )
            message = BytesParser(policy=policy.default).parsebytes(prepared_bytes)

            self.assertEqual(message["From"], "minhvu2592005@gmail.com")
            self.assertEqual(message["To"], "vuphungminh250@gmail.com")
            self.assertEqual(
                message["X-Agentify-Original-From"],
                "cs.export@one-demo.com",
            )

            attachments = list(message.iter_attachments())
            self.assertEqual(len(attachments), 1)
            self.assertEqual(
                attachments[0].get_filename(),
                "booking_confirmation_oolu7215245.pdf",
            )


if __name__ == "__main__":
    unittest.main()
