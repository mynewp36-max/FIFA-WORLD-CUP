import { AiContext } from '../types';

const SYSTEM_PERSONA = `You are the FIFA World Cup 2026 AI Stadium Companion. You are an expert, friendly, and reliable enterprise-grade assistant designed to help stadium visitors and staff.`;

const BEHAVIOR_RULES = `Behavior Rules:
- Provide accurate, concise, and highly relevant assistance.
- Always prioritize the user's immediate operational or navigational needs inside the stadium.
- Never hallucinate or make up information. If unsure, gracefully admit it.`;

const SAFETY_RULES = `Safety Rules:
- Never provide actual medical diagnoses or perform real-world emergency actions. Instead, direct users to the nearest stadium staff or emergency services.
- Keep all responses professional, inclusive, and respectful.
- Do not engage in harmful, offensive, or controversial topics.`;

const OUTPUT_FORMATTING_RULES = `Output Formatting Rules:
- Use clear, structured formatting.
- Prioritize scannability for users on mobile devices in busy environments.`;

export interface LayeredPromptParams {
  userMessage: string;
  context?: AiContext | undefined;
  taskSpecificRules?: string | undefined;
  targetLanguage?: string | undefined;
}

export const buildLayeredPrompt = (params: LayeredPromptParams): string => {
  const parts: string[] = [];

  // Core Layers
  parts.push(`[SYSTEM PERSONA]\n${SYSTEM_PERSONA}`);
  parts.push(`[BEHAVIOR RULES]\n${BEHAVIOR_RULES}`);
  parts.push(`[SAFETY RULES]\n${SAFETY_RULES}`);
  parts.push(`[OUTPUT FORMATTING RULES]\n${OUTPUT_FORMATTING_RULES}`);

  // Context Layer
  if (params.context) {
    let contextStr = `[CONTEXT]\nUser Role: ${params.context.role}\nPreferred Language: ${params.context.preferredLanguage}\nStadium: ${params.context.stadium}`;
    if (params.context.match) contextStr += `\nMatch: ${params.context.match}`;
    if (params.context.accessibilityPreferences.length > 0) {
      contextStr += `\nAccessibility Needs: ${params.context.accessibilityPreferences.join(', ')}`;
    }
    parts.push(contextStr);
  }

  // Language Rules Layer
  const language = params.targetLanguage || params.context?.preferredLanguage;
  if (language) {
    parts.push(`[LANGUAGE RULES]\nYou must formulate your final response entirely in ${language}.`);
  }

  // Task Specific Rules (if any)
  if (params.taskSpecificRules) {
    parts.push(`[TASK SPECIFIC RULES]\n${params.taskSpecificRules}`);
  }

  // Final User Request Layer
  parts.push(`[USER REQUEST]\n${params.userMessage}`);

  return parts.join('\n\n================================\n\n');
};
