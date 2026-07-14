export declare class OpenRouterClient {
    private static instance;
    private readonly baseUrl;
    private constructor();
    static getInstance(): OpenRouterClient;
    getHeaders(): HeadersInit;
    getEndpoint(): string;
}
export declare const getOpenRouterClient: () => OpenRouterClient;
//# sourceMappingURL=openrouter.client.d.ts.map