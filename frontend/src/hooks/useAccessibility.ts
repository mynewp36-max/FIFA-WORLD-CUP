import { useState } from 'react';
import type {  AccessibilityNeed, AccessibilityRequest, AccessibilityResponse  } from '../types/accessibility';
import { AccessibilityService } from '../services/accessibility.service';
import { normalizeAccessibilityResponse } from '../utils/normalizers';

export const useAccessibility = () => {
  const [selectedNeeds, setSelectedNeeds] = useState<AccessibilityNeed[]>([]);
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AccessibilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleNeed = (need: AccessibilityNeed) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const getGuidance = async () => {
    if (!destination.trim() || selectedNeeds.length === 0) return;

    try {
      setIsLoading(true);
      setError(null);
      setResult(null);

      const request: AccessibilityRequest = {
        stadium: 'MetLife Stadium',
        match: 'Group Stage Match',
        userRole: 'Fan',
        language: 'English',
        accessibilityNeeds: selectedNeeds,
        destination,
      };

      const response = await AccessibilityService.assist(request);

      if (response.error) {
        setError(response.error);
      } else {
        setResult(normalizeAccessibilityResponse(response));
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err) || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setSelectedNeeds([]);
    setDestination('');
  };

  return {
    selectedNeeds,
    destination,
    setDestination,
    toggleNeed,
    isLoading,
    result,
    error,
    getGuidance,
    reset,
  };
};
