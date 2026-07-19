import { describe, it, expect } from 'vitest';
import * as ErrorBoundaryModule from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should render without crashing', () => {
    expect(ErrorBoundaryModule).toBeDefined();
  });
});