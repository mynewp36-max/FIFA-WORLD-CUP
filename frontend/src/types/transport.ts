export type UserRole = 'Fan' | 'Volunteer' | 'Organizer' | 'Staff' | 'VIP' | 'Family' | 'International';

export interface TransportRequest {
  stadium: string;
  match?: string;
  currentLocation: string;
  destination: string;
  language: string;
  userRole: UserRole;
  wheelchair: boolean;
  avoidCrowd: boolean;
  groupSize: number;
}

export interface TransportResponse {
  summary: string;
  recommendedTransport: string;
  alternativeOptions: string[];
  departureStrategy: string;
  estimatedTravelTime: string;
  crowdImpact: string;
  priority: string;
  travelTips: string[];
  warnings?: string[];
  confidence?: string;
  recommendedDeparture?: string;
  error?: string;
}
