import React from 'react';
import { AlertTriangle, Info, XOctagon } from 'lucide-react';
import { Card } from '../Card';

interface WarningsPanelProps {
  warnings?: string[];
  importantInstructions?: string[];
  thingsToAvoid?: string[];
}

export const WarningsPanel: React.FC<WarningsPanelProps> = ({ warnings, importantInstructions, thingsToAvoid }) => {
  const hasWarnings = warnings && warnings.length > 0;
  const hasInstructions = importantInstructions && importantInstructions.length > 0;
  const hasAvoid = thingsToAvoid && thingsToAvoid.length > 0;

  if (!hasWarnings && !hasInstructions && !hasAvoid) return null;

  return (
    <div className="space-y-4">
      {hasWarnings && (
        <Card elevation="low" className="border-l-4 border-warning bg-warning/5" role="alert" aria-label="Accessibility warnings">
          <h4 className="font-semibold text-warning flex items-center gap-2 mb-3">
            <AlertTriangle size={18} aria-hidden="true" /> Legacy Warnings
          </h4>
          <ul className="space-y-2">
            {warnings.map((w, i) => (
              <li key={i} className="text-sm text-text-main flex items-start gap-2">
                <span className="text-warning mt-0.5 shrink-0" aria-hidden="true">•</span>
                {w}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {hasInstructions && (
        <Card elevation="low" className="border-l-4 border-info" role="region" aria-label="Important instructions">
          <h4 className="font-semibold text-info flex items-center gap-2 mb-3">
            <Info size={18} aria-hidden="true" /> Important Instructions
          </h4>
          <ul className="space-y-2">
            {importantInstructions.map((w, i) => (
              <li key={i} className="text-sm text-text-main flex items-start gap-2">
                <span className="text-info mt-0.5 shrink-0" aria-hidden="true">•</span>
                {w}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {hasAvoid && (
        <Card elevation="low" className="border-l-4 border-error" role="region" aria-label="Things to avoid">
          <h4 className="font-semibold text-error flex items-center gap-2 mb-3">
            <XOctagon size={18} aria-hidden="true" /> Things to Avoid
          </h4>
          <ul className="space-y-2">
            {thingsToAvoid.map((w, i) => (
              <li key={i} className="text-sm text-text-main flex items-start gap-2">
                <span className="text-error mt-0.5 shrink-0" aria-hidden="true">•</span>
                {w}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};
