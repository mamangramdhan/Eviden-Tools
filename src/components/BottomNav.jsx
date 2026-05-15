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
      style={{ background: '#ffffff', borderTop: '1px solid #e8e8e8' }}
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around h-16 z-50"
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
              className={`flex items-center justify-center w-10 h-6 rounded-lg transition-all duration-200 ${
                isActive ? 'bg-[#e8f0ff]' : ''
              }`}
            >
              <Icon
                size={20}
                className="transition-colors duration-200"
                style={{ color: isActive ? '#0066cc' : '#cccccc' }}
              />
            </div>
            <span
              className="text-[10px] font-semibold tracking-wide transition-colors duration-200"
              style={{ color: isActive ? '#0066cc' : '#cccccc' }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
