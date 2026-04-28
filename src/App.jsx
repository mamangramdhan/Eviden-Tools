import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Trash2, Layout, Scan, Edit3, 
  CheckCircle2, AlertCircle, Clipboard, Send, ShieldCheck
} from 'lucide-react';

const App = () => {
  // --- 1. STATES ---
  const [mode, setMode] = useState('ONT');
  const [jenisTiket, setJenisTiket] = useState('HVC');
  const [user, setUser] = useState({ first_name: "Teknisi", username: "Guest" });
  
  const [images, setImages] = useState(Array(6).fill(null));
  const [previews, setPreviews] = useState(Array(6).fill(null));
  const [barcodeData, setBarcodeData] = useState(Array(6).fill(""));
  const [isScanning, setIsScanning] = useState(Array(6).fill(false));
  const [isGenerating, setIsGenerating] = useState(false);
  const [isValidScan, setIsValidScan] = useState(Array(6).fill(false));
  
  const [rawText, setRawText] = useState('');
  const [valinsId, setValinsId] = useState('');
  const [parsedData, setParsedData] = useState({
    noTiket: '-',
    noInternet: '-',
    datek: '-',
    cp: '-'
  });

  const canvasRef = useRef(null);
  const API_URL = "http://192.168.100.5:8000/scan"; 

  // --- 2. EFFECTS ---
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe?.user) setUser(tg.initDataUnsafe.user);
    }
  }, []);

  useEffect(() => {
    setImages(Array(6).fill(null));
    setPreviews(Array(6).fill(null));
    setBarcodeData(Array(6).fill(""));
    setIsValidScan(Array(6).fill(false));
  }, [mode]);

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

  // --- 3. FUNCTIONS ---
  const labels = {
    ONT: ["NTE LAMA (QR-CODE)", "NTE BARU (QR-CODE)", "Tampak Atas SEBELUM", "Tampak Atas SESUDAH", "Screenshot SCC", "Screenshot Valins"],
    STB: ["NTE LAMA (QR-CODE)", "NTE BARU (QR-CODE)", "Tampak Atas SEBELUM", "Tampak Atas SESUDAH", "Screenshot SCC", "LiveTV"]
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
      const newBarcodeData = [...barcodeData];
      const newIsValidScan = [...isValidScan];
      
      if (result.results && result.results.length > 0) {
        newBarcodeData[index] = result.results[0].data;
        newIsValidScan[index] = true;
      } else {
        newBarcodeData[index] = "";
        newIsValidScan[index] = false;
      }
      setBarcodeData(newBarcodeData);
      setIsValidScan(newIsValidScan);
    } catch (error) { console.error("Scan error:", error); } 
    finally {
      const finalIsScanning = [...isScanning];
      finalIsScanning[index] = false;
      setIsScanning(finalIsScanning);
    }
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

  const isFormValid = () => {
    const allImagesUploaded = images.every(img => img !== null);
    const ticketParsed = parsedData.noTiket !== '-';
    const barcodesFilled = barcodeData[0].trim() !== "" && barcodeData[1].trim() !== "";
    const valinsFilled = mode === 'ONT' ? valinsId.length >= 6 : true;

    return allImagesUploaded && ticketParsed && barcodesFilled && valinsFilled;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans pb-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Layout className="text-blue-600" /> Eviden Tool
            </h1>
            <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-wider">
              Teknisi: <span className="text-slate-800 font-bold">{user.first_name}</span>
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-tighter">Jenis NTE</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)} className="bg-slate-100 p-2 rounded-lg text-sm font-bold outline-none border border-transparent focus:border-blue-400 transition-all">
                <option value="ONT">ONT</option><option value="STB">STB</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-tighter">Jenis Tiket</label>
              <select value={jenisTiket} onChange={(e) => setJenisTiket(e.target.value)} className="bg-blue-50 p-2 rounded-lg text-sm font-bold outline-none text-blue-600 border border-blue-100">
                <option value="HVC">HVC</option><option value="REGULER">REGULER</option><option value="SQM">SQM</option><option value="UNSPECT">UNSPECT</option>
              </select>
            </div>
          </div>
        </header>

        {/* Parser Section */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-tighter">
            <Clipboard size={18} className="text-blue-600" /> Paste Data Tiket:
          </label>
          <textarea 
            className={`w-full h-24 p-3 border rounded-xl text-sm outline-none transition-all mb-4 ${parsedData.noTiket !== '-' ? 'bg-green-50 border-green-200 focus:border-green-400' : 'bg-slate-50 border-slate-200 focus:border-blue-400'}`}
            placeholder="🚨 Paste data tiket di sini..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(parsedData).map(([key, val]) => (
              <div key={key} className={`p-2 rounded-lg border text-center transition-all ${val !== '-' ? 'bg-white border-green-200 shadow-sm' : 'bg-slate-50 border-slate-100'}`}>
                <p className="text-[9px] font-bold text-slate-400 uppercase">{key}</p>
                <p className={`text-[11px] font-bold truncate ${val !== '-' ? 'text-green-700' : 'text-slate-400'}`}>{val}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Grid Foto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {labels[mode].map((label, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col transition-all hover:border-blue-200">
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{index + 1}. {label}</span>
                {previews[index] && (
                  <button onClick={() => {
                    const nI = [...images]; const nP = [...previews]; const nB = [...barcodeData]; const nV = [...isValidScan];
                    nI[index]=null; nP[index]=null; nB[index]=""; nV[index]=false;
                    setImages(nI); setPreviews(nP); setBarcodeData(nB); setIsValidScan(nV);
                  }} className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-all"><Trash2 size={16} /></button>
                )}
              </div>
              <div className="aspect-video relative flex items-center justify-center bg-slate-100 overflow-hidden">
                {previews[index] ? <img src={previews[index]} className="w-full h-full object-cover" alt="p" /> : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-all gap-2 text-slate-400">
                    <div className="bg-white p-2 rounded-full shadow-sm text-blue-500"><Camera size={20} /></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Unggah Foto</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(index, e)} />
                  </label>
                )}
                {isScanning[index] && (
                  <div className="absolute inset-0 bg-blue-600/60 backdrop-blur-sm flex flex-col items-center justify-center text-white text-[10px] font-bold animate-pulse">
                    <Scan className="mb-2" size={30} />
                    MEMINDAI BARCODE...
                  </div>
                )}
              </div>

              {(index === 0 || index === 1) && (
                <div className="p-3 bg-white border-t border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Barcode SN:</label>
                    {isValidScan[index] && (
                      <span className="flex items-center gap-1 text-[9px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 animate-in fade-in zoom-in duration-300">
                        <ShieldCheck size={10} /> SN TERVERIFIKASI
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input type="text" value={barcodeData[index]} readOnly={isValidScan[index]} 
                      onChange={(e) => { const nb = [...barcodeData]; nb[index] = e.target.value; setBarcodeData(nb); }}
                      className={`w-full text-xs p-2.5 pr-8 border rounded-lg outline-none transition-all font-mono ${
                        isValidScan[index] 
                        ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold cursor-not-allowed shadow-inner' 
                        : barcodeData[index] 
                          ? 'bg-green-50 border-green-200 text-green-700 font-bold' 
                          : 'bg-white border-slate-200 focus:border-blue-400'
                      }`}
                      placeholder={isValidScan[index] ? "" : "Input manual jika scan gagal..."}
                    />
                    <div className="absolute right-2 top-2.5">
                      {barcodeData[index] ? (
                        <CheckCircle2 size={16} className={isValidScan[index] ? "text-blue-500" : "text-green-500"} />
                      ) : (
                        <Edit3 size={16} className="text-slate-300" />
                      )}
                    </div>
                  </div>

                  {/* ALER MERAH JIKA SCAN GAGAL */}
                  {!barcodeData[index] && previews[index] && !isScanning[index] && (
                    <div className="mt-2 p-2 bg-red-50 rounded-md border border-red-100 flex items-center gap-2 animate-bounce">
                      <AlertCircle size={12} className="text-red-500" />
                      <span className="text-[9px] text-red-600 font-bold leading-none uppercase">
                        Barcode tidak terdeteksi, mohon isi manual.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final Submission */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col items-center gap-6">
          {mode === 'ONT' && (
            <div className="w-full max-w-md">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block text-center tracking-widest">Valins ID (Min 6 Karakter)</label>
              <input type="text" placeholder="Masukkan Valins ID..." value={valinsId} onChange={(e) => setValinsId(e.target.value)}
                className={`w-full p-4 rounded-xl border-2 text-lg font-bold text-center outline-none transition-all ${valinsId.length >= 6 ? 'border-green-400 bg-green-50 text-green-700 shadow-sm' : 'border-slate-200 bg-slate-50 focus:border-blue-400'}`}
              />
            </div>
          )}

          <div className="w-full max-w-md flex flex-col gap-3">
            <button
              onClick={() => { setIsGenerating(true); setTimeout(() => { alert("Laporan dikirim ke bot!"); setIsGenerating(false); }, 2000); }}
              disabled={!isFormValid() || isGenerating}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white shadow-xl transition-all ${
                !isFormValid() 
                ? 'bg-slate-300 cursor-not-allowed grayscale' 
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95 hover:shadow-blue-200'
              }`}
            >
              {isGenerating ? "MENGIRIM LAPORAN..." : <><Send size={20} /> KIRIM LAPORAN KE TELEGRAM</>}
            </button>
            
            {!isFormValid() && (
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-[10px] text-amber-700 font-bold uppercase text-center mb-1">⚠️ Lengkapi data untuk mengaktifkan tombol:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge label="6 Foto Lengkap" valid={images.every(img => img !== null)} />
                  <Badge label="Data Tiket (INC/INX)" valid={parsedData.noTiket !== '-'} />
                  <Badge label="Barcode SN (Lama & Baru)" valid={barcodeData[0] !== "" && barcodeData[1] !== ""} />
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

// Helper Component for Validation Badge
const Badge = ({ label, valid }) => (
  <span className={`text-[8px] px-2 py-1 rounded-full font-bold flex items-center gap-1 border transition-all ${
    valid 
    ? 'bg-green-100 text-green-700 border-green-200' 
    : 'bg-red-100 text-red-700 border-red-200 opacity-60'
  }`}>
    {valid ? <CheckCircle2 size={8} /> : <AlertCircle size={8} />} {label}
  </span>
);

export default App;