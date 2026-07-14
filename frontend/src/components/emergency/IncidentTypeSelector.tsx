import React from 'react';
import type {  IncidentType  } from '../../types/emergency';

interface IncidentConfig {
  icon: string;
  label: IncidentType;
  urgency: 'critical' | 'high' | 'medium' | 'low';
}

const INCIDENTS: IncidentConfig[] = [
  { icon: '🚑', label: 'Medical Assistance',     urgency: 'critical' },
  { icon: '👶', label: 'Lost Child',              urgency: 'critical' },
  { icon: '🚧', label: 'Blocked Exit',            urgency: 'high'     },
  { icon: '🚨', label: 'Suspicious Activity',     urgency: 'high'     },
  { icon: '👥', label: 'Crowd Congestion',        urgency: 'medium'   },
  { icon: '♿', label: 'Accessibility Assistance', urgency: 'medium'   },
  { icon: '📦', label: 'Lost Property',           urgency: 'low'      },
  { icon: '❓', label: 'General Help Request',    urgency: 'low'      },
];

const urgencyStyles: Record<string, string> = {
  critical: 'border-error/60 hover:border-error text-error bg-error/10',
  high:     'border-warning/60 hover:border-warning text-warning bg-warning/10',
  medium:   'border-info/60 hover:border-info text-info bg-info/10',
  low:      'border-border-subtle hover:border-brand-primary text-text-muted bg-bg-elevated',
};

const activeStyles: Record<string, string> = {
  critical: 'border-error bg-error/20 text-error shadow-[0_0_12px_rgba(239,68,68,0.3)]',
  high:     'border-warning bg-warning/20 text-warning',
  medium:   'border-info bg-info/20 text-info',
  low:      'border-brand-primary bg-brand-primary/20 text-brand-primary',
};

interface IncidentTypeSelectorProps {
  selected: IncidentType;
  onSelect: (type: IncidentType) => void;
}

export const IncidentTypeSelector: React.FC<IncidentTypeSelectorProps> = ({ selected, onSelect }) => (
  <div role="group" aria-label="Select incident type">
    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">Incident Type</p>
    <div className="grid grid-cols-2 gap-2">
      {INCIDENTS.map(({ icon, label, urgency }) => {
        const isActive = selected === label;
        return (
          <button
            key={label}
            onClick={() => onSelect(label)}
            aria-pressed={isActive}
            aria-label={`${label} — ${urgency} urgency`}
            className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary active:scale-95 text-left
              ${isActive ? activeStyles[urgency] : urgencyStyles[urgency]}`}
          >
            <span className="text-lg shrink-0" aria-hidden="true">{icon}</span>
            <span className="leading-tight">{label}</span>
          </button>
        );
      })}
    </div>
  </div>
);
