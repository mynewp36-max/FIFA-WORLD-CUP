import React from 'react';
import { CheckCircle2, Circle, Navigation } from 'lucide-react';
import type { AccessibleRouteStep } from '../../types/accessibility';
import { Badge } from '../Badge';

interface AccessibleRouteCardProps {
  route: AccessibleRouteStep[];
}

export const AccessibleRouteCard: React.FC<AccessibleRouteCardProps> = ({ route }) => {
  if (!route || route.length === 0) return null;

  return (
    <section aria-label="Accessible route steps">
      <h3 className="text-lg font-semibold text-text-main mb-5 flex items-center gap-2">
        ♿ Your Accessible Route
      </h3>
      <ol className="space-y-5" aria-label="Step-by-step route">
        {route.map((step, index) => {
          const isLast = index === route.length - 1;
          const instructionText = step.instruction || String(step);
          
          return (
            <li key={index} className="flex gap-4 relative group" aria-label={`Step ${index + 1}: ${instructionText}`}>
              {!isLast && (
                <div className="absolute top-8 left-[11px] bottom-[-20px] w-[2px] bg-border-subtle group-hover:bg-brand-primary/30 transition-colors" aria-hidden="true" />
              )}
              <div className="shrink-0 mt-1 relative z-10" aria-hidden="true">
                {isLast ? (
                  <CheckCircle2 size={24} className="text-success bg-bg-base rounded-full" />
                ) : (
                  <Circle size={24} className="text-brand-primary bg-bg-base rounded-full" />
                )}
              </div>
              <div className="flex-1 bg-bg-elevated/60 border border-border-subtle rounded-xl p-4 text-text-main shadow-sm hover:border-brand-primary/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-brand-primary tracking-wider uppercase">
                        Step {index + 1}
                      </span>
                      {step.estimatedTime && (
                        <Badge variant="warning" className="text-[10px] px-2 py-0">
                          {step.estimatedTime}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm md:text-base leading-relaxed">{instructionText}</p>
                  </div>
                  
                  {step.distance && (
                    <div className="shrink-0 flex items-center gap-1.5 text-text-muted bg-bg-surface/50 px-2 py-1 rounded-md text-sm border border-border-subtle">
                      <Navigation size={14} />
                      <span>{step.distance}</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
