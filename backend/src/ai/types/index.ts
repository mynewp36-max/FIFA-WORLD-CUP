export interface Interaction {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface SessionMetadata {
  startedAt: string;
  lastActive: string;
  userAgent?: string;
  [key: string]: any;
}

export interface AiContext {
  userId: string;
  role: 'fan' | 'organizer' | 'security' | 'guest';
  preferredLanguage: string;
  stadium: string;
  match?: string;
  accessibilityPreferences: string[];
  history: Interaction[];
  metadata: SessionMetadata;
}

export interface PromptTemplate {
  systemPrompt: string;
  contextData: Partial<AiContext>;
  userMessage: string;
}

export interface StructuredSchema {
  type: string;
  properties: Record<string, any>;
  required?: string[];
}
