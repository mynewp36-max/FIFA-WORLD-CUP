import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  ChatRequestSchema,
  TransportRecommendSchema,
  CrowdAnalyzeSchema,
  EmergencyDispatchSchema,
  OperationsSummarySchema,
} from './schemas';

describe('Zod Validation Schemas', () => {
  describe('ChatRequestSchema', () => {
    it('accepts a valid minimal payload', () => {
      const result = ChatRequestSchema.safeParse({ message: 'Hello' });
      expect(result.success).toBe(true);
    });

    it('accepts a full valid payload', () => {
      const result = ChatRequestSchema.safeParse({
        message: 'Hello',
        language: 'English',
        userRole: 'Fan',
        stadium: 'MetLife',
        match: 'USA vs Brazil',
        accessibility: true,
      });
      expect(result.success).toBe(true);
    });

    it('rejects an empty message', () => {
      const result = ChatRequestSchema.safeParse({ message: '' });
      expect(result.success).toBe(false);
    });

    it('rejects a missing message field', () => {
      const result = ChatRequestSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('rejects a message exceeding 2000 characters', () => {
      const result = ChatRequestSchema.safeParse({ message: 'a'.repeat(2001) });
      expect(result.success).toBe(false);
    });

    it('trims whitespace from message', () => {
      const result = ChatRequestSchema.safeParse({ message: '  hello  ' });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.message).toBe('hello');
    });
  });

  describe('CrowdAnalyzeSchema', () => {
    it('accepts valid crowd analysis input', () => {
      const result = CrowdAnalyzeSchema.safeParse({ activeSector: 'Gate A', density: 'High' });
      expect(result.success).toBe(true);
    });

    it('rejects missing activeSector', () => {
      const result = CrowdAnalyzeSchema.safeParse({ density: 'High' });
      expect(result.success).toBe(false);
    });

    it('rejects missing density', () => {
      const result = CrowdAnalyzeSchema.safeParse({ activeSector: 'Gate A' });
      expect(result.success).toBe(false);
    });
  });

  describe('EmergencyDispatchSchema', () => {
    it('accepts all valid emergency types', () => {
      const types = ['medical', 'security', 'fire', 'general'] as const;
      for (const type of types) {
        const result = EmergencyDispatchSchema.safeParse({ type, location: 'Section 112' });
        expect(result.success).toBe(true);
      }
    });

    it('rejects an invalid emergency type', () => {
      const result = EmergencyDispatchSchema.safeParse({ type: 'earthquake', location: 'Section 1' });
      expect(result.success).toBe(false);
    });

    it('rejects a missing location', () => {
      const result = EmergencyDispatchSchema.safeParse({ type: 'medical' });
      expect(result.success).toBe(false);
    });
  });

  describe('TransportRecommendSchema', () => {
    it('accepts a valid destination', () => {
      const result = TransportRecommendSchema.safeParse({ destination: 'Penn Station' });
      expect(result.success).toBe(true);
    });

    it('rejects an empty destination', () => {
      const result = TransportRecommendSchema.safeParse({ destination: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('OperationsSummarySchema', () => {
    it('accepts an empty payload (all optional)', () => {
      const result = OperationsSummarySchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('accepts a full optional payload', () => {
      const result = OperationsSummarySchema.safeParse({ timeframe: '1 hour', focus: 'Security' });
      expect(result.success).toBe(true);
    });
  });
});
