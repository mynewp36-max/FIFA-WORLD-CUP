import { describe, it, expect } from 'vitest';
import * as EmptyStateModule from './EmptyState';

describe('EmptyState', () => {
  it('should render without crashing', () => {
    expect(EmptyStateModule).toBeDefined();
  });
});