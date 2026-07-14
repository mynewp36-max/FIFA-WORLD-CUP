import { useState } from 'react';
import type {  TransportRequest, TransportResponse, UserRole  } from '../types/transport';
import { TransportService } from '../services/transport.service';
import { normalizeTransportResponse } from '../utils/normalizers';

export const useTransport = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('Fan');
  const [groupSize, setGroupSize] = useState(1);
  const [wheelchair, setWheelchair] = useState(false);
  const [avoidCrowd, setAvoidCrowd] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TransportResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getRecommendation = async () => {
    if (!currentLocation.trim() || !destination.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      setResult(null);

      const request: TransportRequest = {
        stadium: 'MetLife Stadium',
        match: 'World Cup Final',
        currentLocation,
        destination,
        language: 'English',
        userRole,
        wheelchair,
        avoidCrowd,
        groupSize,
      };

      const response = await TransportService.recommend(request);

      if (response.error) {
        setError(response.error);
      } else {
        setResult(normalizeTransportResponse(response));
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
    setCurrentLocation('');
    setDestination('');
  };

  return {
    currentLocation, setCurrentLocation,
    destination, setDestination,
    userRole, setUserRole,
    groupSize, setGroupSize,
    wheelchair, setWheelchair,
    avoidCrowd, setAvoidCrowd,
    isLoading, result, error,
    getRecommendation, reset,
  };
};
