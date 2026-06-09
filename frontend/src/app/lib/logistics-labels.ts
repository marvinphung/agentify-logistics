import { toTitleCase } from './format';

export const LOGISTICS_FIELD_LABELS: Record<string, string> = {
  container_no: 'Mã container',
  booking_no: 'Mã booking',
  bl_no: 'Vận đơn (B/L)',
  po_no: 'Mã đơn hàng (PO)',
  vessel: 'Tên tàu (Vessel)',
  voyage: 'Chuyến tàu (Voyage)',
  pol: 'Cảng xếp hàng (POL)',
  pod: 'Cảng dỡ hàng (POD)',
  eta: 'Ngày đến dự kiến (ETA)',
  etd: 'Ngày đi dự kiến (ETD)',
  status_text: 'Trạng thái hiện tại',
  updated_at: 'Thời điểm cập nhật',
};

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  arrival_notice: 'Thông báo hàng đến',
  booking_confirmation: 'Xác nhận booking',
  delivery_order: 'Lệnh giao hàng',
  draft_bl: 'Bản nháp vận đơn',
  shipping_instruction: 'Hướng dẫn giao hàng',
};

const CONNECTION_STATUS_LABELS: Record<string, string> = {
  connected: 'Đã kết nối',
  disconnected: 'Đã ngắt kết nối',
  error: 'Lỗi kết nối',
};

const SYNC_JOB_STATUS_LABELS: Record<string, string> = {
  queued: 'Đang chờ',
  running: 'Đang chạy',
  completed: 'Hoàn tất',
  failed: 'Thất bại',
};

const TEXT_EXTRACT_STATUS_LABELS: Record<string, string> = {
  pending: 'Chưa xử lý',
  extracted: 'Đã trích xuất chữ',
  failed: 'Trích xuất lỗi',
  unsupported: 'Không hỗ trợ',
};

const HEALTH_STATUS_LABELS: Record<string, string> = {
  ok: 'Hoạt động tốt',
  degraded: 'Đang suy giảm',
  unreachable: 'Không thể kết nối',
};

const DATABASE_STATUS_LABELS: Record<string, string> = {
  ok: 'Kết nối tốt',
  unreachable: 'Không thể kết nối',
  unknown: 'Chưa rõ trạng thái',
};

export function getLogisticsFieldLabel(fieldName: string): string {
  return LOGISTICS_FIELD_LABELS[fieldName] || toTitleCase(fieldName);
}

export function getFactFieldLabel(fieldName: string): string {
  return getLogisticsFieldLabel(fieldName);
}

export function getSearchPlaceholder(): string {
  return 'Nhập mã container / mã booking / vận đơn (B/L) / mã đơn hàng (PO)';
}

export function getDocumentTypeLabel(value?: string | null): string {
  if (!value) {
    return 'Không rõ loại tài liệu';
  }
  return DOCUMENT_TYPE_LABELS[value] || toTitleCase(value);
}

export function getConnectionStatusLabel(value?: string | null): string {
  if (!value) {
    return 'Chưa rõ trạng thái';
  }
  return CONNECTION_STATUS_LABELS[value] || toTitleCase(value);
}

export function getSyncJobStatusLabel(value?: string | null): string {
  if (!value) {
    return 'Chưa rõ trạng thái';
  }
  return SYNC_JOB_STATUS_LABELS[value] || toTitleCase(value);
}

export function getTextExtractStatusLabel(value?: string | null): string {
  if (!value) {
    return 'Chưa rõ trạng thái';
  }
  return TEXT_EXTRACT_STATUS_LABELS[value] || toTitleCase(value);
}

export function getHealthStatusLabel(value?: string | null): string {
  if (!value) {
    return 'Chưa rõ trạng thái';
  }
  return HEALTH_STATUS_LABELS[value] || toTitleCase(value);
}

export function getDatabaseStatusLabel(value?: string | null): string {
  if (!value) {
    return 'Chưa rõ trạng thái';
  }
  return DATABASE_STATUS_LABELS[value] || toTitleCase(value);
}
