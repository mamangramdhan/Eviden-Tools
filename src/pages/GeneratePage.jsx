import React from 'react';
import { RefreshCw, FileText, Wrench, Activity, ChevronRight } from 'lucide-react';

const menuCards = [
  {
    key: 'ganti_nte',
    label: 'GANTI NTE',
    desc: 'Generate laporan penggantian ONT / STB pelanggan',
    icon: RefreshCw,
    iconCls: 'text-blue-600',
    bgCls: 'bg-blue-50',
  },
  {
    key: 'reguler',
    label: 'REGULER',
    desc: 'Generate format laporan gangguan reguler teknisi',
    icon: FileText,
    iconCls: 'text-emerald-600',
    bgCls: 'bg-emerald-50',
  },
  {
    key: 'proman',
    label: 'PROMAN',
    desc: 'Generate laporan perbaikan ODP / ODC infrastruktur',
    icon: Wrench,
    iconCls: 'text-orange-500',
    bgCls: 'bg-orange-50',
  },
  {
    key: 'infracare',
    label: 'INFRACARE',
    desc: 'Generate format laporan tiket infracare jaringan',
    icon: Activity,
    iconCls: 'text-violet-600',
    bgCls: 'bg-violet-50',
  },
];

export default function GeneratePage({ onNavigate }) {
  return (
    <div className="h-full overflow-y-auto bg-[#f4f6f9]" style={{ paddingBottom: '88px' }}>

      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-7 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-1">Menu Generate</p>
        <h1 className="text-xl font-black text-gray-900">Pilih Format Laporan</h1>
        <p className="text-xs font-medium text-gray-400 mt-1">Pilih jenis laporan yang ingin dibuat</p>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Menu list */}
      <div className="px-5 sm:px-8 py-7 space-y-3">
        {menuCards.map(({ key, label, desc, icon: Icon, iconCls, bgCls }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className="w-full text-left bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm transition-all duration-150 active:scale-[0.98] hover:shadow-md"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${bgCls}`}>
              <Icon size={26} className={iconCls} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black tracking-wide text-gray-900">{label}</p>
              <p className="text-xs font-medium text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
            </div>
            <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
