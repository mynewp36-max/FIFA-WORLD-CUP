import { useState } from 'react';
import type {  EmergencyRequest, EmergencyResponse, IncidentType  } from '../types/emergency';
import { EmergencyService } from '../services/emergency.service';
import { normalizeEmergencyResponse } from '../utils/normalizers';

export const useEmergency = () => {
  const [incidentType, setIncidentType] = useState<IncidentType>('General Help Request');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmergencyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getGuidance = async () => {
    if (!location.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      setResult(null);

      const request: EmergencyRequest = {
        incidentType,
        stadium: 'MetLife Stadium',
        location,
        language: 'English',
        userRole: 'Fan',
        ...(description ? { description } : {})
      };

      const response = await EmergencyService.assist(request);

      if (response.error) {
        setError(response.error);
      } else {
        setResult(normalizeEmergencyResponse(response));
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
    setLocation('');
    setDescription('');
  };

  return {
    incidentType, setIncidentType,
    location, setLocation,
    description, setDescription,
    isLoading, result, error,
    getGuidance, reset,
  };
};
