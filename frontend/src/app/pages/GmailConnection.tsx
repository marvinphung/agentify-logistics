import { Mail, Shield, FileText, X, Check } from 'lucide-react';

const steps = [
  { num: 1, name: 'Kết nối Gmail', active: true },
  { num: 2, name: 'Sync email', active: false },
  { num: 3, name: 'Trích xuất dữ liệu', active: false },
  { num: 4, name: 'Xem danh sách lô hàng', active: false },
  { num: 5, name: 'Hỏi AI nếu cần', active: false }
];

const permissions = [
  { text: 'Đọc tiêu đề email', allowed: true },
  { text: 'Đọc nội dung email', allowed: true },
  { text: 'Đọc file PDF đính kèm có text', allowed: true },
  { text: 'Không gửi email', allowed: false },
  { text: 'Không xóa email', allowed: false },
  { text: 'Không đọc Zalo trong prototype này', allowed: false }
];

export function GmailConnection() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Steps sidebar */}
        <div className="mb-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-medium mb-4 text-card-foreground">Quy trình</h3>
            <div className="space-y-3">
              {steps.map((step) => (
                <div key={step.num} className={`flex items-center gap-3 ${step.active ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                    step.active ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                  }`}>
                    {step.num}
                  </div>
                  <span>{step.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main panel */}
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold mb-3 text-card-foreground">Kết nối hộp thư logistics</h1>
            <p className="text-muted-foreground mb-8">
              Agentify đọc email logistics ở chế độ read-only để trích xuất container, booking, B/L, PO, ETA và chứng từ PDF.
            </p>

            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary/90 transition-colors flex items-center gap-3 mb-2">
              <Mail className="w-6 h-6" />
              Kết nối Gmail
            </button>
            <div className="flex items-center gap-2 mb-8">
              <div className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Read-only
              </div>
            </div>

            {/* Permissions card */}
            <div className="bg-accent/30 border border-border rounded-lg p-6 mb-8">
              <h3 className="font-medium mb-4 text-card-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Quyền truy cập
              </h3>
              <div className="space-y-3">
                {permissions.map((perm, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {perm.allowed ? (
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <span className={perm.allowed ? 'text-foreground' : 'text-muted-foreground'}>{perm.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-medium mb-4 text-card-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Ví dụ dữ liệu sẽ được trích xuất
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Container:</span>
                  <p className="font-medium text-card-foreground">MSCU1234567</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Booking:</span>
                  <p className="font-medium text-card-foreground">BKG-88921</p>
                </div>
                <div>
                  <span className="text-muted-foreground">B/L:</span>
                  <p className="font-medium text-card-foreground">HLCUSHA250601234</p>
                </div>
                <div>
                  <span className="text-muted-foreground">ETA:</span>
                  <p className="font-medium text-card-foreground">12/06/2026</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Loại tài liệu:</span>
                  <p className="font-medium text-card-foreground">Arrival Notice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
