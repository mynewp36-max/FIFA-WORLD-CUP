export interface NavigationRequest {
  currentLocation: string;
  destination: string;
  stadium: string;
  userRole: 'Fan' | 'Volunteer' | 'Staff';
  wheelchair: boolean;
  avoidCrowd: boolean;
  language: string;
  ecoFriendly?: boolean;
  weather?: string;
}

export interface RouteStep {
  instruction: string;
  distance?: string;
  estimatedTime?: string;
  landmark?: string;
  direction?: string;
}

export interface NavigationResponse {
  route: RouteStep[];
  estimatedTime: string;
  totalDistance: string;
  crowdLevel: string;
  recommendedEntrance: string;
  accessibilityStatus: string;
  routeDifficulty: string;
  confidenceScore: string;
  numberOfTurns: string;
  alternateRouteAvailable: boolean;
  routeCongestion: string;
  warnings: string[];
  ecoBenefits?: string;
  error?: string;
}
