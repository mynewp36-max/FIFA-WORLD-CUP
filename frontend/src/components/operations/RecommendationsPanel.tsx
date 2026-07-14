import React from 'react';
import { Card } from '../Card';
import { CheckCircle2, AlertTriangle, Building, Clock, User, Activity } from 'lucide-react';
import type { OrganizerAction, StrategicStep } from '../../types/operations';
import { Badge } from '../Badge';
import { flattenObject } from '../../utils/normalizers';

interface RecommendationsPanelProps {
  recommendations: OrganizerAction[];
  nextSteps: StrategicStep[];
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({
  recommendations, nextSteps
}) => (
  <div className="space-y-6">
    {/* Executive Dashboard Cards for Recommended Actions */}
    <section>
      <h4 className="font-semibold text-text-main flex items-center gap-2 mb-4">
        <CheckCircle2 size={18} className="text-brand-primary" aria-hidden="true" />
        Executive Actions
      </h4>
      
      <div className="grid grid-cols-1 gap-4">
        {recommendations.map((actionObj, i) => {
          // Flatten nested objects gracefully
          const title = flattenObject(actionObj.title || actionObj.action || 'Pending Executive Action');
          const desc = flattenObject(actionObj.description || '');
          const dept = flattenObject(actionObj.department || '');
          const owner = flattenObject(actionObj.owner || '');
          const timeline = flattenObject(actionObj.timeline || '');
          const status = flattenObject(actionObj.status || '');
          const priority = flattenObject(actionObj.priority || '');
          
          return (
            <Card key={i} elevation="low" className="border-l-4 border-brand-primary hover:shadow-md transition-shadow group">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <span className="text-brand-primary font-bold bg-brand-primary/10 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <h5 className="font-semibold text-white text-base leading-tight">
                      {title}
                    </h5>
                    {desc && <p className="text-sm text-text-muted mt-1 leading-relaxed">{desc}</p>}
                  </div>
                </div>
                {priority && (
                  <Badge variant={priority.toLowerCase() === 'high' || priority.toLowerCase() === 'urgent' ? 'error' : 'warning'} className="shrink-0">
                    {priority} Priority
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-border-subtle/50">
                {dept && (
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Building size={14} className="text-brand-secondary shrink-0" />
                    <span className="truncate" title={dept}>{dept}</span>
                  </div>
                )}
                {owner && (
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <User size={14} className="text-info shrink-0" />
                    <span className="truncate" title={owner}>{owner}</span>
                  </div>
                )}
                {timeline && (
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Clock size={14} className="text-warning shrink-0" />
                    <span className="truncate" title={timeline}>{timeline}</span>
                  </div>
                )}
                {status && (
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Activity size={14} className={status.toLowerCase() === 'completed' ? 'text-success shrink-0' : 'text-text-muted shrink-0'} />
                    <span className="truncate" title={status}>{status}</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>

    {/* Next Steps Timeline */}
    <Card elevation="low" className="border-l-4 border-brand-secondary" role="region" aria-label="Next steps timeline">
      <h4 className="font-semibold text-text-main flex items-center gap-2 mb-4">
        <AlertTriangle size={18} className="text-brand-secondary" aria-hidden="true" />
        Strategic Next Steps
      </h4>
      <ol className="space-y-4" aria-label="Sequential next steps">
        {nextSteps.map((stepObj, i) => {
          const isLast = i === nextSteps.length - 1;
          const stepText = flattenObject(stepObj.step || stepObj);
          const priority = flattenObject(stepObj.priority || '');
          const timeline = flattenObject(stepObj.timeline || '');
          const team = flattenObject(stepObj.team || '');
          
          return (
            <li key={i} className="flex gap-4 relative">
              {!isLast && (
                <div className="absolute top-6 left-[10px] bottom-[-16px] w-[2px] bg-border-subtle" aria-hidden="true" />
              )}
              <div className={`w-6 h-6 rounded-full shrink-0 mt-0 border-2 flex items-center justify-center text-[10px] font-bold ${isLast ? 'border-success bg-success/20 text-success' : 'border-brand-secondary bg-brand-secondary/20 text-brand-secondary'}`}
                aria-hidden="true">
                {i + 1}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-text-main text-sm font-medium leading-relaxed">{stepText}</p>
                  <div className="flex gap-2">
                    {priority && (
                      <Badge variant={priority.toLowerCase() === 'high' || priority.toLowerCase() === 'urgent' ? 'error' : 'warning'} className="text-[10px] px-2 py-0.5">
                        {priority}
                      </Badge>
                    )}
                  </div>
                </div>
                {(timeline || team) && (
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-text-muted">
                    {team && (
                      <span className="flex items-center gap-1">
                        <User size={12} className="text-info" /> {team}
                      </span>
                    )}
                    {timeline && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-warning" /> {timeline}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  </div>
);
