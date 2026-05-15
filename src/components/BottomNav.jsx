import React from 'react';
import { Home, Zap, Settings } from 'lucide-react';

const navItems = [
  { key: 'home', label: 'Beranda', icon: Home },
  { key: 'generate', label: 'Generate', icon: Zap },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav
      style={{ background: '#111827', borderTop: '1px solid #1f2d42' }}
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around h-16 z-50 max-w-[430px] mx-auto"
    >
      {navItems.map(({ key, label, icon: Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all"
          >
            <div
              className={`flex items-center justify-center w-10 h-6 rounded-full transition-all duration-200 ${
                isActive ? 'bg-[#1a3a52]' : ''
              }`}
            >
              <Icon
                size={20}
                className="transition-colors duration-200"
                style={{ color: isActive ? '#2b9ed4' : '#556070' }}
              />
            </div>
            <span
              className="text-[10px] font-semibold tracking-wide transition-colors duration-200"
              style={{ color: isActive ? '#2b9ed4' : '#556070' }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
