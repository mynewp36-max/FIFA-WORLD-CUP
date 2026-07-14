export type AccessibilityNeed = 'Wheelchair' | 'Visually Impaired' | 'Hearing Impaired' | 'Elderly' | 'Stroller' | 'Temporary Injury';
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
    recommendedRoute: {
        instruction: string;
        distance?: string;
        estimatedTime?: string;
    }[];
    accessibleEntrances: {
        location: string;
        status?: string;
    }[];
    elevators: {
        location: string;
        status?: string;
    }[];
    ramps: {
        location: string;
        status?: string;
    }[];
    accessibleRestrooms: {
        location: string;
        status?: string;
    }[];
    accessibleSeating: {
        section: string;
        status?: string;
        capacity?: string;
    }[];
    medicalSupport: {
        location: string;
        services?: string;
    }[];
    accessibilityServices: {
        serviceName: string;
        description?: string;
    }[];
    estimatedTravelTime: string;
    importantInstructions: string[];
    thingsToAvoid: string[];
    emergencyContacts: {
        name: string;
        phone: string;
    }[];
}
export declare const AccessibilityResponseSchema: {
    type: string;
    properties: {
        summary: {
            type: string;
            description: string;
        };
        recommendedRoute: {
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
                };
                required: string[];
            };
            description: string;
        };
        accessibleEntrances: {
            type: string;
            items: {
                type: string;
                properties: {
                    location: {
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
        elevators: {
            type: string;
            items: {
                type: string;
                properties: {
                    location: {
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
        ramps: {
            type: string;
            items: {
                type: string;
                properties: {
                    location: {
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
        accessibleRestrooms: {
            type: string;
            items: {
                type: string;
                properties: {
                    location: {
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
        accessibleSeating: {
            type: string;
            items: {
                type: string;
                properties: {
                    section: {
                        type: string;
                    };
                    status: {
                        type: string;
                    };
                    capacity: {
                        type: string;
                    };
                };
                required: string[];
            };
            description: string;
        };
        medicalSupport: {
            type: string;
            items: {
                type: string;
                properties: {
                    location: {
                        type: string;
                    };
                    services: {
                        type: string;
                    };
                };
                required: string[];
            };
            description: string;
        };
        accessibilityServices: {
            type: string;
            items: {
                type: string;
                properties: {
                    serviceName: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                };
                required: string[];
            };
            description: string;
        };
        estimatedTravelTime: {
            type: string;
            description: string;
        };
        importantInstructions: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
        thingsToAvoid: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
        emergencyContacts: {
            type: string;
            items: {
                type: string;
                properties: {
                    name: {
                        type: string;
                    };
                    phone: {
                        type: string;
                    };
                };
                required: string[];
            };
            description: string;
        };
    };
    required: string[];
};
//# sourceMappingURL=index.d.ts.map