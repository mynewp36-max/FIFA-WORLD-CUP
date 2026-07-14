import React from 'react';
import { Skeleton } from '../Skeleton';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Skeleton className="h-24 w-full rounded-premium" />
        <Skeleton className="h-24 w-full rounded-premium" />
        <Skeleton className="h-24 w-full rounded-premium" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-3/4 rounded-xl" />
        <Skeleton className="h-16 w-5/6 rounded-xl" />
      </div>
    </div>
  );
};
