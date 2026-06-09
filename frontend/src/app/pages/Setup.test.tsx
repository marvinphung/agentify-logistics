import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Setup } from './Setup';

vi.mock('../lib/agentify-api', () => ({
  createSyncJob: vi.fn(),
  getAppHome: vi.fn(),
  getHealth: vi.fn(),
  listEmails: vi.fn(),
  listGmailConnections: vi.fn(),
  listSyncJobs: vi.fn(),
  upsertGmailConnection: vi.fn(),
}));

import {
  getAppHome,
  getHealth,
  listEmails,
  listGmailConnections,
  listSyncJobs,
} from '../lib/agentify-api';

describe('Setup', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders setup state from backend data', async () => {
    vi.mocked(getAppHome).mockResolvedValue({
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
      recent_containers: [],
    });
    vi.mocked(getHealth).mockResolvedValue({ status: 'ok', database: 'ok' });
    vi.mocked(listGmailConnections).mockResolvedValue([
      {
        id: 'conn-1',
        account_email: 'demo-logistics@agentify.vn',
        display_name: 'Demo Logistics',
        google_account_id: null,
        access_scope: 'gmail.readonly',
        status: 'connected',
        sync_cursor: null,
        last_synced_at: '2026-06-08T04:35:00Z',
        created_at: '2026-06-08T04:00:00Z',
        updated_at: '2026-06-08T04:35:00Z',
      },
    ]);
    vi.mocked(listSyncJobs).mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      page_size: 10,
    });
    vi.mocked(listEmails).mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      page_size: 12,
    });

    render(
      <MemoryRouter>
        <Setup />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Thiết lập dữ liệu')).toBeInTheDocument();
    expect(screen.getByText('Kết nối hộp thư')).toBeInTheDocument();
    expect(screen.getByText('Email đã đưa vào hệ thống')).toBeInTheDocument();
    expect(screen.getAllByText('demo-logistics@agentify.vn').length).toBeGreaterThan(0);
    expect(screen.getByText('Đã kết nối')).toBeInTheDocument();
    expect(screen.getByText('Hoạt động tốt')).toBeInTheDocument();
  });
});
