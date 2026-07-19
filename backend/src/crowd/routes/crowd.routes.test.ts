import { describe, it, expect } from 'vitest';
import crowdRoutes from './crowd.routes';

describe('CrowdRoutes', () => {
  it('should be exported as a function/router', () => {
    expect(typeof crowdRoutes).toBe('function');
  });
});