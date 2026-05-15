import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Camera, Trash2, Scan, AlertCircle,
  Edit3, CheckCircle2, Send, Loader2, ChevronDown
} from 'lucide-react';

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

const photoLabelsONT = [
  'NTE LAMA (Scan QR-Code)',
  'NTE BARU (Scan QR-Code)',
  'Tampak Atas SEBELUM',
  'Tampak Atas SESUDAH',
  'Screenshot SCC',
  'Screenshot Valins',
];
const photoLabelsSTB = [
  'NTE LAMA (Scan QR-Code)',
  'NTE BARU (Scan QR-Code)',
  'Tampak Atas SEBELUM',
  'Tampak Atas SESUDAH',
  'Screenshot SCC',
  'LiveTV',
];

const API_URL = 'http://localhost:8000/scan';

export default function GantiNtePage({ onBack, techData, user }) {
  const [jenisNTE, setJenisNTE] = useState('ONT');
  const [jenisTiket, setJenisTiket] = useState('HVC');
  const [rawText, setRawText] = useState('');
  const [parsedData, setParsedData] = useState({ noTiket: '-', noInternet: '-', datek: '-', cp: '-' });
  const [images, setImages] = useState(Array(6).fill(null));
  const [previews, setPreviews] = useState(Array(6).fill(null));
  const [barcodeData, setBarcodeData] = useState(Array(6).fill(''));
  const [isScanning, setIsScanning] = useState(Array(6).fill(false));
  const [isValidScan, setIsValidScan] = useState(Array(6).fill(false));
  const [valinsId, setValinsId] = useState('');
  const [keteranganTambahan, setKeteranganTambahan] = useState('');
  const [isSending, setIsSending] = useState(false);

  const photoLabels = jenisNTE === 'ONT' ? photoLabelsONT : photoLabelsSTB;

  useEffect(() => {
    if (!rawText) {
      setParsedData({ noTiket: '-', noInternet: '-', datek: '-', cp: '-' });
      return;
    }
    const ticketMatch = rawText.match(/(INC\d{7,10})|(INX[\d-]{9,13})/i);
    const internetMatch = rawText.match(/(131183\d{6,12}|022\d{3,8})/i);
    const datekMatch = rawText.match(/(ODP-[A-Z]{3}-\w{3}\/\d{2,3})/i);
    const cpMatch = rawText.match(/(\+62|62|0)?[- ]?8[1-9]\d[\d -]{5,9}/i);
    setParsedData({
      noTiket: ticketMatch ? ticketMatch[0].toUpperCase() : '-',
      noInternet: internetMatch ? internetMatch[0] : '-',
      datek: datekMatch ? datekMatch[0].toUpperCase() : '-',
      cp: cpMatch ? cpMatch[0].trim() : '-',
    });
  }, [rawText]);

  const handleImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const nP = [...previews]; nP[index] = reader.result; setPreviews(nP);
    };
    reader.readAsDataURL(file);
    const nI = [...images]; nI[index] = file; setImages(nI);
    if (index === 0 || index === 1) await scanBarcode(index, file);
  };

  const scanBarcode = async (index, file) => {
    const nS = [...isScanning]; nS[index] = true; setIsScanning(nS);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(API_URL, { method: 'POST', body: formData });
      const result = await response.json();
      const nB = [...barcodeData]; const nV = [...isValidScan];
      if (result.results?.length > 0) {
        nB[index] = result.results[0].data; nV[index] = true;
      } else {
        nV[index] = false;
      }
      setBarcodeData(nB); setIsValidScan(nV);
    } catch {
      const nV2 = [...isValidScan]; nV2[index] = false; setIsValidScan(nV2);
    } finally {
      const fS = [...isScanning]; fS[index] = false; setIsScanning(fS);
    }
  };

  const removeImage = (index) => {
    const nI = [...images]; const nP = [...previews];
    const nB = [...barcodeData]; const nV = [...isValidScan];
    nI[index] = null; nP[index] = null; nB[index] = ''; nV[index] = false;
    setImages(nI); setPreviews(nP); setBarcodeData(nB); setIsValidScan(nV);
  };

  const getFormattedDate = () => {
    const now = new Date();
    const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
  };

  const handleSend = async () => {
    setIsSending(true);
    const BOT_TOKEN = '6861644855:AAFW37tAj6MOVbQV5yYgsDmpVOxbixn3lfw';
    const CHAT_ID = '-5295521436';
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 1280; const cols = 3; const rows = 2;
      canvas.width = size; canvas.height = size;
      ctx.fillStyle = '#111'; ctx.fillRect(0, 0, size, size);
      const cW = size / cols; const cH = size / rows;
      for (let i = 0; i < 6; i++) {
        if (!previews[i]) continue;
        const img = await new Promise(res => { const im = new Image(); im.crossOrigin = 'anonymous'; im.onload = () => res(im); im.src = previews[i]; });
        const col = i % cols; const row = Math.floor(i / cols);
        const x = col * cW; const y = row * cH;
        const iR = img.width / img.height; const cR = cW / cH;
        let sw, sh, sx, sy;
        if (iR > cR) { sh = img.height; sw = img.height * cR; sx = (img.width - sw) / 2; sy = 0; }
        else { sw = img.width; sh = img.width / cR; sx = 0; sy = (img.height - sh) / 2; }
        ctx.drawImage(img, sx, sy, sw, sh, x, y, cW, cH);
      }
      const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.9));
      const ketLain = jenisNTE === 'ONT' ? `${keteranganTambahan || '-'} / Valins ID: ${valinsId}` : keteranganTambahan || '-';
      const caption = `📢 <b>LAPORAN EVIDEN GANTI ${jenisNTE}</b>\n<code>${getFormattedDate()}</code>\n\n🔸 <b>NO TIKET</b>: ${parsedData.noTiket}\n🔸 <b>NO INET</b>: ${parsedData.noInternet}\n🔸 <b>JENIS TIKET</b>: ${jenisTiket}\n🔸 <b>MATERIAL</b>: NTE ${jenisNTE}\n🔸 <b>SN LAMA</b>: ${barcodeData[0] || '-'}\n🔸 <b>SN BARU</b>: ${barcodeData[1] || '-'}\n🔸 <b>CP AKTIF</b>: ${parsedData.cp}\n🔸 <b>KET LAIN</b>: ${ketLain}\n👷 <b>TEKNISI</b>: ${techData?.namaLengkap || '-'} / @${user?.username || 'Guest'}\n👝 <b>LABOR</b>: ${techData?.nik || '-'}\n📍 <b>SEKTOR</b>: ${techData?.area || '-'}\n🏢 <b>MITRA</b>: ${techData?.mitra || '-'}`.trim();
      const fd = new FormData();
      fd.append('chat_id', CHAT_ID); fd.append('photo', blob, 'eviden.jpg');
      fd.append('caption', caption); fd.append('parse_mode', 'HTML');
      const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, { method: 'POST', body: fd });
      alert(resp.ok ? '✅ Laporan berhasil dikirim!' : '❌ Gagal mengirim. Cek Token/ChatID.');
    } catch (err) {
      console.error('[v0] Send error:', err);
      alert('Terjadi kesalahan teknis.');
    } finally { setIsSending(false); }
  };

  return (
    <div className="h-full overflow-y-auto" style={{ paddingBottom: '90px' }}>
      {/* Top Bar */}
      <div
        className="sticky top-0 z-10 flex items-center gap-3 px-4 py-4"
        style={{ background: '#0e1117', borderBottom: '1px solid #1f2d42' }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: '#1a2035' }}
        >
          <ArrowLeft size={18} style={{ color: '#e8eaf0' }} />
        </button>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2b9ed4' }}>Generate</p>
          <h2 className="text-base font-black" style={{ color: '#e8eaf0' }}>GANTI NTE</h2>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {/* Jenis NTE */}
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>Jenis NTE</label>
          <div className="flex gap-2">
            {['ONT', 'STB'].map(j => (
              <button
                key={j}
                onClick={() => setJenisNTE(j)}
                className="flex-1 py-3 rounded-xl text-sm font-black transition-all"
                style={{
                  background: jenisNTE === j ? '#2b9ed4' : '#1e2740',
                  color: jenisNTE === j ? '#fff' : '#8b95a8',
                  border: `1px solid ${jenisNTE === j ? '#2b9ed4' : '#2a3347'}`,
                }}
              >
                {j}
              </button>
            ))}
          </div>
        </div>

        {/* Paste Order HD */}
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>Paste Order HD disini</label>
          <textarea
            rows={4}
            value={rawText}
            onChange={e => setRawText(e.target.value)}
            placeholder="Tempel data tiket pelanggan di sini..."
            style={{ ...INPUT_STYLE, resize: 'none', lineHeight: '1.5' }}
          />
          {/* Parsed Data */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {Object.entries(parsedData).map(([k, v]) => (
              <div
                key={k}
                className="rounded-xl p-2.5"
                style={{ background: v !== '-' ? '#1a3a2e' : '#1e2740', border: `1px solid ${v !== '-' ? '#2ec78533' : '#2a3347'}` }}
              >
                <p className="text-[9px] font-black uppercase mb-0.5" style={{ color: '#556070' }}>{k}</p>
                <p className="text-xs font-bold truncate" style={{ color: v !== '-' ? '#2ec785' : '#556070' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Jenis Tiket */}
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>Jenis Tiket</label>
          <div className="grid grid-cols-4 gap-2">
            {['REGULER', 'HVC', 'SQM', 'UNSPECT'].map(t => (
              <button
                key={t}
                onClick={() => setJenisTiket(t)}
                className="py-2.5 rounded-xl text-[11px] font-black transition-all"
                style={{
                  background: jenisTiket === t ? '#2b9ed4' : '#1e2740',
                  color: jenisTiket === t ? '#fff' : '#8b95a8',
                  border: `1px solid ${jenisTiket === t ? '#2b9ed4' : '#2a3347'}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Foto */}
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>Upload Foto (6 Foto)</label>
          <div className="grid grid-cols-2 gap-3">
            {photoLabels.map((lbl, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <p className="text-[10px] font-bold" style={{ color: '#8b95a8' }}>
                  {idx + 1}. {lbl}
                </p>
                <div
                  className="relative rounded-xl overflow-hidden aspect-square flex items-center justify-center"
                  style={{ background: '#1e2740', border: '1px solid #2a3347' }}
                >
                  {previews[idx] ? (
                    <>
                      <img src={previews[idx]} alt={lbl} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: '#e0525299' }}
                      >
                        <Trash2 size={13} style={{ color: '#fff' }} />
                      </button>
                      {(idx === 0 || idx === 1) && (
                        <div
                          className="absolute bottom-0 left-0 right-0 px-2 py-1"
                          style={{ background: isValidScan[idx] ? '#2ec78599' : '#e0525299' }}
                        >
                          {isValidScan[idx]
                            ? <p className="text-[9px] font-black text-white truncate"><CheckCircle2 size={9} className="inline mr-1" />{barcodeData[idx]}</p>
                            : <p className="text-[9px] font-black text-white"><AlertCircle size={9} className="inline mr-1" />Scan Gagal</p>
                          }
                        </div>
                      )}
                    </>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer gap-1.5">
                      <Camera size={22} style={{ color: '#2b9ed4' }} />
                      <span className="text-[10px] font-semibold" style={{ color: '#556070' }}>Ambil Foto</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        capture="environment"
                        onChange={e => handleImageChange(idx, e)}
                      />
                    </label>
                  )}
                  {isScanning[idx] && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1"
                      style={{ background: '#2b9ed4cc' }}>
                      <Scan size={24} style={{ color: '#fff' }} className="animate-pulse" />
                      <span className="text-[9px] font-black text-white">SCANNING...</span>
                    </div>
                  )}
                </div>
                {/* Manual input if scan failed */}
                {(idx === 0 || idx === 1) && previews[idx] && !isValidScan[idx] && (
                  <div className="relative">
                    <input
                      type="text"
                      value={barcodeData[idx]}
                      onChange={e => { const nb = [...barcodeData]; nb[idx] = e.target.value.toUpperCase(); setBarcodeData(nb); }}
                      placeholder="Input SN Manual..."
                      style={{ ...INPUT_STYLE, fontSize: '11px', paddingRight: '32px', borderColor: '#e05252' }}
                    />
                    <Edit3 size={13} className="absolute right-3 top-3.5" style={{ color: '#e05252' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scan Result */}
        {(barcodeData[0] || barcodeData[1]) && (
          <div style={SECTION_STYLE}>
            <label style={LABEL_STYLE}>Hasil Pemindaian</label>
            <div className="space-y-2">
              {[0, 1].map(i => barcodeData[i] && (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl p-3"
                  style={{ background: '#1e2740', border: `1px solid ${isValidScan[i] ? '#2ec78533' : '#e0525233'}` }}
                >
                  {isValidScan[i]
                    ? <CheckCircle2 size={16} style={{ color: '#2ec785' }} />
                    : <Edit3 size={16} style={{ color: '#e07b39' }} />
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase" style={{ color: '#556070' }}>
                      {i === 0 ? 'SN Lama' : 'SN Baru'} &bull; {isValidScan[i] ? 'Valid' : 'Manual'}
                    </p>
                    <p className="text-xs font-mono font-bold truncate" style={{ color: '#e8eaf0' }}>{barcodeData[i]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ValinsID & Keterangan */}
        {jenisNTE === 'ONT' && (
          <div style={SECTION_STYLE}>
            <label style={LABEL_STYLE}>Valins ID</label>
            <input
              type="text"
              value={valinsId}
              onChange={e => setValinsId(e.target.value)}
              placeholder="Masukkan Valins ID..."
              style={INPUT_STYLE}
            />
          </div>
        )}
        <div style={SECTION_STYLE}>
          <label style={LABEL_STYLE}>Keterangan Tambahan</label>
          <textarea
            rows={3}
            value={keteranganTambahan}
            onChange={e => setKeteranganTambahan(e.target.value)}
            placeholder="Keterangan tambahan (opsional)..."
            style={{ ...INPUT_STYLE, resize: 'none' }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={isSending}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all active:scale-[0.97]"
          style={{
            background: isSending ? '#1a3a52' : 'linear-gradient(135deg, #2b9ed4, #1a6a94)',
            color: '#fff',
            border: 'none',
            opacity: isSending ? 0.7 : 1,
          }}
        >
          {isSending
            ? <><Loader2 size={18} className="animate-spin" /> Mengirim...</>
            : <><Send size={18} /> Kirim Laporan ke Telegram</>
          }
        </button>
        <div className="h-2" />
      </div>
    </div>
  );
}
