import type { OperationsSummaryRequest, OperationsSummaryResponse } from '../types/operations';
import { apiClient } from '../utils/apiClient';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class OperationsService {
  public static async generateSummary(request: OperationsSummaryRequest): Promise<OperationsSummaryResponse> {
    try {
      const response = await apiClient<{ success: boolean; data: OperationsSummaryResponse; message?: string }>(`${API_BASE_URL}/operations/summary`, {
        method: 'POST',
        body: JSON.stringify(request),
        retries: 2,
      });

      return {
        ...response.data,
        error: !response.success ? response.message : undefined
      } as OperationsSummaryResponse;
    } catch (error: unknown) {
      console.error('OperationsService Error:', error);
      return {
        executiveSummary: '',
        overallRisk: 'Low',
        priorityLevel: 'Low',
        crowdOverview: '',
        transportOverview: '',
        accessibilityOverview: '',
        recommendedActions: [],
        criticalAlerts: [],
        nextSteps: [],
        generatedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      } as OperationsSummaryResponse;
    }
  }
}
