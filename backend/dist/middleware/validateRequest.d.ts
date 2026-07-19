import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
/**
 * Express middleware factory that validates `req.body` against a Zod schema.
 *
 * In Zod v4, validation errors are exposed as `.issues` (not `.errors`).
 * On success, `req.body` is replaced with the parsed (and stripped) data.
 * On failure, a structured 400 response is returned with detailed field errors.
 */
export declare const validateRequest: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validateRequest.d.ts.map