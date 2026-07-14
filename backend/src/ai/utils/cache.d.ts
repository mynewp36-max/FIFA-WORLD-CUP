declare class InMemoryCache {
    private cache;
    /**
     * Generates a deterministic hash key from an object or string.
     */
    generateKey(prefix: string, payload: any): string;
    get<T>(key: string): T | null;
    set<T>(key: string, value: T, ttlMs: number): void;
    private cleanup;
    clear(): void;
}
export declare const aiCache: InMemoryCache;
export {};
//# sourceMappingURL=cache.d.ts.map