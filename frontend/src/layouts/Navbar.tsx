import React, { useState } from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { ProfileMenu } from './components/ProfileMenu';
import { NotificationPanel } from './components/NotificationPanel';
import { SettingsDrawer } from './components/SettingsDrawer';

interface NavbarProps {
  onMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-bg-base/80 backdrop-blur-md border-b border-border-subtle flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
        <div className="flex items-center gap-3 text-text-muted">
          <button aria-label="Toggle Sidebar" className="md:hidden p-2 text-text-muted hover:text-text-main" onClick={onMenuToggle}>
            <Menu size={24} />
          </button>
          <span className="text-sm font-medium hidden sm:block">FIFA Stadium Companion</span>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            aria-label="View Notifications"
            aria-expanded={isNotificationsOpen}
            className="p-2 text-text-muted hover:text-text-main relative transition-colors"
            onClick={() => setIsNotificationsOpen(true)}
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <div className="flex items-center space-x-3 border-l border-border-subtle pl-4 relative">
            <button 
              aria-label="View Profile"
              aria-expanded={isProfileOpen}
              className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-bg-base"
              onClick={() => setIsProfileOpen(true)}
            >
              <User size={16} />
            </button>
            <span className="text-sm font-medium text-text-main hidden sm:block">Fan Profile</span>
          </div>
        </div>
      </header>

      <ProfileMenu 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
      />
      
      <NotificationPanel 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      <SettingsDrawer 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};
