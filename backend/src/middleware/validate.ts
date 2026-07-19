import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';

export type ValidationType = 'string' | 'number' | 'boolean' | 'array';

export interface ValidationRule {
  required?: boolean;
  type?: ValidationType;
  enum?: unknown[];
  minLength?: number;
  maxLength?: number;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export const validateBody = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];

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
        } else if (rule.type !== 'array' && typeof value !== rule.type) {
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
      res.status(400).json(
        sendResponse(req, false, null, `Validation Error: ${errors.join(' ')}`)
      );
      return;
    }

    next();
  };
};

// Legacy support for older simple arrays of required strings
export const validateRequiredBody = (requiredFields: string[]) => {
  const schema: ValidationSchema = {};
  for (const field of requiredFields) {
    schema[field] = { required: true };
  }
  return validateBody(schema);
};
