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

export const NavigationResponseSchema = {
  type: "object",
  properties: {
    route: {
      type: "array",
      items: {
        type: "object",
        properties: {
          instruction: { type: "string" },
          distance: { type: "string" },
          estimatedTime: { type: "string" },
          landmark: { type: "string" },
          direction: { type: "string", description: "e.g., 'straight', 'left', 'right', 'stairs', 'elevator'" },
        },
        required: ["instruction"],
      },
      description: "Array of step-by-step navigation instructions.",
    },
    estimatedTime: {
      type: "string",
      description: "Total estimated time to reach destination, e.g. '5 min'.",
    },
    totalDistance: {
      type: "string",
      description: "Total distance to reach destination, e.g. '400m' or '0.2 miles'.",
    },
    crowdLevel: {
      type: "string",
      description: "Estimated crowd level: 'Low', 'Medium', or 'High'.",
    },
    recommendedEntrance: {
      type: "string",
      description: "The recommended gate or entrance.",
    },
    accessibilityStatus: {
      type: "string",
      description: "Accessibility status of the route (e.g. 'Fully Accessible', 'Requires Ramp', 'Stairs Only').",
    },
    routeDifficulty: {
      type: "string",
      description: "Difficulty of the route (e.g., 'Easy', 'Moderate').",
    },
    confidenceScore: {
      type: "string",
      description: "AI confidence score of the route (e.g., '98%').",
    },
    numberOfTurns: {
      type: "string",
      description: "Number of turns required on this route (e.g., '3 turns').",
    },
    alternateRouteAvailable: {
      type: "boolean",
      description: "True if an alternate route is available.",
    },
    routeCongestion: {
      type: "string",
      description: "Current congestion status of this specific route (e.g., 'Clear', 'Heavy at Gate B').",
    },
    warnings: {
      type: "array",
      items: {
        type: "string",
      },
      description: "Any warnings like 'Stairs ahead', 'Heavy crowd', 'Restricted access'.",
    },
  },
  required: [
    "route", 
    "estimatedTime", 
    "totalDistance", 
    "crowdLevel", 
    "recommendedEntrance", 
    "accessibilityStatus", 
    "routeDifficulty",
    "confidenceScore",
    "numberOfTurns",
    "alternateRouteAvailable",
    "routeCongestion",
    "warnings"
  ],
};
