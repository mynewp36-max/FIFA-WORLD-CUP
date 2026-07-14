import React from 'react';
import { Card } from '../Card';
import { ShieldAlert, Hash, Clock, Users, MapPin, CalendarClock } from 'lucide-react';
import type { IncidentMetadata } from '../../types/emergency';
import { Badge } from '../Badge';

interface IncidentMetadataCardProps {
  metadata?: IncidentMetadata;
}

export const IncidentMetadataCard: React.FC<IncidentMetadataCardProps> = ({ metadata }) => {
  if (!metadata) return null;

  return (
    <Card elevation="low" className="border-t-4 border-error" role="region" aria-label="Incident Metadata">
      <h4 className="font-semibold text-text-main flex items-center gap-2 mb-4">
        <ShieldAlert size={18} className="text-error" aria-hidden="true" />
        Incident Details
      </h4>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><Hash size={12} /> Incident ID</p>
          <p className="text-sm font-mono text-text-main">{metadata.incidentId}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><ShieldAlert size={12} /> Severity</p>
          <Badge variant={metadata.severity.toLowerCase() === 'high' || metadata.severity.toLowerCase() === 'critical' ? 'error' : 'warning'}>
            {metadata.severity}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><Clock size={12} /> ETA</p>
          <p className="text-sm text-text-main font-medium">{metadata.estimatedResponseTime}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><Users size={12} /> Responding Team</p>
          <p className="text-sm text-text-main">{metadata.respondingTeam}</p>
        </div>
        <div className="col-span-2 border-t border-border-subtle pt-3 mt-1">
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><MapPin size={12} /> Location</p>
          <p className="text-sm text-text-main">{metadata.location}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><CalendarClock size={12} /> Last Updated</p>
          <p className="text-xs text-text-muted">{new Date(metadata.lastUpdated).toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
};
