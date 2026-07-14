import { TransportRequest, UserRole } from '../types';

// ─── Per-context prompt snippet library ───

const roleGuidance: Record<UserRole, string> = {
  Fan: `Prioritise cost-effective public transport. Account for post-match stadium surges and suggest leaving a few minutes early or late to avoid peak crowds.`,
  Volunteer: `Suggest efficient routes that allow quick transit. Volunteers may have restricted area passes; note any staff entry/exit points.`,
  Organizer: `Recommend priority transport lanes, VIP shuttles, or designated organiser vehicle zones when available.`,
  Staff: `Guide via staff/service exits. Suggest direct routes avoiding fan congestion zones.`,
  VIP: `Recommend private vehicle drop-off zones, VIP shuttle services, and helicopter pad locations if applicable.`,
  Family: `Prioritise accessible, stroller-friendly transport. Note family carriages on metro, and safe pedestrian routes.`,
  International: `Provide clear, simple guidance. Include transport name in the local language of the stadium city. Mention ticketing machines that support international cards.`,
};

const metroGuidance = `
METRO GUIDANCE:
- Recommend the nearest metro station to the stadium exit.
- Warn of post-match service overcrowding and suggest waiting 20-30 minutes if crowd impact is High.
- Mention metro lines by name/colour.`;

const busGuidance = `
BUS GUIDANCE:
- List shuttle bus stops and route numbers when applicable.
- Advise standing/waiting areas away from the main crowd.
- Mention any express post-match services.`;

const walkingGuidance = `
WALKING GUIDANCE:
- Suggest pedestrianised routes only if distance is under 1.5 km.
- Warn of congested pedestrian zones near stadium exits.
- Recommend time based on average walking pace.`;

const taxiRideshareGuidance = `
TAXI / RIDESHARE GUIDANCE:
- Identify official taxi pick-up zones.
- Note rideshare app (Uber/Lyft) designated pick-up areas.
- Warn of price surges during post-match periods.`;

const groupGuidance = (size: number) => `
GROUP TRAVEL (${size} people):
- Suggest transport that can accommodate the group together.
- If group is 6+, recommend a minivan taxi or charter shuttle.
- Advise booking rideshares in advance.`;

const accessibilityGuidance = `
ACCESSIBILITY-AWARE TRANSPORT:
- Recommend wheelchair-accessible metro carriages (usually at ends of train).
- Note accessible bus stops with ramp-equipped vehicles.
- Identify paratransit or stadium shuttle for mobility-impaired visitors.`;

const avoidCrowdGuidance = `
CROWD-AVOIDANCE STRATEGY:
- Suggest departing 15 minutes before final whistle OR waiting 30-45 minutes post-match.
- Recommend secondary exits and lesser-known routes.
- Mark crowdImpact accurately.`;

// ─── Main prompt builder ───

export const buildTransportPrompt = (req: TransportRequest): string => {
  const snippets: string[] = [
    metroGuidance,
    busGuidance,
    walkingGuidance,
    taxiRideshareGuidance,
  ];

  if (req.groupSize > 1) snippets.push(groupGuidance(req.groupSize));
  if (req.wheelchair) snippets.push(accessibilityGuidance);
  if (req.avoidCrowd) snippets.push(avoidCrowdGuidance);

  return `You are the FIFA World Cup 2026 Transport Intelligence Engine deployed at ${req.stadium}.
Your goal is to provide the most effective, safe, and personalised transport recommendation for this visitor.

VISITOR CONTEXT:
- Stadium: ${req.stadium}
- Match: ${req.match || 'General Event'}
- Current Location: ${req.currentLocation}
- Destination: ${req.destination}
- User Role: ${req.userRole}
- Group Size: ${req.groupSize}
- Wheelchair Required: ${req.wheelchair ? 'YES' : 'NO'}
- Avoid Crowds: ${req.avoidCrowd ? 'YES' : 'NO'}
- Language: ${req.language}

ROLE-SPECIFIC RULES:
${roleGuidance[req.userRole]}

TRANSPORT MODE GUIDELINES:
${snippets.join('\n')}

GLOBAL RULES:
1. Respond entirely in: ${req.language}.
2. Use plausible but generic transport names (e.g. "Blue Line Metro", "Shuttle Bus 3").
3. Never hardcode real timetables — give contextual estimates.
4. Be empathetic, clear, and prioritise safety.
5. Return strict JSON only — no markdown backticks.`;
};
