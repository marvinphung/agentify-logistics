import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Eye, Package, Search } from 'lucide-react';
import { listContainers } from '../lib/agentify-api';
import type { ContainerListItem } from '../types/api';
import { formatDate, formatDateTime } from '../lib/format';

export function ShipmentList() {
  const [query, setQuery] = useState('');
  const [containers, setContainers] = useState<ContainerListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadContainers(searchQuery?: string) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await listContainers({
        q: searchQuery || undefined,
        page_size: 50,
      });
      setContainers(response.items);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Không tải được containers.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      loadContainers(query);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [query]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Container lookup</h1>
            <p className="mt-2 text-muted-foreground">
              Danh sách này đọc trực tiếp từ bảng `containers`, không còn render shipment mock.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            {containers.length} container
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm container, booking, B/L, PO"
              className="w-full rounded-lg border border-border bg-input-background py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Container</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Booking</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">B/L</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">PO</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tuyến</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ETA / ETD</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Nguồn</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Cập nhật</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Xem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {containers.map((container) => (
                  <tr key={container.id} className="hover:bg-muted/30">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" />
                        <span className="font-mono font-medium text-foreground">
                          {container.container_no}
                        </span>
                      </div>
                      {container.status_text ? (
                        <p className="mt-1 text-xs text-muted-foreground">{container.status_text}</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 text-sm font-mono text-foreground">{container.booking_no || '-'}</td>
                    <td className="px-4 py-4 text-sm font-mono text-foreground">{container.bl_no || '-'}</td>
                    <td className="px-4 py-4 text-sm font-mono text-foreground">{container.po_no || '-'}</td>
                    <td className="px-4 py-4 text-sm text-foreground">
                      {container.pol || '-'} → {container.pod || '-'}
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">
                      <div>ETA: {formatDate(container.eta)}</div>
                      <div className="text-muted-foreground">ETD: {formatDate(container.etd)}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">
                      {container.source_count} facts / {container.attachment_count} files
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {formatDateTime(container.updated_at)}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <Link
                        to={`/containers/${container.container_no}`}
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <Eye className="h-4 w-4" />
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
                {!isLoading && containers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-sm text-muted-foreground">
                      {error || 'Chưa có container nào trong DB.'}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
