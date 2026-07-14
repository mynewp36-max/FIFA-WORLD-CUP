import { Request, Response, NextFunction } from 'express';
import { aiLogger } from '../ai/utils/logger';
import { sendResponse } from '../utils/response';
import { AppError, NotFoundError } from '../utils/errors';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction): void => {
  // Determine if it's an operational error we threw intentionally
  const isOperational = err instanceof AppError;
  const statusCode = isOperational ? err.statusCode : 500;
  
  // Safe message to send to the client (never expose stack trace for 500s)
  const message = isOperational 
    ? err.message 
    : 'An unexpected internal server error occurred.';

  // Log the internal error safely
  if (!isOperational || statusCode >= 500) {
    aiLogger.error(`[Unhandled Exception] ${req.method} ${req.url} - RequestID: ${req.requestId}`, err);
  } else {
    // Optionally log client errors (4xx) as warnings instead of errors
    aiLogger.warn(`[Client Error ${statusCode}] ${req.method} ${req.url} - RequestID: ${req.requestId} - ${message}`);
  }

  // Return formatted JSON response
  res.status(statusCode).json(
    sendResponse(req, false, null, message)
  );
};

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction): void => {
  // Pass a structured NotFoundError to the central error handler
  next(new NotFoundError('Route not found'));
};
