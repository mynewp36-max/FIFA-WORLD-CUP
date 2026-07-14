import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Toast } from '../components/Toast';
import type { ToastProps } from '../components/Toast';

interface ToastContextType {
  showToast: (message: string, type?: ToastProps['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastProps>({ message: '', isVisible: false, type: 'info' });

  const showToast = useCallback((message: string, type: ToastProps['type'] = 'info') => {
    const safeType = type ?? 'info';
    setToast({ message, isVisible: true, type: safeType as 'success' | 'error' | 'info' });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={toast.message} isVisible={toast.isVisible} type={toast.type || 'info'} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
