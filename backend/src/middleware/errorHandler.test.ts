import { describe, it, expect, vi, beforeEach } from 'vitest';
import { errorHandler, notFoundHandler } from './errorHandler';
import { ValidationError, NotFoundError, InternalError } from '../utils/errors';
import { Request, Response, NextFunction } from 'express';

const mockReq = (): Partial<Request> => ({
  method: 'GET',
  url: '/api/test',
  originalUrl: '/api/test',
  requestId: 'test-req-id',
});

const mockRes = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('errorHandler middleware', () => {
  let next: NextFunction;

  beforeEach(() => {
    next = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('returns 400 for ValidationError with the correct message', () => {
    const req = mockReq();
    const res = mockRes();
    const err = new ValidationError('Bad payload');
    errorHandler(err, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    const payload = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(payload.success).toBe(false);
    expect(payload.message).toBe('Bad payload');
  });

  it('returns 404 for NotFoundError', () => {
    const req = mockReq();
    const res = mockRes();
    const err = new NotFoundError('Route missing');
    errorHandler(err, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(404);
    const payload = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(payload.message).toBe('Route missing');
  });

  it('returns 500 for InternalError', () => {
    const req = mockReq();
    const res = mockRes();
    const err = new InternalError('DB connection lost');
    errorHandler(err, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    const payload = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(payload.success).toBe(false);
    expect(payload.message).toBe('DB connection lost');
  });

  it('masks unknown errors with a generic 500 response', () => {
    const req = mockReq();
    const res = mockRes();
    const err = new Error('Unhandled crash with secrets');
    errorHandler(err, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    const payload = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(payload.message).toBe('An unexpected internal server error occurred.');
    expect(payload.message).not.toContain('secrets');
    expect(payload.success).toBe(false);
  });

  it('includes requestId and timestamp in all responses', () => {
    const req = mockReq();
    const res = mockRes();
    errorHandler(new ValidationError(), req as Request, res as Response, next);
    const payload = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(payload.requestId).toBeDefined();
    expect(payload.timestamp).toBeDefined();
  });
});

describe('notFoundHandler middleware', () => {
  it('calls next() with an error carrying statusCode 404', () => {
    const next = vi.fn();
    const req = mockReq();
    const res = mockRes();
    notFoundHandler(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledTimes(1);
    const calledError = next.mock.calls[0]?.[0] as { statusCode?: number; message?: string };
    expect(calledError.statusCode).toBe(404);
    expect(calledError.message).toContain('not found');
  });
});
