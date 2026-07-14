import React from 'react';
import { Card } from '../Card';
import { Map, Clock, Footprints, Accessibility, CornerUpRight, Target } from 'lucide-react';
import type { NavigationResponse } from '../../types/navigation';
import { Badge } from '../Badge';

export const RouteSummaryCard: React.FC<{ data: NavigationResponse }> = ({ data }) => {
  return (
    <Card elevation="low" className="border-l-4 border-brand-primary">
      <h4 className="font-semibold text-text-main flex items-center gap-2 mb-4">
        <Map size={18} className="text-brand-primary" aria-hidden="true" />
        Route Summary
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><Footprints size={12} /> Distance</p>
          <p className="text-sm font-medium text-text-main">{data.totalDistance}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><Clock size={12} /> Est. Time</p>
          <p className="text-sm font-medium text-text-main">{data.estimatedTime}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><CornerUpRight size={12} /> Turns</p>
          <p className="text-sm font-medium text-text-main">{data.numberOfTurns}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><Accessibility size={12} /> Accessibility</p>
          <Badge variant={data.accessibilityStatus.toLowerCase().includes('fully') ? 'success' : 'warning'} className="text-[10px] px-1.5 py-0">
            {data.accessibilityStatus}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1"><Target size={12} /> Confidence</p>
          <p className="text-sm font-medium text-text-main">{data.confidenceScore}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted flex items-center gap-1 mb-1">Entrance</p>
          <p className="text-sm font-medium text-brand-primary truncate" title={data.recommendedEntrance}>{data.recommendedEntrance}</p>
        </div>
      </div>
    </Card>
  );
};
