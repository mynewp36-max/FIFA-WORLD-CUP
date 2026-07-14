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
export interface OperationsSummaryResponse {
    executiveSummary: string;
    overallRisk: RiskLevel;
    priorityLevel: PriorityLevel;
    crowdOverview: string;
    transportOverview: string;
    accessibilityOverview: string;
    recommendedActions: string[];
    criticalAlerts: string[];
    nextSteps: string[];
    generatedAt: string;
}
export declare const OperationsSummarySchema: {
    type: string;
    properties: {
        executiveSummary: {
            type: string;
            description: string;
        };
        overallRisk: {
            type: string;
            enum: string[];
            description: string;
        };
        priorityLevel: {
            type: string;
            enum: string[];
            description: string;
        };
        crowdOverview: {
            type: string;
            description: string;
        };
        transportOverview: {
            type: string;
            description: string;
        };
        accessibilityOverview: {
            type: string;
            description: string;
        };
        recommendedActions: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
        criticalAlerts: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
        nextSteps: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
        generatedAt: {
            type: string;
            description: string;
        };
    };
    required: string[];
};
//# sourceMappingURL=index.d.ts.map