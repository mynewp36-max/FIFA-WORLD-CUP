import type { NavigationResponse, RouteStep } from '../types/navigation';
import type { TransportResponse } from '../types/transport';
import type { AccessibilityResponse, AccessibleRouteStep, FacilityItem, SeatingItem, MedicalItem, ServiceItem, EmergencyContact } from '../types/accessibility';
import type { EmergencyResponse, EmergencyPriority, EmergencyAction } from '../types/emergency';
import type { OperationsSummaryResponse, RiskLevel, PriorityLevel, OrganizerAction, StrategicStep, OperationsSummaryRequest } from '../types/operations';

export const flattenObject = (val: unknown): string => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  
  if (Array.isArray(val)) {
    return val.map(flattenObject).filter(Boolean).join(', ');
  }
  
  if (val && typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    // If it has a specific text-like field, prioritize it
    if (obj.text) return flattenObject(obj.text);
    if (obj.description) return flattenObject(obj.description);
    if (obj.message) return flattenObject(obj.message);
    if (obj.name) return flattenObject(obj.name);
    if (obj.action) return flattenObject(obj.action);
    if (obj.status && typeof obj.status === 'string' && Object.keys(obj).length === 1) return obj.status;
    
    // Otherwise, join all values
    return Object.values(obj)
      .map(flattenObject)
      .filter(Boolean)
      .join(' - ');
  }
  
  return String(val);
};

const ensureStringArray = (val: unknown): string[] => {
  if (Array.isArray(val)) {
    return val.map(item => flattenObject(item));
  }
  if (typeof val === 'string') return [val];
  if (val && typeof val === 'object') {
    return [flattenObject(val)];
  }
  return [];
};

const ensureObjectArray = <T>(val: unknown, defaultKey: keyof T): T[] => {
  if (Array.isArray(val)) {
    return val.map(item => {
      if (typeof item === 'string') {
        return { [defaultKey]: item } as unknown as T;
      }
      return item as T;
    });
  }
  if (typeof val === 'string') {
    return [{ [defaultKey]: val } as unknown as T];
  }
  if (val && typeof val === 'object') {
    return [val as T];
  }
  return [];
};

const ensureString = (val: unknown, fallback = ''): string => {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val;
  if (val) return flattenObject(val) || fallback;
  return fallback;
};

export const normalizeNavigationResponse = (rawData: unknown): NavigationResponse => {
  const data = (rawData || {}) as Record<string, unknown>;
  return {
    ...data,
    route: ensureObjectArray<RouteStep>(data?.route ?? data?.steps ?? data?.directions, 'instruction'),
    estimatedTime: ensureString(data?.estimatedTime ?? data?.time ?? data?.duration, 'Calculating...'),
    totalDistance: ensureString(data?.totalDistance ?? data?.distance, 'Standard routing distance'),
    crowdLevel: ensureString(data?.crowdLevel ?? data?.crowds ?? data?.congestion, 'Monitoring crowds...'),
    recommendedEntrance: ensureString(data?.recommendedEntrance ?? data?.entrance ?? data?.gate, 'General Admission Gate'),
    accessibilityStatus: ensureString(data?.accessibilityStatus ?? data?.accessibility, 'Standard access'),
    routeDifficulty: ensureString(data?.routeDifficulty ?? data?.difficulty, 'Moderate'),
    confidenceScore: ensureString(data?.confidenceScore ?? data?.confidence, 'Optimizing route...'),
    numberOfTurns: ensureString(data?.numberOfTurns ?? data?.turns, 'Direct route'),
    alternateRouteAvailable: Boolean(data?.alternateRouteAvailable ?? data?.hasAlternate ?? false),
    routeCongestion: ensureString(data?.routeCongestion ?? data?.congestionLevel, 'Normal flow'),
    warnings: ensureStringArray(data?.warnings ?? data?.alerts ?? data?.notices),
    error: data?.error as string | undefined
  } as unknown as NavigationResponse;
};

