import React from 'react';
import { Card } from '../Card';
import { CheckCircle2, Circle, Users, AlertTriangle, Clock } from 'lucide-react';
import type { EmergencyAction } from '../../types/emergency';
import { Badge } from '../Badge';
import { flattenObject } from '../../utils/normalizers';

interface ActionsTimelineProps {
  actions: EmergencyAction[];
}

export const ActionsTimeline: React.FC<ActionsTimelineProps> = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <Card role="region" aria-label="Recommended actions timeline">
      <h4 className="font-semibold text-text-main mb-5 flex items-center gap-2">
        ⚡ Recommended Actions
        <span className="text-xs text-text-muted font-normal">(ordered by urgency)</span>
      </h4>
      <ol className="space-y-5" aria-label="Step-by-step actions">
        {actions.map((actionObj, i) => {
          const isLast = i === actions.length - 1;
          const title = flattenObject(actionObj.title || actionObj.action || 'Action Step');
          const instruction = flattenObject(actionObj.instruction || '');
          const audience = flattenObject(actionObj.targetAudience || '');
          const priority = flattenObject(actionObj.priority || '');
          const time = flattenObject(actionObj.estimatedTime || '');
          const status = flattenObject(actionObj.status || '');
          
          return (
            <li key={i} className="flex gap-4 relative group" aria-label={`Step ${i + 1}: ${title}`}>
              {!isLast && (
                <div className="absolute top-7 left-[11px] bottom-[-20px] w-[2px] bg-border-subtle group-hover:bg-error/30 transition-colors" aria-hidden="true" />
              )}
              <div className="shrink-0 mt-0.5 relative z-10" aria-hidden="true">
                {status.toLowerCase() === 'completed' || isLast
                  ? <CheckCircle2 size={24} className="text-success bg-bg-base rounded-full" />
                  : <Circle size={24} className="text-error bg-bg-base rounded-full" />
                }
              </div>
              <div className="flex-1 bg-bg-elevated/60 border border-border-subtle rounded-xl p-4 text-text-main shadow-sm hover:border-error/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-error tracking-wider uppercase">
                      Step {i + 1}
                    </span>
                    {status && (
                      <Badge variant={status.toLowerCase() === 'completed' ? 'success' : 'info'} className="text-[10px] px-1.5 py-0">
                        {status}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {audience && (
                      <Badge variant="info" className="flex items-center gap-1 text-[10px] px-2 py-0.5">
                        <Users size={10} />
                        {audience}
                      </Badge>
                    )}
                    {priority && (
                      <Badge variant={priority.toLowerCase() === 'high' || priority.toLowerCase() === 'critical' ? 'error' : 'warning'} className="flex items-center gap-1 text-[10px] px-2 py-0.5">
                        <AlertTriangle size={10} />
                        {priority}
                      </Badge>
                    )}
                    {time && (
                      <Badge variant="default" className="flex items-center gap-1 text-[10px] px-2 py-0.5">
                        <Clock size={10} />
                        {time}
                      </Badge>
                    )}
                  </div>
                </div>

                <h5 className="font-semibold text-white text-base mb-1">{title}</h5>
                {instruction && <p className="text-sm text-text-muted leading-relaxed">{instruction}</p>}
                
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
};
