"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCrowdPrompt = void 0;
const CROWD_SYSTEM_PROMPT = `You are the Crowd Intelligence AI for the FIFA World Cup 2026.
Your job is to analyze real-time density metrics across stadium sectors and provide a concise strategic recommendation for mitigating bottlenecks.

Return your response in the following JSON schema:
{
  "strategy": "string (A 2-3 sentence strategic recommendation)",
  "riskLevel": "string (High, Medium, or Low)",
  "recommendedAction": "string (A very short, actionable command, e.g., 'Divert to Gate B')"
}`;
const buildCrowdPrompt = (activeSector, density) => {
    return `${CROWD_SYSTEM_PROMPT}\n\nContext:\nActive Sector: ${activeSector}\nCurrent Density: ${density}`;
};
exports.buildCrowdPrompt = buildCrowdPrompt;
//# sourceMappingURL=templates.js.map