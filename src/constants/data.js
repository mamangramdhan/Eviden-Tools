// ============================================
// DATA CONSTANTS
// Data statis yang digunakan di seluruh aplikasi
// ============================================

// Labels foto untuk GANTI NTE
export const PHOTO_LABELS = {
  ONT: [
    'NTE LAMA (Scan QR-Code)',
    'NTE BARU (Scan QR-Code)',
    'Tampak Atas SEBELUM',
    'Tampak Atas SESUDAH',
    'Screenshot SCC',
    'Screenshot Valins',
  ],
  STB: [
    'NTE LAMA (Scan QR-Code)',
    'NTE BARU (Scan QR-Code)',
    'Tampak Atas SEBELUM',
    'Tampak Atas SESUDAH',
    'Screenshot SCC',
    'LiveTV',
  ],
};

// Jenis tiket options
export const JENIS_TIKET_OPTIONS = ['REGULER', 'HVC', 'SQM', 'UNSPECT'];

// Dropdown options untuk Reguler page
export const MATERIAL_OPTIONS = [
  'DROPCORE',
  'IKR',
  'ONT',
  'STB',
  'ODP',
  'ODC',
  'KABEL FIBER',
  'SPLITTER',
  'TERMINAL',
  'LAINNYA',
];

// Statistik default untuk HomePage
export const DEFAULT_STATS = [
  { 
    label: 'Tiket Selesai', 
    value: '8', 
    sub: 'dari 10 target', 
    iconName: 'CheckCircle2',
    color: 'emerald',
  },
  { 
    label: 'Tiket Aktif', 
    value: '2', 
    sub: 'sedang dikerjakan', 
    iconName: 'Clock',
    color: 'orange',
  },
  { 
    label: 'Avg Response', 
    value: '14m', 
    sub: 'waktu respons', 
    iconName: 'TrendingUp',
    color: 'blue',
  },
  { 
    label: 'SLA Terpenuhi', 
    value: '100%', 
    sub: 'hari ini', 
    iconName: 'Star',
    color: 'violet',
  },
];

// Distribusi tiket default
export const DEFAULT_TICKETS = [
  { label: 'GANTI NTE', count: 4, pct: 50, color: 'blue' },
  { label: 'REGULER', count: 2, pct: 25, color: 'emerald' },
  { label: 'PROMAN', count: 1, pct: 12.5, color: 'orange' },
  { label: 'INFRACARE', count: 1, pct: 12.5, color: 'violet' },
];

// Menu items untuk GeneratePage
export const GENERATE_MENU_ITEMS = [
  {
    key: 'ganti_nte',
    label: 'GANTI NTE',
    desc: 'Generate laporan penggantian ONT / STB pelanggan',
    iconName: 'RefreshCw',
    color: 'blue',
  },
  {
    key: 'reguler',
    label: 'REGULER',
    desc: 'Generate format laporan gangguan reguler teknisi',
    iconName: 'FileText',
    color: 'emerald',
  },
  {
    key: 'proman',
    label: 'PROMAN',
    desc: 'Generate laporan perbaikan ODP / ODC infrastruktur',
    iconName: 'Wrench',
    color: 'orange',
  },
  {
    key: 'infracare',
    label: 'INFRACARE',
    desc: 'Generate format laporan tiket infracare jaringan',
    iconName: 'Activity',
    color: 'violet',
  },
];

// Navigation items
export const NAV_ITEMS = [
  { key: 'home', label: 'Beranda', iconName: 'Home' },
  { key: 'generate', label: 'Generate', iconName: 'Zap' },
  { key: 'settings', label: 'Settings', iconName: 'Settings' },
];
