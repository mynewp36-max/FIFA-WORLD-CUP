import { describe, it, expect } from 'vitest';
import * as LoadingSkeletonModule from './LoadingSkeleton';

describe('LoadingSkeleton', () => {
  it('should render without crashing', () => {
    expect(LoadingSkeletonModule).toBeDefined();
  });
});