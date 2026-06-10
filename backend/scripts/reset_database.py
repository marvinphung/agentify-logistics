from __future__ import annotations

import asyncio

from db.database import reset_db


async def _main() -> None:
    await reset_db()


if __name__ == "__main__":
    asyncio.run(_main())
