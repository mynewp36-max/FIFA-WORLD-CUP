"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsSummarySchema = exports.EmergencyDispatchSchema = exports.CrowdAnalyzeSchema = exports.TransportRecommendSchema = exports.ChatRequestSchema = void 0;
const zod_1 = require("zod");
exports.ChatRequestSchema = zod_1.z.object({
    message: zod_1.z.string().min(1).max(2000).trim(),
    language: zod_1.z.string().max(50).optional(),
    userRole: zod_1.z.string().max(50).optional(),
    stadium: zod_1.z.string().max(100).optional(),
    match: zod_1.z.string().max(100).optional(),
    accessibility: zod_1.z.boolean().optional()
});
exports.TransportRecommendSchema = zod_1.z.object({
    destination: zod_1.z.string().min(1).max(200),
    time: zod_1.z.string().max(50).optional(),
    currentLocation: zod_1.z.string().max(200).optional()
});
exports.CrowdAnalyzeSchema = zod_1.z.object({
    activeSector: zod_1.z.string().min(1).max(100),
    density: zod_1.z.string().min(1).max(50)
});
exports.EmergencyDispatchSchema = zod_1.z.object({
    type: zod_1.z.enum(['medical', 'security', 'fire', 'general']),
    location: zod_1.z.string().min(1).max(200),
    details: zod_1.z.string().max(1000).optional()
});
exports.OperationsSummarySchema = zod_1.z.object({
    timeframe: zod_1.z.string().max(50).optional(),
    focus: zod_1.z.string().max(100).optional()
});
//# sourceMappingURL=schemas.js.map