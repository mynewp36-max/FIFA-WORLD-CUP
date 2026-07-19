import { useState, useEffect, useCallback, useRef } from 'react';
import type { Message, ChatRequest } from '../types/ai';
import { AiService } from '../services/ai.service';
import { useSettings } from './useSettings';

const STORAGE_KEY = 'fifa_ai_chat_history';

export const useAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { settings } = useSettings();
  
  // Track if we are currently streaming a message
  const [isStreaming, setIsStreaming] = useState(false);
  const streamingMessageId = useRef<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse chat history', e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Sync to local storage on change
  useEffect(() => {
    try {
      if (!isStreaming) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (e) {
      console.error('Failed to save chat history', e);
    }
  }, [messages, isStreaming]);

  const simulateStream = async (messageId: string, fullText: string) => {
    setIsStreaming(true);
    streamingMessageId.current = messageId;
    
    // Add smart follow ups if not present
    let finalText = fullText;
    if (!finalText.includes('---')) {
       const followUps = [
         "\n\n---\n**Suggested Follow-ups:**\n- *Show me the fastest route there*\n- *What are the food options nearby?*\n- *Where is the closest restroom?*",
         "\n\n---\n**Suggested Follow-ups:**\n- *How crowded is that area right now?*\n- *Are there accessible elevators?*\n- *Is it covered from rain?*"
       ];
       finalText += followUps[Math.floor(Math.random() * followUps.length)];
    }

    const words = finalText.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, text: currentText } : msg
        )
      );
      
      // Random delay between 10ms and 50ms for realism
      await new Promise(resolve => setTimeout(resolve, Math.random() * 40 + 10));
    }
    
    setIsStreaming(false);
    streamingMessageId.current = null;
  };

  const sendPromptToBackend = async (text: string) => {
    setIsLoading(true);
    setError(null);

    const request: ChatRequest = {
      message: text,
      language: settings?.language?.preferred || 'English',
      userRole: 'Fan',
      stadium: 'MetLife Stadium', // Context chip mock
      accessibility: settings?.accessibility?.wheelchair || false,
    };

    try {
      const response = await AiService.sendMessage(request);
      const aiMessageId = Date.now().toString();

      if (response.success) {
        const aiMessage: Message = {
          id: aiMessageId,
          text: '', // Start empty for streaming
          role: 'ai',
          timestamp: response.timestamp ? new Date(response.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: false
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
        
        // Start simulated streaming
        await simulateStream(aiMessageId, response.reply);
        
      } else {
        const aiError: Message = {
          id: aiMessageId,
          text: response.reply || response.error || 'Failed to get response. Please try again.',
          role: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true
        };
        setMessages(prev => [...prev, aiError]);
        setIsLoading(false);
      }
    } catch (err: unknown) {
      const aiError: Message = {
        id: Date.now().toString(),
        text: err instanceof Error ? err.message : 'An unexpected network error occurred.',
        role: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, aiError]);
      setIsLoading(false);
    }
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || isStreaming) return;

    // Remove previous error messages before sending new one
    setMessages(prev => prev.filter(m => !m.isError));

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      role: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Slight delay so the user message renders before the loading state begins
    setTimeout(() => {
      sendPromptToBackend(text);
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isStreaming, settings]);

  const regenerateLastMessage = useCallback(() => {
    if (isLoading || isStreaming || messages.length === 0) return;
    
    // Find the last user message
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return;

    // Remove the last AI message if it exists
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages[newMessages.length - 1]?.role === 'ai') {
        newMessages.pop();
      }
      return newMessages;
    });

    sendPromptToBackend(lastUserMsg.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isLoading, isStreaming, settings]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    isStreaming,
    error,
    sendMessage,
    clearConversation,
    regenerateLastMessage
  };
};
