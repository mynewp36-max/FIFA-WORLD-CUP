import React, { memo } from 'react';
import { Search } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = memo(({ title, description, action, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-bg-surface/30 border border-dashed border-border-subtle rounded-premium transition-all duration-300 hover:bg-bg-surface/50">
      <div className="w-16 h-16 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center mb-5 text-text-muted opacity-80 shadow-inner">
        {icon || <Search size={28} />}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-text-muted max-w-sm mx-auto mb-6 text-sm leading-relaxed">{description}</p>
      {action}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
