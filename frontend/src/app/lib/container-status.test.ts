import { describe, expect, it } from 'vitest';

import { getContainerCompleteness, getContainerStatusMeta } from './container-status';
import type { ContainerListItem } from '../types/api';

function makeContainer(overrides: Partial<ContainerListItem>): ContainerListItem {
  return {
    id: 'ctr-1',
    container_no: 'FSCU2211334',
    booking_no: null,
    bl_no: null,
    po_no: null,
    vessel: null,
    voyage: null,
    pol: null,
    pod: null,
    etd: null,
    eta: null,
    status_text: null,
    source_count: 0,
    attachment_count: 0,
    updated_at: '2026-06-09T08:00:00Z',
    ...overrides,
  };
}

describe('getContainerStatusMeta', () => {
  it('maps delivery-order style statuses to completed', () => {
    const meta = getContainerStatusMeta(
      makeContainer({ status_text: 'Đã phát hành lệnh giao hàng' }),
    );

    expect(meta.key).toBe('da_hoan_tat');
  });

  it('maps customs waiting statuses correctly', () => {
    const meta = getContainerStatusMeta(
      makeContainer({ status_text: 'Chờ thông quan để lấy lệnh giao hàng' }),
    );

    expect(meta.key).toBe('cho_thong_quan');
  });

  it('maps sparse records to missing-data state', () => {
    const meta = getContainerStatusMeta(
      makeContainer({ status_text: 'Chỉ mới nhận email đặt chỗ, chưa có file PDF' }),
    );

    expect(meta.key).toBe('thieu_du_lieu');
  });
});

describe('getContainerCompleteness', () => {
  it('marks a rich record as full data', () => {
    const result = getContainerCompleteness(
      makeContainer({
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
      }),
    );

    expect(result.key).toBe('du_du_lieu');
  });

  it('marks a sparse record as email-only', () => {
    const result = getContainerCompleteness(
      makeContainer({
        status_text: 'Chỉ mới nhận email đặt chỗ, chưa có file PDF',
      }),
    );

    expect(result.key).toBe('chi_co_email');
  });
});
