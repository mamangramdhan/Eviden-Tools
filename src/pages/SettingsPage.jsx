import React from 'react';
import { Shield, Bell, Info, ChevronRight, Wifi } from 'lucide-react';

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value || '-'}</span>
    </div>
  );
}

function MenuRow({ icon: Icon, label, iconCls, bgCls, danger = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-3 py-3.5 border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${danger ? 'bg-red-50' : bgCls}`}>
        <Icon size={18} className={danger ? 'text-red-500' : iconCls} />
      </div>
      <span className={`flex-1 text-sm font-semibold ${danger ? 'text-red-500' : 'text-gray-800'}`}>{label}</span>
      {!danger && <ChevronRight size={16} className="text-gray-300" />}
    </button>
  );
}

export default function SettingsPage({ techData, user }) {
  const name = techData?.namaLengkap || user?.first_name || 'Teknisi';
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6f9]" style={{ paddingBottom: '90px' }}>

      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-7 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">Pengaturan</p>

        {/* Avatar card */}
        <div className="bg-blue-50 rounded-xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black flex-shrink-0 bg-blue-100 text-blue-600">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-gray-900 truncate">{name}</h2>
            <p className="text-xs font-medium text-blue-500 mt-0.5">
              @{user?.username || 'guest'}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span className="text-[11px] font-semibold text-emerald-600">Terverifikasi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      <div className="px-5 sm:px-8 py-7 space-y-7">

        {/* Informasi Akun */}
        <section>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Informasi Akun</p>
          <div className="bg-white rounded-xl px-4 shadow-sm">
            <InfoRow label="Nama Lengkap" value={techData?.namaLengkap} />
            <InfoRow label="NIK / Labor"  value={techData?.nik} />
            <InfoRow label="Area / Sektor" value={techData?.area} />
            <InfoRow label="Mitra"        value={techData?.mitra} />
            <InfoRow label="Telegram ID"  value={user?.id || '-'} />
            <InfoRow label="Username"     value={user?.username ? `@${user.username}` : '-'} />
          </div>
        </section>

        {/* Pengaturan Aplikasi */}
        <section>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Aplikasi</p>
          <div className="bg-white rounded-xl px-4 shadow-sm">
            <MenuRow icon={Bell}   label="Notifikasi"          iconCls="text-orange-500" bgCls="bg-orange-50" />
            <MenuRow icon={Shield} label="Keamanan & Privasi"  iconCls="text-blue-600"   bgCls="bg-blue-50"   />
            <MenuRow icon={Info}   label="Tentang Aplikasi"    iconCls="text-violet-600" bgCls="bg-violet-50" />
          </div>
        </section>

        {/* Status Koneksi */}
        <section>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-50">
              <Wifi size={18} className="text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Status Koneksi</p>
              <p className="text-xs font-medium text-gray-400">Telegram WebApp &bull; Aktif</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          </div>
        </section>

        {/* Version */}
        <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-gray-300 pb-2">
          Eviden Tools v4.0 &bull; Eviden Team CJA
        </p>

      </div>
    </div>
  );
}
