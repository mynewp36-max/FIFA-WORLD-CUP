import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import type {  RiskLevel, PriorityLevel  } from '../../types/operations';

interface ExecutiveSummaryCardProps {
  summary: string;
  generatedAt: string;
  risk: RiskLevel;
  priority: PriorityLevel;
  crowdStatus: string;
  transportStatus: string;
  weather: string;
}

const riskConfig: Record<RiskLevel, { variant: 'success' | 'warning' | 'error' | 'default'; color: string }> = {
  Low: { variant: 'success', color: 'border-success' },
  Medium: { variant: 'warning', color: 'border-warning' },
  High: { variant: 'error', color: 'border-error' },
  Critical: { variant: 'error', color: 'border-error' },
};

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({
  summary, generatedAt, risk, priority, crowdStatus, transportStatus, weather
}) => {
  const cfg = riskConfig[risk] || riskConfig.Low;
  const formattedTime = new Date(generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Card className={`bg-gradient-to-br from-bg-elevated to-bg-surface border-l-4 ${cfg.color}`}>
      <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Executive Summary</p>
          <p className="text-xs text-text-muted">Generated at {formattedTime}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant={cfg.variant} aria-label={`Overall risk: ${risk}`}>
            ⚠ Risk: {risk}
          </Badge>
          <Badge variant={priority === 'Urgent' || priority === 'High' ? 'error' : 'info'}
            aria-label={`Priority: ${priority}`}>
            ⚡ {priority} Priority
          </Badge>
        </div>
      </div>
      <p className="text-text-main leading-relaxed mb-4">{summary}</p>
      
      <div className="flex flex-wrap gap-3 pt-3 border-t border-border-subtle/50">
        <div className="flex items-center gap-1 text-xs text-text-muted bg-bg-base px-2 py-1 rounded">
          <span aria-hidden="true">👥</span> Crowd: <strong className="text-white ml-1">{crowdStatus}</strong>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-muted bg-bg-base px-2 py-1 rounded">
          <span aria-hidden="true">🚇</span> Transport: <strong className="text-white ml-1">{transportStatus}</strong>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-muted bg-bg-base px-2 py-1 rounded">
          <span aria-hidden="true">⛅</span> Weather: <strong className="text-white ml-1">{weather}</strong>
        </div>
      </div>
    </Card>
  );
};
