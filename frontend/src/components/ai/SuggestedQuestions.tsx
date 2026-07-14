import React from 'react';

const SUGGESTIONS = [
  "Guide me to Gate B",
  "Which exit is less crowded?",
  "Where is the nearest wheelchair entrance?",
  "Best transport after the match?",
  "Help me in Spanish"
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-6">
      {SUGGESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="px-4 py-2 bg-bg-elevated border border-border-subtle rounded-full text-sm text-text-main hover:bg-brand-primary/20 hover:border-brand-primary/50 transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  );
};
