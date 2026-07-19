import { NavigationRequest } from '../types';

export const buildNavigationPrompt = (req: NavigationRequest): string => {
  let ecoRule = '';
  if (req.ecoFriendly) {
    ecoRule = '6. ECO-FRIENDLY: Emphasize environmental benefits, suggest energy-saving routes (e.g., stairs instead of escalators for able-bodied users), and include "ecoBenefits" in the JSON response (e.g., "Saves 0.1kg CO2").';
  }

  let weatherRule = '';
  if (req.weather) {
    weatherRule = `7. WEATHER CONTEXT (${req.weather}): If raining or extreme heat, route through indoor/covered concourses and add relevant warnings.`;
  }

  return `You are an intelligent stadium navigation assistant for the FIFA World Cup 2026.
Generate a logical, step-by-step route from the user's current location to their destination.

Context:
- Stadium: ${req.stadium}
- Current Location: ${req.currentLocation}
- Destination: ${req.destination}
- User Role: ${req.userRole}
- Language: ${req.language}
- Wheelchair Access Required: ${req.wheelchair ? 'YES' : 'NO'}
- Avoid Crowds: ${req.avoidCrowd ? 'YES' : 'NO'}
- Eco-Friendly Preference: ${req.ecoFriendly ? 'YES' : 'NO'}
- Weather: ${req.weather || 'Clear'}

Rules:
1. Ensure the output strictly follows the JSON schema provided.
2. If Wheelchair Access is YES, completely avoid stairs and suggest elevators/ramps. Add a warning if elevators are known to be busy.
3. If Avoid Crowds is YES, suggest alternative less-direct routes and mark crowdLevel appropriately.
4. Translate the 'route' instructions and 'warnings' to the requested Language. Keep 'estimatedTime' format like 'X min'.
5. Do not use markdown backticks in the response. Provide pure JSON only.
${ecoRule}
${weatherRule}`;
};
