import React from 'react';
import { TrendingUp, CheckCircle2, Clock, Star, Award, Wifi, BarChart3 } from 'lucide-react';
import { Card, Section, StatCard, Divider } from '../../components/ui';
import { getGreeting } from '../../lib/utils';
import { DEFAULT_STATS, DEFAULT_TICKETS } from '../../constants/data';

// Icon mapping
const iconMap = {
  CheckCircle2,
  Clock,
  TrendingUp,
  Star,
};

export default function HomePage({ techData, user }) {
  const name = techData?.namaLengkap || user?.first_name || 'Teknisi';
  const greeting = getGreeting();

  return (
    <div className="h-full overflow-y-auto bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-7">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
              {greeting}
            </p>
            <h1 className="text-xl font-black text-gray-900 truncate">{name}</h1>
            <p className="text-xs font-medium text-gray-400 mt-1">
              {techData?.area} &bull; {techData?.mitra}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black bg-blue-50 text-blue-600">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Performance Banner */}
        <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100">
            <Award size={22} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">Performa Bulan Ini</p>
            <p className="text-xs font-medium text-gray-400 mt-0.5 truncate">
              NIK: {techData?.nik || '-'} &bull; ID: {user?.id || '-'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-emerald-600">92%</p>
            <p className="text-xs font-semibold text-emerald-500">Score</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* Content */}
      <div className="px-5 py-7 space-y-8">
        {/* Stats */}
        <Section title="Statistik Hari Ini">
          <div className="grid grid-cols-2 gap-3">
            {DEFAULT_STATS.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                sub={stat.sub}
                icon={iconMap[stat.iconName]}
                color={stat.color}
              />
            ))}
          </div>
        </Section>

        <Divider />

        {/* Distribusi Tiket */}
        <Section title="Distribusi Tiket">
          <Card>
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 size={16} className="text-blue-600" />
              <span className="text-sm font-bold text-gray-900">Jenis Tiket Hari Ini</span>
            </div>
            <div className="space-y-4">
              {DEFAULT_TICKETS.map(({ label, count, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-gray-500">{label}</span>
                    <span className="text-xs font-bold text-gray-700">{count} tiket</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 bg-${color}-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <Divider />

        {/* Status Koneksi */}
        <Section>
          <Card className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-50">
              <Wifi size={20} className="text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Sistem Terhubung</p>
              <p className="text-xs font-medium text-gray-400">Telegram WebApp &bull; Online</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </Card>
        </Section>
      </div>
    </div>
  );
}
