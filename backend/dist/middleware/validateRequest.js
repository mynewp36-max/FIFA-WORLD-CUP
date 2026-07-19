"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const response_1 = require("../utils/response");
/**
 * Express middleware factory that validates `req.body` against a Zod schema.
 *
 * In Zod v4, validation errors are exposed as `.issues` (not `.errors`).
 * On success, `req.body` is replaced with the parsed (and stripped) data.
 * On failure, a structured 400 response is returned with detailed field errors.
 */
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const details = error.issues
                    .map((issue) => `${issue.path.join('.') || 'body'}: ${issue.message}`)
                    .join(', ');
                res.status(400).json((0, response_1.sendResponse)(req, false, null, `Validation failed: ${details}`));
            }
            else {
                next(error);
            }
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.js.map