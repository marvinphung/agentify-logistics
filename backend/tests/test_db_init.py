from unittest import IsolatedAsyncioTestCase
from unittest.mock import AsyncMock, Mock, patch

from db import database
from db.models import Base


class _AsyncContextManager:
    def __init__(self, value):
        self._value = value

    async def __aenter__(self):
        return self._value

    async def __aexit__(self, exc_type, exc, tb):
        return False


class InitDbTest(IsolatedAsyncioTestCase):
    async def test_init_db_creates_current_tables_from_metadata(self) -> None:
        connection = AsyncMock()
        engine = Mock()
        engine.begin.return_value = _AsyncContextManager(connection)

        with patch.object(database, "engine", engine):
            await database.init_db()

        connection.run_sync.assert_awaited_once_with(Base.metadata.create_all)
        connection.execute.assert_not_called()

    async def test_reset_db_drops_and_recreates_current_tables(self) -> None:
        connection = AsyncMock()
        engine = Mock()
        engine.begin.return_value = _AsyncContextManager(connection)

        with patch.object(database, "engine", engine):
            await database.reset_db()

        self.assertEqual(connection.run_sync.await_count, 2)
        self.assertEqual(
            [call.args[0] for call in connection.run_sync.await_args_list],
            [Base.metadata.drop_all, Base.metadata.create_all],
        )
