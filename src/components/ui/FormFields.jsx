import React from 'react';

/**
 * Input field dengan label
 */
export function Input({ label, className = '', ...props }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </label>
      )}
      <input
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        {...props}
      />
    </div>
  );
}

/**
 * Textarea dengan label
 */
export function Textarea({ label, className = '', rows = 3, ...props }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none leading-relaxed"
        {...props}
      />
    </div>
  );
}

/**
 * Select dropdown dengan label
 */
export function Select({ label, options = [], placeholder, className = '', ...props }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
