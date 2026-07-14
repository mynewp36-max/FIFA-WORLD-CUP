import React from 'react';
import { Skeleton } from '../Skeleton';

export const OperationsLoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Generating operations summary">
    <Skeleton className="h-36 w-full rounded-premium" />
    <div className="grid grid-cols-3 gap-4">
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="h-48 rounded-xl" />
    </div>
  </div>
);

export const OperationsEmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center bg-bg-surface/30 border border-dashed border-border-subtle rounded-premium p-8"
    role="status" aria-label="No operations summary yet">
    <span className="text-5xl mb-4" aria-hidden="true">📊</span>
    <p className="text-text-main font-semibold mb-2">Command Center Ready</p>
    <p className="text-text-muted text-sm max-w-sm">
      Set your current operational status parameters and generate an AI-powered executive summary.
    </p>
  </div>
);
