import React from 'react';
import { Card } from '../Card';
import { Clock, Users, MapPin, Target } from 'lucide-react';
import type {  TransportResponse  } from '../../types/transport';

interface MetricBadgesProps {
  data: TransportResponse;
}

export const MetricBadges: React.FC<MetricBadgesProps> = ({ data }) => {
  const crowdColor = (data?.crowdImpact || 'low').toLowerCase() === 'high' ? 'border-error text-error bg-error/10' :
    (data?.crowdImpact || 'low').toLowerCase() === 'medium' ? 'border-warning text-warning bg-warning/10' :
    'border-success text-success bg-success/10';

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Travel Time */}
      <Card elevation="low" className="p-4 text-center border-t-2 border-brand-primary">
        <Clock size={20} className="text-brand-primary mx-auto mb-2" aria-hidden="true" />
        <p className="text-xs text-text-muted mb-1">Est. Time</p>
        <p className="text-lg font-bold text-white">{data.estimatedTravelTime}</p>
      </Card>

      {/* Crowd Impact */}
      <Card elevation="low" className={`p-4 text-center border-t-2 ${crowdColor.split(' ')[0]}`}
        role="status" aria-label={`Crowd impact: ${data.crowdImpact}`}>
        <Users size={20} className={`mx-auto mb-2 ${crowdColor.split(' ')[1]}`} aria-hidden="true" />
        <p className="text-xs text-text-muted mb-1">Crowd Impact</p>
        <p className={`text-lg font-bold ${crowdColor.split(' ')[1]}`}>{data.crowdImpact}</p>
      </Card>

      {/* Departure Strategy summary */}
      <Card elevation="low" className="p-4 text-center border-t-2 border-brand-secondary">
        <MapPin size={20} className="text-brand-secondary mx-auto mb-2" aria-hidden="true" />
        <p className="text-xs text-text-muted mb-1">Departure</p>
        <p className="text-sm font-semibold text-white leading-tight truncate" title={data.departureStrategy}>
          {data.departureStrategy.split(' ').slice(0, 3).join(' ')}…
        </p>
      </Card>

      {/* Confidence Score (Optional) */}
      {data.confidence && (
        <Card elevation="low" className="p-4 text-center border-t-2 border-info col-span-3 sm:col-span-1">
          <Target size={20} className="text-info mx-auto mb-2" aria-hidden="true" />
          <p className="text-xs text-text-muted mb-1">AI Confidence</p>
          <p className="text-lg font-bold text-info">{data.confidence}</p>
        </Card>
      )}
    </div>
  );
};
