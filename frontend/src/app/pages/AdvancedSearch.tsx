import { Search } from 'lucide-react';
import { mockShipments } from '../data/mockData';
import { Link } from 'react-router';

export function AdvancedSearch() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-foreground">Tìm kiếm nâng cao</h1>

        {/* Search form */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Khách hàng</label>
              <input
                type="text"
                placeholder="Tên khách hàng..."
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Container</label>
              <input
                type="text"
                placeholder="MSCU1234567..."
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Booking</label>
              <input
                type="text"
                placeholder="BKG-..."
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">B/L</label>
              <input
                type="text"
                placeholder="B/L number..."
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">PO</label>
              <input
                type="text"
                placeholder="PO number..."
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tuyến</label>
              <select className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Tất cả tuyến</option>
                <option>Shanghai → Hải Phòng</option>
                <option>Ningbo → Cát Lái</option>
                <option>Busan → Hải Phòng</option>
                <option>Shenzhen → Cát Lái</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">ETA từ ngày</label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">ETA đến ngày</label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">PIC</label>
              <select className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Tất cả PIC</option>
                <option>Lan CS</option>
                <option>Minh Ops</option>
                <option>Huy Ops</option>
                <option>Trang Docs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Loại tài liệu đã có</label>
              <select className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Tất cả</option>
                <option>Booking Confirmation</option>
                <option>B/L Draft</option>
                <option>Arrival Notice</option>
                <option>D/O</option>
                <option>POD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Loại tài liệu còn thiếu</label>
              <select className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Tất cả</option>
                <option>D/O</option>
                <option>POD</option>
                <option>B/L</option>
                <option>Customs clearance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confidence (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  className="flex-1 px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  placeholder="100"
                  min="0"
                  max="100"
                  className="flex-1 px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" />
              Tìm kiếm
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Xóa bộ lọc
            </button>
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-foreground font-medium">Tìm thấy {mockShipments.length} lô hàng phù hợp</p>
          <select className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
            <option>ETA gần nhất</option>
            <option>Cập nhật mới nhất</option>
            <option>Confidence thấp nhất</option>
            <option>Thiếu nhiều thông tin nhất</option>
          </select>
        </div>

        {/* Results table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Lô hàng</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Khách hàng</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Container</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tuyến</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ETA</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-muted/30">
                    <td className="px-4 py-4">
                      <Link to={`/shipments/${shipment.id}`} className="text-primary hover:underline font-medium">
                        {shipment.id}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">{shipment.customer}</td>
                    <td className="px-4 py-4 text-sm font-mono text-foreground">{shipment.container}</td>
                    <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">{shipment.pol} → {shipment.pod}</td>
                    <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">
                      {new Date(shipment.eta).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        shipment.status.includes('Đã giao') ? 'bg-success/10 text-success' :
                        shipment.status.includes('thay đổi') ? 'bg-destructive/10 text-destructive' :
                        'bg-secondary/10 text-secondary'
                      }`}>
                        {shipment.status}
                      </span>
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
