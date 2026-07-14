import React from 'react';
import { Card } from '../Card';
import { Clock, Users, ShieldAlert } from 'lucide-react';
import type {  NavigationResponse  } from '../../types/navigation';

export const MetricCards: React.FC<{ data: NavigationResponse }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card elevation="low" className="flex items-center gap-4 p-4 border-l-4 border-brand-primary">
        <div className="p-3 bg-brand-primary/20 rounded-xl text-brand-primary">
          <Clock size={24} />
        </div>
        <div>
          <p className="text-xs text-text-muted font-medium uppercase">Est. Time</p>
          <p className="text-xl font-bold text-white">{data.estimatedTime}</p>
        </div>
      </Card>
      
      <Card elevation="low" className={`flex items-center gap-4 p-4 border-l-4 ${(data?.crowdLevel || 'low').toLowerCase() === 'high' ? 'border-error' : (data?.crowdLevel || 'low').toLowerCase() === 'medium' ? 'border-warning' : 'border-success'}`}>
        <div className={`p-3 rounded-xl ${(data?.crowdLevel || 'low').toLowerCase() === 'high' ? 'bg-error/20 text-error' : (data?.crowdLevel || 'low').toLowerCase() === 'medium' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'}`}>
          <Users size={24} />
        </div>
        <div>
          <p className="text-xs text-text-muted font-medium uppercase">Crowd Level</p>
          <p className="text-xl font-bold text-white">{data.crowdLevel}</p>
        </div>
      </Card>

      <Card elevation="low" className="flex items-center gap-4 p-4 border-l-4 border-info">
        <div className="p-3 bg-info/20 rounded-xl text-info">
          <ShieldAlert size={24} />
        </div>
        <div>
          <p className="text-xs text-text-muted font-medium uppercase">Best Entrance</p>
          <p className="text-xl font-bold text-white truncate max-w-[120px]">{data.recommendedEntrance}</p>
        </div>
      </Card>
    </div>
  );
};
