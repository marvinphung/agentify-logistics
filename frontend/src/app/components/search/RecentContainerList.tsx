import { Link } from 'react-router';
import { ArrowUpRight, FileText, Package2 } from 'lucide-react';

import { formatDate, formatDateTime } from '../../lib/format';
import type { ContainerListItem } from '../../types/api';

type RecentContainerListProps = {
  items: ContainerListItem[];
  title: string;
  description: string;
  emptyMessage: string;
};

export function RecentContainerList({
  items,
  title,
  description,
  emptyMessage,
}: RecentContainerListProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_60px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">{title}</h2>
          <p className="text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <div className="rounded-full bg-[#f6f2ea] px-4 py-2 text-sm text-slate-600">
          {items.length} kết quả
        </div>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-[#fcfbf8] p-8 text-sm leading-6 text-slate-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/containers/${item.container_no}`}
              className="group rounded-[24px] border border-slate-200 bg-[#fcfbf8] p-5 transition hover:border-slate-900 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Package2 className="h-4 w-4 text-slate-500" />
                    <span className="font-mono text-base font-semibold text-slate-900">
                      {item.container_no}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.status_text || 'Chưa có status summary.'}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:text-slate-900" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-slate-500">ETA</p>
                  <p className="mt-1 font-medium text-slate-900">{formatDate(item.eta)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-slate-500">Route</p>
                  <p className="mt-1 font-medium text-slate-900">
                    {item.pol || '-'} → {item.pod || '-'}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-slate-500">Booking / B/L</p>
                  <p className="mt-1 font-medium text-slate-900">
                    {item.booking_no || item.bl_no || '-'}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="flex items-center gap-2 text-slate-500">
                    <FileText className="h-4 w-4" />
                    Nguồn
                  </p>
                  <p className="mt-1 font-medium text-slate-900">
                    {item.source_count} facts / {item.attachment_count} files
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Cập nhật {formatDateTime(item.updated_at)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
