import type { TransportRequest, TransportResponse } from '../types/transport';
import { apiClient } from '../utils/apiClient';
import { API_BASE_URL } from '../config/api.config';

export class TransportService {
  public static async recommend(request: TransportRequest): Promise<TransportResponse> {
    try {
      const response = await apiClient<{ success: boolean; data: TransportResponse; message?: string }>(`${API_BASE_URL}/transport/recommend`, {
        method: 'POST',
        body: JSON.stringify(request),
        retries: 2,
      });

      return {
        ...response.data,
        error: !response.success ? response.message : undefined
      } as TransportResponse;
    } catch (error: unknown) {
      console.error('TransportService Error:', error);
      return {
        summary: '',
        recommendedTransport: '',
        alternativeOptions: [],
        departureStrategy: '',
        estimatedTravelTime: '',
        crowdImpact: '',
        priority: '',
        travelTips: [],
        error: error instanceof Error ? error.message : String(error),
      } as TransportResponse;
    }
  }
}
