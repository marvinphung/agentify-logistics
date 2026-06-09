import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { EmailDetail } from './EmailDetail';

vi.mock('../lib/agentify-api', () => ({
  getEmail: vi.fn(),
}));

import { getEmail } from '../lib/agentify-api';

describe('EmailDetail', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders explained Vietnamese labels for extracted logistics facts', async () => {
    vi.mocked(getEmail).mockResolvedValue({
      email: {
        id: 'email-1',
        subject: 'Arrival Notice - MSCU1234567',
        from_email: 'ops@carrier.com',
        to_emails: ['cs@agentify.vn'],
        sent_at: '2026-06-08T04:35:00Z',
        snippet: 'Arrival notice attached.',
        body_text: 'Please find attached arrival notice.',
      },
      attachments: [
        {
          id: 'att-1',
          filename: 'arrival_notice.pdf',
          mime_type: 'application/pdf',
          text_extract_status: 'extracted',
          document_type: 'arrival_notice',
          file_url: '/api/v1/attachments/att-1/file',
        },
      ],
      extracted_facts: [
        {
          id: 'fact-1',
          field_name: 'pol',
          field_value: 'Shanghai',
          normalized_value: 'Shanghai',
          source_type: 'pdf_text',
          source_label: 'arrival_notice.pdf',
          document_type: 'arrival_notice',
          confidence: 0.98,
          source_sent_at: '2026-06-08T04:35:00Z',
          email_id: 'email-1',
          attachment_id: 'att-1',
        },
      ],
      linked_containers: ['MSCU1234567'],
    });

    render(
      <MemoryRouter initialEntries={['/emails/email-1']}>
        <Routes>
          <Route path="/emails/:id" element={<EmailDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Thông tin đã trích xuất')).toBeInTheDocument();
    expect(screen.getByText('Cảng xếp hàng (POL)')).toBeInTheDocument();
    expect(screen.getAllByText('Thông báo hàng đến').length).toBeGreaterThan(0);
    expect(screen.getByText('Đã trích xuất chữ')).toBeInTheDocument();
    expect(screen.getByText('Nguồn trích xuất: arrival_notice.pdf')).toBeInTheDocument();
  });
});
