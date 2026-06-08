import { Mail, Shield, Check, X, AlertCircle } from 'lucide-react';

export function SyncSettings() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-foreground">Cài đặt Sync</h1>

        {/* Gmail section */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="font-medium mb-4 text-card-foreground flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Kết nối Gmail
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tài khoản</p>
                <p className="font-medium text-foreground">ops@forwarder-demo.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Quyền</p>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success" />
                  <p className="font-medium text-foreground">Read-only</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Trạng thái hook</p>
                <p className="font-medium text-success flex items-center gap-2">
                  <span className="w-2 h-2 bg-success rounded-full"></span>
                  Đang lắng nghe email mới
                </p>
              </div>
              <div className="flex items-end">
                <button className="text-destructive hover:underline text-sm font-medium">
                  Ngắt kết nối
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Query sync section */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="font-medium mb-4 text-card-foreground">Query Sync</h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Gmail query filter</label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-mono text-sm"
              defaultValue='newer_than:90d (arrival notice OR booking OR "bill of lading" OR "B/L" OR "delivery order" OR container OR ETA OR POD OR EIR)'
            />
            <p className="text-sm text-muted-foreground mt-2">
              Cấu trúc query theo chuẩn Gmail search. Hệ thống sẽ chỉ quét email khớp với query này.
            </p>
          </div>
        </div>

        {/* File support section */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="font-medium mb-4 text-card-foreground">Hỗ trợ loại file</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-foreground">Email subject/body</span>
              <div className="flex items-center gap-2 text-success">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Đã hỗ trợ</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-foreground">PDF có text</span>
              <div className="flex items-center gap-2 text-success">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Đã hỗ trợ</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-foreground">PDF scan/ảnh</span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <X className="w-4 h-4" />
                <span className="text-sm">Chưa hỗ trợ OCR trong prototype</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-foreground">Zalo</span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <X className="w-4 h-4" />
                <span className="text-sm">Chưa hỗ trợ</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground">Excel import</span>
              <div className="flex items-center gap-2 text-warning">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Sẽ làm sau</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data policy section */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-medium mb-4 text-card-foreground flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Chính sách dữ liệu
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Không gửi email</p>
                <p className="text-sm text-muted-foreground">Agentify chỉ đọc email, không tự động gửi email đến bất kỳ ai</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Không xóa email</p>
                <p className="text-sm text-muted-foreground">Email gốc luôn được giữ nguyên trong Gmail</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Không chỉnh sửa email</p>
                <p className="text-sm text-muted-foreground">Agentify chỉ trích xuất dữ liệu, không sửa nội dung email</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Mỗi field extract đều có source</p>
                <p className="text-sm text-muted-foreground">Mọi dữ liệu trích xuất đều có nguồn gốc rõ ràng</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">User có thể xác nhận hoặc sửa match</p>
                <p className="text-sm text-muted-foreground">AI không tự động quyết định khi confidence thấp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
