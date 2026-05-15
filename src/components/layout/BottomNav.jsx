import React from 'react';
import { Home, Zap, Settings } from 'lucide-react';

const navItems = [
  { key: 'home', label: 'Beranda', icon: Home },
  { key: 'generate', label: 'Generate', icon: Zap },
  { key: 'settings', label: 'Settings', icon: Settings },
];

/**
 * Bottom navigation component
 */
export function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto">
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
                  isActive ? 'bg-blue-50' : ''
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
