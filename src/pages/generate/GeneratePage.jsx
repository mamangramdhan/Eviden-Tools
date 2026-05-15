import React from 'react';
import { RefreshCw, FileText, Wrench, Activity, ChevronRight } from 'lucide-react';
import { GENERATE_MENU_ITEMS } from '../../constants/data';

// Icon mapping
const iconMap = {
  RefreshCw,
  FileText,
  Wrench,
  Activity,
};

// Color mapping
const colorMap = {
  blue: { text: 'text-blue-600', bg: 'bg-blue-50' },
  emerald: { text: 'text-emerald-600', bg: 'bg-emerald-50' },
  orange: { text: 'text-orange-500', bg: 'bg-orange-50' },
  violet: { text: 'text-violet-600', bg: 'bg-violet-50' },
};

export default function GeneratePage({ onNavigate }) {
  return (
    <div className="h-full overflow-y-auto bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-7">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
          Menu Generate
        </p>
        <h1 className="text-xl font-black text-gray-900">Pilih Format Laporan</h1>
        <p className="text-xs font-medium text-gray-400 mt-1">
          Pilih jenis laporan yang ingin dibuat
        </p>
      </div>

      {/* Menu Cards */}
      <div className="px-5 py-6 space-y-3">
        {GENERATE_MENU_ITEMS.map(({ key, label, desc, iconName, color }) => {
          const Icon = iconMap[iconName];
          const colors = colorMap[color];

          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className="w-full text-left bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm transition-all active:scale-[0.98] hover:shadow-md"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.bg}`}>
                <Icon size={26} className={colors.text} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-black text-gray-900">{label}</p>
                <p className="text-xs font-medium text-gray-400 mt-0.5">{desc}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
