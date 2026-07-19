export interface Interaction {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface SessionMetadata {
  startedAt: string;
  lastActive: string;
  userAgent?: string;
  [key: string]: unknown;
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


