import { afterEach, describe, expect, it, vi } from 'vitest';

import { getAppHome } from './agentify-api';

describe('getAppHome', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('requests the app-home aggregate endpoint', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          has_data: true,
          container_count: 3,
          last_sync_at: '2026-06-08T04:35:00Z',
          connected_mailboxes: [],
          recent_containers: [],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );

    const payload = await getAppHome();

    expect(fetchMock).toHaveBeenCalledWith('/api/v1/app-home', expect.any(Object));
    expect(payload.container_count).toBe(3);
  });
});
