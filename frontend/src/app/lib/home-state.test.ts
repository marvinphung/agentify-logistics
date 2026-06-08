import { describe, expect, it } from 'vitest';

import { getPrimaryHomeState } from './home-state';

describe('getPrimaryHomeState', () => {
  it('returns empty when there is no mailbox and no container', () => {
    expect(
      getPrimaryHomeState({
        has_data: false,
        container_count: 0,
        last_sync_at: null,
        connected_mailboxes: [],
        recent_containers: [],
      }),
    ).toBe('empty');
  });

  it('returns ready when there is searchable container data', () => {
    expect(
      getPrimaryHomeState({
        has_data: true,
        container_count: 3,
        last_sync_at: '2026-06-08T04:35:00Z',
        connected_mailboxes: [
          {
            id: 'conn-1',
            account_email: 'demo-logistics@agentify.vn',
            status: 'connected',
          },
        ],
        recent_containers: [
          {
            container_no: 'MSCU1234567',
            status_text: 'Arrival Notice revised',
            eta: '2026-06-14',
            updated_at: '2026-06-08T04:35:00Z',
          },
        ],
      }),
    ).toBe('ready');
  });
});
