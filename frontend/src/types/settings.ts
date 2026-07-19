export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation?: string;
}

export interface UserSettings {
  profile: {
    name: string;
    email: string;
    avatar?: string;
  };
  appearance: {
    theme: 'Dark' | 'Light' | 'System';
  };
  language: {
    preferred: string;
  };
  notifications: {
    matchAlerts: boolean;
    emergencyAlerts: boolean;
    transportUpdates: boolean;
    crowdAlerts: boolean;
    aiRecommendations: boolean;
  };
  accessibility: {
    wheelchair: boolean;
    visualAssistance: boolean;
    hearingAssistance: boolean;
    highContrast: boolean;
    largeText: boolean;
    screenReader: boolean;
  };
  privacy: {
    analytics: boolean;
    personalization: boolean;
    crashReports: boolean;
    locationSharing: 'Private' | 'While Using' | 'Always';
  };
  sustainability: {
    ecoFriendly: boolean;
  };
  emergencyContacts: EmergencyContact[];
}
