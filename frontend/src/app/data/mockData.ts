export const mockShipments = [
  {
    id: 'SHP-2026-001',
    customer: 'ABC Manufacturing Vietnam',
    container: 'MSCU1234567',
    seal: 'SL998811',
    booking: 'BKG-88921',
    bl: 'HLCUSHA250601234',
    po: '450012345',
    vessel: 'MAERSK HANOI',
    voyage: '126E',
    pol: 'Shanghai',
    pod: 'Hải Phòng',
    etd: '2026-06-06',
    eta: '2026-06-12',
    status: 'Đã nhận Arrival Notice',
    missing: ['D/O', 'POD'],
    confidence: 94,
    pic: 'Lan CS',
    lastUpdate: '09:12 hôm nay',
    risk: 'medium'
  },
  {
    id: 'SHP-2026-002',
    customer: 'Delta Electronics',
    container: 'ONEU9988776',
    seal: 'SL776655',
    booking: 'ONE-77231',
    bl: 'ONEYSHA25067721',
    po: '450078900',
    vessel: 'ONE HARMONY',
    voyage: 'EW3',
    pol: 'Ningbo',
    pod: 'Cát Lái',
    etd: '2026-06-08',
    eta: '2026-06-15',
    status: 'ETA thay đổi',
    missing: ['Cần update khách'],
    confidence: 91,
    pic: 'Minh Ops',
    lastUpdate: '08:30 hôm nay',
    risk: 'high'
  },
  {
    id: 'SHP-2026-003',
    customer: 'Viet Auto Parts',
    container: 'TGHU7654321',
    seal: 'SL334455',
    booking: 'CMA-55290',
    bl: 'CMDUCN2509981',
    po: '450045678',
    vessel: 'CMA TIGER',
    voyage: 'VN2',
    pol: 'Busan',
    pod: 'Hải Phòng',
    etd: '2026-06-03',
    eta: '2026-06-10',
    status: 'Đã giao kho',
    missing: [],
    confidence: 96,
    pic: 'Huy Ops',
    lastUpdate: 'Hôm qua',
    risk: 'low'
  },
  {
    id: 'SHP-2026-004',
    customer: 'Green Textile',
    container: 'CMAU1122334',
    seal: 'SL223344',
    booking: 'BKG-77520',
    bl: '',
    po: '',
    vessel: 'CMA LOTUS',
    voyage: 'SZ8',
    pol: 'Shenzhen',
    pod: 'Cát Lái',
    etd: '2026-06-10',
    eta: '2026-06-18',
    status: 'Thiếu B/L Draft',
    missing: ['B/L Draft'],
    confidence: 78,
    pic: 'Trang Docs',
    lastUpdate: 'Hôm qua',
    risk: 'medium'
  },
  {
    id: 'SHP-2026-005',
    customer: 'Mekong Furniture',
    container: 'TEMU5566778',
    seal: '',
    booking: 'TEM-88201',
    bl: '',
    po: '',
    vessel: 'EVER GLORY',
    voyage: 'MK1',
    pol: 'Shanghai',
    pod: 'Cát Lái',
    etd: '2026-06-12',
    eta: '2026-06-20',
    status: 'Cần review matching',
    missing: ['PDF scan cần OCR'],
    confidence: 52,
    pic: '',
    lastUpdate: '2 ngày trước',
    risk: 'high'
  }
];

export const mockEmails = [
  {
    id: 1,
    time: '09:12',
    sender: 'Maersk',
    subject: 'Arrival Notice - MSCU1234567 - ETA 12 Jun',
    identifiers: ['MSCU1234567', 'BKG-88921'],
    docType: 'Arrival Notice',
    status: 'Đã match',
    shipmentId: 'SHP-2026-001'
  },
  {
    id: 2,
    time: '08:45',
    sender: 'ABC Customer',
    subject: 'Re: PO 450012345 delivery update',
    identifiers: ['PO 450012345'],
    docType: 'Customer Email',
    status: 'Cần review',
    shipmentId: null
  },
  {
    id: 3,
    time: '08:30',
    sender: 'ONE Line',
    subject: 'ETA Change Notice - ONEU9988776',
    identifiers: ['ONEU9988776'],
    docType: 'ETA Update',
    status: 'Đã match',
    shipmentId: 'SHP-2026-002'
  },
  {
    id: 4,
    time: '07:55',
    sender: 'Trucking Team',
    subject: 'POD attached - TGHU7654321',
    identifiers: ['TGHU7654321'],
    docType: 'POD',
    status: 'Đã match',
    shipmentId: 'SHP-2026-003'
  },
  {
    id: 5,
    time: '07:20',
    sender: 'Unknown Agent',
    subject: 'Scan document attached',
    identifiers: ['Không rõ'],
    docType: 'PDF Scan',
    status: 'Cần OCR',
    shipmentId: null
  }
];

export const mockTimeline = [
  {
    date: '03/06 10:20',
    event: 'Đã nhận Booking Confirmation',
    source: 'Email từ Maersk'
  },
  {
    date: '04/06 15:45',
    event: 'Đã nhận B/L Draft',
    source: 'PDF attachment'
  },
  {
    date: '05/06 09:00',
    event: 'Đã nhận Commercial Invoice',
    source: 'File đính kèm'
  },
  {
    date: '06/06 22:10',
    event: 'Tàu rời Shanghai',
    source: 'Email carrier'
  },
  {
    date: '10/06 08:30',
    event: 'ETA cập nhật sang 12/06',
    source: 'Email notice'
  },
  {
    date: '11/06 09:12',
    event: 'Đã nhận Arrival Notice',
    source: 'PDF đính kèm'
  }
];

export const mockReviewQueue = [
  {
    id: 1,
    source: 'Email từ ABC Customer',
    identifiers: 'PO 450012345',
    suggestedMatch: 'SHP-2026-001 hoặc SHP-2026-006',
    confidence: 62,
    reason: 'PO trùng nhưng không có container'
  },
  {
    id: 2,
    source: 'PDF B/L Draft',
    identifiers: 'HLCUSHA250601234',
    suggestedMatch: 'SHP-2026-001',
    confidence: 78,
    reason: 'Thiếu container trong PDF'
  },
  {
    id: 3,
    source: 'PDF Scan',
    identifiers: 'Không rõ',
    suggestedMatch: 'Không có',
    confidence: 0,
    reason: 'Cần OCR, prototype chưa hỗ trợ'
  },
  {
    id: 4,
    source: 'Email từ Unknown Agent',
    identifiers: 'BKG-88921',
    suggestedMatch: 'SHP-2026-001',
    confidence: 70,
    reason: 'Sender lạ'
  }
];
