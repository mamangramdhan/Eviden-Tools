import React from 'react';
import { RefreshCw, FileText, Wrench, Activity, ChevronRight } from 'lucide-react';

const menuCards = [
  {
    key: 'ganti_nte',
    label: 'GANTI NTE',
    desc: 'Generate laporan penggantian ONT / STB pelanggan',
    icon: RefreshCw,
    color: '#0066cc',
    bg: '#e8f0ff',
  },
  {
    key: 'reguler',
    label: 'REGULER',
    desc: 'Generate format laporan gangguan reguler teknisi',
    icon: FileText,
    color: '#00b366',
    bg: '#e8f5f0',
  },
  {
    key: 'proman',
    label: 'PROMAN',
    desc: 'Generate laporan perbaikan ODP / ODC infrastruktur',
    icon: Wrench,
    color: '#ff8c42',
    bg: '#fff0e6',
  },
  {
    key: 'infracare',
    label: 'INFRACARE',
    desc: 'Generate format laporan tiket infracare jaringan',
    icon: Activity,
    color: '#7c4dff',
    bg: '#f3e8ff',
  },
];

export default function GeneratePage({ onNavigate }) {
  return (
    <div className="h-full overflow-y-auto" style={{ paddingBottom: '80px', background: '#f9f9fb' }}>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-8 sm:px-8"
        style={{ background: '#ffffff' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#0066cc' }}>
          Menu Generate
        </p>
        <h1 className="text-xl font-black" style={{ color: '#1d1d1d' }}>Pilih Format Laporan</h1>
        <p className="text-xs font-medium mt-1" style={{ color: '#888888' }}>
          Pilih jenis laporan yang ingin dibuat
        </p>
      </div>

      <div className="px-5 space-y-4 sm:px-8 sm:space-y-5 py-8">
        {menuCards.map(({ key, label, desc, icon: Icon, color, bg }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className="w-full text-left rounded-xl p-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.98]"
            style={{ background: '#ffffff', border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
          >
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: bg, border: 'none' }}
            >
              <Icon size={26} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-black tracking-wide" style={{ color: '#1d1d1d' }}>{label}</p>
              <p className="text-xs font-medium mt-0.5 leading-relaxed" style={{ color: '#888888' }}>{desc}</p>
            </div>
            <ChevronRight size={18} style={{ color: '#cccccc' }} className="flex-shrink-0" />
          </button>
        ))}

        <div className="h-4" />
      </div>
    </div>
  );
}
