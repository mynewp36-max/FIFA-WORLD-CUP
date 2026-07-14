import React from 'react';
import { CheckCircle2, Circle, Navigation, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ListTree, Navigation2 } from 'lucide-react';
import type { RouteStep } from '../../types/navigation';
import { Badge } from '../Badge';
import { flattenObject } from '../../utils/normalizers';

interface RouteTimelineProps {
  route: RouteStep[];
}

const getDirectionIcon = (direction: string) => {
  const dir = direction.toLowerCase();
  if (dir.includes('left')) return <ArrowLeft size={16} />;
  if (dir.includes('right')) return <ArrowRight size={16} />;
  if (dir.includes('straight') || dir.includes('forward')) return <ArrowUp size={16} />;
  if (dir.includes('back')) return <ArrowDown size={16} />;
  if (dir.includes('stair')) return <ListTree size={16} />;
  return <Navigation2 size={16} />;
};

export const RouteTimeline: React.FC<RouteTimelineProps> = ({ route }) => {
  if (!route || route.length === 0) return null;

  return (
    <div className="space-y-6">
      {route.map((step, index) => {
        const isLast = index === route.length - 1;
        const instruction = flattenObject(step.instruction || String(step));
        const distance = flattenObject(step.distance || '');
        const time = flattenObject(step.estimatedTime || '');
        const landmark = flattenObject(step.landmark || '');
        const direction = flattenObject(step.direction || '');
        
        return (
          <div key={index} className="flex gap-4 relative group">
            {!isLast && (
              <div className="absolute top-8 left-[11px] bottom-[-24px] w-[2px] bg-border-subtle group-hover:bg-brand-primary/30 transition-colors" />
            )}
            
            <div className="shrink-0 mt-1 relative z-10">
              {isLast ? (
                <CheckCircle2 size={24} className="text-success bg-bg-surface rounded-full" />
              ) : (
                <Circle size={24} className="text-brand-primary bg-bg-surface rounded-full" />
              )}
            </div>
            
            <div className={`flex-1 ${isLast ? 'pt-1' : ''}`}>
              <div className="bg-bg-elevated/50 border border-border-subtle rounded-xl p-4 text-text-main shadow-sm hover:border-brand-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold text-brand-primary tracking-wider uppercase">
                        Step {index + 1}
                      </span>
                      {time && (
                        <Badge variant="warning" className="text-[10px] px-2 py-0">
                          {time}
                        </Badge>
                      )}
                      {direction && (
                        <Badge variant="info" className="flex items-center gap-1 text-[10px] px-2 py-0">
                          {getDirectionIcon(direction)} {direction}
                        </Badge>
                      )}
                      {landmark && (
                        <Badge variant="default" className="text-[10px] px-2 py-0 border border-border-subtle">
                          📍 {landmark}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm md:text-base leading-relaxed">{instruction}</p>
                  </div>
                  
                  {distance && (
                    <div className="shrink-0 flex items-center gap-1.5 text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-md text-sm border border-brand-primary/20">
                      <Navigation size={14} />
                      <span className="font-medium">{distance}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
