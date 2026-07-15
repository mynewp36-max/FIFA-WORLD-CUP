declare class StructuredLogger {
    private log;
    info(message: string, meta?: unknown): void;
    debug(message: string, meta?: unknown): void;
    warn(message: string, meta?: unknown): void;
    error(message: string, errorOrMeta?: unknown): void;
}
export declare const aiLogger: StructuredLogger;
export {};
//# sourceMappingURL=logger.d.ts.map