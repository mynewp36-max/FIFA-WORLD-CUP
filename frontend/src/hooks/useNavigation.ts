import { useState } from 'react';
import type {  NavigationRequest, NavigationResponse  } from '../types/navigation';
import { NavigationService } from '../services/navigation.service';
import { normalizeNavigationResponse } from '../utils/normalizers';

export const useNavigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [routeResult, setRouteResult] = useState<NavigationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateRoute = async (request: NavigationRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      setRouteResult(null);

      const response = await NavigationService.getRoute(request);

      if (response.error) {
        setError(response.error);
      } else {
        setRouteResult(normalizeNavigationResponse(response));
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err) || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearRoute = () => {
    setRouteResult(null);
    setError(null);
  };

  return {
    isLoading,
    routeResult,
    error,
    calculateRoute,
    clearRoute
  };
};
