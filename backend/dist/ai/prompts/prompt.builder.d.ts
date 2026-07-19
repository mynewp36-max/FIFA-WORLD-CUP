import { AiContext } from '../types';
export interface LayeredPromptParams {
    userMessage: string;
    context?: AiContext | undefined;
    taskSpecificRules?: string | undefined;
    targetLanguage?: string | undefined;
}
export declare const buildLayeredPrompt: (params: LayeredPromptParams) => string;
//# sourceMappingURL=prompt.builder.d.ts.map