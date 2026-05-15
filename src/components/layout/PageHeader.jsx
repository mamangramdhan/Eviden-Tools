import React from 'react';
import { ArrowLeft } from 'lucide-react';

/**
 * Page header dengan back button
 */
export function PageHeader({ title, subtitle, onBack, color = 'blue' }) {
  const colorClasses = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    orange: 'text-orange-500',
    violet: 'text-violet-600',
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3 px-4 py-4">
        {onBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
        )}
        <div>
          {subtitle && (
            <p className={`text-xs font-bold uppercase tracking-widest ${colorClasses[color]}`}>
              {subtitle}
            </p>
          )}
          <h2 className="text-base font-black text-gray-900">{title}</h2>
        </div>
      </div>
    </div>
  );
}

/**
 * Main page layout wrapper
 */
export function PageLayout({ children, className = '' }) {
  return (
    <div className={`h-full overflow-y-auto bg-gray-50 pb-24 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Content wrapper dengan padding
 */
export function PageContent({ children, className = '' }) {
  return (
    <div className={`px-4 py-6 space-y-4 ${className}`}>
      {children}
    </div>
  );
}
