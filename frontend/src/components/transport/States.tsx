import React from 'react';
import { Skeleton } from '../Skeleton';

export const TransportLoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading transport recommendations">
    <Skeleton className="h-36 w-full rounded-premium" />
    <div className="grid grid-cols-3 gap-3">
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
    </div>
    <Skeleton className="h-28 w-full rounded-xl" />
    <Skeleton className="h-28 w-4/5 rounded-xl" />
  </div>
);

export const TransportEmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center bg-bg-surface/30 border border-dashed border-border-subtle rounded-premium p-8"
    role="status" aria-label="No transport recommendation yet">
    <span className="text-5xl mb-4" aria-hidden="true">🚇</span>
    <p className="text-text-main font-semibold mb-2">Plan Your Journey</p>
    <p className="text-text-muted text-sm max-w-xs">
      Enter your current location and destination to get AI-powered transport recommendations.
    </p>
  </div>
);
