import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ShipmentDetail } from './ShipmentDetail';

vi.mock('../lib/agentify-api', () => ({
  getContainer: vi.fn(),
  getContainerFacts: vi.fn(),
}));

import { getContainer, getContainerFacts } from '../lib/agentify-api';

describe('ShipmentDetail', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders summary and source evidence for a container', async () => {
    vi.mocked(getContainer).mockResolvedValue({
      container: {
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
      related_emails: [
        {
          id: 'email-1',
          subject: 'Arrival Notice - MSCU1234567',
          from_email: 'ops@carrier.com',
          sent_at: '2026-06-08T04:35:00Z',
        },
      ],
      related_attachments: [
        {
          id: 'att-1',
          filename: 'arrival_notice.pdf',
          email_id: 'email-1',
          document_type: 'arrival_notice',
        },
      ],
    });
    vi.mocked(getContainerFacts).mockResolvedValue({
      items: [
        {
          id: 'fact-1',
          field_name: 'eta',
          field_value: '2026-06-14',
          normalized_value: '2026-06-14',
          source_type: 'pdf_text',
          source_label: 'arrival_notice.pdf',
          document_type: 'arrival_notice',
          confidence: 0.98,
          source_sent_at: '2026-06-08T04:35:00Z',
          email_id: 'email-1',
          attachment_id: 'att-1',
        },
      ],
    });

    render(
      <MemoryRouter initialEntries={['/containers/MSCU1234567']}>
        <Routes>
          <Route path="/containers/:containerNo" element={<ShipmentDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('MSCU1234567')).toBeInTheDocument();
    expect(screen.getByText('Nguồn dữ liệu đã trích xuất')).toBeInTheDocument();
    expect(screen.getByText('Cảng xếp hàng (POL)')).toBeInTheDocument();
    expect(screen.getAllByText('Thông báo hàng đến').length).toBeGreaterThan(0);
    expect(screen.getAllByText('arrival_notice.pdf').length).toBeGreaterThan(0);
  });
});
