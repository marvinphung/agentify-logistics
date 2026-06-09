import { describe, expect, it } from 'vitest';

import {
  getConnectionStatusLabel,
  getDatabaseStatusLabel,
  getDocumentTypeLabel,
  getFactFieldLabel,
  getHealthStatusLabel,
  getSearchPlaceholder,
  getSyncJobStatusLabel,
  getTextExtractStatusLabel,
  LOGISTICS_FIELD_LABELS,
} from './logistics-labels';

describe('logistics-labels', () => {
  it('maps core logistics fields to short Vietnamese explanations', () => {
    expect(LOGISTICS_FIELD_LABELS.pol).toBe('Cảng xếp hàng (POL)');
    expect(LOGISTICS_FIELD_LABELS.pod).toBe('Cảng dỡ hàng (POD)');
    expect(LOGISTICS_FIELD_LABELS.eta).toBe('Ngày đến dự kiến (ETA)');
    expect(LOGISTICS_FIELD_LABELS.etd).toBe('Ngày đi dự kiến (ETD)');
    expect(LOGISTICS_FIELD_LABELS.bl_no).toBe('Vận đơn (B/L)');
    expect(LOGISTICS_FIELD_LABELS.po_no).toBe('Mã đơn hàng (PO)');
  });

  it('exposes the search placeholder with explained logistics terms', () => {
    expect(getSearchPlaceholder()).toBe(
      'Nhập mã container / mã booking / vận đơn (B/L) / mã đơn hàng (PO)',
    );
  });

  it('falls back to title case for unmapped fact field names', () => {
    expect(getFactFieldLabel('status_text')).toBe('Trạng thái hiện tại');
    expect(getFactFieldLabel('unknown_field')).toBe('Unknown Field');
  });

  it('maps backend enums and document codes to human-readable Vietnamese', () => {
    expect(getDocumentTypeLabel('arrival_notice')).toBe('Thông báo hàng đến');
    expect(getDocumentTypeLabel('delivery_order')).toBe('Lệnh giao hàng');
    expect(getConnectionStatusLabel('connected')).toBe('Đã kết nối');
    expect(getSyncJobStatusLabel('completed')).toBe('Hoàn tất');
    expect(getTextExtractStatusLabel('extracted')).toBe('Đã trích xuất chữ');
    expect(getHealthStatusLabel('ok')).toBe('Hoạt động tốt');
    expect(getDatabaseStatusLabel('ok')).toBe('Kết nối tốt');
  });
});
