import React from 'react';

export interface AlertProps {
  title: string;
  message?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

export const Alert: React.FC<AlertProps> = ({ title, message, variant = 'info' }) => {
  const variants = {
    info: 'bg-info/10 border-info/50 text-info',
    success: 'bg-success/10 border-success/50 text-success',
    warning: 'bg-warning/10 border-warning/50 text-warning',
    error: 'bg-error/10 border-error/50 text-error',
  };

  return (
    <div className={`p-4 rounded-premium border ${variants[variant]} flex flex-col gap-1`}>
      <h4 className="font-semibold">{title}</h4>
      {message && <p className="text-sm opacity-90">{message}</p>}
    </div>
  );
};
