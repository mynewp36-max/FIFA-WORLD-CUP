export declare abstract class AppError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare class ValidationError extends AppError {
    constructor(message?: string);
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
export declare class ConflictError extends AppError {
    constructor(message?: string);
}
export declare class RateLimitError extends AppError {
    constructor(message?: string);
}
export declare class InternalError extends AppError {
    constructor(message?: string);
}
export declare class TimeoutError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=errors.d.ts.map