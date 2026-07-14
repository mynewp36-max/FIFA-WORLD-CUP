import React from 'react';
import { SuggestedQuestions } from './SuggestedQuestions';
import { MessageSquare } from 'lucide-react';

interface EmptyChatProps {
  onSelectSuggestion: (question: string) => void;
}

export const EmptyChat: React.FC<EmptyChatProps> = ({ onSelectSuggestion }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center px-4">
      <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary mb-6">
        <MessageSquare size={32} />
      </div>
      <h2 className="text-2xl font-bold text-text-main mb-2">How can I help you today?</h2>
      <p className="text-text-muted mb-8">
        I'm your AI Stadium Assistant. Ask me anything about the match, navigating MetLife Stadium, or managing your tickets.
      </p>
      
      <SuggestedQuestions onSelect={onSelectSuggestion} />
    </div>
  );
};
