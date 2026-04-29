import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Lock, Smartphone, CheckCircle2, 
  UserCircle, ExternalLink, ShieldCheck, XCircle 
} from 'lucide-react';

// === CONFIGURATION ===
// Masukkan ID Telegram Anda dan Teknisi yang diizinkan di sini
const ALLOWED_USER_IDS = [1379187380]; 

const App = () => {
  // AWAL: Set ke false (terkunci) demi keamanan
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAccess = () => {
      // 1. Deteksi apakah sedang dijalankan di VS Code / Localhost
      const isLocalhost = 
        window.location.hostname === "localhost" || 
        window.location.hostname === "127.0.0.1";

      // 2. Ambil objek Telegram Web App
      const tg = window.Telegram?.WebApp;
      const telegramUser = tg?.initDataUnsafe?.user;

      if (isLocalhost) {
        // Jika sedang coding di laptop, izinkan akses dan buat user dummy
        setUser({ first_name: "Developer", id: "LOCAL", username: "localhost" });
        setIsAuthorized(true);
      } 
      else if (tg && telegramUser) {
        // Jika dibuka di Telegram, cek apakah ID terdaftar
        if (ALLOWED_USER_IDS.includes(telegramUser.id)) {
          setUser(telegramUser);
          setIsAuthorized(true);
          tg.expand(); // Lebarkan tampilan mini app
        } else {
          // User Telegram ada, tapi ID tidak terdaftar (Whitelist Error)
          setUser(telegramUser);
          setIsAuthorized(false);
        }
      } 
      else {
        // Dibuka di browser biasa (Chrome/Safari) dan bukan localhost
        setIsAuthorized(false);
      }
      
      setLoading(false);
    };

    // Beri sedikit delay agar transisi tidak terlalu kaget
    const timer = setTimeout(checkAccess, 500);
    return () => clearTimeout(timer);
  }, []);

  // --- 1. TAMPILAN LOADING ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Memverifikasi Akses...</p>
      </div>
    );
  }

  // --- 2. TAMPILAN ERROR (ACCESS DENIED) ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-white">
          {/* Header Visual */}
          <div className="bg-red-500 p-8 flex justify-center">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
              <ShieldAlert size={60} className="text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">
              Akses Terbatas
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Maaf, aplikasi ini merupakan internal tool teknisi. Akun Anda tidak memiliki izin untuk mengakses fitur ini.
            </p>

            {/* User Info Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-8">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200/50">
                <UserCircle className="text-slate-400" size={20} />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Username</p>
                  <p className="text-sm font-bold text-slate-700">@{user?.username || 'Guest / Browser'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="text-slate-400" size={20} />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Telegram ID</p>
                  <p className="text-sm font-mono font-bold text-red-500">{user?.id || 'Unknown Device'}</p>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="space-y-3">
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold text-sm hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
              >
                Coba Lagi
              </button>
              <p className="text-[10px] text-slate-400 font-medium">
                Hubungi Admin untuk mendaftarkan ID Anda
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 3. TAMPILAN UTAMA (APP CONTENT) ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header Statis */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <ShieldCheck size={20} />
            </div>
            <span className="font-black text-slate-800 tracking-tight">EVIDEN TOOL</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-700 uppercase">Verified: {user?.first_name}</span>
          </div>
        </div>
      </nav>

      {/* Konten Utama (Form/Scanner Anda) */}
      <main className="p-6 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
             <Smartphone size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Selamat Datang!</h2>
          <p className="text-slate-500 text-sm mb-6">Sistem siap digunakan. Silahkan mulai scan barcode NTE untuk pelaporan.</p>
          
          <div className="grid grid-cols-1 gap-4 text-left">
            {/* Letakkan komponen Scanner & Parser Anda di sini */}
            <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center py-12">
               <p className="text-slate-400 text-xs font-medium italic">Area Scanner Aktif...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;