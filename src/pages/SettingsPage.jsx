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
  borderBottom: '1px solid #e8e8e8',
  cursor: 'pointer',
};

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #e8e8e8' }}>
      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#888888' }}>{label}</span>
      <span className="text-sm font-bold" style={{ color: '#1d1d1d' }}>{value || '-'}</span>
    </div>
  );
}

function MenuRow({ icon: Icon, label, color = '#888888', danger = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-3 py-3.5 transition-colors"
      style={{ borderBottom: '1px solid #e8e8e8' }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: danger ? '#ff4d4d15' : `${color}15` }}
      >
        <Icon size={18} style={{ color: danger ? '#ff4d4d' : color }} />
      </div>
      <span className="flex-1 text-sm font-semibold" style={{ color: danger ? '#ff4d4d' : '#1d1d1d' }}>{label}</span>
      {!danger && <ChevronRight size={16} style={{ color: '#d0d0d0' }} />}
    </button>
  );
}

export default function SettingsPage({ techData, user }) {
  const name = techData?.namaLengkap || user?.first_name || 'Teknisi';
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="h-full overflow-y-auto" style={{ paddingBottom: '90px', background: '#f9f9fb' }}>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-8 sm:px-8"
        style={{ background: '#ffffff' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#888888' }}>Settings</p>

        {/* Avatar Card */}
        <div
          className="rounded-xl p-5 flex items-center gap-4"
          style={{ background: '#f0f7ff', border: 'none' }}
        >
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-black flex-shrink-0"
            style={{ background: '#e8f0ff', color: '#0066cc', border: 'none' }}
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black truncate" style={{ color: '#1d1d1d' }}>{name}</h2>
            <p className="text-xs font-medium mt-0.5" style={{ color: '#0066cc' }}>
              @{user?.username || 'guest'}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-2 h-2 rounded-full bg-[#00b366] animate-pulse" />
              <span className="text-[11px] font-semibold" style={{ color: '#00b366' }}>Terverifikasi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-8 py-8 space-y-10">
        {/* User Info */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#888888' }}>Informasi Akun</p>
          <div
            className="rounded-xl px-4"
            style={{ background: '#ffffff', border: 'none' }}
          >
            <InfoRow label="Nama Lengkap" value={techData?.namaLengkap} />
            <InfoRow label="NIK / Labor" value={techData?.nik} />
            <InfoRow label="Area / Sektor" value={techData?.area} />
            <InfoRow label="Mitra" value={techData?.mitra} />
            <InfoRow label="Telegram ID" value={user?.id || '-'} />
            <InfoRow label="Username" value={user?.username ? `@${user.username}` : '-'} />
          </div>
        </section>

        {/* App Settings */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#888888' }}>Aplikasi</p>
          <div
            className="rounded-xl px-4"
            style={{ background: '#ffffff', border: 'none' }}
          >
            <MenuRow icon={Bell} label="Notifikasi" color="#ff8c42" />
            <MenuRow icon={Shield} label="Keamanan & Privasi" color="#0066cc" />
            <MenuRow icon={Info} label="Tentang Aplikasi" color="#7c4dff" />
          </div>
        </section>

        {/* Status */}
        <section>
          <div
            className="rounded-xl p-4 flex items-center gap-3"
            style={{ background: '#ffffff', border: 'none' }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#e8f5f0' }}>
              <Wifi size={18} style={{ color: '#00b366' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: '#1d1d1d' }}>Status Koneksi</p>
              <p className="text-xs font-medium" style={{ color: '#888888' }}>Telegram WebApp &bull; Aktif</p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#00b366] animate-pulse" />
          </div>
        </section>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#cccccc' }}>
            Eviden Tools v4.0 &bull; Eviden Team CJA
          </p>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
