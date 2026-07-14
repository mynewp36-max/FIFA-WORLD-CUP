import React, { useState } from 'react';
import type { Message } from '../../types/ai';
import ReactMarkdown from 'react-markdown';
import { Copy, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { useToast } from '../../providers/ToastProvider';

interface ChatMessageProps {
  message: Message;
  onRegenerate?: () => void;
  isLast?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = React.memo(({ message, onRegenerate, isLast }) => {
  const isUser = message.role === 'user';
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    showToast('Copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const isThinking = !isUser && !message.isError && message.text === '';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-in fade-in slide-in-from-bottom-2`}>
      <div className={`max-w-[90%] md:max-w-[80%] flex flex-col gap-1 ${
        isUser ? 'items-end' : 'items-start'
      }`}>
        <div className={`rounded-2xl px-5 py-3.5 relative group ${
          isUser 
            ? 'bg-brand-primary text-text-main rounded-br-sm shadow-glow' 
            : message.isError
              ? 'bg-error/10 text-text-main border border-error/30 rounded-bl-sm'
              : 'bg-bg-elevated text-text-main border border-border-subtle rounded-bl-sm shadow-sm'
        }`}>
          {message.isError && (
            <div className="flex items-center gap-2 text-error mb-2 text-sm font-semibold">
              <AlertCircle size={16} /> Connection Error
            </div>
          )}

          {!isUser && !message.isError && (
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-border-subtle/50">
               <span className="text-xs font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1">
                 <Check size={12} className="text-success"/> AI Assistant
               </span>
               {!isThinking && <span className="text-[10px] bg-success/10 text-success px-1.5 py-0.5 rounded-full font-mono">98% Confidence</span>}
            </div>
          )}

          <div className={`prose prose-invert prose-sm max-w-none ${isUser ? 'text-white' : 'text-text-main'} prose-p:leading-relaxed prose-li:my-0`}>
            {isThinking ? (
              <div className="flex items-center gap-2 text-text-muted text-sm py-1">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                Analyzing stadium context...
              </div>
            ) : isUser ? (
              <p className="whitespace-pre-wrap m-0">{message.text}</p>
            ) : (
              <ReactMarkdown
                components={{
                  table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="min-w-full border-collapse border border-border-subtle" {...props} /></div>,
                  th: ({node, ...props}) => <th className="bg-bg-surface border border-border-subtle px-3 py-2 text-left font-semibold text-sm" {...props} />,
                  td: ({node, ...props}) => <td className="border border-border-subtle px-3 py-2 text-sm" {...props} />,
                  a: ({node, ...props}) => <a className="text-brand-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
                  code: ({node, inline, className, children, ...props}: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean, node?: unknown }) => 
                    inline 
                      ? <code className="bg-bg-surface px-1.5 py-0.5 rounded text-xs text-brand-secondary font-mono" {...props}>{children}</code>
                      : <div className="bg-[#1e1e1e] rounded-xl overflow-hidden my-3 border border-border-subtle"><div className="bg-bg-base px-3 py-1.5 border-b border-border-subtle text-xs text-text-muted">Code snippet</div><pre className="p-3 overflow-x-auto text-sm"><code className={className} {...props}>{children}</code></pre></div>
                }}
              >
                {message.text}
              </ReactMarkdown>
            )}
          </div>
          
          <span className={`text-[10px] mt-2 block opacity-70 ${isUser ? 'text-blue-100 text-right' : 'text-text-muted text-left'}`}>
            {message.timestamp}
          </span>
        </div>

        {/* AI Action Buttons */}
        {!isUser && !message.isError && (
          <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity">
            <button 
              onClick={handleCopy}
              className="p-1.5 text-text-muted hover:text-white hover:bg-bg-surface rounded-md transition-colors flex items-center gap-1 text-xs"
              title="Copy message"
            >
              {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            </button>
            {isLast && onRegenerate && (
              <button 
                onClick={onRegenerate}
                className="p-1.5 text-text-muted hover:text-white hover:bg-bg-surface rounded-md transition-colors flex items-center gap-1 text-xs"
                title="Regenerate response"
              >
                <RefreshCw size={14} />
              </button>
            )}
          </div>
        )}

        {/* Error Action Buttons */}
        {message.isError && isLast && onRegenerate && (
          <button 
            onClick={onRegenerate}
            className="mt-2 text-xs flex items-center gap-1 text-error hover:text-red-400 font-medium px-3 py-1.5 bg-error/10 hover:bg-error/20 rounded-lg transition-colors border border-error/20"
          >
            <RefreshCw size={12} /> Try Again
          </button>
        )}
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';
