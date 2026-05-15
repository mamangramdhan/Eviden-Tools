// ============================================
// UTILITY FUNCTIONS
// Helper functions yang digunakan di seluruh app
// ============================================

/**
 * Format tanggal ke format Indonesia
 * @returns {string} Formatted date string
 */
export function getFormattedDate() {
  const now = new Date();
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  
  return `${day}, ${date} ${month} ${year} ${hours}:${minutes}`;
}

/**
 * Get greeting berdasarkan waktu
 * @returns {string} Greeting message
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Selamat Pagi';
  if (hour < 15) return 'Selamat Siang';
  if (hour < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}

/**
 * Parse data tiket dari raw text
 * @param {string} rawText - Raw text from Order HD
 * @returns {object} Parsed ticket data
 */
export function parseTicketData(rawText) {
  if (!rawText) {
    return { noTiket: '-', noInternet: '-', datek: '-', cp: '-' };
  }
  
  const ticketMatch = rawText.match(/(INC\d{7,10})|(INX[\d-]{9,13})/i);
  const internetMatch = rawText.match(/(131183\d{6,12}|022\d{3,8})/i);
  const datekMatch = rawText.match(/(ODP-[A-Z]{3}-\w{3}\/\d{2,3})/i);
  const cpMatch = rawText.match(/(\+62|62|0)?[- ]?8[1-9]\d[\d -]{5,9}/i);
  
  return {
    noTiket: ticketMatch ? ticketMatch[0].toUpperCase() : '-',
    noInternet: internetMatch ? internetMatch[0] : '-',
    datek: datekMatch ? datekMatch[0].toUpperCase() : '-',
    cp: cpMatch ? cpMatch[0].trim() : '-',
  };
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Check if running in Telegram WebApp
 * @returns {boolean}
 */
export function isInsideTelegram() {
  const tg = window.Telegram?.WebApp;
  return tg && tg.initData !== '';
}

/**
 * Check if running on localhost
 * @returns {boolean}
 */
export function isLocalhost() {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1';
}

/**
 * Get Telegram user data
 * @returns {object|null}
 */
export function getTelegramUser() {
  return window.Telegram?.WebApp?.initDataUnsafe?.user || null;
}

/**
 * Initialize Telegram WebApp
 */
export function initTelegramApp() {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.expand();
    tg.ready();
  }
}
