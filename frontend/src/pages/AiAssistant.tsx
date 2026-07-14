import React from 'react';
import { useAIChat } from '../hooks/useAIChat';
import { ChatWindow } from '../components/ai/ChatWindow';
import { ChatInput } from '../components/ai/ChatInput';
import { Trash2 } from 'lucide-react';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const AiAssistant: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearConversation, regenerateLastMessage } = useAIChat();

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-[calc(100vh-8rem)] bg-bg-surface/50 border border-border-subtle rounded-premium overflow-hidden shadow-premium animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="h-14 border-b border-border-subtle flex items-center justify-between px-6 bg-bg-base/80 backdrop-blur-sm z-20 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
            </div>
            <h2 className="font-semibold text-text-main">AI Concierge</h2>
          </div>
          {messages.length > 0 && (
            <button 
              onClick={clearConversation}
              className="text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors p-2 flex items-center gap-2 text-sm font-medium"
              aria-label="Clear conversation"
            >
              <Trash2 size={16} /> <span className="hidden sm:inline">Clear Chat</span>
            </button>
          )}
        </div>

        {/* Chat Area */}
        <ChatWindow 
          messages={messages} 
          isLoading={isLoading} 
          error={error} 
          onSend={sendMessage} 
          onRegenerate={regenerateLastMessage}
        />

        {/* Input Area */}
        <ChatInput 
          onSend={sendMessage} 
          disabled={isLoading} 
        />
      </div>
    </ErrorBoundary>
  );
};
