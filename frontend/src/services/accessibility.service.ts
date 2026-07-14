import type { AccessibilityRequest, AccessibilityResponse } from '../types/accessibility';
import { apiClient } from '../utils/apiClient';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class AccessibilityService {
  public static async assist(request: AccessibilityRequest): Promise<AccessibilityResponse> {
    try {
      const response = await apiClient<{ success: boolean; data: AccessibilityResponse; message?: string }>(`${API_BASE_URL}/accessibility/assist`, {
        method: 'POST',
        body: JSON.stringify(request),
        retries: 2,
      });

      return {
        ...response.data,
        error: !response.success ? response.message : undefined
      } as AccessibilityResponse;
    } catch (error: unknown) {
      console.error('AccessibilityService Error:', error);
      return {
        summary: '',
        recommendedRoute: [],
        accessibleEntrances: [],
        elevators: [],
        ramps: [],
        accessibleRestrooms: [],
        accessibleSeating: [],
        medicalSupport: [],
        accessibilityServices: [],
        estimatedTravelTime: '',
        importantInstructions: [],
        thingsToAvoid: [],
        emergencyContacts: [],
        warnings: [],
        error: error instanceof Error ? error.message : String(error),
      } as AccessibilityResponse;
    }
  }
}
