import React from 'react';

export interface ChatBubbleProps {
  message: string;
  role: 'user' | 'ai';
  timestamp?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, role, timestamp }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${isUser ? 'bg-brand-primary text-white' : 'bg-bg-elevated text-text-main'}`}>
        <p className="text-sm leading-relaxed">{message}</p>
        {timestamp && <span className={`text-[10px] mt-1 block ${isUser ? 'text-white/80' : 'text-text-muted'}`}>{timestamp}</span>}
      </div>
    </div>
  );
};
