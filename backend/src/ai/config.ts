import dotenv from 'dotenv';

dotenv.config();

export const AI_CONFIG = {
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
  DEFAULT_MODEL: process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash',
  MAX_TOKENS: 4096,
  TEMPERATURE: 0.7,
};

export const getGenerationConfig = (overrides: any = {}) => {
  return {
    model: AI_CONFIG.DEFAULT_MODEL,
    config: {
      maxOutputTokens: AI_CONFIG.MAX_TOKENS,
      temperature: AI_CONFIG.TEMPERATURE,
      ...overrides
    }
  };
};
