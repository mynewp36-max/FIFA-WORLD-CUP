/**
 * Shared API configuration for all frontend services.
 * Centralizes the base URL so it is defined in exactly one place.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
