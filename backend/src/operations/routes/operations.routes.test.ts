import { describe, it, expect } from 'vitest';
import operationsRoutes from './operations.routes';

describe('OperationsRoutes', () => {
  it('should be exported as a function/router', () => {
    expect(typeof operationsRoutes).toBe('function');
  });
});