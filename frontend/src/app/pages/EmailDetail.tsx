import { useParams, Link } from 'react-router';
import { mockEmails, mockShipments } from '../data/mockData';
import { Mail, Paperclip, Check, AlertTriangle, ArrowRight } from 'lucide-react';

export function EmailDetail() {
  const { id } = useParams();
  const email = mockEmails.find(e => e.id === parseInt(id || '1')) || mockEmails[0];
  const matchedShipment = email.shipmentId
    ? mockShipments.find(s => s.id === email.shipmentId)
    : null;

  const extractedFields = [
    { label: 'Loại tài liệu', value: 'Arrival Notice' },
    { label: 'Container', value: 'MSCU1234567', confidence: 98 },
    { label: 'Booking', value: 'BKG-88921', confidence: 95 },
    { label: 'B/L', value: 'HLCUSHA250601234', confidence: 92 },
    { label: 'Vessel/Voyage', value: 'MAERSK HANOI / 126E', confidence: 96 },
    { label: 'POL', value: 'Shanghai', confidence: 100 },
    { label: 'POD', value: 'Hải Phòng', confidence: 100 },
    { label: 'ETA', value: '12/06/2026', confidence: 94 },
    { label: 'Consignee', value: 'ABC Manufacturing Vietnam', confidence: 89 }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-foreground">Kết quả trích xuất email</h1>

        <div className="grid grid-cols-2 gap-6">
          {/* Left panel - Email preview */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-medium mb-4 text-card-foreground flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Email preview
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">From</p>
                <p className="font-medium text-foreground">Maersk Import CS</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Subject</p>
                <p className="font-medium text-foreground">Arrival Notice - MSCU1234567 - ETA 12 Jun 2026</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Time</p>
                <p className="font-medium text-foreground">11/06/2026 09:12</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Body</p>
                <div className="bg-muted/30 p-4 rounded-lg text-sm text-foreground">
                  <p className="mb-2">Dear valued customer,</p>
                  <p className="mb-2">Please find attached arrival notice for your shipment.</p>
                  <p className="mb-2">Container: MSCU1234567</p>
                  <p className="mb-2">Vessel: MAERSK HANOI Voyage: 126E</p>
                  <p className="mb-2">ETA Hai Phong: 12 June 2026</p>
                  <p>Best regards,<br />Maersk Import Team</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Attachment</p>
                <div className="flex items-center gap-2 p-3 bg-accent/30 rounded-lg">
                  <Paperclip className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">arrival_notice_MSCU1234567.pdf</span>
                  <span className="text-xs text-muted-foreground ml-auto">245 KB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel - Extracted fields */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-medium mb-4 text-card-foreground">Trường dữ liệu đã trích xuất</h3>

              <div className="space-y-3">
                {extractedFields.map((field, idx) => (
                  <div key={idx} className="flex items-start justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{field.label}</p>
                      <p className="font-medium text-foreground">{field.value}</p>
                    </div>
                    {field.confidence && (
                      <div className="flex items-center gap-2 ml-4">
                        <div className="w-16 bg-muted rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              field.confidence >= 90 ? 'bg-success' :
                              field.confidence >= 70 ? 'bg-warning' : 'bg-destructive'
                            }`}
                            style={{ width: `${field.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{field.confidence}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">Overall Confidence</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="h-2 rounded-full bg-success" style={{ width: '94%' }} />
                  </div>
                  <span className="font-medium text-foreground">94%</span>
                </div>
              </div>
            </div>

            {/* Match section */}
            {matchedShipment && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-medium mb-4 text-card-foreground">Match vào lô hàng</h3>

                <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-5 h-5 text-success" />
                    <span className="font-medium text-success">Đã match thành công</span>
                  </div>
                  <Link
                    to={`/shipments/${matchedShipment.id}`}
                    className="text-primary hover:underline font-medium flex items-center gap-1"
                  >
                    {matchedShipment.id} - {matchedShipment.customer}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Lý do match:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      Container trùng khớp (MSCU1234567)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      Booking trùng khớp (BKG-88921)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      B/L trùng khớp (HLCUSHA250601234)
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              <button className="w-full bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Xác nhận đúng
              </button>
              <button className="w-full bg-card text-card-foreground border border-border px-6 py-2.5 rounded-lg font-medium hover:bg-accent transition-colors">
                Chọn lô hàng khác
              </button>
              <button className="w-full bg-card text-card-foreground border border-border px-6 py-2.5 rounded-lg font-medium hover:bg-accent transition-colors">
                Tạo lô hàng mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
