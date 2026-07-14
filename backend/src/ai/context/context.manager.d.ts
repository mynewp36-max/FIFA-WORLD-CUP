import { AiContext, Interaction } from '../types';
declare class ContextManager {
    private contexts;
    private readonly MAX_HISTORY;
    constructor();
    getContext(userId: string): AiContext;
    updateContext(userId: string, updates: Partial<AiContext>): void;
    addInteraction(userId: string, interaction: Omit<Interaction, 'timestamp'>): void;
}
export declare const contextManager: ContextManager;
export {};
//# sourceMappingURL=context.manager.d.ts.map