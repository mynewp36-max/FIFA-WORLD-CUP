import { describe, it, expect, vi } from 'vitest';
import { requestLogger } from './requestLogger';
import { Request, Response, NextFunction } from 'express';

vi.mock('../ai/utils/logger', () => ({
  aiLogger: { info: vi.fn(), error: vi.fn() }
}));

describe('requestLogger', () => {
  it('should log request and call next', () => {
    const req = { method: 'GET', url: '/test', headers: { 'user-agent': 'test' }, ip: '127.0.0.1' };
    const res = {
      on: vi.fn((event, cb) => {
        if (event === 'finish') cb();
      }),
      statusCode: 200
    };
    const next = vi.fn();

    requestLogger(req as unknown as Request, res as unknown as Response, next);
    expect(next).toHaveBeenCalled();
  });
});
