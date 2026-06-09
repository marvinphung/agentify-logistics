import { Database, Mail, Package2, RefreshCw } from 'lucide-react';

import { formatDateTime } from '../../lib/format';
import { getDatabaseStatusLabel, getHealthStatusLabel } from '../../lib/logistics-labels';
import type { AppHomeResponse, HealthResponse } from '../../types/api';

type SetupStateCardsProps = {
  health: HealthResponse | null;
  home: AppHomeResponse | null;
};

export function SetupStateCards({ health, home }: SetupStateCardsProps) {
  const cards = [
    {
      label: 'Mailbox đã kết nối',
      value: String(home?.connected_mailboxes.length || 0),
      hint: home?.connected_mailboxes[0]?.account_email || 'Chưa có hộp thư',
      icon: Mail,
    },
    {
      label: 'Lần sync gần nhất',
      value: formatDateTime(home?.last_sync_at || null),
      hint: 'Theo lần đồng bộ hoàn tất gần nhất',
      icon: RefreshCw,
    },
    {
      label: 'Container đang có',
      value: String(home?.container_count || 0),
      hint: 'Đã tổng hợp để tra cứu',
      icon: Package2,
    },
    {
      label: 'Tình trạng backend',
      value: getHealthStatusLabel(health?.status),
      hint: `DB: ${getDatabaseStatusLabel(health?.database)}`,
      icon: Database,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-[24px] border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-slate-500">{card.label}</p>
            <card.icon className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-900">
            {card.value}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">{card.hint}</p>
        </div>
      ))}
    </div>
  );
}
