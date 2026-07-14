import { AiContext } from '../types';
export interface LayeredPromptParams {
    userMessage: string;
    context?: AiContext;
    taskSpecificRules?: string;
    targetLanguage?: string;
}
export declare const buildLayeredPrompt: (params: LayeredPromptParams) => string;
//# sourceMappingURL=prompt.builder.d.ts.map