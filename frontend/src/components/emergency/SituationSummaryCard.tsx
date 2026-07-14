import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import type { EmergencyPriority, IncidentStatus } from '../../types/emergency';
import { Activity } from 'lucide-react';

const priorityConfig: Record<EmergencyPriority, {
  variant: 'success' | 'warning' | 'error' | 'default';
  border: string;
  pulse: boolean;
}> = {
  Low:      { variant: 'success', border: 'border-success',  pulse: false },
  Medium:   { variant: 'warning', border: 'border-warning',  pulse: false },
  High:     { variant: 'error',   border: 'border-error',    pulse: true  },
  Critical: { variant: 'error',   border: 'border-error',    pulse: true  },
};

const statusConfig: Record<IncidentStatus, { variant: 'info' | 'error' | 'success' | 'warning' }> = {
  'Active': { variant: 'error' },
  'Escalated': { variant: 'warning' },
  'Resolved': { variant: 'success' },
  'Awaiting Response': { variant: 'info' }
};

interface SituationSummaryCardProps {
  summary: string;
  priority: EmergencyPriority;
  status?: IncidentStatus;
  generatedAt: string;
}

export const SituationSummaryCard: React.FC<SituationSummaryCardProps> = ({
  summary, priority, status = 'Active', generatedAt,
}) => {
  const cfg = priorityConfig[priority] || priorityConfig.Low;
  const statCfg = statusConfig[status] || statusConfig['Active'];
  const time = new Date(generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Card className={`border-l-4 ${cfg.border} bg-gradient-to-br from-bg-elevated to-bg-surface`}>
      <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1 flex items-center gap-2">
            <Activity size={12} />
            Situation Summary
          </p>
          <p className="text-xs text-text-muted">AI Guidance generated at {time}</p>
        </div>
        <div className="flex gap-2">
          {status && (
             <Badge variant={statCfg.variant} className="opacity-80">
               Status: {status}
             </Badge>
          )}
          <Badge variant={cfg.variant} aria-label={`Priority: ${priority}`}
            className={cfg.pulse ? 'animate-pulse' : ''}>
            {priority === 'Critical' || priority === 'High' ? '🚨' : '⚠'} {priority} Priority
          </Badge>
        </div>
      </div>
      <p className="text-text-main leading-relaxed">{summary}</p>
    </Card>
  );
};
