import { InternalError } from './errors';
import { aiLogger } from '../ai/utils/logger';

/**
 * Safely parses JSON strings, specifically designed to handle raw, potentially malformed
 * outputs from Large Language Models (LLMs).
 *
 * @param rawText The raw text returned from the AI
 * @param context Optional context for logging purposes
 * @returns The parsed JSON object
 * @throws InternalError if the JSON cannot be salvaged or is empty
 */
export const safeJsonParse = <T = unknown>(rawText: string | null | undefined, context: string = 'Unknown Context'): T => {
  if (!rawText || rawText.trim() === '') {
    aiLogger.error(`Empty JSON response received in context: ${context}`);
    throw new InternalError(`Received an empty or missing response from the AI when expecting structured data.`);
  }

  let sanitized = rawText.trim();

  // Handle common LLM markdown artifacts (e.g., ```json\n{...}\n```)
  if (sanitized.startsWith('```')) {
    // Strip the opening markdown block, accounting for variations like ```json
    sanitized = sanitized.replace(/^```[a-z]*\n?/i, '');
    // Strip the closing markdown block
    sanitized = sanitized.replace(/```$/, '');
    sanitized = sanitized.trim();
  }

  try {
    return JSON.parse(sanitized) as T;
  } catch (error: unknown) {
    aiLogger.error(`JSON Parsing Failed in context: ${context}. Raw input: ${rawText}`, error);
    
    throw new InternalError(`Failed to parse AI response into structured data. Malformed output detected.`);
  }
};
