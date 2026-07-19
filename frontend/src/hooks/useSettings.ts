import { useState, useEffect } from 'react';
import type { UserSettings } from '../types/settings';

const STORAGE_KEY = 'fifa_stadium_user_settings';

const defaultSettings: UserSettings = {
  profile: {
    name: 'Alex Johnson',
    email: 'alex@example.com',
  },
  appearance: {
    theme: 'Dark',
  },
  language: {
    preferred: 'English',
  },
  notifications: {
    matchAlerts: true,
    emergencyAlerts: true,
    transportUpdates: true,
    crowdAlerts: false,
    aiRecommendations: true,
  },
  accessibility: {
    wheelchair: false,
    visualAssistance: false,
    hearingAssistance: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
  },
  privacy: {
    analytics: true,
    personalization: true,
    crashReports: true,
    locationSharing: 'While Using',
  },
  sustainability: {
    ecoFriendly: true, // Default to true to promote sustainability as per objective
  },
  emergencyContacts: [],
};

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch (e) {
      console.error('Failed to parse settings from local storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveSettings = async (newSettings: UserSettings): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (e) {
      console.error('Failed to save settings to local storage', e);
      throw new Error('Failed to save settings to storage');
    }
  };

  return {
    settings,
    isLoaded,
    saveSettings,
  };
};
