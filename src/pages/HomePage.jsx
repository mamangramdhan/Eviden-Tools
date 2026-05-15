import React from 'react';
import { TrendingUp, CheckCircle2, Clock, Star, Award, Wifi, BarChart3 } from 'lucide-react';

const STATS = [
  { label: 'Tiket Selesai', value: '8',    sub: 'dari 10 target',    icon: CheckCircle2, iconCls: 'text-emerald-600', bgCls: 'bg-emerald-50',  valCls: 'text-emerald-600' },
  { label: 'Tiket Aktif',   value: '2',    sub: 'sedang dikerjakan', icon: Clock,        iconCls: 'text-orange-500',  bgCls: 'bg-orange-50',   valCls: 'text-orange-500'  },
  { label: 'Avg Response',  value: '14m',  sub: 'waktu respons',     icon: TrendingUp,   iconCls: 'text-blue-600',    bgCls: 'bg-blue-50',     valCls: 'text-blue-600'    },
  { label: 'SLA Terpenuhi', value: '100%', sub: 'hari ini',          icon: Star,         iconCls: 'text-violet-600',  bgCls: 'bg-violet-50',   valCls: 'text-violet-600'  },
];

const TICKETS = [
  { label: 'GANTI NTE', count: 4, pct: 50,   barCls: 'bg-blue-500'    },
  { label: 'REGULER',   count: 2, pct: 25,   barCls: 'bg-emerald-500' },
  { label: 'PROMAN',    count: 1, pct: 12.5, barCls: 'bg-orange-500'  },
  { label: 'INFRACARE', count: 1, pct: 12.5, barCls: 'bg-violet-500'  },
];

function StatCard({ label, value, sub, icon: Icon, iconCls, bgCls, valCls }) {
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-2 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 leading-relaxed">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${bgCls}`}>
          <Icon size={18} className={iconCls} />
        </div>
      </div>
      <p className={`text-3xl font-black leading-none ${valCls}`}>{value}</p>
      <p className="text-xs font-medium text-gray-400 leading-relaxed">{sub}</p>
    </div>
  );
}

export default function HomePage({ techData, user }) {
  const name = techData?.namaLengkap || user?.first_name || 'Teknisi';
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Selamat Pagi' :
    hour < 15 ? 'Selamat Siang' :
    hour < 18 ? 'Selamat Sore' :
    'Selamat Malam';

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6f9]" style={{ paddingBottom: '88px' }}>

      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-7 sm:px-8 sm:pt-12">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">{greeting}</p>
            <h1 className="text-xl font-black text-gray-900 truncate sm:text-2xl">{name}</h1>
            <p className="text-xs font-medium text-gray-400 mt-1">
              {techData?.area} &bull; {techData?.mitra}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0 bg-blue-50 text-blue-600 sm:w-14 sm:h-14">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Performance banner */}
        <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4 sm:p-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-100">
            <Award size={22} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">Performa Bulan Ini</p>
            <p className="text-xs font-medium text-gray-400 mt-0.5 truncate">
              NIK: {techData?.nik || '-'} &bull; ID: {user?.id || '-'}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-black leading-none text-emerald-600">92%</p>
            <p className="text-[11px] font-semibold text-emerald-500 mt-0.5">Score</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Content */}
      <div className="px-5 sm:px-8 py-7 space-y-8">

        {/* Stats */}
        <section>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Statistik Hari Ini
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Distribusi Tiket */}
        <section>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Distribusi Tiket
          </p>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 size={16} className="text-blue-600" />
              <span className="text-sm font-bold text-gray-900">Jenis Tiket Hari Ini</span>
            </div>
            <div className="space-y-4">
              {TICKETS.map(({ label, count, pct, barCls }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-gray-500">{label}</span>
                    <span className="text-xs font-bold text-gray-700">{count} tiket</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${barCls}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Status Koneksi */}
        <section>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm sm:p-5">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-50">
              <Wifi size={20} className="text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">Sistem Terhubung</p>
              <p className="text-xs font-medium text-gray-400">Telegram WebApp &bull; Online</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          </div>
        </section>

      </div>
    </div>
  );
}
