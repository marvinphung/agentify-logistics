import { Send, AlertCircle, FileText, Mail } from 'lucide-react';
import { useState } from 'react';
import { mockShipments } from '../data/mockData';

const suggestedQuestions = [
  'Container MSCU1234567 đang tới đâu?',
  'Lô này còn thiếu chứng từ gì?',
  'Có email nào báo ETA thay đổi không?',
  'Tóm tắt lịch sử xử lý lô này.',
  'Soạn nháp trả lời khách bằng tiếng Việt.'
];

export function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'user',
      content: 'Container MSCU1234567 đã giao kho chưa?'
    },
    {
      role: 'assistant',
      content: 'Chưa thấy dữ liệu xác nhận đã giao kho trong Agentify. Hiện hệ thống đã có Arrival Notice lúc 09:12 ngày 11/06 và ETA là 12/06/2026. Chưa thấy POD, trucking status hoặc xác nhận kho đã nhận hàng.',
      sources: [
        { type: 'email', title: 'Arrival Notice từ Maersk', date: '11/06 09:12' },
        { type: 'pdf', title: 'arrival_notice_MSCU1234567.pdf' },
        { type: 'shipment', title: 'SHP-2026-001' }
      ]
    }
  ]);
  const [input, setInput] = useState('');

  const currentShipment = mockShipments[0];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-foreground">Hỏi Agentify</h1>

        <div className="grid grid-cols-4 gap-6">
          {/* Left panel */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-medium mb-4 text-card-foreground">Shipment hiện tại</h3>
            <div className="mb-6">
              <select className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                <option>{currentShipment.id} / {currentShipment.container}</option>
                {mockShipments.slice(1).map(s => (
                  <option key={s.id}>{s.id} / {s.container}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Container</p>
                <p className="font-mono font-medium text-foreground">{currentShipment.container}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Khách hàng</p>
                <p className="font-medium text-foreground">{currentShipment.customer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">ETA</p>
                <p className="font-medium text-foreground">{new Date(currentShipment.eta).toLocaleDateString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <span className="px-2 py-1 rounded text-xs bg-secondary/10 text-secondary">
                  {currentShipment.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Thiếu</p>
                <div className="flex flex-wrap gap-1">
                  {currentShipment.missing.map((item, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-xs bg-warning/10 text-warning">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main chat */}
          <div className="col-span-3 flex flex-col">
            {/* Suggested questions */}
            <div className="bg-card rounded-lg border border-border p-6 mb-4">
              <h3 className="font-medium mb-3 text-card-foreground">Câu hỏi gợi ý</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(question)}
                    className="px-4 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg text-sm transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 bg-card rounded-lg border border-border p-6 mb-4 overflow-y-auto">
              <div className="space-y-6">
                {messages.map((message, idx) => (
                  <div key={idx} className={`${message.role === 'user' ? 'text-right' : ''}`}>
                    {message.role === 'user' ? (
                      <div className="inline-block bg-primary text-primary-foreground px-4 py-3 rounded-lg max-w-2xl">
                        {message.content}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-muted/30 px-4 py-3 rounded-lg max-w-3xl">
                          <p className="text-foreground">{message.content}</p>
                        </div>
                        {message.sources && (
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Sources:</p>
                            {message.sources.map((source, sidx) => (
                              <div key={sidx} className="bg-accent/30 border border-border rounded p-3 flex items-start gap-3 max-w-md">
                                {source.type === 'email' && <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />}
                                {source.type === 'pdf' && <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />}
                                {source.type === 'shipment' && <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />}
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">{source.title}</p>
                                  {source.date && <p className="text-xs text-muted-foreground">{source.date}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Warning note */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-warning-foreground">
                AI chỉ trả lời dựa trên dữ liệu đã có trong Agentify. Nếu chưa có dữ liệu, hệ thống sẽ không đoán.
              </p>
            </div>

            {/* Input */}
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hỏi về container, booking, B/L, PO, ETA, chứng từ..."
                  className="flex-1 px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && input.trim()) {
                      setMessages([...messages, { role: 'user', content: input }]);
                      setInput('');
                    }
                  }}
                />
                <button
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                  onClick={() => {
                    if (input.trim()) {
                      setMessages([...messages, { role: 'user', content: input }]);
                      setInput('');
                    }
                  }}
                >
                  <Send className="w-4 h-4" />
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
