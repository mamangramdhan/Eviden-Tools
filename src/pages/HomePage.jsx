import React from 'react';
import {
  TrendingUp, CheckCircle2, Clock, Star, Award, Wifi, BarChart3
} from 'lucide-react';

const StatCard = ({ label, value, sub, color, icon: Icon }) => (
  <div
    className="rounded-xl p-4 flex flex-col gap-2"
    style={{ background: '#f5f5f7', border: 'none' }}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold leading-relaxed" style={{ color: '#666666' }}>{label}</span>
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
    </div>
    <p className="text-3xl font-black leading-none" style={{ color: '#1d1d1d' }}>{value}</p>
    {sub && <p className="text-xs font-medium leading-relaxed" style={{ color: '#888888' }}>{sub}</p>}
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
    { label: 'GANTI NTE', count: 4, pct: 50,   color: '#0066cc' },
    { label: 'REGULER',   count: 2, pct: 25,   color: '#00b366' },
    { label: 'PROMAN',    count: 1, pct: 12.5, color: '#ff8c42' },
    { label: 'INFRACARE', count: 1, pct: 12.5, color: '#7c4dff' },
  ];

  return (
    <div className="h-full overflow-y-auto" style={{ paddingBottom: '88px' }}>

      {/* ── Header ── */}
      <div className="px-5 pt-10 pb-8 sm:px-8 sm:pt-12" style={{ background: '#ffffff' }}>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#0066cc' }}>
              {greeting}
            </p>
            <h1 className="text-xl font-black truncate sm:text-2xl" style={{ color: '#1d1d1d' }}>{name}</h1>
            <p className="text-xs font-medium mt-1 leading-relaxed" style={{ color: '#888888' }}>
              {techData?.area} &bull; {techData?.mitra}
            </p>
          </div>
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black flex-shrink-0 sm:w-14 sm:h-14"
            style={{ background: '#e8f0ff', color: '#0066cc', border: 'none' }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Performance Banner */}
        <div
          className="rounded-xl p-4 flex items-center gap-4 sm:p-5"
          style={{ background: '#f0f7ff', border: 'none' }}
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#e8f0ff' }}
          >
            <Award size={24} style={{ color: '#0066cc' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black" style={{ color: '#1d1d1d' }}>Performa Bulan Ini</p>
            <p className="text-xs font-medium mt-0.5 leading-relaxed truncate" style={{ color: '#888888' }}>
              NIK: {techData?.nik || '-'} &bull; ID: {user?.id || '-'}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-black leading-none" style={{ color: '#00b366' }}>92%</p>
            <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#00b366' }}>Score</p>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-5 sm:px-8" style={{ background: '#f9f9fb' }}>
        <div className="space-y-10 py-10">

          {/* Stats Grid — 2 cols on mobile, 4 cols on wide screens */}
          <section className="max-w-4xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#888888' }}>
              Statistik Hari Ini
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard label="Tiket Selesai"  value="8"    sub="dari 10 target"    color="#00b366" icon={CheckCircle2} />
              <StatCard label="Tiket Aktif"    value="2"    sub="sedang dikerjakan" color="#ff8c42" icon={Clock}        />
              <StatCard label="Avg Response"   value="14m"  sub="waktu respons"     color="#0066cc" icon={TrendingUp}   />
              <StatCard label="SLA Terpenuhi"  value="100%" sub="hari ini"          color="#7c4dff" icon={Star}         />
            </div>
          </section>

          {/* Distribusi Tiket */}
          <section className="max-w-4xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#888888' }}>
              Distribusi Tiket
            </p>
            <div
              className="rounded-xl p-5"
              style={{ background: '#ffffff', border: 'none' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={16} style={{ color: '#0066cc' }} />
                <span className="text-sm font-bold" style={{ color: '#1d1d1d' }}>Jenis Tiket Hari Ini</span>
              </div>
              <div className="space-y-4">
                {ticketTypes.map(({ label, count, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-semibold" style={{ color: '#888888' }}>{label}</span>
                      <span className="text-xs font-bold" style={{ color }}>{count} tiket</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e8e8e8' }}>
                      <div
                        className="h-2 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Status Koneksi */}
          <section className="max-w-4xl mx-auto">
            <div
              className="rounded-xl p-4 flex items-center gap-3 sm:p-5"
              style={{ background: '#ffffff', border: 'none' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: '#e8f0ff' }}
              >
                <Wifi size={20} style={{ color: '#00b366' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold" style={{ color: '#1d1d1d' }}>Sistem Terhubung</p>
                <p className="text-xs font-medium leading-relaxed" style={{ color: '#888888' }}>
                  Telegram WebApp &bull; Online
                </p>
              </div>
              <div className="w-3 h-3 rounded-full flex-shrink-0 bg-[#00b366] animate-pulse" />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
