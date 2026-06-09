# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.12
FROM python:${PYTHON_VERSION} as base

ENV PYTHONUNBUFFERED=1

WORKDIR /app

ARG UID=10001
RUN adduser \
  --disabled-password \
  --gecos "" \
  --home "/home/appuser" \
  --shell "/bin/bash" \
  --uid "${UID}" \
  appuser

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

ENV UV_LINK_MODE=copy
RUN --mount=type=cache,target=/root/.cache/uv \
  --mount=type=bind,source=uv.lock,target=uv.lock \
  --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
  uv sync --locked --no-install-project

COPY . /app

RUN --mount=type=cache,target=/root/.cache/uv uv sync --locked
RUN chown -R appuser:appuser /app /home/appuser

USER appuser

ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8766

CMD ["uvicorn", "api.routes.api_main:app", "--host", "0.0.0.0", "--port", "8766"]
