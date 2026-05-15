import React from 'react';

/**
 * Card container component
 */
export function Card({ children, className = '', padding = true }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm ${padding ? 'p-4' : ''} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section wrapper dengan optional title
 */
export function Section({ title, children, className = '' }) {
  return (
    <section className={className}>
      {title && (
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          {title}
        </p>
      )}
      {children}
    </section>
  );
}

/**
 * Divider component
 */
export function Divider({ className = '' }) {
  return <div className={`h-px bg-gray-100 ${className}`} />;
}

/**
 * Info row untuk menampilkan label-value pair
 */
export function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      <span className="text-sm font-bold text-gray-900">{value || '-'}</span>
    </div>
  );
}

/**
 * Stat card untuk menampilkan statistik
 */
export function StatCard({ label, value, sub, icon: Icon, color = 'blue' }) {
  const colorClasses = {
    blue: { icon: 'text-blue-600', bg: 'bg-blue-50', value: 'text-blue-600' },
    emerald: { icon: 'text-emerald-600', bg: 'bg-emerald-50', value: 'text-emerald-600' },
    orange: { icon: 'text-orange-500', bg: 'bg-orange-50', value: 'text-orange-500' },
    violet: { icon: 'text-violet-600', bg: 'bg-violet-50', value: 'text-violet-600' },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colors.bg}`}>
          <Icon size={18} className={colors.icon} />
        </div>
      </div>
      <p className={`text-3xl font-black leading-none ${colors.value}`}>{value}</p>
      {sub && <p className="text-xs font-medium text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

/**
 * Progress bar component
 */
export function ProgressBar({ label, value, max, percentage, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    violet: 'bg-violet-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-semibold text-gray-500">{label}</span>
        <span className="text-xs font-bold text-gray-700">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-700 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
