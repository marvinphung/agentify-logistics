import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { SearchHome } from './SearchHome';

vi.mock('../lib/agentify-api', () => ({
  getAppHome: vi.fn(),
  listContainers: vi.fn(),
}));

import { getAppHome, listContainers } from '../lib/agentify-api';

describe('SearchHome', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows setup CTA when there is no searchable data', async () => {
    vi.mocked(getAppHome).mockResolvedValue({
      has_data: false,
      container_count: 0,
      last_sync_at: null,
      connected_mailboxes: [],
      recent_containers: [],
    });
    vi.mocked(listContainers).mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      page_size: 20,
    });

    render(
      <MemoryRouter>
        <SearchHome />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Tra cứu container trong vài giây')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Thiết lập dữ liệu' }).length).toBeGreaterThan(0);
  });

  it('renders recent containers and searches on submit', async () => {
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
      recent_containers: [
        {
          container_no: 'MSCU1234567',
          booking_no: 'BKG-123',
          bl_no: 'BL-123',
          pod: 'Hai Phong',
          etd: '2026-06-10',
          status_text: 'ETA đã điều chỉnh do ùn tắc cảng',
          eta: '2026-06-14',
          source_count: 4,
          attachment_count: 2,
          updated_at: '2026-06-08T04:35:00Z',
        },
      ],
    });
    vi.mocked(listContainers).mockResolvedValue({
      items: [
        {
          id: 'ctr-1',
          container_no: 'MSCU1234567',
          booking_no: 'BKG-123',
          bl_no: 'BL-123',
          po_no: 'PO-123',
          vessel: 'MAERSK HANOI',
          voyage: '126E',
          pol: 'Shanghai',
          pod: 'Hai Phong',
          etd: '2026-06-10',
          eta: '2026-06-14',
          status_text: 'ETA đã điều chỉnh do ùn tắc cảng',
          source_count: 4,
          attachment_count: 2,
          updated_at: '2026-06-08T04:35:00Z',
        },
      ],
      total: 1,
      page: 1,
      page_size: 20,
    });

    render(
      <MemoryRouter>
        <SearchHome />
      </MemoryRouter>,
    );

    expect(await screen.findByText('MSCU1234567')).toBeInTheDocument();
    expect(screen.getAllByText('BKG-123').length).toBeGreaterThan(0);

    fireEvent.change(
      screen.getAllByPlaceholderText(
        'Nhập mã container / mã booking / vận đơn (B/L) / mã đơn hàng (PO)',
      )[0],
      {
      target: { value: 'MSCU1234567' },
      },
    );
    fireEvent.submit(screen.getAllByRole('button', { name: 'Tra cứu' })[0].closest('form')!);

    await waitFor(() => {
      expect(listContainers).toHaveBeenLastCalledWith({
        q: 'MSCU1234567',
        page_size: 20,
      });
    });
  });
});
