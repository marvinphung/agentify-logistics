import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Database, Mail, Search } from 'lucide-react';

import { SearchHero } from '../components/search/SearchHero';
import { RecentContainerList } from '../components/search/RecentContainerList';
import { getAppHome, listContainers } from '../lib/agentify-api';
import { formatDateTime } from '../lib/format';
import { getPrimaryHomeState } from '../lib/home-state';
import type { AppHomeResponse, ContainerListItem } from '../types/api';

function toContainerListItem(item: AppHomeResponse['recent_containers'][number]): ContainerListItem {
  return {
    id: item.container_no,
    container_no: item.container_no,
    booking_no: item.booking_no,
    bl_no: item.bl_no,
    po_no: null,
    vessel: null,
    voyage: null,
    pol: null,
    pod: item.pod,
    etd: item.etd,
    eta: item.eta,
    status_text: item.status_text,
    source_count: item.source_count,
    attachment_count: item.attachment_count,
    updated_at: item.updated_at,
  };
}

export function SearchHome() {
  const navigate = useNavigate();
  const [home, setHome] = useState<AppHomeResponse | null>(null);
  const [results, setResults] = useState<ContainerListItem[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function loadHome() {
      setIsLoading(true);
      setError(null);
      try {
        const payload = await getAppHome();
        setHome(payload);
        setResults(payload.recent_containers.map(toContainerListItem));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Không tải được trang tra cứu.');
      } finally {
        setIsLoading(false);
      }
    }

    loadHome();
  }, []);

  async function handleSearch() {
    const trimmedQuery = query.trim();
    setHasSearched(true);

    if (!trimmedQuery) {
      setResults(home?.recent_containers.map(toContainerListItem) || []);
      return;
    }

    setIsSearching(true);
    setError(null);
    try {
      const response = await listContainers({ q: trimmedQuery, page_size: 20 });
      setResults(response.items);

      if (
        response.items.length === 1 &&
        response.items[0].container_no.toLowerCase() === trimmedQuery.toLowerCase()
      ) {
        navigate(`/containers/${response.items[0].container_no}`);
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Không tra cứu được dữ liệu.');
    } finally {
      setIsSearching(false);
    }
  }

  const primaryState = home ? getPrimaryHomeState(home) : 'empty';
  const displayItems = hasSearched ? results : home?.recent_containers.map(toContainerListItem) || [];

  return (
    <div className="min-h-[100dvh] bg-[#f7f7f1]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-6 lg:px-8">
        <SearchHero
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSearch}
          isSearching={isSearching}
        />

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <Database className="h-4 w-4" />
              <p className="text-sm">Số container hiện có</p>
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-900">
              {home?.container_count ?? (isLoading ? '...' : '0')}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {primaryState === 'ready'
                ? 'Sẵn sàng để CS/Ops tra cứu trực tiếp.'
                : 'Chưa có dữ liệu đủ để tra cứu.'}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <Mail className="h-4 w-4" />
              <p className="text-sm">Mailbox đang dùng</p>
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-900">
              {home?.connected_mailboxes[0]?.account_email || 'Chưa kết nối'}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Lần sync gần nhất: {formatDateTime(home?.last_sync_at || null)}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-[#f6f2ea] p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <Search className="h-4 w-4" />
              <p className="text-sm">Xem toàn bộ danh sách</p>
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-900">
              Quét nhanh tất cả container theo trạng thái nghiệp vụ
            </p>
            <Link
              to="/containers"
              className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Xem tất cả container
            </Link>
          </div>
        </section>

        {error ? (
          <div className="rounded-[24px] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {primaryState === 'empty' && !isLoading ? (
          <section className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">
              Chưa có dữ liệu để tra cứu
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Hãy kết nối Gmail và tạo lần đồng bộ đầu tiên. Khi có email và PDF được đưa vào hệ
              thống, danh sách container sẽ xuất hiện ngay tại trang này.
            </p>
            <Link
              to="/setup"
              className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Thiết lập dữ liệu
            </Link>
          </section>
        ) : (
          <RecentContainerList
            items={displayItems}
            title={hasSearched ? 'Kết quả tra cứu' : 'Container gần đây'}
            description={
              hasSearched
                ? 'Danh sách này được lấy trực tiếp từ dữ liệu container đã được tổng hợp từ email và PDF.'
                : 'Các container mới nhất để người dùng quay lại kiểm tra nhanh mà không phải nhập lại mã.'
            }
            emptyMessage={
              hasSearched
                ? 'Không tìm thấy container phù hợp với query này.'
                : 'Chưa có container nào trong dữ liệu gần đây.'
            }
          />
        )}
      </div>
    </div>
  );
}
