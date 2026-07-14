"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsSummarySchema = void 0;
exports.OperationsSummarySchema = {
    type: 'object',
    properties: {
        executiveSummary: {
            type: 'string',
            description: 'Concise executive summary of current stadium operational status.',
        },
        overallRisk: {
            type: 'string',
            enum: ['Low', 'Medium', 'High', 'Critical'],
            description: 'Overall operational risk level across all stadium systems.',
        },
        priorityLevel: {
            type: 'string',
            enum: ['Low', 'Medium', 'High', 'Urgent'],
            description: 'Priority level for the operations team to act upon.',
        },
        crowdOverview: {
            type: 'string',
            description: 'Specific crowd status analysis and crowd management recommendations.',
        },
        transportOverview: {
            type: 'string',
            description: 'Transport and logistics status analysis.',
        },
        accessibilityOverview: {
            type: 'string',
            description: 'Accessibility operations status summary.',
        },
        recommendedActions: {
            type: 'array',
            items: { type: 'string' },
            description: 'Prioritised list of immediate recommended actions for operations staff.',
        },
        criticalAlerts: {
            type: 'array',
            items: { type: 'string' },
            description: 'Critical alerts requiring immediate attention. Empty array if none.',
        },
        nextSteps: {
            type: 'array',
            items: { type: 'string' },
            description: 'Ordered tactical next steps for the operations team over the next hour.',
        },
        generatedAt: {
            type: 'string',
            description: 'ISO 8601 timestamp of when this report was generated.',
        },
    },
    required: [
        'executiveSummary', 'overallRisk', 'priorityLevel',
        'crowdOverview', 'transportOverview', 'accessibilityOverview',
        'recommendedActions', 'criticalAlerts', 'nextSteps', 'generatedAt',
    ],
};
//# sourceMappingURL=index.js.map