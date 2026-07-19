import { describe, it, expect } from 'vitest';
import accessibilityRoutes from './accessibility.routes';

describe('AccessibilityRoutes', () => {
  it('should be exported as a function/router', () => {
    expect(typeof accessibilityRoutes).toBe('function');
  });
});