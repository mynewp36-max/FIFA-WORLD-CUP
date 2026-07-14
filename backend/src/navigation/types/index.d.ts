export interface NavigationRequest {
    currentLocation: string;
    destination: string;
    stadium: string;
    userRole: 'Fan' | 'Volunteer' | 'Staff';
    wheelchair: boolean;
    avoidCrowd: boolean;
    language: string;
}
export interface NavigationResponse {
    route: {
        instruction: string;
        distance?: string;
        estimatedTime?: string;
        landmark?: string;
        direction?: string;
    }[];
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
}
export declare const NavigationResponseSchema: {
    type: string;
    properties: {
        route: {
            type: string;
            items: {
                type: string;
                properties: {
                    instruction: {
                        type: string;
                    };
                    distance: {
                        type: string;
                    };
                    estimatedTime: {
                        type: string;
                    };
                    landmark: {
                        type: string;
                    };
                    direction: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            description: string;
        };
        estimatedTime: {
            type: string;
            description: string;
        };
        totalDistance: {
            type: string;
            description: string;
        };
        crowdLevel: {
            type: string;
            description: string;
        };
        recommendedEntrance: {
            type: string;
            description: string;
        };
        accessibilityStatus: {
            type: string;
            description: string;
        };
        routeDifficulty: {
            type: string;
            description: string;
        };
        confidenceScore: {
            type: string;
            description: string;
        };
        numberOfTurns: {
            type: string;
            description: string;
        };
        alternateRouteAvailable: {
            type: string;
            description: string;
        };
        routeCongestion: {
            type: string;
            description: string;
        };
        warnings: {
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