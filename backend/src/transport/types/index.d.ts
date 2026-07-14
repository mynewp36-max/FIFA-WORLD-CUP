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
}
export declare const TransportResponseSchema: {
    type: string;
    properties: {
        summary: {
            type: string;
            description: string;
        };
        recommendedTransport: {
            type: string;
            description: string;
        };
        alternativeOptions: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
        departureStrategy: {
            type: string;
            description: string;
        };
        estimatedTravelTime: {
            type: string;
            description: string;
        };
        crowdImpact: {
            type: string;
            description: string;
        };
        priority: {
            type: string;
            description: string;
        };
        travelTips: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
    };
    required: string[];
};
//# sourceMappingURL=index.d.ts.map