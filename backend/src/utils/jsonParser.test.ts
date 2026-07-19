import { describe, it, expect } from 'vitest';
import { safeJsonParse } from './jsonParser';

describe('safeJsonParse', () => {
  it('parses valid JSON string', () => {
    const result = safeJsonParse('{"key":"value"}');
    expect(result).toEqual({ key: 'value' });
  });

  it('parses valid JSON with markdown code block', () => {
    const result = safeJsonParse('```json\n{"key":"value"}\n```');
    expect(result).toEqual({ key: 'value' });
  });

  it('parses JSON wrapped in plain backtick block without language hint', () => {
    const result = safeJsonParse('```\n{"a":1}\n```');
    expect(result).toEqual({ a: 1 });
  });

  it('throws an error with a descriptive message for empty string', () => {
    expect(() => safeJsonParse('')).toThrow('empty or missing response');
  });

  it('throws an error for null input', () => {
    expect(() => safeJsonParse(null as unknown as string)).toThrow('empty or missing response');
  });

  it('throws an error for undefined input', () => {
    expect(() => safeJsonParse(undefined)).toThrow('empty or missing response');
  });

  it('throws an error for invalid/malformed JSON', () => {
    expect(() => safeJsonParse('{"key": "value"')).toThrow('Failed to parse AI response');
  });

  it('parses arrays correctly', () => {
    const result = safeJsonParse('[1, 2, 3]');
    expect(result).toEqual([1, 2, 3]);
  });

  it('includes context in the log (does not affect parsing output)', () => {
    // Should still throw, context is just for logging
    expect(() => safeJsonParse('bad json', 'MyContext')).toThrow();
  });
});
