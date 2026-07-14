import React from 'react';

export interface ToastProps {
  message: string;
  isVisible: boolean;
  type?: 'success' | 'error' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, type = 'info' }) => {
  if (!isVisible) return null;

  const types = {
    success: 'bg-success text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]',
    error: 'bg-error text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    info: 'bg-bg-elevated text-text-main border border-border-subtle shadow-premium'
  };

  return (
    <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-full animate-in slide-in-from-bottom-5 fade-in duration-300 z-50 ${types[type]}`}>
      <p className="font-medium text-sm">{message}</p>
    </div>
  );
};