export const normalizeTransportResponse = (rawData: unknown): TransportResponse => {
  const data = (rawData || {}) as Record<string, unknown>;
  // Try to estimate ETA if missing but we have a distance
  let eta = data?.estimatedTravelTime ?? data?.duration ?? data?.time ?? data?.eta;
  if (!eta && data?.distance) {
    // Rough estimate: assume 15 mins per mile or something similar if distance is numeric-ish
    const distanceMatch = String(data.distance).match(/([\d.]+)/);
    if (distanceMatch && distanceMatch[1]) {
      const miles = parseFloat(distanceMatch[1]);
      eta = `~${Math.round(miles * 15)} mins (Estimated)`;
    }
  }

  const defaultTips = [
    'Keep your ticket ready.',
    'Follow staff instructions.',
    'Allow additional time after the match.'
  ];

  let parsedTips = ensureStringArray(data?.travelTips ?? data?.tips ?? data?.recommendations ?? data?.guidance);
  if (!parsedTips || parsedTips.length === 0) {
    parsedTips = defaultTips;
  }

  return {
    ...data,
    summary: ensureString(data?.summary ?? data?.description ?? data?.overview ?? data?.routeSummary, 'Optimal transport route calculated based on current stadium traffic and crowd levels.'),
    recommendedTransport: ensureString(data?.recommendedTransport ?? data?.type ?? data?.mode ?? data?.transportType ?? data?.transport ?? data?.recommended, 'Standard Stadium Transit'),
    alternativeOptions: ensureStringArray(data?.alternativeOptions ?? data?.alternativeRoutes ?? data?.options ?? data?.alternatives),
    departureStrategy: ensureString(data?.departureStrategy ?? data?.departure ?? data?.strategy ?? data?.exitStrategy, 'Exit through the nearest recommended gate and follow stadium transport signage.'),
    estimatedTravelTime: typeof eta === 'number' ? `${eta} mins` : ensureString(eta as unknown, 'Approximately 10–15 minutes based on current conditions.'),
    crowdImpact: ensureString(data?.crowdImpact ?? data?.crowdLevel ?? data?.crowding ?? data?.congestion, 'Standard passenger flow'),
    priority: ensureString(data?.priority ?? data?.urgency ?? data?.level, 'Normal'),
    travelTips: parsedTips,
    warnings: data?.warnings || data?.alerts || data?.notices ? ensureStringArray(data?.warnings ?? data?.alerts ?? data?.notices) : undefined,
    confidence: data?.confidence || data?.confidenceScore ? ensureString(data?.confidence ?? data?.confidenceScore) : undefined,
    recommendedDeparture: data?.recommendedDeparture || data?.departureTime ? ensureString(data?.recommendedDeparture ?? data?.departureTime) : undefined,
    error: data?.error as string | undefined
  } as unknown as TransportResponse;
};

export const normalizeAccessibilityResponse = (rawData: unknown): AccessibilityResponse => {
  const data = (rawData || {}) as Partial<Record<string, unknown>>;
  return {
    ...data,
    summary: ensureString(data?.summary ?? data?.overview, 'Generating personalized accessibility guidance...'),
    recommendedRoute: ensureObjectArray<AccessibleRouteStep>(data?.recommendedRoute ?? data?.route ?? data?.steps, 'instruction'),
    accessibleEntrances: ensureObjectArray<FacilityItem>(data?.accessibleEntrances ?? data?.entrances, 'location'),
    elevators: ensureObjectArray<FacilityItem>(data?.elevators ?? data?.lifts, 'location'),
    ramps: ensureObjectArray<FacilityItem>(data?.ramps, 'location'),
    accessibleRestrooms: ensureObjectArray<FacilityItem>(data?.accessibleRestrooms ?? data?.restrooms, 'location'),
    accessibleSeating: ensureObjectArray<SeatingItem>(data?.accessibleSeating ?? data?.seating, 'section'),
    medicalSupport: ensureObjectArray<MedicalItem>(data?.medicalSupport ?? data?.medical ?? data?.firstAid, 'location'),
    accessibilityServices: ensureObjectArray<ServiceItem>(data?.accessibilityServices ?? data?.services, 'serviceName'),
    estimatedTravelTime: ensureString(data?.estimatedTravelTime ?? data?.duration ?? data?.time, 'Standard transit time'),
    importantInstructions: ensureStringArray(data?.importantInstructions ?? data?.instructions ?? data?.guidance),
    thingsToAvoid: ensureStringArray(data?.thingsToAvoid ?? data?.avoid),
    emergencyContacts: ensureObjectArray<EmergencyContact>(data?.emergencyContacts ?? data?.contacts, 'name'),
    warnings: ensureStringArray(data?.warnings ?? data?.alerts),
    error: data?.error as string | undefined
  } as unknown as AccessibilityResponse;
};

