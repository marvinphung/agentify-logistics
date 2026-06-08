import { Search, Filter, Eye, AlertTriangle } from 'lucide-react';
import { mockShipments } from '../data/mockData';
import { Link } from 'react-router';

const filterChips = [
  'Tất cả',
  'ETA tuần này',
  'Thiếu D/O',
  'Thiếu POD',
  'Cần review',
  'ETA thay đổi',
  'Đã giao kho',
  'PDF cần OCR'
];

export function ShipmentList() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-foreground">Danh sách lô hàng</h1>

        {/* Search bar */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm container, booking, B/L, PO, khách hàng..."
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select className="px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Cập nhật mới nhất</option>
              <option>ETA gần nhất</option>
              <option>Rủi ro cao nhất</option>
              <option>Tên khách hàng</option>
            </select>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {filterChips.map((chip) => (
              <button
                key={chip}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  chip === 'Tất cả'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Shipments table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Lô hàng</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Khách hàng</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Container</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Booking</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">B/L</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tuyến</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ETA</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Thiếu</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Confidence</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">PIC</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Cập nhật</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-muted/30">
                    <td className="px-4 py-4">
                      <Link to={`/shipments/${shipment.id}`} className="text-primary hover:underline font-medium flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {shipment.id}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground max-w-xs">{shipment.customer}</td>
                    <td className="px-4 py-4 text-sm font-mono text-foreground">{shipment.container}</td>
                    <td className="px-4 py-4 text-sm font-mono text-foreground">{shipment.booking}</td>
                    <td className="px-4 py-4 text-sm font-mono text-foreground">{shipment.bl || '-'}</td>
                    <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">{shipment.pol} → {shipment.pod}</td>
                    <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">
                      {new Date(shipment.eta).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                        shipment.status.includes('Đã giao') ? 'bg-success/10 text-success' :
                        shipment.status.includes('thay đổi') || shipment.status.includes('review') ? 'bg-destructive/10 text-destructive' :
                        shipment.status.includes('Thiếu') ? 'bg-warning/10 text-warning' :
                        'bg-secondary/10 text-secondary'
                      }`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {shipment.missing.length > 0 ? (
                        <div className="flex items-center gap-1 text-warning">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{shipment.missing.length}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              shipment.confidence >= 90 ? 'bg-success' :
                              shipment.confidence >= 70 ? 'bg-warning' : 'bg-destructive'
                            }`}
                            style={{ width: `${shipment.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-foreground">{shipment.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">{shipment.pic || '-'}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">{shipment.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
