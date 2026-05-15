import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';

const INPUT_STYLE = {
  background: '#1e2740',
  border: '1px solid #2a3347',
  color: '#e8eaf0',
  borderRadius: '12px',
  padding: '12px 14px',
  fontSize: '14px',
  width: '100%',
  outline: 'none',
};
const LABEL_STYLE = {
  color: '#8b95a8',
  fontSize: '11px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '6px',
  display: 'block',
};
const SECTION_STYLE = {
  background: '#1a2035',
  border: '1px solid #2a3347',
  borderRadius: '16px',
  padding: '16px',
  marginBottom: '12px',
};

export default function InfracarePage({ onBack, techData }) {
  const [noTiket, setNoTiket] = useState('');
  const [alamat, setAlamat] = useState('');
  const [penyebab, setPenyebab] = useState('');
  const [perbaikan, setPerbaikan] = useState('');
  const [teknisi1, setTeknisi1] = useState(techData?.namaLengkap || '');
  const [teknisi2, setTeknisi2] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const getFormattedDate = () => {
    const now = new Date();
    const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
  };

  const handleGenerate = () => {
    const text = `⚡ LAPORAN INFRACARE
📅 ${getFormattedDate()}

🔸 NO TIKET   : ${noTiket || '-'}
🏠 ALAMAT     : ${alamat || '-'}

🔧 PENYEBAB   : ${penyebab || '-'}
🔧 PERBAIKAN  : ${perbaikan || '-'}

👷 TEKNISI 1  : ${teknisi1 || '-'}
👷 TEKNISI 2  : ${teknisi2 || '-'}
🏢 MITRA      : ${techData?.mitra || '-'}
📍 SEKTOR     : ${techData?.area || '-'}`.trim();
    setResult(text);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="h-full overflow-y-auto" style={{ paddingBottom: '90px' }}>
      <div
        className="sticky top-0 z-10 flex items-center gap-3 px-4 py-4"
        style={{ background: '#0e1117', borderBottom: '1px solid #1f2d42' }}
      >
        <button onClick={onBack} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#1a2035' }}>
          <ArrowLeft size={18} style={{ color: '#e8eaf0' }} />
        </button>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#9b6dff' }}>Generate</p>
          <h2 className="text-base font-black" style={{ color: '#e8eaf0' }}>INFRACARE</h2>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>No Tiket</label>
          <input
            type="text"
            value={noTiket}
            onChange={e => setNoTiket(e.target.value.toUpperCase())}
            placeholder="Nomor tiket infracare..."
            style={INPUT_STYLE}
          />
        </div>
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>Alamat</label>
          <input type="text" value={alamat} onChange={e => setAlamat(e.target.value)} placeholder="Alamat lokasi..." style={INPUT_STYLE} />
        </div>
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>Penyebab</label>
          <input type="text" value={penyebab} onChange={e => setPenyebab(e.target.value)} placeholder="Penyebab gangguan..." style={INPUT_STYLE} />
        </div>
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>Perbaikan</label>
          <input type="text" value={perbaikan} onChange={e => setPerbaikan(e.target.value)} placeholder="Tindakan perbaikan..." style={INPUT_STYLE} />
        </div>
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>Teknisi 1</label>
          <input type="text" value={teknisi1} onChange={e => setTeknisi1(e.target.value)} placeholder="Nama teknisi 1..." style={INPUT_STYLE} />
        </div>
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>Teknisi 2</label>
          <input type="text" value={teknisi2} onChange={e => setTeknisi2(e.target.value)} placeholder="Nama teknisi 2 (opsional)..." style={INPUT_STYLE} />
        </div>

        <button
          onClick={handleGenerate}
          className="w-full py-4 rounded-2xl font-black text-sm transition-all active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #9b6dff, #5c3aaa)', color: '#fff', border: 'none' }}
        >
          Generate Format
        </button>

        {result && (
          <div style={SECTION_STYLE}>
            <div className="flex items-center justify-between mb-3">
              <label style={{ ...LABEL_STYLE, marginBottom: 0 }}>Hasil Generate</label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: copied ? '#2ec78522' : '#1e2740', color: copied ? '#2ec785' : '#8b95a8', border: `1px solid ${copied ? '#2ec78533' : '#2a3347'}` }}
              >
                {copied ? <><CheckCircle2 size={13} /> Tersalin!</> : <><Copy size={13} /> Salin</>}
              </button>
            </div>
            <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap" style={{ color: '#e8eaf0' }}>{result}</pre>
          </div>
        )}

        <div className="h-2" />
      </div>
    </div>
  );
}
