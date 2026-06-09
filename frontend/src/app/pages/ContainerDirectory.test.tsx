import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ContainerDirectory } from './ContainerDirectory';

vi.mock('../lib/agentify-api', () => ({
  listContainers: vi.fn(),
}));

import { listContainers } from '../lib/agentify-api';

describe('ContainerDirectory', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loads containers and filters them by business status', async () => {
    vi.mocked(listContainers).mockResolvedValue({
      items: [
        {
          id: 'ctr-1',
          container_no: 'FSCU2211334',
          booking_no: 'BKG-99001',
          bl_no: 'MAEU260612345',
          po_no: '450077889',
          vessel: 'MAERSK SAIGON',
          voyage: '028S',
          pol: 'Shanghai',
          pod: 'Cat Lai',
          etd: '2026-06-08',
          eta: '2026-06-12',
          status_text: 'Đang vận chuyển về cảng đích',
          source_count: 4,
          attachment_count: 2,
          updated_at: '2026-06-09T08:00:00Z',
        },
        {
          id: 'ctr-2',
          container_no: 'TEMU5544332',
          booking_no: 'BKG-77110',
          bl_no: 'TSLHPH26061588',
          po_no: null,
          vessel: null,
          voyage: null,
          pol: 'Qingdao',
          pod: 'Hai Phong',
          etd: null,
          eta: '2026-06-15',
          status_text: 'Chờ thông quan để lấy lệnh giao hàng',
          source_count: 2,
          attachment_count: 1,
          updated_at: '2026-06-09T09:00:00Z',
        },
      ],
      total: 2,
      page: 1,
      page_size: 100,
    });

    render(
      <MemoryRouter>
        <ContainerDirectory />
      </MemoryRouter>,
    );

    expect(await screen.findByText('FSCU2211334')).toBeInTheDocument();
    expect(screen.getByText('TEMU5544332')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Chờ thông quan/i }));

    await waitFor(() => {
      expect(screen.queryByText('FSCU2211334')).not.toBeInTheDocument();
      expect(screen.getByText('TEMU5544332')).toBeInTheDocument();
    });
  });
});
