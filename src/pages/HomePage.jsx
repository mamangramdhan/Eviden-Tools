import React from 'react';
import {
  TrendingUp, CheckCircle2, Clock, Star, Award, Wifi, BarChart3
} from 'lucide-react';

const StatCard = ({ label, value, sub, color, icon: Icon }) => (
  <div
    className="rounded-2xl p-4 flex flex-col gap-2"
    style={{ background: '#1a2035', border: '1px solid #2a3347' }}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold leading-relaxed" style={{ color: '#8b95a8' }}>{label}</span>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}22` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
    </div>
    <p className="text-3xl font-black leading-none" style={{ color: '#e8eaf0' }}>{value}</p>
    {sub && <p className="text-xs font-medium leading-relaxed" style={{ color: '#556070' }}>{sub}</p>}
  </div>
);

export default function HomePage({ techData, user }) {
  const name = techData?.namaLengkap || user?.first_name || 'Teknisi';
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? 'Selamat Pagi' :
    hour < 15 ? 'Selamat Siang' :
    hour < 18 ? 'Selamat Sore' :
    'Selamat Malam';

  const ticketTypes = [
    { label: 'GANTI NTE', count: 4, pct: 50,   color: '#2b9ed4' },
    { label: 'REGULER',   count: 2, pct: 25,   color: '#2ec785' },
    { label: 'PROMAN',    count: 1, pct: 12.5, color: '#e07b39' },
    { label: 'INFRACARE', count: 1, pct: 12.5, color: '#9b6dff' },
  ];

  return (
    <div className="h-full overflow-y-auto" style={{ paddingBottom: '88px' }}>

      {/* ── Header ── */}
      <div className="px-5 pt-10 pb-6 sm:px-8 sm:pt-12" style={{ background: 'linear-gradient(180deg,#0d1a2a 0%,#0e1117 100%)' }}>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#2b9ed4' }}>
              {greeting}
            </p>
            <h1 className="text-xl font-black truncate sm:text-2xl" style={{ color: '#e8eaf0' }}>{name}</h1>
            <p className="text-xs font-medium mt-1 leading-relaxed" style={{ color: '#556070' }}>
              {techData?.area} &bull; {techData?.mitra}
            </p>
          </div>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0 sm:w-14 sm:h-14"
            style={{ background: '#1a3a52', color: '#2b9ed4', border: '2px solid #2a4a64' }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Performance Banner */}
        <div
          className="rounded-2xl p-4 flex items-center gap-4 sm:p-5"
          style={{ background: '#1a3a52', border: '1px solid #2a4a64' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#2b9ed422' }}
          >
            <Award size={24} style={{ color: '#2b9ed4' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black" style={{ color: '#e8eaf0' }}>Performa Bulan Ini</p>
            <p className="text-xs font-medium mt-0.5 leading-relaxed truncate" style={{ color: '#8b95a8' }}>
              NIK: {techData?.nik || '-'} &bull; ID: {user?.id || '-'}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-black leading-none" style={{ color: '#2ec785' }}>92%</p>
            <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#2ec785' }}>Score</p>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-5 sm:px-8">

        {/* Stats Grid — 2 cols on mobile, 4 cols on wide screens */}
        <div className="py-6 border-b" style={{ borderColor: '#1f2d42' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#556070' }}>
            Statistik Hari Ini
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Tiket Selesai"  value="8"    sub="dari 10 target"    color="#2ec785" icon={CheckCircle2} />
            <StatCard label="Tiket Aktif"    value="2"    sub="sedang dikerjakan" color="#e07b39" icon={Clock}        />
            <StatCard label="Avg Response"   value="14m"  sub="waktu respons"     color="#2b9ed4" icon={TrendingUp}   />
            <StatCard label="SLA Terpenuhi"  value="100%" sub="hari ini"          color="#9b6dff" icon={Star}         />
          </div>
        </div>

        {/* Distribusi Tiket */}
        <div className="py-6 border-b" style={{ borderColor: '#1f2d42' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#556070' }}>
            Distribusi Tiket
          </p>
          <div
            className="rounded-2xl p-5"
            style={{ background: '#1a2035', border: '1px solid #2a3347' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={16} style={{ color: '#2b9ed4' }} />
              <span className="text-sm font-bold" style={{ color: '#e8eaf0' }}>Jenis Tiket Hari Ini</span>
            </div>
            <div className="space-y-4">
              {ticketTypes.map(({ label, count, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold" style={{ color: '#8b95a8' }}>{label}</span>
                    <span className="text-xs font-bold" style={{ color }}>{count} tiket</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: '#0e1117' }}>
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Koneksi */}
        <div className="py-6">
          <div
            className="rounded-2xl p-4 flex items-center gap-3 sm:p-5"
            style={{ background: '#1a2035', border: '1px solid #2a3347' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#2ec78522' }}
            >
              <Wifi size={20} style={{ color: '#2ec785' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold" style={{ color: '#e8eaf0' }}>Sistem Terhubung</p>
              <p className="text-xs font-medium leading-relaxed" style={{ color: '#556070' }}>
                Telegram WebApp &bull; Online
              </p>
            </div>
            <div className="w-3 h-3 rounded-full flex-shrink-0 bg-[#2ec785] animate-pulse" />
          </div>
        </div>

      </div>
    </div>
  );
}
