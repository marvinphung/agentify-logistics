import { useParams, Link } from 'react-router';
import { mockShipments, mockTimeline } from '../data/mockData';
import { AlertTriangle, Ship, MapPin, Calendar, FileText, MessageSquare, Upload, Edit, Flag } from 'lucide-react';

export function ShipmentDetail() {
  const { id } = useParams();
  const shipment = mockShipments.find(s => s.id === id) || mockShipments[0];

  const checklist = [
    { item: 'Booking Confirmation', status: 'complete' },
    { item: 'B/L Draft', status: 'complete' },
    { item: 'Arrival Notice', status: 'complete' },
    { item: 'D/O', status: 'missing' },
    { item: 'Trạng thái hải quan', status: 'missing' },
    { item: 'Trucking status', status: 'missing' },
    { item: 'POD', status: 'missing' }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">{shipment.id}</h1>
              <p className="text-muted-foreground">Khách hàng: {shipment.customer}</p>
            </div>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm ${
                shipment.status.includes('Đã giao') ? 'bg-success/10 text-success' :
                'bg-secondary/10 text-secondary'
              }`}>
                {shipment.status}
              </span>
              {shipment.missing.length > 0 && (
                <span className="px-3 py-1 rounded-full text-sm bg-warning/10 text-warning flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  Thiếu {shipment.missing.join(', ')}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">PIC:</span>
            <span className="font-medium text-foreground">{shipment.pic || 'Chưa gán'}</span>
          </div>
        </div>

        {/* Identification card */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="font-medium mb-4 text-card-foreground">Thông tin định danh</h3>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Container</p>
              <p className="font-mono font-medium text-foreground">{shipment.container}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Seal</p>
              <p className="font-mono font-medium text-foreground">{shipment.seal || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Booking</p>
              <p className="font-mono font-medium text-foreground">{shipment.booking}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">B/L</p>
              <p className="font-mono font-medium text-foreground">{shipment.bl || 'Chưa có'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">PO</p>
              <p className="font-mono font-medium text-foreground">{shipment.po || '-'}</p>
            </div>
            <div className="col-span-3">
              <p className="text-sm text-muted-foreground mb-1">Vessel/Voyage</p>
              <p className="font-medium text-foreground">{shipment.vessel} / {shipment.voyage}</p>
            </div>
          </div>
        </div>

        {/* Route card */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="font-medium mb-4 text-card-foreground flex items-center gap-2">
            <Ship className="w-5 h-5 text-primary" />
            Tuyến vận chuyển
          </h3>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> POL
              </p>
              <p className="font-medium text-foreground">{shipment.pol}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> POD
              </p>
              <p className="font-medium text-foreground">{shipment.pod}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> ETD
              </p>
              <p className="font-medium text-foreground">{new Date(shipment.etd).toLocaleDateString('vi-VN')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> ETA
              </p>
              <p className="font-medium text-foreground">{new Date(shipment.eta).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Cập nhật mới nhất: {shipment.lastUpdate} từ email Maersk
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Timeline */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-medium mb-4 text-card-foreground">Timeline</h3>
            <div className="space-y-4">
              {mockTimeline.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      idx === mockTimeline.length - 1 ? 'bg-primary' : 'bg-secondary'
                    }`} />
                    {idx < mockTimeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                    <p className="font-medium text-foreground">{item.event}</p>
                    <p className="text-sm text-muted-foreground">Source: {item.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary and checklist */}
          <div className="space-y-6">
            {/* AI Summary */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-medium mb-3 text-card-foreground">Tóm tắt tự động</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lô hàng nhập FCL của {shipment.customer}. Hệ thống đã tìm thấy Booking Confirmation, B/L Draft và Arrival Notice.
                ETA hiện tại là {new Date(shipment.eta).toLocaleDateString('vi-VN')} tại {shipment.pod}.
                Chưa thấy dữ liệu D/O, trucking status hoặc POD trong Agentify.
              </p>
            </div>

            {/* Checklist */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-medium mb-4 text-card-foreground">Checklist</h3>
              <div className="space-y-2">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{item.item}</span>
                    <span className={`text-sm px-2 py-0.5 rounded ${
                      item.status === 'complete'
                        ? 'bg-success/10 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {item.status === 'complete' ? 'Đã có' : 'Chưa thấy'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data sources */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-medium mb-3 text-card-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Nguồn dữ liệu
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-2xl font-semibold text-foreground">4</p>
                  <p className="text-muted-foreground">Email liên quan</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">3</p>
                  <p className="text-muted-foreground">PDF đã đọc</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-muted-foreground">0</p>
                  <p className="text-muted-foreground">Ảnh/OCR</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">1</p>
                  <p className="text-muted-foreground">Dòng Excel import</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          <Link to="/ai" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Hỏi về lô hàng này
          </Link>
          <button className="bg-card text-card-foreground border border-border px-6 py-2 rounded-lg font-medium hover:bg-accent transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload tài liệu
          </button>
          <button className="bg-card text-card-foreground border border-border px-6 py-2 rounded-lg font-medium hover:bg-accent transition-colors flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Thêm ghi chú
          </button>
          <button className="bg-card text-card-foreground border border-border px-6 py-2 rounded-lg font-medium hover:bg-accent transition-colors flex items-center gap-2">
            <Flag className="w-4 h-4" />
            Đánh dấu cần review
          </button>
        </div>
      </div>
    </div>
  );
}
