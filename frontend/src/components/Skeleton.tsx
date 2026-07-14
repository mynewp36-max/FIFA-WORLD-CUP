import React, { memo } from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = memo(({ className = '', variant = 'rectangular' }) => {
  const baseClasses = "animate-pulse bg-bg-elevated/80";
  
  const variants = {
    rectangular: "rounded-md",
    circular: "rounded-full",
    text: "rounded-sm h-4 w-3/4"
  };

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      aria-hidden="true"
    ></div>
  );
});

Skeleton.displayName = 'Skeleton';
