import { aiLogger } from './logger';
import crypto from 'crypto';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class InMemoryCache {
  private cache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Generates a deterministic hash key from an object or string.
   */
  public generateKey(prefix: string, payload: any): string {
    const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return `${prefix}:${hash}`;
  }

  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      aiLogger.debug(`[Cache Miss] Expired key: ${key}`);
      return null;
    }

    aiLogger.debug(`[Cache Hit] Key: ${key}`);
    return entry.value as T;
  }

  public set<T>(key: string, value: T, ttlMs: number): void {
    const expiresAt = Date.now() + ttlMs;
    this.cache.set(key, { value, expiresAt });
    aiLogger.debug(`[Cache Set] Key: ${key} (TTL: ${ttlMs}ms)`);
    
    // Proactively clean up expired keys periodically to prevent memory leaks
    this.cleanup();
  }
  
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const aiCache = new InMemoryCache();
