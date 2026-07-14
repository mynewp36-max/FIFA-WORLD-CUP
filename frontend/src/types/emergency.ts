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

export interface EmergencyAction {
  title?: string;
  action?: string;
  instruction?: string;
  targetAudience?: string;
  priority?: string;
  estimatedTime?: string;
  status?: string;
}

export interface IncidentMetadata {
  incidentId: string;
  severity: string;
  estimatedResponseTime: string;
  respondingTeam: string;
  location: string;
  lastUpdated: string;
}

export interface TimelineEvent {
  time: string;
  event: string;
  status: string;
}

export interface EmergencyResponse {
  summary: string;
  recommendedActions: EmergencyAction[];
  incidentMetadata?: IncidentMetadata;
  timeline?: TimelineEvent[];
  status?: IncidentStatus;
  priority: EmergencyPriority;
  safetyGuidance: string[];
  communicationMessage: string;
  generatedAt: string;
  error?: string;
}
