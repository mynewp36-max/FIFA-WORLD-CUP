import { describe, it, expect } from 'vitest';
import transportRoutes from './transport.routes';

describe('TransportRoutes', () => {
  it('should be exported as a router', () => {
    expect(typeof transportRoutes).toBe('function');
  });
});
