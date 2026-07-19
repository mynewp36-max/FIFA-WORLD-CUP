import { describe, it, expect } from 'vitest';
import * as SkeletonModule from './Skeleton';

describe('Skeleton', () => {
  it('should render without crashing', () => {
    expect(SkeletonModule).toBeDefined();
  });
});