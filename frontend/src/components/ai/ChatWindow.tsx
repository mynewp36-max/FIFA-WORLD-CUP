import React, { useEffect, useRef } from 'react';
import type { Message } from '../../types/ai';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { EmptyChat } from './EmptyChat';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSend: (message: string) => void;
  onRegenerate: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, error, onSend, onRegenerate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return <EmptyChat onSelectSuggestion={onSend} />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
      <div className="max-w-4xl mx-auto flex flex-col relative">
        {messages.map((msg, index) => {
          // Pass isLast and onRegenerate only to the very last message in the list
          const isLast = index === messages.length - 1;
          return (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
              isLast={isLast}
              onRegenerate={onRegenerate} 
            />
          );
        })}
        
        {isLoading && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <TypingIndicator />
          </div>
        )}
        
        {/* We rely on the message.isError flag to render error cards in the stream now, 
            but keep this fallback just in case a global error occurs */}
        {error && (
          <div className="text-center my-4 p-3 bg-error/10 text-error rounded-xl border border-error/20 text-sm animate-in fade-in">
            {error}
          </div>
        )}
        
        <div ref={scrollRef} className="h-4" aria-hidden="true" />
      </div>
    </div>
  );
};
