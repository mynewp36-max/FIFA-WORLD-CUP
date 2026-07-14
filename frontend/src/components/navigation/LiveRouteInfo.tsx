import React from 'react';
import { Card } from '../Card';
import { Users, Activity, Shuffle } from 'lucide-react';
import type { NavigationResponse } from '../../types/navigation';
import { Badge } from '../Badge';

export const LiveRouteInfo: React.FC<{ data: NavigationResponse }> = ({ data }) => {
  return (
    <Card elevation="low" className="border-l-4 border-info">
      <h4 className="font-semibold text-text-main flex items-center gap-2 mb-4">
        <Activity size={18} className="text-info" aria-hidden="true" />
        Live Route Info
      </h4>
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-border-subtle/50 pb-2">
          <p className="text-sm text-text-muted flex items-center gap-2">
            <Users size={14} /> Crowd Level
          </p>
          <Badge variant={data.crowdLevel.toLowerCase() === 'high' ? 'error' : data.crowdLevel.toLowerCase() === 'medium' ? 'warning' : 'success'}>
            {data.crowdLevel}
          </Badge>
        </div>
        <div className="flex justify-between items-center border-b border-border-subtle/50 pb-2">
          <p className="text-sm text-text-muted flex items-center gap-2">
            <Activity size={14} /> Congestion
          </p>
          <p className="text-sm font-medium text-text-main">{data.routeCongestion}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-text-muted flex items-center gap-2">
            <Shuffle size={14} /> Alternate Route
          </p>
          <p className="text-sm font-medium text-text-main">
            {data.alternateRouteAvailable ? 'Available' : 'None'}
          </p>
        </div>
      </div>
    </Card>
  );
};
