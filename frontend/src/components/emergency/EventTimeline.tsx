import React from 'react';
import { Card } from '../Card';
import { History, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import type { TimelineEvent } from '../../types/emergency';
import { flattenObject } from '../../utils/normalizers';

interface EventTimelineProps {
  events?: TimelineEvent[];
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <Card elevation="low" role="region" aria-label="Event Timeline">
      <h4 className="font-semibold text-text-main flex items-center gap-2 mb-5">
        <History size={18} className="text-info" aria-hidden="true" />
        Event Timeline
      </h4>
      <div className="space-y-4">
        {events.map((eventObj, i) => {
          const isLast = i === events.length - 1;
          const time = flattenObject(eventObj.time || '');
          const eventText = flattenObject(eventObj.event || eventObj);
          const status = flattenObject(eventObj.status || '').toLowerCase();
          
          let Icon = Clock;
          let iconColor = 'text-text-muted';
          if (status.includes('resolved') || status.includes('completed')) {
            Icon = CheckCircle2;
            iconColor = 'text-success';
          } else if (status.includes('active') || status.includes('escalated')) {
            Icon = AlertCircle;
            iconColor = 'text-error';
          }

          return (
            <div key={i} className="flex gap-4 relative">
              {!isLast && (
                <div className="absolute top-6 left-[9px] bottom-[-16px] w-[2px] bg-border-subtle" aria-hidden="true" />
              )}
              <div className={`mt-0.5 shrink-0 bg-bg-base ${iconColor}`} aria-hidden="true">
                <Icon size={20} />
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-text-muted">{time}</span>
                </div>
                <p className="text-sm text-text-main leading-relaxed">{eventText}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
