import React from 'react';
import { X, Bell, Info, AlertTriangle } from 'lucide-react';
import { useToast } from '../../providers/ToastProvider';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-6 top-16 mt-2 w-80 rounded-premium bg-bg-surface border border-border-subtle shadow-premium shadow-glow z-50 flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
          <h3 className="font-semibold text-text-main flex items-center gap-2">
            <Bell size={18} /> Notifications
          </h3>
          <button onClick={onClose} className="text-text-muted hover:text-text-main"><X size={18} /></button>
        </div>
        <div className="overflow-y-auto flex-1 p-2">
          {/* Static placeholders */}
          <div className="p-3 mb-2 rounded-lg bg-info/10 border border-info/20 flex gap-3">
            <Info className="text-info shrink-0" size={18} />
            <div>
              <p className="text-sm font-medium text-text-main">Gate 4 Open</p>
              <p className="text-xs text-text-muted">Avoid crowds by using Gate 4 for entry.</p>
            </div>
          </div>
          <div className="p-3 mb-2 rounded-lg bg-warning/10 border border-warning/20 flex gap-3">
            <AlertTriangle className="text-warning shrink-0" size={18} />
            <div>
              <p className="text-sm font-medium text-text-main">Match starts in 30m</p>
              <p className="text-xs text-text-muted">Head to your seats soon.</p>
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-border-subtle text-center">
          <button onClick={() => showToast('Coming Soon: Mark as Read')} className="text-sm text-brand-primary hover:underline">Mark all as read</button>
        </div>
      </div>
    </>
  );
};
