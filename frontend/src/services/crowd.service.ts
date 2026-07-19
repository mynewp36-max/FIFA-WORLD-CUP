import { apiClient } from '../utils/apiClient';
import { API_BASE_URL } from '../config/api.config';

export interface CrowdAnalysisRequest {
  activeSector: string;
  density: string;
}

export interface CrowdAnalysisResponse {
  strategy: string;
  riskLevel: string;
  recommendedAction: string;
}

export class CrowdService {
  public static async analyze(request: CrowdAnalysisRequest): Promise<CrowdAnalysisResponse | null> {
    try {
      const response = await apiClient<{ success: boolean; data: CrowdAnalysisResponse }>(`${API_BASE_URL}/crowd/analyze`, {
        method: 'POST',
        body: JSON.stringify(request),
        retries: 2,
      });

      return response.data;
    } catch (error) {
      console.error('CrowdService Error:', error);
      return null;
    }
  }
}
