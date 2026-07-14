import React, { memo, useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = memo(({ label, error, className = '', id, ...props }) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label htmlFor={inputId} className="text-sm font-medium text-text-muted">{label}</label>}
      <input 
        id={inputId}
        className={`w-full bg-bg-elevated border ${error ? 'border-error' : 'border-border-subtle'} text-text-main placeholder-gray-500 rounded-premium px-4 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && <span id={errorId} className="text-xs text-error animate-in fade-in slide-in-from-top-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
