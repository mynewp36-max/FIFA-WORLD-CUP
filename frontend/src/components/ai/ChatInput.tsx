import React, { useState, useRef, useEffect } from 'react';
import { Send, MapPin, Activity, User as UserIcon } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { settings } = useSettings();

  const QUICK_ACTIONS = [
    "Where is the nearest restroom?",
    "Show me the best exit route.",
    "What time is kickoff?",
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-bg-surface border-t border-border-subtle sticky bottom-0 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        
        {/* Context Chips & Quick Actions (hidden on very small screens to save space) */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar shrink-0">
            {QUICK_ACTIONS.map((action, i) => (
               <button
                 key={i}
                 onClick={() => onSend(action)}
                 disabled={disabled}
                 className="whitespace-nowrap text-[11px] px-3 py-1.5 bg-bg-elevated border border-border-subtle hover:border-brand-primary/50 text-text-muted hover:text-white rounded-full transition-colors disabled:opacity-50"
               >
                 {action}
               </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 text-[10px] text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded border border-brand-secondary/20">
              <MapPin size={10} /> MetLife Stadium
            </span>
            {settings?.accessibility?.wheelchair && (
              <span className="flex items-center gap-1 text-[10px] text-success bg-success/10 px-2 py-1 rounded border border-success/20">
                <Activity size={10} /> Wheelchair Access
              </span>
            )}
            <span className="flex items-center gap-1 text-[10px] text-text-muted bg-bg-elevated px-2 py-1 rounded border border-border-subtle">
              <UserIcon size={10} /> Fan Role
            </span>
          </div>
        </div>

        {/* Input Box */}
        <div className="relative flex items-end gap-2 bg-bg-elevated border border-border-subtle rounded-2xl p-2 focus-within:ring-2 focus-within:ring-brand-primary focus-within:border-transparent transition-all shadow-sm">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Ask your AI Concierge anything..."
            className="flex-1 max-h-[120px] bg-transparent text-text-main placeholder-text-muted outline-none resize-none px-3 py-2 text-sm md:text-base disabled:opacity-50"
            rows={1}
            aria-label="Ask your AI Concierge anything"
          />
          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="p-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 disabled:opacity-50 disabled:bg-bg-base transition-colors shrink-0 mb-0.5"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
        
        <div className="text-center hidden sm:block">
          <span className="text-[10px] text-text-muted">AI responses may occasionally be inaccurate. Please verify critical emergency and stadium routes.</span>
        </div>
      </div>
    </div>
  );
};
