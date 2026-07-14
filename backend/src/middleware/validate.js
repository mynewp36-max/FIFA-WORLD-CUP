"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredBody = exports.validateBody = void 0;
const response_1 = require("../utils/response");
const validateBody = (schema) => {
    return (req, res, next) => {
        const errors = [];
        for (const [field, rule] of Object.entries(schema)) {
            const value = req.body[field];
            // Check if required
            if (rule.required && (value === undefined || value === null || value === '')) {
                errors.push(`'${field}' is required.`);
                continue; // Skip further validation if missing but required
            }
            // If not required and missing, skip further validation
            if (value === undefined || value === null || value === '') {
                continue;
            }
            // Type check
            if (rule.type) {
                if (rule.type === 'array' && !Array.isArray(value)) {
                    errors.push(`'${field}' must be an array.`);
                }
                else if (rule.type !== 'array' && typeof value !== rule.type) {
                    errors.push(`'${field}' must be a ${rule.type}.`);
                }
            }
            // Enum check
            if (rule.enum && !rule.enum.includes(value)) {
                errors.push(`'${field}' must be one of: ${rule.enum.join(', ')}.`);
            }
            // Length checks for strings and arrays
            if (typeof value === 'string' || Array.isArray(value)) {
                if (rule.minLength !== undefined && value.length < rule.minLength) {
                    errors.push(`'${field}' must have a minimum length of ${rule.minLength}.`);
                }
                if (rule.maxLength !== undefined && value.length > rule.maxLength) {
                    errors.push(`'${field}' must have a maximum length of ${rule.maxLength}.`);
                }
            }
        }
        if (errors.length > 0) {
            res.status(400).json((0, response_1.sendResponse)(req, false, null, `Validation Error: ${errors.join(' ')}`));
            return;
        }
        next();
    };
};
exports.validateBody = validateBody;
// Legacy support for older simple arrays of required strings
const validateRequiredBody = (requiredFields) => {
    const schema = {};
    for (const field of requiredFields) {
        schema[field] = { required: true };
    }
    return (0, exports.validateBody)(schema);
};
exports.validateRequiredBody = validateRequiredBody;
//# sourceMappingURL=validate.js.map