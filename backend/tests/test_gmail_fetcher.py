import unittest
from unittest.mock import Mock

from gmail_service.fetcher import resolve_sync_message_ids


class _InvalidHistoryError(Exception):
    pass


class GmailFetcherTest(unittest.TestCase):
    def test_resolve_sync_message_ids_uses_full_list_without_cursor(self) -> None:
        service = Mock()
        (
            service.users.return_value.messages.return_value.list.return_value.execute.return_value
        ) = {"messages": [{"id": "msg-001"}, {"id": "msg-002"}]}
        service.users.return_value.getProfile.return_value.execute.return_value = {
            "historyId": "history-002"
        }

        message_ids, next_cursor = resolve_sync_message_ids(
            service,
            query="newer_than:7d",
            max_results=48,
            sync_cursor=None,
        )

        self.assertEqual(message_ids, ["msg-001", "msg-002"])
        self.assertEqual(next_cursor, "history-002")

    def test_resolve_sync_message_ids_uses_history_when_cursor_exists(self) -> None:
        service = Mock()
        (
            service.users.return_value.history.return_value.list.return_value.execute.return_value
        ) = {
            "history": [
                {"messagesAdded": [{"message": {"id": "msg-003"}}]},
                {"messagesAdded": [{"message": {"id": "msg-004"}}]},
            ]
        }
        service.users.return_value.getProfile.return_value.execute.return_value = {
            "historyId": "history-004"
        }

        message_ids, next_cursor = resolve_sync_message_ids(
            service,
            max_results=48,
            sync_cursor="history-002",
        )

        self.assertEqual(message_ids, ["msg-003", "msg-004"])
        self.assertEqual(next_cursor, "history-004")

    def test_resolve_sync_message_ids_falls_back_when_cursor_invalid(self) -> None:
        service = Mock()
        history_request = service.users.return_value.history.return_value.list.return_value
        history_request.execute.side_effect = _InvalidHistoryError(
            "Requested entity was not found: startHistoryId"
        )
        (
            service.users.return_value.messages.return_value.list.return_value.execute.return_value
        ) = {"messages": [{"id": "msg-005"}]}
        service.users.return_value.getProfile.return_value.execute.return_value = {
            "historyId": "history-005"
        }

        message_ids, next_cursor = resolve_sync_message_ids(
            service,
            query="newer_than:7d",
            max_results=48,
            sync_cursor="history-002",
        )

        self.assertEqual(message_ids, ["msg-005"])
        self.assertEqual(next_cursor, "history-005")


if __name__ == "__main__":
    unittest.main()
