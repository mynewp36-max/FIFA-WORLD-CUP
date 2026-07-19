import { z } from 'zod';
export declare const ChatRequestSchema: z.ZodObject<{
    message: z.ZodString;
    language: z.ZodOptional<z.ZodString>;
    userRole: z.ZodOptional<z.ZodString>;
    stadium: z.ZodOptional<z.ZodString>;
    match: z.ZodOptional<z.ZodString>;
    accessibility: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const TransportRecommendSchema: z.ZodObject<{
    destination: z.ZodString;
    time: z.ZodOptional<z.ZodString>;
    currentLocation: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const CrowdAnalyzeSchema: z.ZodObject<{
    activeSector: z.ZodString;
    density: z.ZodString;
}, z.core.$strip>;
export declare const EmergencyDispatchSchema: z.ZodObject<{
    type: z.ZodEnum<{
        security: "security";
        medical: "medical";
        fire: "fire";
        general: "general";
    }>;
    location: z.ZodString;
    details: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const OperationsSummarySchema: z.ZodObject<{
    timeframe: z.ZodOptional<z.ZodString>;
    focus: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=schemas.d.ts.map