import { useState } from 'react';
import type { 
  OperationsSummaryRequest,
  OperationsSummaryResponse,
  OrganizerRole,
 } from '../types/operations';
import { OperationsService } from '../services/operations.service';
import { normalizeOperationsResponse } from '../utils/normalizers';

const STATUS_OPTIONS = ['Normal', 'Busy', 'High', 'Critical', 'Moderate', 'Low'];

export const useOperations = () => {
  const [crowdStatus, setCrowdStatus] = useState('High');
  const [transportStatus, setTransportStatus] = useState('Busy');
  const [weather, setWeather] = useState('Clear');
  const [userRole, setUserRole] = useState<OrganizerRole>('Organizer');
  const [incidentNotes, setIncidentNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OperationsSummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const statusOptions = STATUS_OPTIONS;

  const generateSummary = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const request: OperationsSummaryRequest = {
        stadium: 'MetLife Stadium',
        match: 'FIFA World Cup Final',
        language: 'English',
        userRole,
        crowdStatus,
        transportStatus,
        weather,
        ...(incidentNotes ? { incidentNotes } : {})
      };

      const response = await OperationsService.generateSummary(request);

      if (response.error) {
        setError(response.error);
      } else {
        setResult(normalizeOperationsResponse(response, request));
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
  };

  return {
    crowdStatus, setCrowdStatus,
    transportStatus, setTransportStatus,
    weather, setWeather,
    userRole, setUserRole,
    incidentNotes, setIncidentNotes,
    statusOptions,
    isLoading, result, error,
    generateSummary, reset,
  };
};
