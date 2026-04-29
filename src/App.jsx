import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Trash2, Layout, Scan, Edit3, 
  CheckCircle2, AlertCircle, Clipboard, Send, ShieldCheck, Lock, UserCheck
} from 'lucide-react';

// === CONFIGURATION ===
// Masukkan ID Telegram Teknisi yang diizinkan di sini
const ALLOWED_USER_IDS = [1379187380]; 
const API_URL = "https://backend-anda.render.com/scan"; // Ganti dengan URL Backend Online Anda

const App = () => {
  // --- STATES ---
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [mode, setMode] = useState('ONT');
  const [jenisTiket, setJenisTiket] = useState('HVC');
  
  const [images, setImages] = useState(Array(6).fill(null));
  const [previews, setPreviews] = useState(Array(6).fill(null));
  const [barcodeData, setBarcodeData] = useState(Array(6).fill(""));
  const [isScanning, setIsScanning] = useState(Array(6).fill(false));
  const [isValidScan, setIsValidScan] = useState(Array(6).fill(false));
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [rawText, setRawText] = useState('');
  const [valinsId, setValinsId] = useState('');
  const [parsedData, setParsedData] = useState({ noTiket: '-', noInternet: '-', datek: '-', cp: '-' });

  // --- TELEGRAM INIT & AUTH ---
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      
      const telegramUser = tg.initDataUnsafe?.user;
      if (telegramUser) {
        setUser(telegramUser);
        // Proteksi Whitelist
        if (!ALLOWED_USER_IDS.includes(telegramUser.id)) {
          setIsAuthorized(false);
        }
      } else {
        // Jika dibuka di browser biasa (bukan Telegram), uncomment baris bawah untuk lock
        setIsAuthorized(false); 
      }
    }
  }, []);

  // --- PARSER LOGIC ---
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
      noTiket: ticketMatch ? ticketMatch[0] : '-',
      noInternet: internetMatch ? internetMatch[0] : '-',
      datek: datekMatch ? datekMatch[0] : '-',
      cp: cpMatch ? cpMatch[0] : '-'
    });
  }, [rawText]);

  // --- HANDLERS ---
  const labels = {
    ONT: ["NTE LAMA (QR-CODE)", "NTE BARU (QR-CODE)", "Tampak Atas SEBELUM", "Tampak Atas SESUDAH", "Screenshot SCC", "Screenshot Valins"],
    STB: ["NTE LAMA (QR-CODE)", "NTE BARU (QR-CODE)", "Tampak Atas SEBELUM", "Tampak Atas SESUDAH", "Screenshot SCC", "LiveTV"]
  };

  const handleImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPreviews = [...previews];
      newPreviews[index] = reader.result;
      setPreviews(newPreviews);
    };
    reader.readAsDataURL(file);

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    if (index === 0 || index === 1) await scanBarcode(index, file);
  };

  const scanBarcode = async (index, file) => {
    const newIsScanning = [...isScanning];
    newIsScanning[index] = true;
    setIsScanning(newIsScanning);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(API_URL, { method: 'POST', body: formData });
      const result = await response.json();
      const newB = [...barcodeData];
      const newV = [...isValidScan];
      
      if (result.results?.length > 0) {
        newB[index] = result.results[0].data;
        newV[index] = true;
      } else {
        newB[index] = "";
        newV[index] = false;
      }
      setBarcodeData(newB);
      setIsValidScan(newV);
    } catch (e) { console.error(e); } 
    finally {
      const finalS = [...isScanning];
      finalS[index] = false;
      setIsScanning(finalS);
    }
  };

  const isFormValid = () => {
    const allImages = images.every(img => img !== null);
    const ticketOk = parsedData.noTiket !== '-';
    const snOk = barcodeData[0] !== "" && barcodeData[1] !== "";
    const valinsOk = mode === 'ONT' ? valinsId.length >= 6 : true;
    return allImages && ticketOk && snOk && valinsOk;
  };

  // --- RENDER ACCESS DENIED ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center font-sans">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 shadow-lg shadow-red-100 animate-pulse">
          <ShieldCheck size={50} />
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-2 uppercase italic">Akses Ditolak!</h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          Akun <b>@{user?.username || 'Guest'}</b> belum terdaftar di Whitelist sistem Eviden Tool.
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 w-full max-w-xs mb-8">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ID Telegram Anda:</p>
          <p className="text-lg font-mono font-bold text-slate-700 tracking-widest">{user?.id || 'UNIDENTIFIED'}</p>
        </div>
        <button onClick={() => window.Telegram?.WebApp?.close()} className="text-sm font-bold text-blue-600 underline">Tutup Aplikasi</button>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans pb-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Personal */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Layout className="text-blue-600" /> Eviden Tool v3
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                {user?.first_name} <span className="text-slate-300">|</span> ID: {user?.id}
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-[10px] font-black text-slate-400 uppercase mb-1">NTE Type</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)} className="bg-slate-100 p-2 rounded-lg text-sm font-bold outline-none border-2 border-transparent focus:border-blue-500 transition-all">
                <option value="ONT">ONT</option><option value="STB">STB</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-black text-slate-400 uppercase mb-1">Ticket Type</label>
              <select value={jenisTiket} onChange={(e) => setJenisTiket(e.target.value)} className="bg-blue-600 p-2 rounded-lg text-sm font-bold text-white outline-none">
                <option value="HVC">HVC</option><option value="REGULER">REGULER</option><option value="SQM">SQM</option>
              </select>
            </div>
          </div>
        </header>

        {/* Data Parser */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <label className="flex items-center gap-2 text-xs font-black text-slate-700 mb-3 uppercase tracking-widest">
            <Clipboard size={16} className="text-blue-600" /> Auto-Parser Ticket
          </label>
          <textarea 
            className={`w-full h-24 p-4 border-2 rounded-xl text-sm outline-none transition-all mb-4 font-medium ${parsedData.noTiket !== '-' ? 'bg-green-50 border-green-200 focus:border-green-400' : 'bg-slate-50 border-slate-200 focus:border-blue-400'}`}
            placeholder="🚨 Paste data ticket pelanggan di sini..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(parsedData).map(([key, val]) => (
              <div key={key} className={`p-3 rounded-xl border text-center transition-all ${val !== '-' ? 'bg-white border-green-200 shadow-sm shadow-green-50' : 'bg-slate-50 border-slate-100'}`}>
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{key}</p>
                <p className={`text-[11px] font-bold truncate ${val !== '-' ? 'text-green-700' : 'text-slate-300'}`}>{val}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upload Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {labels[mode].map((label, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group hover:border-blue-300 transition-all">
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-500 uppercase">{index + 1}. {label}</span>
                {previews[index] && (
                  <button onClick={() => {
                    const nI=[...images]; const nP=[...previews]; const nB=[...barcodeData]; const nV=[...isValidScan];
                    nI[index]=null; nP[index]=null; nB[index]=""; nV[index]=false;
                    setImages(nI); setPreviews(nP); setBarcodeData(nB); setIsValidScan(nV);
                  }} className="text-red-500 p-1 bg-red-50 rounded-full hover:bg-red-100 transition-colors"><Trash2 size={14} /></button>
                )}
              </div>
              
              <div className="aspect-video relative flex items-center justify-center bg-slate-100">
                {previews[index] ? <img src={previews[index]} className="w-full h-full object-cover" alt="p" /> : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 gap-2 transition-all">
                    <div className="bg-white p-3 rounded-full shadow-md text-blue-600 group-hover:scale-110 transition-transform"><Camera size={24} /></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ambil Foto</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(index, e)} />
                  </label>
                )}
                {isScanning[index] && (
                  <div className="absolute inset-0 bg-blue-600/70 backdrop-blur-sm flex flex-col items-center justify-center text-white text-[10px] font-black animate-pulse">
                    <Scan className="mb-2" size={32} />
                    SYSTEM SCANNING...
                  </div>
                )}
              </div>

              {(index === 0 || index === 1) && (
                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Serial Number:</label>
                    {isValidScan[index] && (
                      <span className="flex items-center gap-1 text-[9px] text-blue-700 font-black bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">
                        <ShieldCheck size={10} /> SN VERIFIED
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input type="text" value={barcodeData[index]} readOnly={isValidScan[index]} 
                      onChange={(e) => { const nb = [...barcodeData]; nb[index] = e.target.value; setBarcodeData(nb); }}
                      className={`w-full text-xs p-3 pr-9 border-2 rounded-xl outline-none font-mono transition-all ${
                        isValidScan[index] 
                        ? 'bg-blue-50 border-blue-100 text-blue-800 font-bold' 
                        : barcodeData[index] ? 'bg-green-50 border-green-100 text-green-700' : 'bg-white border-slate-200 focus:border-blue-400'
                      }`}
                      placeholder="Input SN Manual..."
                    />
                    <div className="absolute right-3 top-3.5">
                      {barcodeData[index] ? <CheckCircle2 size={16} className={isValidScan[index] ? "text-blue-500" : "text-green-500"} /> : <Edit3 size={16} className="text-slate-300" />}
                    </div>
                  </div>
                  {!barcodeData[index] && previews[index] && !isScanning[index] && (
                    <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2 animate-bounce">
                      <AlertCircle size={14} className="text-red-500" />
                      <span className="text-[9px] text-red-600 font-black uppercase">Gagal Scan! Mohon Isi Manual.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Submission */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-10 flex flex-col items-center gap-6">
          {mode === 'ONT' && (
            <div className="w-full max-w-sm text-center">
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">VALINS ID (MIN 6 CHAR)</label>
              <input type="text" placeholder="Masukkan ID Valins..." value={valinsId} onChange={(e) => setValinsId(e.target.value)}
                className={`w-full p-4 rounded-2xl border-2 text-xl font-black text-center transition-all outline-none ${valinsId.length >= 6 ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-100 bg-slate-50 focus:border-blue-400'}`}
              />
            </div>
          )}

          <div className="w-full max-w-sm">
            <button
              onClick={() => { setIsGenerating(true); setTimeout(() => { alert("Laporan Berhasil Terkirim!"); setIsGenerating(false); }, 2000); }}
              disabled={!isFormValid() || isGenerating}
              className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-sm text-white shadow-xl transition-all ${
                !isFormValid() ? 'bg-slate-300 grayscale cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }`}
            >
              {isGenerating ? "SENDING DATA..." : <><Send size={18} /> KIRIM DATA KE BOT</>}
            </button>
            
            {!isFormValid() && (
              <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[9px] text-amber-700 font-black uppercase text-center mb-3 tracking-widest">Requirement Checklist:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge label="6 Photos" valid={images.every(img => img !== null)} />
                  <Badge label="Ticket OK" valid={parsedData.noTiket !== '-'} />
                  <Badge label="SN Data" valid={barcodeData[0] !== "" && barcodeData[1] !== ""} />
                  {mode === 'ONT' && <Badge label="Valins ID" valid={valinsId.length >= 6} />}
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

// Sub-Component for Validation
const Badge = ({ label, valid }) => (
  <span className={`text-[8px] px-2 py-1 rounded-full font-black flex items-center gap-1 border transition-all ${
    valid ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-50 text-red-400 border-red-100 opacity-60'
  }`}>
    {valid ? <UserCheck size={10} /> : <AlertCircle size={10} />} {label}
  </span>
);

export default App;