import React from 'react';
import {
  TrendingUp, CheckCircle2, Clock, AlertCircle,
  BarChart3, Wifi, Star, Award
} from 'lucide-react';

const StatCard = ({ label, value, sub, color, icon: Icon }) => (
  <div
    className="rounded-2xl p-4 flex flex-col gap-2"
    style={{ background: '#1a2035', border: '1px solid #2a3347' }}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold" style={{ color: '#8b95a8' }}>{label}</span>
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: `${color}22` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
    </div>
    <p className="text-2xl font-black" style={{ color: '#e8eaf0' }}>{value}</p>
    {sub && <p className="text-[11px] font-medium" style={{ color: '#556070' }}>{sub}</p>}
  </div>
);

const RecentItem = ({ tiket, jenis, status, time }) => {
  const statusColor = status === 'Selesai' ? '#2ec785' : status === 'Proses' ? '#e07b39' : '#e05252';
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: '1px solid #1f2d42' }}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-bold" style={{ color: '#e8eaf0' }}>{tiket}</span>
        <span className="text-xs font-medium" style={{ color: '#556070' }}>{jenis}</span>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${statusColor}22`, color: statusColor }}
        >
          {status}
        </span>
        <span className="text-[10px]" style={{ color: '#556070' }}>{time}</span>
      </div>
    </div>
  );
};

export default function HomePage({ techData, user }) {
  const name = techData?.namaLengkap || user?.first_name || 'Teknisi';
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam';

  return (
    <div
      className="h-full overflow-y-auto"
      style={{ paddingBottom: '80px' }}
    >
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6"
        style={{ background: 'linear-gradient(180deg, #0d1a2a 0%, #0e1117 100%)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: '#2b9ed4' }}>{greeting} 👋</p>
            <h1 className="text-xl font-black" style={{ color: '#e8eaf0' }}>{name}</h1>
            <p className="text-xs font-medium mt-0.5" style={{ color: '#556070' }}>
              {techData?.area} &bull; {techData?.mitra}
            </p>
          </div>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black"
            style={{ background: '#1a3a52', color: '#2b9ed4', border: '2px solid #2a3347' }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Performance Banner */}
        <div
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0d2237 100%)', border: '1px solid #2a4a64' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#2b9ed422' }}
          >
            <Award size={24} style={{ color: '#2b9ed4' }} />
          </div>
          <div>
            <p className="text-sm font-black" style={{ color: '#e8eaf0' }}>Performa Bulan Ini</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: '#8b95a8' }}>
              NIK: {techData?.nik || '-'} &bull; ID: {user?.id || '-'}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-2xl font-black" style={{ color: '#2ec785' }}>92%</p>
            <p className="text-[10px] font-semibold" style={{ color: '#2ec785' }}>Score</p>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-5">
        {/* Stats Grid */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#556070' }}>Statistik Hari Ini</p>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Tiket Selesai" value="8" sub="dari 10 target" color="#2ec785" icon={CheckCircle2} />
            <StatCard label="Tiket Aktif" value="2" sub="sedang dikerjakan" color="#e07b39" icon={Clock} />
            <StatCard label="Avg Response" value="14m" sub="waktu respons" color="#2b9ed4" icon={TrendingUp} />
            <StatCard label="SLA Terpenuhi" value="100%" sub="hari ini" color="#9b6dff" icon={Star} />
          </div>
        </div>

        {/* Ticket Types */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#556070' }}>Distribusi Tiket</p>
          <div
            className="rounded-2xl p-4"
            style={{ background: '#1a2035', border: '1px solid #2a3347' }}
          >
            {[
              { label: 'GANTI NTE', count: 4, pct: 50, color: '#2b9ed4' },
              { label: 'REGULER', count: 2, pct: 25, color: '#2ec785' },
              { label: 'PROMAN', count: 1, pct: 12.5, color: '#e07b39' },
              { label: 'INFRACARE', count: 1, pct: 12.5, color: '#9b6dff' },
            ].map(({ label, count, pct, color }) => (
              <div key={label} className="mb-3 last:mb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold" style={{ color: '#8b95a8' }}>{label}</span>
                  <span className="text-xs font-bold" style={{ color }}>{count} tiket</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: '#0e1117' }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#556070' }}>Aktivitas Terbaru</p>
          <div
            className="rounded-2xl px-4"
            style={{ background: '#1a2035', border: '1px solid #2a3347' }}
          >
            <RecentItem tiket="INC0001234567" jenis="GANTI NTE / ONT" status="Selesai" time="10:24" />
            <RecentItem tiket="INC0001234521" jenis="REGULER / ONT" status="Selesai" time="09:10" />
            <RecentItem tiket="INC0001234489" jenis="INFRACARE" status="Proses" time="08:45" />
            <RecentItem tiket="INC0001234410" jenis="PROMAN / ODP" status="Selesai" time="08:00" />
          </div>
        </div>

        {/* Connection Status */}
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: '#1a2035', border: '1px solid #2a3347' }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#2ec78522' }}
          >
            <Wifi size={18} style={{ color: '#2ec785' }} />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: '#e8eaf0' }}>Sistem Terhubung</p>
            <p className="text-xs font-medium" style={{ color: '#556070' }}>Telegram WebApp &bull; Online</p>
          </div>
          <div className="ml-auto w-2.5 h-2.5 rounded-full bg-[#2ec785] animate-pulse" />
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
