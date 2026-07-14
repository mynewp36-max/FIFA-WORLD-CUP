"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportResponseSchema = void 0;
exports.TransportResponseSchema = {
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
    ],
};
//# sourceMappingURL=index.js.map