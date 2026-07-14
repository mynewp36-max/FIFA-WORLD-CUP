import React, { memo } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: 'low' | 'medium' | 'high';
}

export const Card: React.FC<CardProps> = memo(({ children, elevation = 'medium', className = '', ...props }) => {
  const shadows = {
    low: 'shadow-sm hover:shadow-md',
    medium: 'shadow-premium hover:shadow-xl',
    high: 'shadow-xl shadow-glow'
  };

  return (
    <div 
      className={`bg-bg-surface/80 backdrop-blur-md border border-border-subtle rounded-premium p-6 transition-all duration-300 ${shadows[elevation]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
