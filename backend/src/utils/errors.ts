export abstract class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed.') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized.') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden.') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found.') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict.') {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests.') {
    super(message, 429);
  }
}

export class InternalError extends AppError {
  constructor(message: string = 'An internal server error occurred.') {
    super(message, 500);
  }
}

export class TimeoutError extends AppError {
  constructor(message: string = 'Request timed out.') {
    super(message, 408);
  }
}
