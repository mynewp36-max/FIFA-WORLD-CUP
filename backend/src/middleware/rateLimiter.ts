import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { RateLimitError } from '../utils/errors';

export const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 60 requests per `window` (here, per minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (_req: Request, _res: Response, next: NextFunction) => {
    // Instead of sending a raw response, we pass our custom RateLimitError to the global error handler.
    // This ensures the response strictly matches our standardized JSON format.
    next(new RateLimitError('Too many requests from this IP. Please try again after a minute.'));
  },
});
