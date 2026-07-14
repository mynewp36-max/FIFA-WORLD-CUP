import React from 'react';
import { Siren } from 'lucide-react';

interface CriticalAlertsPanelProps {
  alerts: string[];
}

export const CriticalAlertsPanel: React.FC<CriticalAlertsPanelProps> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div
      role="alert"
      aria-label="Critical alerts — immediate action required"
      className="p-5 rounded-premium bg-error/10 border border-error/50 animate-pulse-once"
    >
      <h4 className="font-bold text-error flex items-center gap-2 mb-4">
        <Siren size={20} aria-hidden="true" />
        Critical Alerts — Immediate Action Required
      </h4>
      <ul className="space-y-3">
        {alerts.map((alert, i) => {
          // Break apart long paragraphs into bullet points for readability
          const bulletPoints = alert.split(/(?:\. |\n)/).filter(p => p.trim().length > 5);
          
          return (
            <li key={i} className="flex items-start gap-3 p-3 bg-error/10 rounded-xl border border-error/20">
              <span className="text-error font-bold shrink-0 mt-0.5" aria-hidden="true">!</span>
              <div className="flex flex-col gap-1 w-full">
                {bulletPoints.map((pt, j) => (
                  <p key={j} className="text-text-main text-sm leading-relaxed">
                    {pt.trim()}{pt.endsWith('.') || pt.endsWith('!') ? '' : '.'}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
