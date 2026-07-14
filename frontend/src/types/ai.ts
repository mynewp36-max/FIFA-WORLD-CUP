export interface Message {
  id: string;
  text: string;
  role: 'user' | 'ai';
  timestamp: string;
  isError?: boolean;
}

export interface ChatRequest {
  message: string;
  language?: string;
  userRole?: string;
  stadium?: string;
  match?: string;
  accessibility?: boolean;
}

export interface ChatResponse {
  success: boolean;
  reply: string;
  timestamp: string;
  language?: string;
  error?: string;
}
