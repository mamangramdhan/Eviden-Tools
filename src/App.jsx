import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, CheckCircle2, 
  ShieldCheck, Camera, Trash2, 
  Layout, Scan, Edit3, AlertCircle, Clipboard, Send, XCircle, Info, MessageSquare, Hash, FileText
} from 'lucide-react';

const ALLOWED_USER_IDS = [
  {
    id: 1379187380,
    namaLengkap: "Dona Ramdani",
    nik: "25940172",
    area: "CJA_3",
    mitra: "TA"
  },

]; 

const App = () => {
  const [techData, setTechData] = useState({ namaLengkap: "", nik: "", area: "", mitra: "" });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ first_name: "Teknisi", username: "Guest", id: null });
  const [jenisNTE, setJenisNTE] = useState('ONT');
  const [jenisTiket, setJenisTiket] = useState('HVC');
  
  const [images, setImages] = useState(Array(6).fill(null));
  const [previews, setPreviews] = useState(Array(6).fill(null));
  const [barcodeData, setBarcodeData] = useState(Array(6).fill(""));
  const [isScanning, setIsScanning] = useState(Array(6).fill(false));
  const [isValidScan, setIsValidScan] = useState(Array(6).fill(false));
  const [scanError, setScanError] = useState(Array(6).fill(false));
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [rawText, setRawText] = useState('');
  const [valinsId, setValinsId] = useState('');
  const [alasanGanti, setAlasanGanti] = useState(''); 
  const [alasanLainnya, setAlasanLainnya] = useState('');
  const [keteranganTambahan, setKeteranganTambahan] = useState('');
  const [parsedData, setParsedData] = useState({ noTiket: '-', noInternet: '-', datek: '-', cp: '-' });

  const getFormattedDate = () => {
    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const API_URL = "http://localhost:8000/scan"; 

  // --- LOGIKA PENGIRIMAN TELEGRAM & COLLAGE ---
  const handleSendReport = async () => {
    setIsGenerating(true);
    
    // Konfigurasi Bot Telegram
    const BOT_TOKEN = "6861644855:AAFW37tAj6MOVbQV5yYgsDmpVOxbixn3lfw"; 
    const CHAT_ID = "-5295521436";

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const canvasSize = 1280;
      const cols = 3;
      const rows = 2;
      const cellWidth = canvasSize / cols;
      const cellHeight = canvasSize / rows;

      canvas.width = canvasSize;
      canvas.height = canvasSize;

      // Background Putih
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Proses Gambar ke Canvas
      for (let i = 0; i < images.length; i++) {
        if (!images[i]) continue;
        
        const img = await new Promise((resolve) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.src = previews[i];
        });

        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * cellWidth;
        const y = row * cellHeight;

        // Draw Image (Cover style)
        const imgRatio = img.width / img.height;
        const cellRatio = cellWidth / cellHeight;
        let sw, sh, sx, sy;

        if (imgRatio > cellRatio) {
          sh = img.height;
          sw = img.height * cellRatio;
          sx = (img.width - sw) / 2;
          sy = 0;
        } else {
          sw = img.width;
          sh = img.width / cellRatio;
          sx = 0;
          sy = (img.height - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, x, y, cellWidth, cellHeight);
      }

      // Convert ke Blob
      const imageBlob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.9));

