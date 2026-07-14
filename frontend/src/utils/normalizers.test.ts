import { describe, it, expect } from 'vitest';
import { flattenObject, normalizeTransportResponse, normalizeOperationsResponse } from './normalizers';

describe('normalizers', () => {
  describe('flattenObject', () => {
    it('should return a string for primitive values', () => {
      expect(flattenObject('test')).toBe('test');
      expect(flattenObject(123)).toBe('123');
      expect(flattenObject(true)).toBe('true');
    });

    it('should join array values', () => {
      expect(flattenObject(['a', 'b', 123])).toBe('a, b, 123');
    });

    it('should handle nested objects gracefully', () => {
      const obj = { text: 'important text' };
      expect(flattenObject(obj)).toBe('important text');

      const complex = { message: 'hello', unused: 'ignored' };
      expect(flattenObject(complex)).toBe('hello');

      const fallback = { a: 'first', b: 'second' };
      expect(flattenObject(fallback)).toBe('first - second');
    });

    it('should return empty string for null or undefined', () => {
      expect(flattenObject(null)).toBe('');
      expect(flattenObject(undefined)).toBe('');
    });
  });

  describe('normalizeTransportResponse', () => {
    it('should inject intelligent fallbacks for missing data', () => {
      const result = normalizeTransportResponse({});
      
      expect(result.summary).toBe('Optimal transport route calculated based on current stadium traffic and crowd levels.');
      expect(result.recommendedTransport).toBe('Standard Stadium Transit');
      expect(result.estimatedTravelTime).toBe('Approximately 10–15 minutes based on current conditions.');
      expect(result.departureStrategy).toBe('Exit through the nearest recommended gate and follow stadium transport signage.');
      
      // Default tips should be injected
      expect(result.travelTips).toHaveLength(3);
      expect(result.travelTips[0]).toBe('Keep your ticket ready.');
    });

    it('should dynamically calculate ETA if distance is provided but ETA is missing', () => {
      const result = normalizeTransportResponse({ distance: '2 miles' });
      expect(result.estimatedTravelTime).toBe('~30 mins (Estimated)');
    });
  });

  describe('normalizeOperationsResponse', () => {
    it('should mathematically prepend input statuses', () => {
      const inputs = {
        stadium: 'MetLife',
        language: 'en',
        userRole: 'Organizer' as const,
        crowdStatus: 'Critical',
        transportStatus: 'Normal',
      };
      
      const result = normalizeOperationsResponse({ crowdOverview: 'Lots of people' }, inputs);
      
      expect(result.crowdOverview).toBe('[Input: Critical] Lots of people');
      expect(result.transportOverview).toBe('[Input: Normal] Transport systems operating normally.');
    });
  });
});
