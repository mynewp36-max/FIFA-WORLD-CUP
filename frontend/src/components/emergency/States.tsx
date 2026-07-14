import React from 'react';
import { Skeleton } from '../Skeleton';

export const EmergencyLoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Generating emergency guidance">
    <Skeleton className="h-32 w-full rounded-premium" />
    <div className="space-y-4">
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-5/6 rounded-xl" />
      <Skeleton className="h-16 w-4/5 rounded-xl" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-36 rounded-xl" />
      <Skeleton className="h-36 rounded-xl" />
    </div>
  </div>
);

export const EmergencyEmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center bg-bg-surface/30 border border-dashed border-border-subtle rounded-premium p-8"
    role="status" aria-label="Select incident type to begin">
    <span className="text-5xl mb-4" aria-hidden="true">🚨</span>
    <p className="text-text-main font-semibold mb-2">Emergency Assistant Ready</p>
    <p className="text-text-muted text-sm max-w-xs">
      Select an incident type, enter your location, and get instant AI-powered guidance.
    </p>
  </div>
);
