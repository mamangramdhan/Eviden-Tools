import React from 'react';
import { RefreshCw, FileText, Wrench, Activity, ChevronRight } from 'lucide-react';

const menuCards = [
  {
    key: 'ganti_nte',
    label: 'GANTI NTE',
    desc: 'Generate laporan penggantian ONT / STB pelanggan',
    icon: RefreshCw,
    color: '#2b9ed4',
    bg: '#1a3a52',
  },
  {
    key: 'reguler',
    label: 'REGULER',
    desc: 'Generate format laporan gangguan reguler teknisi',
    icon: FileText,
    color: '#2ec785',
    bg: '#1a3d2e',
  },
  {
    key: 'proman',
    label: 'PROMAN',
    desc: 'Generate laporan perbaikan ODP / ODC infrastruktur',
    icon: Wrench,
    color: '#e07b39',
    bg: '#3d2a1a',
  },
  {
    key: 'infracare',
    label: 'INFRACARE',
    desc: 'Generate format laporan tiket infracare jaringan',
    icon: Activity,
    color: '#9b6dff',
    bg: '#2a1a3d',
  },
];

export default function GeneratePage({ onNavigate }) {
  return (
    <div className="h-full overflow-y-auto" style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6"
        style={{ background: 'linear-gradient(180deg, #0d1a2a 0%, #0e1117 100%)' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#2b9ed4' }}>
          Menu Generate
        </p>
        <h1 className="text-xl font-black" style={{ color: '#e8eaf0' }}>Pilih Format Laporan</h1>
        <p className="text-xs font-medium mt-1" style={{ color: '#556070' }}>
          Pilih jenis laporan yang ingin dibuat
        </p>
      </div>

      <div className="px-5 py-6 sm:px-8 space-y-3">
        {menuCards.map(({ key, label, desc, icon: Icon, color, bg }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className="w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.98]"
            style={{ background: '#1a2035', border: '1px solid #2a3347' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: bg, border: `1px solid ${color}33` }}
            >
              <Icon size={26} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-black tracking-wide" style={{ color: '#e8eaf0' }}>{label}</p>
              <p className="text-xs font-medium mt-0.5 leading-relaxed" style={{ color: '#556070' }}>{desc}</p>
            </div>
            <ChevronRight size={18} style={{ color: '#2a3347' }} className="flex-shrink-0" />
          </button>
        ))}

        <div className="h-4" />
      </div>
    </div>
  );
}
