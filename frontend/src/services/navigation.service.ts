import type { NavigationRequest, NavigationResponse } from '../types/navigation';
import { apiClient } from '../utils/apiClient';
import { API_BASE_URL } from '../config/api.config';

export class NavigationService {
  public static async getRoute(request: NavigationRequest): Promise<NavigationResponse> {
    try {
      const response = await apiClient<{ success: boolean; data: NavigationResponse; message?: string }>(`${API_BASE_URL}/navigation/route`, {
        method: 'POST',
        body: JSON.stringify(request),
        retries: 2,
      });

      return {
        ...response.data,
        error: !response.success ? response.message : undefined
      } as NavigationResponse;
    } catch (error: unknown) {
      console.error('NavigationService Error:', error);
      return {
        route: [],
        estimatedTime: 'Calculating...',
        totalDistance: 'Standard routing distance',
        crowdLevel: 'Monitoring crowds...',
        recommendedEntrance: 'General Admission Gate',
        accessibilityStatus: 'Standard access',
        routeDifficulty: 'Moderate',
        confidenceScore: 'Optimizing route...',
        numberOfTurns: 'Direct route',
        alternateRouteAvailable: false,
        routeCongestion: 'Normal flow',
        warnings: ['Unable to generate optimized route. Displaying standard path.'],
        error: error instanceof Error ? error.message : String(error),
      } as NavigationResponse;
    }
  }
}
