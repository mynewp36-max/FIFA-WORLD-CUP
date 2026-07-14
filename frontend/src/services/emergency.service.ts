import type { EmergencyRequest, EmergencyResponse } from '../types/emergency';
import { apiClient } from '../utils/apiClient';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class EmergencyService {
  public static async assist(request: EmergencyRequest): Promise<EmergencyResponse> {
    try {
      const response = await apiClient<{ success: boolean; data: EmergencyResponse; message?: string }>(`${API_BASE_URL}/emergency/assist`, {
        method: 'POST',
        body: JSON.stringify(request),
        retries: 2,
      });

      return {
        ...response.data,
        error: !response.success ? response.message : undefined
      } as EmergencyResponse;
    } catch (error: unknown) {
      console.error('EmergencyService Error:', error);
      return {
        summary: 'Standby for official emergency response instructions.',
        recommendedActions: [],
        incidentMetadata: {
          incidentId: 'PENDING-ID',
          severity: 'High',
          estimatedResponseTime: 'Dispatching team...',
          respondingTeam: 'Emergency Services',
          location: request.location,
          lastUpdated: new Date().toISOString()
        },
        timeline: [],
        status: 'Active',
        priority: 'Medium',
        safetyGuidance: [],
        communicationMessage: '',
        generatedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      } as EmergencyResponse;
    }
  }
}
