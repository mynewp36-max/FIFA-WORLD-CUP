import React from 'react';
import { User, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useToast } from '../../providers/ToastProvider';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ isOpen, onClose, onOpenSettings }) => {
  const { showToast } = useToast();
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-6 top-16 mt-2 w-56 rounded-premium bg-bg-surface border border-border-subtle shadow-premium z-50 py-2 animate-in fade-in slide-in-from-top-2">
        <div className="px-4 py-3 border-b border-border-subtle mb-1">
          <p className="text-sm font-medium text-text-main">Fan Profile</p>
          <p className="text-xs text-text-muted truncate">fan@fifa2026.com</p>
        </div>
        <button onClick={() => showToast('Coming Soon: Account Settings')} className="w-full text-left px-4 py-2 text-sm text-text-main hover:bg-bg-elevated flex items-center gap-3">
          <User size={16} className="text-text-muted" /> My Account
        </button>
        <button onClick={() => { onClose(); onOpenSettings(); }} className="w-full text-left px-4 py-2 text-sm text-text-main hover:bg-bg-elevated flex items-center gap-3">
          <SettingsIcon size={16} className="text-text-muted" /> Preferences
        </button>
        <div className="my-1 border-t border-border-subtle"></div>
        <button onClick={() => showToast('Coming Soon: Sign Out')} className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 flex items-center gap-3">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </>
  );
};
