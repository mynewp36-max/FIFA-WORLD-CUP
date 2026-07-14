export type AccessibilityNeed =
  | 'Wheelchair'
  | 'Visually Impaired'
  | 'Hearing Impaired'
  | 'Elderly'
  | 'Stroller'
  | 'Temporary Injury';

export interface AccessibilityRequest {
  stadium: string;
  match?: string;
  userRole: 'Fan' | 'Volunteer' | 'Staff';
  language: string;
  accessibilityNeeds: AccessibilityNeed[];
  destination: string;
}

export interface AccessibleRouteStep {
  instruction: string;
  distance?: string;
  estimatedTime?: string;
}

export interface FacilityItem {
  location: string;
  status?: string;
}

export interface SeatingItem {
  section: string;
  status?: string;
  capacity?: string;
}

export interface MedicalItem {
  location: string;
  services?: string;
}

export interface ServiceItem {
  serviceName: string;
  description?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface AccessibilityResponse {
  summary: string;
  recommendedRoute: AccessibleRouteStep[];
  accessibleEntrances: FacilityItem[];
  elevators: FacilityItem[];
  ramps: FacilityItem[];
  accessibleRestrooms: FacilityItem[];
  accessibleSeating: SeatingItem[];
  medicalSupport: MedicalItem[];
  accessibilityServices: ServiceItem[];
  estimatedTravelTime: string;
  importantInstructions: string[];
  thingsToAvoid: string[];
  emergencyContacts: EmergencyContact[];
  warnings?: string[]; // Legacy fallback for UI
  error?: string;
}
