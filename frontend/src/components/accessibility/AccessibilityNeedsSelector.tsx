import React from 'react';
import type {  AccessibilityNeed  } from '../../types/accessibility';

const NEED_OPTIONS: { need: AccessibilityNeed; icon: string; label: string }[] = [
  { need: 'Wheelchair', icon: '♿', label: 'Wheelchair' },
  { need: 'Visually Impaired', icon: '👁', label: 'Visually Impaired' },
  { need: 'Hearing Impaired', icon: '👂', label: 'Hearing Impaired' },
  { need: 'Elderly', icon: '🧓', label: 'Elderly' },
  { need: 'Stroller', icon: '👶', label: 'Stroller / Family' },
  { need: 'Temporary Injury', icon: '🩼', label: 'Temporary Injury' },
];

interface AccessibilityNeedsSelectorProps {
  selected: AccessibilityNeed[];
  onToggle: (need: AccessibilityNeed) => void;
}

export const AccessibilityNeedsSelector: React.FC<AccessibilityNeedsSelectorProps> = ({
  selected,
  onToggle,
}) => {
  return (
    <div role="group" aria-label="Accessibility needs selector">
      <p className="text-sm font-medium text-text-muted mb-3 uppercase tracking-wider">
        Select Your Needs
      </p>
      <div className="grid grid-cols-2 gap-3">
        {NEED_OPTIONS.map(({ need, icon, label }) => {
          const isActive = selected.includes(need);
          return (
            <button
              key={need}
              onClick={() => onToggle(need)}
              aria-pressed={isActive}
              aria-label={`${label} — ${isActive ? 'selected' : 'not selected'}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-bg-base active:scale-95 ${
                isActive
                  ? 'bg-brand-primary/20 border-brand-primary text-brand-primary shadow-glow'
                  : 'bg-bg-elevated border-border-subtle text-text-muted hover:border-brand-primary/50 hover:text-text-main'
              }`}
            >
              <span className="text-xl" aria-hidden="true">{icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
