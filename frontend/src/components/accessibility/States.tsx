import React from 'react';
import { Skeleton } from '../Skeleton';

export const AccessibilityLoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading accessibility guidance">
    <Skeleton className="h-24 w-full rounded-premium" />
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-4/5 rounded-xl" />
      <Skeleton className="h-16 w-3/4 rounded-xl" />
    </div>
  </div>
);

export const AccessibilityEmptyState: React.FC = () => (
  <div
    className="flex flex-col items-center justify-center h-64 text-center bg-bg-surface/30 border border-dashed border-border-subtle rounded-premium p-8"
    role="status"
    aria-label="No guidance generated yet"
  >
    <span className="text-5xl mb-4" aria-hidden="true">♿</span>
    <p className="text-text-main font-semibold mb-2">Ready to Assist You</p>
    <p className="text-text-muted text-sm max-w-xs">
      Select your accessibility needs and enter your destination to receive personalized AI guidance.
    </p>
  </div>
);
