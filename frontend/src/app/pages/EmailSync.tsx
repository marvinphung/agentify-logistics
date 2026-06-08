import { Mail, RefreshCw, FileText, Eye, AlertCircle } from 'lucide-react';
import { mockEmails } from '../data/mockData';
import { Link } from 'react-router';

export function EmailSync() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-foreground">Sync Email</h1>

        {/* Connection card */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gmail đã kết nối</p>
              <p className="font-medium text-card-foreground">ops@forwarder-demo.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Quyền</p>
              <p className="font-medium text-card-foreground">Read-only</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Lần sync gần nhất</p>
              <p className="font-medium text-card-foreground">5 phút trước</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Trạng thái hook</p>
              <p className="font-medium text-success flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                Đang lắng nghe email mới
              </p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-card rounded-lg border border-border p-5">
            <p className="text-2xl font-semibold text-card-foreground">248</p>
            <p className="text-sm text-muted-foreground mt-1">Email đã quét</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-5">
            <p className="text-2xl font-semibold text-card-foreground">37</p>
            <p className="text-sm text-muted-foreground mt-1">Lô hàng đã tạo</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-5">
            <p className="text-2xl font-semibold text-card-foreground">86</p>
            <p className="text-sm text-muted-foreground mt-1">File PDF đã đọc</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-5">
            <p className="text-2xl font-semibold text-warning">12</p>
            <p className="text-sm text-muted-foreground mt-1">Mục cần review</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-5">
            <p className="text-2xl font-semibold text-muted-foreground">5</p>
            <p className="text-sm text-muted-foreground mt-1">PDF cần OCR</p>
          </div>
        </div>

        {/* Pipeline */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="font-medium mb-4 text-card-foreground">Pipeline xử lý</h3>
          <div className="flex items-center gap-3 overflow-x-auto">
            {['Email mới', 'Parse title/body', 'Parse PDF text', 'Extract field', 'Match shipment', 'Lưu DB'].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3 flex-shrink-0">
                <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm whitespace-nowrap">
                  {step}
                </div>
                {idx < 5 && <div className="text-muted-foreground">→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync thủ công
          </button>
          <button className="bg-card text-card-foreground border border-border px-6 py-2 rounded-lg font-medium hover:bg-accent transition-colors flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Xem email mới
          </button>
        </div>

        {/* Recent emails table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-medium text-card-foreground">Email xử lý gần đây</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Thời gian</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Người gửi</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Tiêu đề</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Mã nhận diện</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Loại tài liệu</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockEmails.map((email) => (
                  <tr key={email.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4 text-sm text-foreground">{email.time}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{email.sender}</td>
                    <td className="px-6 py-4 text-sm text-foreground max-w-xs truncate">{email.subject}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {email.identifiers.map((id, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded">
                            {id}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{email.docType}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        email.status === 'Đã match' ? 'bg-success/10 text-success' :
                        email.status === 'Cần review' ? 'bg-warning/10 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {email.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {email.shipmentId ? (
                        <Link to={`/emails/${email.id}`} className="text-primary hover:underline flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          Xem
                        </Link>
                      ) : (
                        <Link to="/review" className="text-warning hover:underline flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          Review
                        </Link>
                      )}
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
