import { env } from '../config/env';

/**
 * Centralized AI configuration.
 * Environment variables are sourced from the validated `env` module
 * (already validated via Zod at server startup) — no redundant dotenv
 * calls needed here.
 */
export const AI_CONFIG = {
  OPENROUTER_API_KEY: env.OPENROUTER_API_KEY,
  DEFAULT_MODEL: process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash',
  MAX_TOKENS: 4096,
  TEMPERATURE: 0.7,
} as const;

export interface GenerationConfig {
  maxOutputTokens: number;
  temperature: number;
  [key: string]: unknown;
}

export interface ModelConfig {
  model: string;
  config: GenerationConfig;
}

export const getGenerationConfig = (overrides: Partial<GenerationConfig> = {}): ModelConfig => {
  return {
    model: AI_CONFIG.DEFAULT_MODEL,
    config: {
      maxOutputTokens: AI_CONFIG.MAX_TOKENS,
      temperature: AI_CONFIG.TEMPERATURE,
      ...overrides,
    },
  };
};
