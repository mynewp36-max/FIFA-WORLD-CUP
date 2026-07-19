import { describe, it, expect } from 'vitest';
import navigationRoutes from './navigation.routes';

describe('NavigationRoutes', () => {
  it('should be exported as a function/router', () => {
    expect(typeof navigationRoutes).toBe('function');
  });
});