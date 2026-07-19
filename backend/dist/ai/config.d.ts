/**
 * Centralized AI configuration.
 * Environment variables are sourced from the validated `env` module
 * (already validated via Zod at server startup) — no redundant dotenv
 * calls needed here.
 */
export declare const AI_CONFIG: {
    readonly OPENROUTER_API_KEY: string;
    readonly DEFAULT_MODEL: string;
    readonly MAX_TOKENS: 4096;
    readonly TEMPERATURE: 0.7;
};
export interface GenerationConfig {
    maxOutputTokens: number;
    temperature: number;
    [key: string]: unknown;
}
export interface ModelConfig {
    model: string;
    config: GenerationConfig;
}
export declare const getGenerationConfig: (overrides?: Partial<GenerationConfig>) => ModelConfig;
//# sourceMappingURL=config.d.ts.map