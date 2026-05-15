// ============================================
// KONFIGURASI APLIKASI
// Ubah nilai di sini untuk mengatur behavior app
// ============================================

// Auth Configuration
export const AUTH_CONFIG = {
  // Set ke `false` untuk mengaktifkan validasi Telegram
  BYPASS_AUTH: true,
  
  // Daftar user yang diizinkan akses
  ALLOWED_USERS: [
    { id: 1379187380, namaLengkap: 'Dona Ramdani', nik: '25940172', area: 'CJA_3', mitra: 'TA' },
  ],
};

// Telegram Bot Configuration
export const TELEGRAM_CONFIG = {
  BOT_TOKEN: '6861644855:AAFW37tAj6MOVbQV5yYgsDmpVOxbixn3lfw',
  CHAT_ID: '-5295521436',
};

// API Configuration
export const API_CONFIG = {
  BARCODE_SCAN_URL: 'http://localhost:8000/scan',
};

// App Info
export const APP_INFO = {
  NAME: 'Eviden Tools',
  VERSION: '4.0',
  TEAM: 'Eviden Team CJA',
};
