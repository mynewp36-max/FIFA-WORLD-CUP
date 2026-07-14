import { Request, Response, NextFunction } from 'express';
export type ValidationType = 'string' | 'number' | 'boolean' | 'array';
export interface ValidationRule {
    required?: boolean;
    type?: ValidationType;
    enum?: any[];
    minLength?: number;
    maxLength?: number;
}
export interface ValidationSchema {
    [key: string]: ValidationRule;
}
export declare const validateBody: (schema: ValidationSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateRequiredBody: (requiredFields: string[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map