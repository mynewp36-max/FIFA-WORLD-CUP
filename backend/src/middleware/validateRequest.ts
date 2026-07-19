import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendResponse } from '../utils/response';

/**
 * Express middleware factory that validates `req.body` against a Zod schema.
 *
 * In Zod v4, validation errors are exposed as `.issues` (not `.errors`).
 * On success, `req.body` is replaced with the parsed (and stripped) data.
 * On failure, a structured 400 response is returned with detailed field errors.
 */
export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.issues
          .map((issue) => `${issue.path.join('.') || 'body'}: ${issue.message}`)
          .join(', ');
        res.status(400).json(
          sendResponse(req, false, null, `Validation failed: ${details}`)
        );
      } else {
        next(error);
      }
    }
  };
};
