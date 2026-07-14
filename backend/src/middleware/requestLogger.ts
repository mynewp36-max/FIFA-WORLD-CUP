import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { aiLogger } from '../ai/utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  req.requestId = crypto.randomUUID();

  // We hook into the 'finish' event of the response to log after processing is complete
  res.on('finish', () => {
    const executionTime = Date.now() - start;
    const statusCode = res.statusCode;
    
    // Structured logging
    aiLogger.info('HTTP Request', {
      requestId: req.requestId,
      timestamp,
      method: req.method,
      url: req.originalUrl,
      statusCode,
      executionTime,
    });
  });

  next();
};
