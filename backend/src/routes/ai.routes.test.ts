import { describe, it, expect } from 'vitest';
import aiRoutes from './ai.routes';
describe('AiRoutes', () => {
  it('should be exported as a function/router', () => {
    expect(typeof aiRoutes).toBe('function');
  });
});