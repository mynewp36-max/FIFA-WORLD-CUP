import React from 'react';
import { Card } from '../Card';

interface AlternativeOptionsProps {
  options: string[];
}

export const AlternativeOptions: React.FC<AlternativeOptionsProps> = ({ options }) => {
  if (!options || options.length === 0) return null;

  return (
    <section aria-label="Alternative transport options">
      <h3 className="text-base font-semibold text-text-main mb-3">Alternative Options</h3>
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, i) => (
          <Card key={i} elevation="low"
            className="flex items-start gap-3 p-4 hover:border-brand-primary/40 transition-colors">
            <span className="text-brand-secondary font-bold text-lg shrink-0" aria-hidden="true">
              {i + 1}.
            </span>
            <p className="text-text-muted text-sm leading-relaxed">{option}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};
