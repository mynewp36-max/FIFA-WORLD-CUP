export type IncidentType =
  | 'Medical Assistance'
  | 'Lost Child'
  | 'Lost Property'
  | 'Crowd Congestion'
  | 'Blocked Exit'
  | 'Accessibility Assistance'
  | 'Suspicious Activity'
  | 'General Help Request';

export type EmergencyPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'Active' | 'Escalated' | 'Resolved' | 'Awaiting Response';

export interface EmergencyRequest {
  incidentType: IncidentType;
  stadium: string;
  location: string;
  language: string;
  userRole: string;
  description?: string;
}

export interface EmergencyResponse {
  summary: string;
  recommendedActions: {
    title: string;
    instruction: string;
    targetAudience?: string;
    priority?: string;
    estimatedTime?: string;
    status?: string;
  }[];
  incidentMetadata: {
    incidentId: string;
    severity: string;
    estimatedResponseTime: string;
    respondingTeam: string;
    location: string;
    lastUpdated: string;
  };
  timeline: {
    time: string;
    event: string;
    status: string;
  }[];
  status: IncidentStatus;
  priority: EmergencyPriority;
  safetyGuidance: string[];
  communicationMessage: string;
  generatedAt: string;
}

export const EmergencyResponseSchema = {
  type: 'object',
  properties: {
    summary: {
      type: 'string',
      description: 'Concise situational summary of the incident for operational staff.',
    },
    recommendedActions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          instruction: { type: 'string' },
          targetAudience: { type: 'string' },
          priority: { type: 'string' },
          estimatedTime: { type: 'string' },
          status: { type: 'string' },
        },
        required: ['title', 'instruction'],
      },
      description: 'Ordered list of recommended actions for staff to take immediately.',
    },
    incidentMetadata: {
      type: 'object',
      properties: {
        incidentId: { type: 'string' },
        severity: { type: 'string' },
        estimatedResponseTime: { type: 'string' },
        respondingTeam: { type: 'string' },
        location: { type: 'string' },
        lastUpdated: { type: 'string' },
      },
      required: ['severity', 'respondingTeam'],
      description: 'Metadata about the incident.',
    },
    timeline: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          time: { type: 'string' },
          event: { type: 'string' },
          status: { type: 'string' },
        },
        required: ['time', 'event'],
      },
      description: 'Predicted or historical event timeline for the incident.',
    },
    status: {
      type: 'string',
      enum: ['Active', 'Escalated', 'Resolved', 'Awaiting Response'],
      description: 'Current status of the incident.',
    },
    priority: {
      type: 'string',
      enum: ['Low', 'Medium', 'High', 'Critical'],
      description: 'Assessed priority level of this incident.',
    },
    safetyGuidance: {
      type: 'array',
      items: { type: 'string' },
      description: 'Safety guidelines to protect visitors and staff during this incident.',
    },
    communicationMessage: {
      type: 'string',
      description: 'A clear, calm, public-announcement-ready message in the visitor language.',
    },
    generatedAt: {
      type: 'string',
      description: 'ISO 8601 timestamp when this guidance was generated.',
    },
  },
  required: [
    'summary',
    'recommendedActions',
    'incidentMetadata',
    'timeline',
    'status',
    'priority',
    'safetyGuidance',
    'communicationMessage',
    'generatedAt',
  ],
};
