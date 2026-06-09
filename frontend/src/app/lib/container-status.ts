import type { ContainerListItem } from '../types/api';

type StatusMeta = {
  key:
    | 'tat_ca'
    | 'da_hoan_tat'
    | 'dang_van_chuyen'
    | 'cho_xuat_cang'
    | 'cho_thong_quan'
    | 'cho_chung_tu'
    | 'thieu_du_lieu';
  label: string;
  pillClassName: string;
};

type CompletenessMeta = {
  key: 'du_du_lieu' | 'thieu_mot_phan' | 'chi_co_email';
  label: string;
  className: string;
};

const STATUS_META: Record<StatusMeta['key'], StatusMeta> = {
  tat_ca: {
    key: 'tat_ca',
    label: 'Tất cả',
    pillClassName: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  da_hoan_tat: {
    key: 'da_hoan_tat',
    label: 'Đã hoàn tất',
    pillClassName: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  dang_van_chuyen: {
    key: 'dang_van_chuyen',
    label: 'Đang vận chuyển',
    pillClassName: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  cho_xuat_cang: {
    key: 'cho_xuat_cang',
    label: 'Chờ xuất cảng',
    pillClassName: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  cho_thong_quan: {
    key: 'cho_thong_quan',
    label: 'Chờ thông quan',
    pillClassName: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  cho_chung_tu: {
    key: 'cho_chung_tu',
    label: 'Chờ chứng từ',
    pillClassName: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  thieu_du_lieu: {
    key: 'thieu_du_lieu',
    label: 'Thiếu dữ liệu',
    pillClassName: 'bg-rose-50 text-rose-700 border-rose-200',
  },
};

export const CONTAINER_STATUS_FILTERS = [
  STATUS_META.tat_ca,
  STATUS_META.da_hoan_tat,
  STATUS_META.dang_van_chuyen,
  STATUS_META.cho_xuat_cang,
  STATUS_META.cho_thong_quan,
  STATUS_META.cho_chung_tu,
  STATUS_META.thieu_du_lieu,
] as const;

function normalize(text?: string | null): string {
  return (text || '').toLowerCase();
}

function keyFieldCount(item: ContainerListItem): number {
  return [
    item.booking_no,
    item.bl_no,
    item.po_no,
    item.vessel,
    item.voyage,
    item.pol,
    item.pod,
    item.etd,
    item.eta,
    item.status_text,
  ].filter(Boolean).length;
}

export function getContainerCompleteness(item: ContainerListItem): CompletenessMeta {
  const score = keyFieldCount(item);
  if (score >= 8) {
    return {
      key: 'du_du_lieu',
      label: 'Đủ dữ liệu',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  }
  if (score <= 2) {
    return {
      key: 'chi_co_email',
      label: 'Chỉ có email',
      className: 'bg-rose-50 text-rose-700 border-rose-200',
    };
  }
  return {
    key: 'thieu_mot_phan',
    label: 'Thiếu một phần',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  };
}

export function getContainerStatusMeta(item: ContainerListItem): StatusMeta {
  const status = normalize(item.status_text);

  if (
    status.includes('hoàn tất') ||
    status.includes('phát hành lệnh giao hàng')
  ) {
    return STATUS_META.da_hoan_tat;
  }

  if (status.includes('thông quan')) {
    return STATUS_META.cho_thong_quan;
  }

  if (status.includes('xuất cảng') || (item.etd && !item.eta)) {
    return STATUS_META.cho_xuat_cang;
  }

  if (
    status.includes('đang vận chuyển') ||
    status.includes('thông báo hàng đến') ||
    (item.etd && item.eta && !status.includes('chờ'))
  ) {
    return STATUS_META.dang_van_chuyen;
  }

  if (
    status.includes('bản nháp vận đơn') ||
    status.includes('chứng từ') ||
    (item.booking_no && !item.bl_no)
  ) {
    return STATUS_META.cho_chung_tu;
  }

  return STATUS_META.thieu_du_lieu;
}
