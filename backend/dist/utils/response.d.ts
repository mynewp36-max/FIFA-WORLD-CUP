import { Request } from 'express';
export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T | null;
    message: string;
    requestId: string;
    timestamp: string;
}
export declare const sendResponse: <T>(req: Request, success: boolean, data?: T | null, message?: string) => ApiResponse<T>;
//# sourceMappingURL=response.d.ts.map