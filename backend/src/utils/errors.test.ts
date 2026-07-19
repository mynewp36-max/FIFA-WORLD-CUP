import { describe, it, expect } from 'vitest';
import {
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  InternalError,
  TimeoutError
} from './errors';

describe('App Errors', () => {
  it('ValidationError has correct status and message', () => {
    const error = new ValidationError();
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Validation failed.');
  });

  it('UnauthorizedError has correct status and message', () => {
    const error = new UnauthorizedError();
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Unauthorized.');
  });

  it('ForbiddenError has correct status and message', () => {
    const error = new ForbiddenError();
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe('Forbidden.');
  });

  it('NotFoundError has correct status and message', () => {
    const error = new NotFoundError();
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Resource not found.');
  });

  it('ConflictError has correct status and message', () => {
    const error = new ConflictError();
    expect(error.statusCode).toBe(409);
    expect(error.message).toBe('Resource conflict.');
  });

  it('RateLimitError has correct status and message', () => {
    const error = new RateLimitError();
    expect(error.statusCode).toBe(429);
    expect(error.message).toBe('Too many requests.');
  });

  it('InternalError has correct status and message', () => {
    const error = new InternalError();
    expect(error.statusCode).toBe(500);
    expect(error.message).toBe('An internal server error occurred.');
  });

  it('TimeoutError has correct status and message', () => {
    const error = new TimeoutError();
    expect(error.statusCode).toBe(408);
    expect(error.message).toBe('Request timed out.');
  });

  it('Custom messages override default messages', () => {
    const error = new ValidationError('Custom validation error');
    expect(error.message).toBe('Custom validation error');
  });
});
