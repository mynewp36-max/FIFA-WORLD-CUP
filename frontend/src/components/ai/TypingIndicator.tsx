import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full justify-start mb-4">
      <div className="bg-bg-elevated border border-border-subtle rounded-2xl rounded-bl-sm px-5 py-4 w-20">
        <div className="flex justify-between items-center h-2">
          <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
