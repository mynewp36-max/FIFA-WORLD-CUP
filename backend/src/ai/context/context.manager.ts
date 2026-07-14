import { AiContext, Interaction } from '../types';
import { aiLogger } from '../utils/logger';

class ContextManager {
  // In-memory store keyed by userId or sessionId
  private contexts: Map<string, AiContext>;
  private readonly MAX_HISTORY = 10;

  constructor() {
    this.contexts = new Map();
  }

  public getContext(userId: string): AiContext {
    let context = this.contexts.get(userId);
    const now = new Date().toISOString();

    if (!context) {
      // Return default anonymous context if not found
      context = {
        userId,
        role: 'guest',
        preferredLanguage: 'en',
        stadium: 'Unknown',
        accessibilityPreferences: [],
        history: [],
        metadata: {
          startedAt: now,
          lastActive: now,
        }
      };
      this.contexts.set(userId, context);
      aiLogger.debug(`Created default context for ${userId}`);
    } else {
      context.metadata.lastActive = now;
    }
    
    return context;
  }

  public updateContext(userId: string, updates: Partial<AiContext>): void {
    const existing = this.getContext(userId);
    const now = new Date().toISOString();
    
    this.contexts.set(userId, { 
      ...existing, 
      ...updates,
      metadata: {
        ...existing.metadata,
        ...(updates.metadata || {}),
        lastActive: now
      }
    });
    
    aiLogger.debug(`Updated context for ${userId}`);
  }

  public addInteraction(userId: string, interaction: Omit<Interaction, 'timestamp'>): void {
    const context = this.getContext(userId);
    
    context.history.push({
      ...interaction,
      timestamp: new Date().toISOString()
    });

    // Automatic trimming to last 10 interactions
    if (context.history.length > this.MAX_HISTORY) {
      context.history = context.history.slice(-this.MAX_HISTORY);
    }

    context.metadata.lastActive = new Date().toISOString();
    this.contexts.set(userId, context);
    
    aiLogger.debug(`Added interaction to history for ${userId}. History size: ${context.history.length}`);
  }
}

export const contextManager = new ContextManager();
