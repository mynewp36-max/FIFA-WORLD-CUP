import React, { memo } from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = memo(({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-bg-elevated text-text-main border-border-subtle',
    success: 'bg-success/20 text-success border-success/30',
    warning: 'bg-warning/20 text-warning border-warning/30',
    error: 'bg-error/20 text-error border-error/30',
    info: 'bg-info/20 text-info border-info/30'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide transition-colors duration-200 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
