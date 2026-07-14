declare class StructuredLogger {
    private log;
    info(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    error(message: string, errorOrMeta?: any): void;
}
export declare const aiLogger: StructuredLogger;
export {};
//# sourceMappingURL=logger.d.ts.map