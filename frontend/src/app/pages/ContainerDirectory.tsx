import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Filter, Package2, Search } from 'lucide-react';

import { listContainers } from '../lib/agentify-api';
import {
  CONTAINER_STATUS_FILTERS,
  getContainerCompleteness,
  getContainerStatusMeta,
} from '../lib/container-status';
import { formatDate } from '../lib/format';
import { LOGISTICS_FIELD_LABELS } from '../lib/logistics-labels';
import { cn } from '../components/ui/utils';
import type { ContainerListItem } from '../types/api';

export function ContainerDirectory() {
  const [items, setItems] = useState<ContainerListItem[]>([]);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof CONTAINER_STATUS_FILTERS)[number]['key']>(
    'tat_ca',
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await listContainers({ page_size: 100 });
        setItems(response.items);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Không tải được danh sách container.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  const filteredItems = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    return items.filter((item) => {
      const statusMeta = getContainerStatusMeta(item);
      const matchesFilter = activeFilter === 'tat_ca' || statusMeta.key === activeFilter;
      const haystack = [
        item.container_no,
        item.booking_no,
        item.bl_no,
        item.po_no,
        item.vessel,
        item.voyage,
        item.pol,
        item.pod,
        item.status_text,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesQuery = !lowered || haystack.includes(lowered);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, items, query]);

  return (
    <div className="min-h-[100dvh] bg-[#f7f7f1]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_60px_rgba(15,23,42,0.04)] sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
                Danh mục container
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
                Xem tất cả container
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                Dùng bộ lọc để quét nhanh trạng thái nghiệp vụ: container nào đã hoàn tất, đang vận chuyển, chờ xuất cảng, chờ thông quan hoặc còn thiếu dữ liệu.
              </p>
            </div>
            <div className="rounded-full bg-[#f6f2ea] px-4 py-2 text-sm text-slate-600">
              {filteredItems.length} / {items.length} container
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Lọc nhanh theo mã container / booking / B/L / cảng / trạng thái"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {CONTAINER_STATUS_FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition',
                    activeFilter === filter.key
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900',
                  )}
                >
                  <Filter className="h-4 w-4" />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {error ? (
          <div className="rounded-[24px] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_60px_rgba(15,23,42,0.04)] sm:p-8">
          {isLoading ? (
            <div className="rounded-[24px] border border-dashed border-slate-300 bg-[#fcfbf8] p-8 text-sm leading-6 text-slate-500">
              Đang tải danh sách container...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-slate-300 bg-[#fcfbf8] p-8 text-sm leading-6 text-slate-500">
              Không có container nào khớp với bộ lọc hiện tại.
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredItems.map((item) => {
                const statusMeta = getContainerStatusMeta(item);
                const completeness = getContainerCompleteness(item);

                return (
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
                          {item.status_text || 'Chưa có trạng thái tổng hợp.'}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={cn('rounded-full border px-3 py-1 text-xs font-medium', statusMeta.pillClassName)}>
                          {statusMeta.label}
                        </span>
                        <span className={cn('rounded-full border px-3 py-1 text-xs font-medium', completeness.className)}>
                          {completeness.label}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                      <div className="min-h-24 rounded-2xl border border-slate-200 bg-white p-3">
                        <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.booking_no}</p>
                        <p className="mt-1 font-medium text-slate-900">{item.booking_no || '-'}</p>
                      </div>
                      <div className="min-h-24 rounded-2xl border border-slate-200 bg-white p-3">
                        <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.bl_no}</p>
                        <p className="mt-1 font-medium text-slate-900">{item.bl_no || '-'}</p>
                      </div>
                      <div className="min-h-24 rounded-2xl border border-slate-200 bg-white p-3">
                        <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.etd}</p>
                        <p className="mt-1 font-medium text-amber-700">{formatDate(item.etd)}</p>
                      </div>
                      <div className="min-h-24 rounded-2xl border border-slate-200 bg-white p-3">
                        <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.eta}</p>
                        <p className="mt-1 font-medium text-amber-700">{formatDate(item.eta)}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
