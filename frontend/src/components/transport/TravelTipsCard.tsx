import React from 'react';
import { Card } from '../Card';
import { Lightbulb, Clock } from 'lucide-react';

interface TravelTipsCardProps {
  tips: string[];
  departureStrategy: string;
  recommendedDeparture?: string;
}

export const TravelTipsCard: React.FC<TravelTipsCardProps> = ({ tips, departureStrategy, recommendedDeparture }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Departure Strategy */}
      <Card elevation="low" className="border-l-4 border-brand-secondary">
        <h4 className="font-semibold text-text-main flex items-center gap-2 mb-3">
          <Clock size={18} className="text-brand-secondary" aria-hidden="true" />
          Departure Strategy
        </h4>
        <p className="text-text-muted text-sm leading-relaxed mb-3">{departureStrategy}</p>
        
        {recommendedDeparture && (
          <div className="bg-brand-secondary/10 p-3 rounded-lg border border-brand-secondary/20">
            <p className="text-xs text-brand-secondary font-semibold uppercase tracking-wider mb-1">Recommended Departure</p>
            <p className="text-sm text-white font-medium">{recommendedDeparture}</p>
          </div>
        )}
      </Card>

      {/* Travel Tips */}
      <Card elevation="low" className="border-l-4 border-success">
        <h4 className="font-semibold text-text-main flex items-center gap-2 mb-3">
          <Lightbulb size={18} className="text-success" aria-hidden="true" />
          Travel Tips
        </h4>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="text-sm text-text-muted flex items-start gap-2">
              <span className="text-success mt-0.5 shrink-0" aria-hidden="true">✓</span>
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
