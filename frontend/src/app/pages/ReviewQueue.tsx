import { mockReviewQueue } from '../data/mockData';
import { AlertCircle, Check, X, Eye } from 'lucide-react';

const filters = ['Tất cả', 'Cần chọn shipment', 'PDF cần OCR', 'Thiếu mã định danh', 'Nhiều shipment có thể khớp'];

export function ReviewQueue() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Hàng đợi review</h1>
          <p className="text-muted-foreground">Các email hoặc file có confidence thấp cần người dùng xác nhận.</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'Tất cả'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-card-foreground border border-border hover:bg-accent'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Table */}
          <div className="col-span-2">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Nguồn</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Mã tìm thấy</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Gợi ý match</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Confidence</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Lý do</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockReviewQueue.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/30">
                        <td className="px-4 py-4 text-sm text-foreground">{item.source}</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="font-mono text-foreground">{item.identifiers}</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-foreground">{item.suggestedMatch}</td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  item.confidence >= 70 ? 'bg-warning' :
                                  item.confidence > 0 ? 'bg-destructive' : 'bg-muted-foreground'
                                }`}
                                style={{ width: `${item.confidence}%` }}
                              />
                            </div>
                            <span className="text-xs text-foreground">{item.confidence}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground max-w-xs">{item.reason}</td>
                        <td className="px-4 py-4 text-sm">
                          <button className="text-primary hover:underline flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {item.confidence === 0 ? 'Xem' : 'Chọn'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Preview panel */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-medium mb-4 text-card-foreground">Chi tiết</h3>
            <div className="bg-muted/30 border border-border rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Chọn một mục để xem chi tiết</p>
              <div className="flex items-center gap-2 text-sm text-warning">
                <AlertCircle className="w-4 h-4" />
                <span>Có {mockReviewQueue.length} mục cần review</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Ví dụ: Email từ ABC Customer</h4>
                <div className="bg-muted/20 rounded p-3 text-sm text-foreground mb-3">
                  <p className="mb-2">Subject: Re: PO 450012345 delivery update</p>
                  <p className="text-muted-foreground">
                    "Hi team, please confirm delivery date for PO 450012345. Our warehouse is waiting."
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Shipment gợi ý</h4>
                <div className="space-y-2">
                  <div className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
                    <p className="font-medium text-foreground text-sm">SHP-2026-001</p>
                    <p className="text-xs text-muted-foreground">PO 450012345, ABC Manufacturing</p>
                    <p className="text-xs text-warning mt-1">Confidence: 62% - Không có container</p>
                  </div>
                  <div className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
                    <p className="font-medium text-foreground text-sm">SHP-2026-006</p>
                    <p className="text-xs text-muted-foreground">PO 450012345, Delta Electronics</p>
                    <p className="text-xs text-warning mt-1">Confidence: 58% - Khách hàng khác</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Xác nhận match
              </button>
              <button className="w-full bg-card text-card-foreground border border-border px-4 py-2 rounded-lg font-medium hover:bg-accent transition-colors">
                Chọn shipment khác
              </button>
              <button className="w-full bg-card text-card-foreground border border-border px-4 py-2 rounded-lg font-medium hover:bg-accent transition-colors">
                Tạo shipment mới
              </button>
              <button className="w-full bg-card text-muted-foreground border border-border px-4 py-2 rounded-lg font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2">
                <X className="w-4 h-4" />
                Bỏ qua
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
