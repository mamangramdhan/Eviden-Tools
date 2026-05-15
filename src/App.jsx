import React, { useState, useEffect } from 'react';
import { ShieldAlert, Loader2 } from 'lucide-react';

import BottomNav from './components/BottomNav.jsx';
import HomePage from './pages/HomePage.jsx';
import GeneratePage from './pages/GeneratePage.jsx';
import GantiNtePage from './pages/GantiNtePage.jsx';
import RegulerPage from './pages/RegulerPage.jsx';
import PromanPage from './pages/PromanPage.jsx';
import InfracarePage from './pages/InfracarePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

// Set ke `false` untuk mengaktifkan kembali validasi akses Telegram
const BYPASS_AUTH = true;

const ALLOWED_USERS = [
  { id: 1379187380, namaLengkap: 'Dona Ramdani', nik: '25940172', area: 'CJA_3', mitra: 'TA' },
];

export default function App() {
  const [techData, setTechData] = useState({ namaLengkap: '', nik: '', area: '', mitra: '' });
  const [user, setUser] = useState({ first_name: 'Teknisi', username: 'Guest', id: null });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const [activePage, setActivePage] = useState('home');       // home | generate | settings
  const [subPage, setSubPage] = useState(null);               // ganti_nte | reguler | proman | infracare

  useEffect(() => {
    const checkAccess = () => {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const tg = window.Telegram?.WebApp;
      const isInsideTelegram = tg && tg.initData !== '';
      const telegramUser = tg?.initDataUnsafe?.user;

      if (BYPASS_AUTH) {
        setUser({ first_name: 'Teknisi', id: 'BYPASS', username: 'guest' });
        setTechData({ namaLengkap: 'Mode Akses Sementara', nik: '------', area: '---', mitra: '---' });
        setIsAuthorized(true);
      } else if (isLocalhost) {
        setUser({ first_name: 'Developer', id: 'LOCAL', username: 'dev_local' });
        setTechData({ namaLengkap: 'Dev Mode', nik: '000000', area: 'LOCAL', mitra: 'LOCAL' });
        setIsAuthorized(true);
      } else if (isInsideTelegram && telegramUser) {
        setUser(telegramUser);
        const found = ALLOWED_USERS.find(u => u.id === Number(telegramUser.id));
        if (found) {
          setTechData(found);
          setIsAuthorized(true);
          tg.expand();
          tg.ready();
        } else {
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false);
      }
      setLoading(false);
    };
    const timer = setTimeout(checkAccess, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleNavChange = (page) => {
    setActivePage(page);
    setSubPage(null);
  };

  const handleSubNavigate = (sub) => {
    setSubPage(sub);
  };

  const handleBack = () => {
    setSubPage(null);
  };

  // --- Loading Screen ---
  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ height: '100dvh', background: '#0e1117' }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: '#1a3a52', border: '1px solid #2a4a64' }}
        >
          <Loader2 size={32} style={{ color: '#2b9ed4' }} className="animate-spin" />
        </div>
        <p className="text-xs font-black uppercase tracking-widest animate-pulse" style={{ color: '#556070' }}>
          Memvalidasi Akses...
        </p>
      </div>
    );
  }

  // --- Unauthorized Screen ---
  if (!isAuthorized) {
    const isBrowser = !window.Telegram?.WebApp || window.Telegram?.WebApp?.initData === '';
    return (
      <div
        className="flex items-center justify-center p-6"
        style={{ height: '100dvh', background: '#0e1117' }}
      >
        <div
          className="w-full max-w-sm rounded-3xl p-8 text-center"
          style={{ background: '#1a2035', border: '1px solid #2a3347' }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: '#e0525222' }}
          >
            <ShieldAlert size={40} style={{ color: '#e05252' }} />
          </div>
          <h2
            className="text-xl font-black uppercase mb-3"
            style={{ color: '#e8eaf0' }}
          >
            Akses Terbatas
          </h2>
          <p className="text-sm font-medium leading-relaxed mb-6" style={{ color: '#8b95a8' }}>
            {isBrowser
              ? <>Aplikasi ini hanya dapat diakses melalui <span style={{ color: '#2b9ed4', fontWeight: 700 }}>Telegram Mini App</span> resmi teknisi.</>
              : <>ID Telegram Anda (<code style={{ color: '#e05252', fontWeight: 700 }}>{user.id || 'N/A'}</code>) belum terdaftar. Hubungi Admin STO.</>
            }
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3.5 rounded-2xl font-black text-sm"
            style={{ background: '#1e2740', color: '#e8eaf0', border: '1px solid #2a3347' }}
          >
            Refresh Halaman
          </button>
          <p className="mt-5 text-[10px] font-black uppercase tracking-widest" style={{ color: '#2a3347' }}>
            Eviden Tools Security System
          </p>
        </div>
      </div>
    );
  }

  // --- Sub-Pages (full screen, no bottom nav) ---
  if (subPage) {
    const commonProps = { onBack: handleBack, techData, user };
    if (subPage === 'ganti_nte') return <div style={{ height: '100dvh', background: '#0e1117', overflow: 'hidden' }}><GantiNtePage {...commonProps} /></div>;
    if (subPage === 'reguler')   return <div style={{ height: '100dvh', background: '#0e1117', overflow: 'hidden' }}><RegulerPage {...commonProps} /></div>;
    if (subPage === 'proman')    return <div style={{ height: '100dvh', background: '#0e1117', overflow: 'hidden' }}><PromanPage {...commonProps} /></div>;
    if (subPage === 'infracare') return <div style={{ height: '100dvh', background: '#0e1117', overflow: 'hidden' }}><InfracarePage {...commonProps} /></div>;
  }

  // --- Main App Shell with Bottom Nav ---
  return (
    <div
      style={{
        height: '100dvh',
        maxWidth: '430px',
        margin: '0 auto',
        background: '#0e1117',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {activePage === 'home' && <HomePage techData={techData} user={user} />}
        {activePage === 'generate' && <GeneratePage onNavigate={handleSubNavigate} />}
        {activePage === 'settings' && <SettingsPage techData={techData} user={user} />}
      </div>
      <BottomNav active={activePage} onChange={handleNavChange} />
    </div>
  );
}
