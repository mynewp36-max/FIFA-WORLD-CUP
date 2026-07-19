export type IncidentType = 'Medical Assistance' | 'Lost Child' | 'Lost Property' | 'Crowd Congestion' | 'Blocked Exit' | 'Accessibility Assistance' | 'Suspicious Activity' | 'General Help Request';
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
export declare const EmergencyResponseSchema: {
    type: string;
    properties: {
        summary: {
            type: string;
            description: string;
        };
        recommendedActions: {
            type: string;
            items: {
                type: string;
                properties: {
                    title: {
                        type: string;
                    };
                    instruction: {
                        type: string;
                    };
                    targetAudience: {
                        type: string;
                    };
                    priority: {
                        type: string;
                    };
                    estimatedTime: {
                        type: string;
                    };
                    status: {
                        type: string;
                    };
                };
                required: string[];
            };
            description: string;
        };
        incidentMetadata: {
            type: string;
            properties: {
                incidentId: {
                    type: string;
                };
                severity: {
                    type: string;
                };
                estimatedResponseTime: {
                    type: string;
                };
                respondingTeam: {
                    type: string;
                };
                location: {
                    type: string;
                };
                lastUpdated: {
                    type: string;
                };
            };
            required: string[];
            description: string;
        };
        timeline: {
            type: string;
            items: {
                type: string;
                properties: {
                    time: {
                        type: string;
                    };
                    event: {
                        type: string;
                    };
                    status: {
                        type: string;
                    };
                };
                required: string[];
            };
            description: string;
        };
        status: {
            type: string;
            enum: string[];
            description: string;
        };
        priority: {
            type: string;
            enum: string[];
            description: string;
        };
        safetyGuidance: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
        communicationMessage: {
            type: string;
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