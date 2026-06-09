# Agentify Logistics Backend

FastAPI + PostgreSQL backend for the narrow prototype:

- register Gmail mailboxes
- track sync jobs
- ingest processed emails/PDF extraction output from other services
- keep the Gmail OAuth/fetch/extract integration code as an embedded module
- aggregate data by `container_no`
- serve container/email lookup APIs for the frontend

The backend intentionally follows the same operational style as
`~/Documents/a-star/hackathon-aggregator/search-engine`:

- `.env` + `app-config.yaml`
- `config/`, `db/`, `api/`, `services/`
- `gmail_service/` for Gmail-specific integration code
- async SQLAlchemy session dependency
- Alembic migration flow
- Dockerfile + `compose.yaml`
- one canonical `DATABASE_URL`, with sync/async SQLAlchemy URLs derived in config

## Quick Start

1. Copy `.env.example` to `.env` if needed.
2. Review `app-config.yaml`.
3. Install deps with `uv sync`.
4. Run migration with `./.venv/bin/alembic upgrade head`.
5. Start API with `./.venv/bin/uvicorn api.routes.api_main:app --reload --port 8766`.
