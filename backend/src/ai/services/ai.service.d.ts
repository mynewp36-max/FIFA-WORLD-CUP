export declare class AiService {
    /**
     * Centralized execution pipeline for all Gemini interactions.
     * Enforces DRY principles by handling try/catch blocks, client initialization,
     * context injection, layered prompting, and strict schema parsing.
     */
    private static execute;
    static generateResponse(userId: string, userMessage: string): Promise<string>;
    static generateStructuredResponse(userId: string, userMessage: string, schema: any): Promise<any>;
    static summarize(text: string): Promise<string>;
    static translate(text: string, targetLanguage: string): Promise<string>;
}
//# sourceMappingURL=ai.service.d.ts.map