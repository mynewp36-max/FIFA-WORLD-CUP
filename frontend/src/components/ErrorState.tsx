import React, { memo } from 'react';
import { Button } from './Button';
import { AlertOctagon } from 'lucide-react';

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = memo(({ message = 'Something went wrong.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-error/5 border border-error/20 rounded-premium text-center animate-in fade-in duration-300">
      <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mb-4 text-error">
        <AlertOctagon size={24} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Component Error</h3>
      <p className="text-text-muted text-sm mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="border-error/30 text-error hover:bg-error/10">
          Try Again
        </Button>
      )}
    </div>
  );
});

ErrorState.displayName = 'ErrorState';
