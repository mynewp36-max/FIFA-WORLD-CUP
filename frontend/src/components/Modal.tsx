import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-bg-surface border border-border-subtle rounded-premium w-full max-w-md shadow-premium shadow-glow animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <h3 className="text-lg font-semibold text-text-main">{title}</h3>
          <button onClick={onClose} className="text-text-muted hover:text-text-main">&times;</button>
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
};
