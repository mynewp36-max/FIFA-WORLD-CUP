/**
 * Safely parses JSON strings, specifically designed to handle raw, potentially malformed
 * outputs from Large Language Models (LLMs).
 *
 * @param rawText The raw text returned from the AI
 * @param context Optional context for logging purposes
 * @returns The parsed JSON object
 * @throws InternalError if the JSON cannot be salvaged or is empty
 */
export declare const safeJsonParse: <T = any>(rawText: string | null | undefined, context?: string) => T;
//# sourceMappingURL=jsonParser.d.ts.map