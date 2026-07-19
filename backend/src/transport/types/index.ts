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
  ecoFriendly?: boolean;
  weather?: string;
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
  carbonSaved?: string;
}

export const TransportResponseSchema = {
  type: 'object',
  properties: {
    summary: {
      type: 'string',
      description: 'Concise summary of the overall transport recommendation for this visitor.',
    },
    recommendedTransport: {
      type: 'string',
      description: 'Primary recommended transport mode (e.g. Metro, Bus, Taxi, Walking).',
    },
    alternativeOptions: {
      type: 'array',
      items: { type: 'string' },
      description: 'Two or three alternative transport options with brief reasons.',
    },
    departureStrategy: {
      type: 'string',
      description: 'Specific advice on when and how to depart to minimise congestion.',
    },
    estimatedTravelTime: {
      type: 'string',
      description: 'Estimated travel time to destination (e.g. "35 min").',
    },
    crowdImpact: {
      type: 'string',
      description: 'Expected crowd impact on this route: Low, Medium, or High.',
    },
    priority: {
      type: 'string',
      description: 'Urgency level of recommendation: Low, Medium, or High.',
    },
    travelTips: {
      type: 'array',
      items: { type: 'string' },
      description: 'Practical safety and comfort tips tailored to this visitor.',
    },
    carbonSaved: {
      type: 'string',
      description: 'Estimated carbon emissions saved if eco-friendly transport is chosen (e.g. "2.4 kg CO2").',
    },
  },
  required: [
    'summary',
    'recommendedTransport',
    'alternativeOptions',
    'departureStrategy',
    'estimatedTravelTime',
    'crowdImpact',
    'priority',
    'travelTips',
    'carbonSaved'
  ],
};
