export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';
export type OrganizerRole = 'Organizer' | 'Venue Manager' | 'Operations Director' | 'Security Chief';

export interface OperationsSummaryRequest {
  stadium: string;
  match?: string;
  language: string;
  userRole: OrganizerRole;
  crowdStatus: string;
  transportStatus: string;
  accessibilityStatus?: string;
  weather?: string;
  incidentNotes?: string;
}

export interface OrganizerAction {
  title?: string;
  department?: string;
  action: string;
  description?: string;
  priority?: string;
  timeline?: string;
  owner?: string;
  status?: string;
}

export interface StrategicStep {
  step: string;
  priority?: string;
  timeline?: string;
  team?: string;
}

export interface OperationsSummaryResponse {
  executiveSummary: string;
  overallRisk: RiskLevel;
  priorityLevel: PriorityLevel;
  crowdOverview: string;
  transportOverview: string;
  accessibilityOverview: string;
  recommendedActions: OrganizerAction[];
  criticalAlerts: string[];
  nextSteps: StrategicStep[];
  generatedAt: string;
  error?: string;
}