export const normalizeEmergencyResponse = (rawData: unknown): EmergencyResponse => {
  const data = (rawData || {}) as Partial<Record<string, unknown>>;
  const meta = (data?.incidentMetadata || {}) as Partial<Record<string, unknown>>;
  return {
    ...data,
    summary: ensureString(data?.summary ?? data?.overview ?? data?.description, 'Standby for official emergency response instructions.'),
    recommendedActions: ensureObjectArray<EmergencyAction>(data?.recommendedActions ?? data?.actions ?? data?.steps, 'action'),
    incidentMetadata: data.incidentMetadata ? {
      incidentId: ensureString(meta.incidentId, 'UNKNOWN-ID'),
      severity: ensureString(meta.severity, 'High'),
      estimatedResponseTime: ensureString(meta.estimatedResponseTime, 'Pending'),
      respondingTeam: ensureString(meta.respondingTeam, 'Emergency Services'),
      location: ensureString(meta.location, 'Stadium'),
      lastUpdated: ensureString(meta.lastUpdated, new Date().toISOString())
    } : undefined,
    timeline: ensureObjectArray(data?.timeline ?? data?.history, 'event'),
    status: ensureString(data?.status, 'Active') as EmergencyResponse['status'],
    priority: (ensureString(data?.priority ?? data?.urgency ?? data?.severity, 'Medium') as EmergencyPriority),
    safetyGuidance: ensureStringArray(data?.safetyGuidance ?? data?.guidance ?? data?.instructions),
    communicationMessage: ensureString(data?.communicationMessage ?? data?.message ?? data?.announcement, 'Please stay calm and await instructions.'),
    generatedAt: ensureString(data?.generatedAt ?? data?.timestamp, new Date().toISOString()),
    error: data?.error as string | undefined
  } as unknown as EmergencyResponse;
};

export const normalizeOperationsResponse = (rawData: unknown, inputs?: OperationsSummaryRequest): OperationsSummaryResponse => {
  const data = (rawData || {}) as Record<string, unknown>;
  // Sync fallbacks mathematically with the inputs
  const crowdSync = inputs?.crowdStatus ? `[Input: ${inputs.crowdStatus}] ` : '';
  const transportSync = inputs?.transportStatus ? `[Input: ${inputs.transportStatus}] ` : '';
  const accessSync = inputs?.accessibilityStatus ? `[Input: ${inputs.accessibilityStatus}] ` : '';

  const rawCrowd = ensureString(data?.crowdOverview ?? data?.crowdStatus ?? data?.crowding, 'Crowd levels are stable.');
  const rawTransport = ensureString(data?.transportOverview ?? data?.transportStatus, 'Transport systems operating normally.');
  const rawAccess = ensureString(data?.accessibilityOverview ?? data?.accessibilityStatus, 'Accessibility services fully operational.');

  return {
    ...data,
    executiveSummary: ensureString(data?.executiveSummary ?? data?.summary, 'Compiling latest stadium intelligence...'),
    overallRisk: (ensureString(data?.overallRisk ?? data?.risk ?? data?.riskLevel, 'Medium') as RiskLevel),
    priorityLevel: (ensureString(data?.priorityLevel ?? data?.priority, 'Medium') as PriorityLevel),
    crowdOverview: `${crowdSync}${rawCrowd}`,
    transportOverview: `${transportSync}${rawTransport}`,
    accessibilityOverview: `${accessSync}${rawAccess}`,
    recommendedActions: ensureObjectArray<OrganizerAction>(data?.recommendedActions ?? data?.actions ?? data?.recommendations, 'action'),
    criticalAlerts: ensureStringArray(data?.criticalAlerts ?? data?.alerts ?? data?.incidents),
    nextSteps: ensureObjectArray<StrategicStep>(data?.nextSteps ?? data?.steps, 'step'),
    generatedAt: ensureString(data?.generatedAt ?? data?.timestamp, new Date().toISOString()),
    error: data?.error as string | undefined
  } as unknown as OperationsSummaryResponse;
};
