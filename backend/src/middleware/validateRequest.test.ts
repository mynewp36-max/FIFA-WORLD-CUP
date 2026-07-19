import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateRequest } from './validateRequest';
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Factory to create a mock Request
const mockReq = (body: unknown = {}): Partial<Request> => ({
  body,
  method: 'POST',
  originalUrl: '/api/test',
  requestId: 'test-id',
});

// Factory to create a mock Response
const mockRes = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('validateRequest middleware', () => {
  const schema = z.object({
    name: z.string().min(1),
    age: z.number().optional(),
  });

  const middleware = validateRequest(schema);
  let next: NextFunction;

  beforeEach(() => {
    next = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls next() when the body is valid', async () => {
    const req = mockReq({ name: 'John' });
    const res = mockRes();
    await middleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(); // no error argument
  });

  it('strips extra fields not in the schema', async () => {
    const req = mockReq({ name: 'John', extraField: 'hack' }) as Request;
    const res = mockRes();
    await middleware(req, res as Response, next);
    expect(req.body).toEqual({ name: 'John' });
    expect(req.body.extraField).toBeUndefined();
  });

  it('returns 400 when a required field is missing', async () => {
    const req = mockReq({});
    const res = mockRes();
    await middleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns a descriptive validation error message', async () => {
    const req = mockReq({});
    const res = mockRes();
    await middleware(req as Request, res as Response, next);
    const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(jsonCall.success).toBe(false);
    expect(jsonCall.message).toContain('Validation failed');
    expect(jsonCall.message).toContain('name');
  });

  it('returns 400 when a field has the wrong type', async () => {
    const req = mockReq({ name: 'John', age: 'not-a-number' });
    const res = mockRes();
    await middleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(jsonCall.message).toContain('age');
  });

  it('calls next(error) for non-Zod errors', async () => {
    const badSchema = {
      parseAsync: vi.fn().mockRejectedValue(new Error('Some unexpected error')),
    };
    const badMiddleware = validateRequest(badSchema as unknown as z.ZodSchema);
    const req = mockReq({ name: 'John' });
    const res = mockRes();
    await badMiddleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(res.status).not.toHaveBeenCalled();
  });
});
