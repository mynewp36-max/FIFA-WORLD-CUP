import { Request, Response, NextFunction } from 'express';
/**
 * Handles the POST /api/ai/chat route.
 * Input validation is performed upstream by the Zod `validateRequest` middleware.
 * This controller only handles business logic: context update, AI call, response.
 */
export declare class AiController {
    static handleChat(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=ai.controller.d.ts.map