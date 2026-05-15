import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button variants configuration
 */
const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  warning: 'bg-orange-500 hover:bg-orange-600 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
};

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3 text-sm',
  lg: 'px-6 py-4 text-base',
};

/**
 * Reusable Button component
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-xl font-bold transition-all 
        active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

/**
 * Toggle button group
 */
export function ToggleGroup({ options, value, onChange, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-600 text-white border-blue-600',
    emerald: 'bg-emerald-600 text-white border-emerald-600',
    orange: 'bg-orange-500 text-white border-orange-500',
    violet: 'bg-violet-600 text-white border-violet-600',
  };

  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`
            flex-1 py-3 rounded-xl text-sm font-bold transition-all border
            ${value === opt 
              ? colorClasses[color] 
              : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
            }
          `}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/**
 * Grid toggle buttons
 */
export function ToggleGrid({ options, value, onChange, columns = 4, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-600 text-white border-blue-600',
    emerald: 'bg-emerald-600 text-white border-emerald-600',
    orange: 'bg-orange-500 text-white border-orange-500',
    violet: 'bg-violet-600 text-white border-violet-600',
  };

  return (
    <div className={`grid grid-cols-${columns} gap-2`}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`
            py-2.5 rounded-xl text-xs font-bold transition-all border
            ${value === opt 
              ? colorClasses[color] 
              : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
            }
          `}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