const penyebab = alasanGanti === 'Lainnya' ? alasanLainnya : alasanGanti;
      const ketLainText = jenisNTE === 'ONT' 
        ? `${keteranganTambahan || '-'} / Valins ID : ${valinsId}`
        : `${keteranganTambahan || '-'}`;

      const caption = `
📢 <b>LAPORAN EVIDEN GANTI ${jenisNTE}</b>
<code>${getFormattedDate()}</code>

🔸 <b>STO</b>: CJA
🔸 <b>NO TIKET</b>: ${parsedData.noTiket}
🔸 <b>NO INET/TLP/ALPRO</b>: ${parsedData.noInternet}
🔸 <b>JENIS TIKET</b>: ${jenisTiket}
🔸 <b>MATERIAL</b>: NTE ${jenisNTE}
🔸 <b>SN LAMA</b>: ${barcodeData[0]}
🔸 <b>SN BARU</b>: ${barcodeData[1]}
🔸 <b>SEGMEN GANGGUAN</b>: ${jenisNTE}
🔸 <b>PENYEBAB GANGGUAN</b>: ${penyebab}
🔸 <b>PERBAIKAN</b>: GANTI ONT
🔸 <b>CP AKTIF</b>: ${parsedData.cp}
🔸 <b>KET LAIN</b>: ${ketLainText}
👷‍♂️ <b>TEKNISI</b>: ${techData.namaLengkap} / @${user.username || 'Guest'}
👝 <b>LABOR</b>: ${techData.nik}
📍 <b>SEKTOR</b>: ${techData.area}
🏢 <b>MITRA</b>: ${techData.mitra}`.trim();

      // Kirim ke Telegram
      const formData = new FormData();
      formData.append('chat_id', CHAT_ID);
      formData.append('photo', imageBlob, 'eviden.jpg');
      formData.append('caption', caption);
      formData.append('parse_mode', 'HTML');

      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert("✅ Laporan Berhasil Dikirim!");
      } else {
        alert("❌ Gagal Mengirim Laporan. Cek Token/ChatID.");
      }

    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan teknis saat memproses laporan.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
  const checkAccess = () => {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const tg = window.Telegram?.WebApp;
    const telegramUser = tg?.initDataUnsafe?.user;

    if (isLocalhost) {
      setUser({ first_name: "Developer", id: "LOCAL", username: "dev_local" });
      setTechData({ namaLengkap: "Dev Mode", nik: "000000", area: "LOCAL", mitra: "LOCAL" });
      setIsAuthorized(true);
    } else if (tg && telegramUser) {
      setUser(telegramUser);
      
      // Cari user berdasarkan ID Telegram
      const foundUser = ALLOWED_USERS.find(u => u.id === Number(telegramUser.id));
      
      if (foundUser) {
        setTechData(foundUser); // Simpan data lengkap ke state
        setIsAuthorized(true);
        tg.expand();
      }
    } 
    setLoading(false);
  };
  setTimeout(checkAccess, 500);
}, []);

  useEffect(() => {
    if (!rawText) {
      setParsedData({ noTiket: '-', noInternet: '-', datek: '-', cp: '-' });
      return;
    }
    const ticketMatch = rawText.match(/(INC\d{7,10})|(INX\d{9,13})|(INX-\d{9,13})/i);
    const internetMatch = rawText.match(/(131183\d{6,12}|022\d{3,8})/i);
    const datekMatch = rawText.match(/(ODP-CJA-\w{3}\/\d{2,3})/i);
    const cpMatch = rawText.match(/((?<=\()[^)]+(?=\))|(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{3,5})/i);

    setParsedData({
      noTiket: ticketMatch ? ticketMatch[0].toUpperCase() : '-',
      noInternet: internetMatch ? internetMatch[0] : '-',
      datek: datekMatch ? datekMatch[0].toUpperCase() : '-',
      cp: cpMatch ? cpMatch[0] : '-'
    });
  }, [rawText]);

  const labels = {
    ONT: ["NTE LAMA (QR-CODE)", "NTE BARU (QR-CODE)", "Tampak Atas SEBELUM", "Tampak Atas SESUDAH", "Screenshot SCC", "Screenshot Valins"],
    STB: ["NTE LAMA (QR-CODE)", "NTE BARU (QR-CODE)", "Tampak Atas SEBELUM", "Tampak Atas SESUDAH", "Screenshot SCC", "LiveTV"]
  };

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
      const nB = [...barcodeData]; const nV = [...isValidScan]; const nE = [...scanError];
      if (result.results?.length > 0) {
        nB[index] = result.results[0].data; nV[index] = true; nE[index] = false;
      } else {
        nV[index] = false; nE[index] = true;
      }
      setBarcodeData(nB); setIsValidScan(nV); setScanError(nE);
    } catch (e) {
      const nE = [...scanError]; nE[index] = true; setScanError(nE);
    } finally {
      const fS = [...isScanning]; fS[index] = false; setIsScanning(fS);
    }
  };

  const isFormValid = () => {
    const allPhotos = images.every(img => img !== null);
    const ticketOk = parsedData.noTiket !== '-';
    const snOk = barcodeData[0].trim() !== "" && barcodeData[1].trim() !== "";
    const alasanOk = alasanGanti === 'Lainnya' ? alasanLainnya.trim() !== '' : alasanGanti !== '';
    const valinsOk = jenisNTE === 'ONT' ? valinsId.trim().length >= 6 : true;
    return allPhotos && ticketOk && snOk && alasanOk && valinsOk;
  };

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center animate-pulse"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans pb-20">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg shadow-blue-100"><Layout size={24} /></div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Eviden Tool v3</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">{techData.namaLengkap || "Guest User"}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <select value={jenisNTE} onChange={(e) => setJenisNTE(e.target.value)} className="bg-slate-100 p-2.5 rounded-xl text-xs font-black outline-none border-2 border-transparent focus:border-blue-400">
              <option value="ONT">ONT</option><option value="STB">STB</option>
            </select>
            <select value={jenisTiket} onChange={(e) => setJenisTiket(e.target.value)} className="bg-blue-50 p-2.5 rounded-xl text-xs font-black text-blue-700 outline-none border border-blue-100">
              <option value="HVC">HVC</option><option value="REGULER">REGULER</option><option value="SQM">SQM</option><option value="UNSPECT">UNSPECT</option>
            </select>
          </div>
        </header>

        {/* SECTION 1: DATA TIKET & ALASAN */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <label className="flex items-center gap-2 text-xs font-black text-slate-600 mb-4 uppercase tracking-widest">
            <Clipboard size={16} className="text-blue-600" /> Data Tiket Pelanggan
          </label>
          <textarea 
            className={`w-full h-28 p-4 border-2 rounded-xl text-sm outline-none transition-all mb-4 font-medium ${parsedData.noTiket !== '-' ? 'bg-green-50 border-green-200 focus:border-green-400' : 'bg-slate-50 border-slate-200 focus:border-blue-400'}`}
            placeholder="Tempel data tiket di sini..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {Object.entries(parsedData).map(([key, val]) => (
              <div key={key} className={`p-3 rounded-xl border ${val !== '-' ? 'bg-white border-green-200 shadow-sm' : 'bg-slate-50 border-slate-100'}`}>
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{key}</p>
                <p className={`text-[11px] font-black truncate ${val !== '-' ? 'text-green-700' : 'text-slate-400'}`}>{val}</p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">
              <Info size={14} className="text-amber-500" /> Alasan Ganti NTE
            </label>
            <select 
              value={alasanGanti} 
              onChange={(e) => setAlasanGanti(e.target.value)}
              className={`w-full p-3.5 rounded-xl border-2 text-sm font-bold outline-none transition-all ${alasanGanti !== '' ? 'border-blue-400 bg-white' : 'border-slate-100 bg-slate-50 text-slate-400'}`}
            >
              <option value="">-- Pilih Alasan --</option>
              <option value="Petir">Petir / Konslet</option>
              <option value="Redaman Tinggi">Port / Redaman Tinggi</option>
              <option value="Sering Restart">Sering Restart Sendiri</option>
              <option value="Fisik Rusak">Kerusakan Fisik / Adaptor</option>
              <option value="Upgrade">Upgrade Perangkat</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            {alasanGanti === 'Lainnya' && (
              <textarea placeholder="Tulis alasan spesifik..." value={alasanLainnya} onChange={(e) => setAlasanLainnya(e.target.value)} className="w-full mt-2 p-3 border-2 border-amber-200 bg-amber-50 rounded-xl text-sm font-medium outline-none focus:border-amber-400" rows="2" />
            )}
          </div>
        </section>

        {/* SECTION 2: UPLOAD FOTO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {labels[jenisNTE].map((label, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group hover:border-blue-400 transition-all">
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-500 uppercase">{index + 1}. {label}</span>
                {previews[index] && (
                  <button onClick={() => {
                    const nI = [...images]; const nP = [...previews]; const nB = [...barcodeData]; const nV = [...isValidScan]; const nE = [...scanError];
                    nI[index]=null; nP[index]=null; nB[index]=""; nV[index]=false; nE[index]=false;
                    setImages(nI); setPreviews(nP); setBarcodeData(nB); setIsValidScan(nV); setScanError(nE);
                  }} className="text-red-500 p-1.5 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={16} /></button>
                )}
              </div>
              <div className="aspect-[4/3] relative flex items-center justify-center bg-slate-100 overflow-hidden">
                {previews[index] ? <img src={previews[index]} className="w-full h-full object-cover" alt="preview" /> : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-all gap-2">
                    <div className="bg-white p-3 rounded-full shadow-md text-blue-600 group-hover:scale-110 transition-transform"><Camera size={24} /></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Ambil Foto</span>
                    <input type="file" className="hidden" accept="image/*" capture="environment" onChange={(e) => handleImageChange(index, e)} />
                  </label>
                )}
                {isScanning[index] && <div className="absolute inset-0 bg-blue-600/70 backdrop-blur-sm flex flex-col items-center justify-center text-white text-[10px] font-black animate-pulse"><Scan className="mb-2" size={32} /> SCANNING...</div>}
              </div>

              {(index === 0 || index === 1) && previews[index] && !isValidScan[index] && (
                <div className="p-4 bg-red-50 border-t border-red-100 animate-in slide-in-from-bottom-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[9px] font-black text-red-600 uppercase">SN Tidak Terdeteksi:</label>
                    <AlertCircle size={14} className="text-red-500" />
                  </div>
                  <div className="relative">
                    <input type="text" value={barcodeData[index]} 
                      onChange={(e) => { 
                        const nb = [...barcodeData]; nb[index] = e.target.value.toUpperCase(); setBarcodeData(nb);
                      }}
                      className="w-full text-xs p-3 pr-9 border-2 border-red-200 rounded-xl outline-none font-mono bg-white focus:border-red-400"
                      placeholder="Ketik SN Secara Manual ..."
                    />
                    <div className="absolute right-3 top-3"><Edit3 size={16} className="text-red-300" /></div>
                  </div>
                  <p className="mt-2 text-[8px] text-red-400 font-bold leading-tight">*Mohon pastikan SN yang diketik sesuai dengan stiker di perangkat.</p>
                </div>
              )}
              {(index === 0 || index === 1) && isValidScan[index] && (
                <div className="px-3 py-2 bg-green-50 flex items-center justify-between border-t border-green-100">
                  <span className="text-[9px] font-mono font-bold text-green-700 truncate">SN: {barcodeData[index]}</span>
                  <ShieldCheck size={14} className="text-green-500 shrink-0" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SECTION 3: VALINS & CATATAN */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jenisNTE === 'ONT' && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  <Hash size={14} className="text-blue-600" /> ID Valins
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Contoh: 654321" 
                    value={valinsId} 
                    onInput={(e) => setValinsId(e.target.value)}
                    className={`w-full p-3.5 rounded-xl border-2 text-sm font-black outline-none transition-all ${valinsId.length >= 6 ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-100 bg-slate-50 focus:border-blue-400'}`} 
                  />
                  {valinsId.length >= 6 && <CheckCircle2 size={18} className="absolute right-3 top-3.5 text-green-500" />}
                </div>
              </div>
            )}
            
            <div className={`space-y-2 ${jenisNTE !== 'ONT' ? 'md:col-span-2' : ''}`}>
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                <MessageSquare size={14} className="text-blue-600" /> Catatan Lapangan
              </label>
              <input 
                type="text" 
                placeholder="Tambahkan info jika ada (Opsional)..." 
                value={keteranganTambahan} 
                onChange={(e) => setKeteranganTambahan(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-medium outline-none transition-all focus:border-blue-400 focus:bg-white" 
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: SUBMIT */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center gap-4">
          <button
            onClick={handleSendReport}
            disabled={!isFormValid() || isGenerating}
            className={`w-full max-w-sm flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-white shadow-xl transition-all ${!isFormValid() || isGenerating ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-200'}`}
          >
            {isGenerating ? "MENGIRIM..." : <><Send size={18} /> KIRIM LAPORAN</>}
          </button>
          {!isFormValid() && (
            <div className="flex flex-wrap justify-center gap-2">
              <Badge label="6 Foto" valid={images.every(img => img !== null)} />
              <Badge label="Tiket" valid={parsedData.noTiket !== '-'} />
              <Badge label="SN" valid={barcodeData[0] !== "" && barcodeData[1] !== ""} />
              <Badge label="Alasan" valid={alasanGanti === 'Lainnya' ? alasanLainnya.trim() !== '' : alasanGanti !== ''} />
              {jenisNTE === 'ONT' && <Badge label="Valins ID" valid={valinsId.length >= 6} />}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const Badge = ({ label, valid }) => (
  <span className={`text-[8px] px-2 py-1 rounded-full font-black flex items-center gap-1 border ${valid ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-50 text-red-400 border-red-100'}`}>
    {valid ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />} {label}
  </span>
);

export default App;