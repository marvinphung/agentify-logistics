from unittest import TestCase

from config.database_config import PostgresDatabaseConfig


class PostgresDatabaseConfigTest(TestCase):
    def test_keeps_localhost_url_outside_docker(self):
        url = "postgresql+psycopg://agentify:agentify@localhost:5443/agentify"

        normalized = PostgresDatabaseConfig._normalize_runtime_url(
            url,
            is_docker=False,
        )

        self.assertEqual(normalized, url)

    def test_rewrites_localhost_url_to_docker_host_gateway_inside_docker(self):
        normalized = PostgresDatabaseConfig._normalize_runtime_url(
            "postgresql+psycopg://agentify:agentify@localhost:5443/agentify",
            is_docker=True,
            docker_host="host.docker.internal",
        )

        self.assertEqual(
            normalized,
            "postgresql+psycopg://agentify:agentify@host.docker.internal:5443/agentify",
        )

    def test_leaves_non_local_urls_unchanged_inside_docker(self):
        url = "postgresql+psycopg://agentify:agentify@postgres:5432/agentify"

        normalized = PostgresDatabaseConfig._normalize_runtime_url(
            url,
            is_docker=True,
            docker_host="host.docker.internal",
        )

        self.assertEqual(normalized, url)
