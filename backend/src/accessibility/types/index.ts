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

export interface AccessibilityResponse {
  summary: string;
  recommendedRoute: { instruction: string; distance?: string; estimatedTime?: string }[];
  accessibleEntrances: { location: string; status?: string }[];
  elevators: { location: string; status?: string }[];
  ramps: { location: string; status?: string }[];
  accessibleRestrooms: { location: string; status?: string }[];
  accessibleSeating: { section: string; status?: string; capacity?: string }[];
  medicalSupport: { location: string; services?: string }[];
  accessibilityServices: { serviceName: string; description?: string }[];
  estimatedTravelTime: string;
  importantInstructions: string[];
  thingsToAvoid: string[];
  emergencyContacts: { name: string; phone: string }[];
}

export const AccessibilityResponseSchema = {
  type: 'object',
  properties: {
    summary: {
      type: 'string',
      description: 'A brief, empathetic summary of the accessibility guidance for this visitor.',
    },
    recommendedRoute: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          instruction: { type: 'string' },
          distance: { type: 'string' },
          estimatedTime: { type: 'string' },
        },
        required: ['instruction'],
      },
      description: 'Step-by-step accessible route instructions to the destination.',
    },
    accessibleEntrances: {
      type: 'array',
      items: {
        type: 'object',
        properties: { location: { type: 'string' }, status: { type: 'string' } },
        required: ['location'],
      },
      description: 'List of recommended accessible entrance gates for this visitor.',
    },
    elevators: {
      type: 'array',
      items: {
        type: 'object',
        properties: { location: { type: 'string' }, status: { type: 'string' } },
        required: ['location'],
      },
      description: 'Elevator locations and usage instructions.',
    },
    ramps: {
      type: 'array',
      items: {
        type: 'object',
        properties: { location: { type: 'string' }, status: { type: 'string' } },
        required: ['location'],
      },
      description: 'Ramp locations and availability.',
    },
    accessibleRestrooms: {
      type: 'array',
      items: {
        type: 'object',
        properties: { location: { type: 'string' }, status: { type: 'string' } },
        required: ['location'],
      },
      description: 'Nearby accessible/family restroom locations.',
    },
    accessibleSeating: {
      type: 'array',
      items: {
        type: 'object',
        properties: { section: { type: 'string' }, status: { type: 'string' }, capacity: { type: 'string' } },
        required: ['section'],
      },
      description: 'Accessible seating sections available.',
    },
    medicalSupport: {
      type: 'array',
      items: {
        type: 'object',
        properties: { location: { type: 'string' }, services: { type: 'string' } },
        required: ['location'],
      },
      description: 'Medical aid points, first aid, and relevant support service locations.',
    },
    accessibilityServices: {
      type: 'array',
      items: {
        type: 'object',
        properties: { serviceName: { type: 'string' }, description: { type: 'string' } },
        required: ['serviceName'],
      },
      description: 'Special accessibility services like wheelchair rental or visual aids.',
    },
    estimatedTravelTime: {
      type: 'string',
      description: 'Total estimated travel time considering the accessibility profile.',
    },
    importantInstructions: {
      type: 'array',
      items: { type: 'string' },
      description: 'Critical rules or advice specific to the selected accessibility needs.',
    },
    thingsToAvoid: {
      type: 'array',
      items: { type: 'string' },
      description: 'Areas, obstacles, or situations the user should actively avoid.',
    },
    emergencyContacts: {
      type: 'array',
      items: {
        type: 'object',
        properties: { name: { type: 'string' }, phone: { type: 'string' } },
        required: ['name', 'phone'],
      },
      description: 'Emergency accessibility support contacts.',
    },
  },
  required: [
    'summary',
    'recommendedRoute',
    'accessibleEntrances',
    'elevators',
    'ramps',
    'accessibleRestrooms',
    'accessibleSeating',
    'medicalSupport',
    'accessibilityServices',
    'estimatedTravelTime',
    'importantInstructions',
    'thingsToAvoid',
    'emergencyContacts',
  ],
};
