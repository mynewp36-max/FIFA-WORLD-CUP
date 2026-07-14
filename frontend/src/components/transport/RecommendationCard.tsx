import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Zap } from 'lucide-react';
import type {  TransportResponse  } from '../../types/transport';

interface RecommendationCardProps {
  data: TransportResponse;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ data }) => {
  const priorityVariant = (data?.priority || 'low').toLowerCase() === 'high' ? 'error' :
    (data?.priority || 'low').toLowerCase() === 'medium' ? 'warning' : 'success';

  return (
    <Card className="bg-gradient-to-br from-brand-primary/15 via-bg-surface to-brand-secondary/10 border-brand-primary/40">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-primary/20 text-brand-primary rounded-xl text-2xl" aria-hidden="true">🚇</div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Recommended Transport</p>
            <h3 className="text-2xl font-bold text-white">{data.recommendedTransport}</h3>
          </div>
        </div>
        <Badge variant={priorityVariant} aria-label={`Priority: ${data.priority}`}>
          <Zap size={12} className="mr-1" aria-hidden="true" />
          {data.priority} Priority
        </Badge>
      </div>
      <p className="text-text-muted text-sm leading-relaxed">{data.summary}</p>
    </Card>
  );
};
