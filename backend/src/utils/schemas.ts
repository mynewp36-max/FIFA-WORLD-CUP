import { z } from 'zod';

export const ChatRequestSchema = z.object({
  message: z.string().min(1).max(2000).trim(),
  language: z.string().max(50).optional(),
  userRole: z.string().max(50).optional(),
  stadium: z.string().max(100).optional(),
  match: z.string().max(100).optional(),
  accessibility: z.boolean().optional()
});

export const TransportRecommendSchema = z.object({
  destination: z.string().min(1).max(200),
  time: z.string().max(50).optional(),
  currentLocation: z.string().max(200).optional()
});

export const CrowdAnalyzeSchema = z.object({
  activeSector: z.string().min(1).max(100),
  density: z.string().min(1).max(50)
});

export const EmergencyDispatchSchema = z.object({
  type: z.enum(['medical', 'security', 'fire', 'general']),
  location: z.string().min(1).max(200),
  details: z.string().max(1000).optional()
});

export const OperationsSummarySchema = z.object({
  timeframe: z.string().max(50).optional(),
  focus: z.string().max(100).optional()
});
