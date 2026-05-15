import React from 'react';
import {
  User, Shield, Bell, Info, ChevronRight,
  LogOut, MapPin, Building2, Hash, Wifi
} from 'lucide-react';

const ROW_STYLE = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 0',
  borderBottom: '1px solid #1f2d42',
  cursor: 'pointer',
};

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #1f2d42' }}>
      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#556070' }}>{label}</span>
      <span className="text-sm font-bold" style={{ color: '#e8eaf0' }}>{value || '-'}</span>
    </div>
  );
}

function MenuRow({ icon: Icon, label, color = '#8b95a8', danger = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-3 py-3.5 transition-colors"
      style={{ borderBottom: '1px solid #1f2d42' }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: danger ? '#e0525222' : `${color}22` }}
      >
        <Icon size={18} style={{ color: danger ? '#e05252' : color }} />
      </div>
      <span className="flex-1 text-sm font-semibold" style={{ color: danger ? '#e05252' : '#e8eaf0' }}>{label}</span>
      {!danger && <ChevronRight size={16} style={{ color: '#2a3347' }} />}
    </button>
  );
}

export default function SettingsPage({ techData, user }) {
  const name = techData?.namaLengkap || user?.first_name || 'Teknisi';
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="h-full overflow-y-auto" style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6"
        style={{ background: 'linear-gradient(180deg, #0d1a2a 0%, #0e1117 100%)' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#8b95a8' }}>Settings</p>

        {/* Avatar Card */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ background: '#1a2035', border: '1px solid #2a3347' }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1a3a52, #0d2237)', color: '#2b9ed4', border: '2px solid #2a4a64' }}
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black truncate" style={{ color: '#e8eaf0' }}>{name}</h2>
            <p className="text-xs font-medium mt-0.5" style={{ color: '#2b9ed4' }}>
              @{user?.username || 'guest'}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-2 h-2 rounded-full bg-[#2ec785] animate-pulse" />
              <span className="text-[11px] font-semibold" style={{ color: '#2ec785' }}>Terverifikasi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* User Info */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#556070' }}>Informasi Akun</p>
          <div
            className="rounded-2xl px-4"
            style={{ background: '#1a2035', border: '1px solid #2a3347' }}
          >
            <InfoRow label="Nama Lengkap" value={techData?.namaLengkap} />
            <InfoRow label="NIK / Labor" value={techData?.nik} />
            <InfoRow label="Area / Sektor" value={techData?.area} />
            <InfoRow label="Mitra" value={techData?.mitra} />
            <InfoRow label="Telegram ID" value={user?.id || '-'} />
            <InfoRow label="Username" value={user?.username ? `@${user.username}` : '-'} />
          </div>
        </div>

        {/* App Settings */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#556070' }}>Aplikasi</p>
          <div
            className="rounded-2xl px-4"
            style={{ background: '#1a2035', border: '1px solid #2a3347' }}
          >
            <MenuRow icon={Bell} label="Notifikasi" color="#e07b39" />
            <MenuRow icon={Shield} label="Keamanan & Privasi" color="#2b9ed4" />
            <MenuRow icon={Info} label="Tentang Aplikasi" color="#9b6dff" />
          </div>
        </div>

        {/* Status */}
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: '#1a2035', border: '1px solid #2a3347' }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#2ec78522' }}>
            <Wifi size={18} style={{ color: '#2ec785' }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold" style={{ color: '#e8eaf0' }}>Status Koneksi</p>
            <p className="text-xs font-medium" style={{ color: '#556070' }}>Telegram WebApp &bull; Aktif</p>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#2ec785] animate-pulse" />
        </div>

        {/* App Version */}
        <div className="text-center py-2">
          <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#2a3347' }}>
            Eviden Tools v4.0 &bull; Eviden Team CJA
          </p>
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}
