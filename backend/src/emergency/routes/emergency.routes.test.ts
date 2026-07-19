import { describe, it, expect } from 'vitest';
import emergencyRoutes from './emergency.routes';

describe('EmergencyRoutes', () => {
  it('should be exported as a function/router', () => {
    expect(typeof emergencyRoutes).toBe('function');
  });
});