import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { 
  Home, 
  Ticket, 
  MessageSquare, 
  Map, 
  Users, 
  Car, 
  Accessibility, 
  AlertTriangle, 
  LayoutDashboard, 
  Settings 
} from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: <Home size={20} /> },
  { name: 'Fan Dashboard', path: '/fan-dashboard', icon: <Ticket size={20} /> },
  { name: 'AI Assistant', path: '/ai-assistant', icon: <MessageSquare size={20} /> },
  { name: 'Stadium Navigation', path: '/navigation', icon: <Map size={20} /> },
  { name: 'Crowd Intelligence', path: '/crowd-intelligence', icon: <Users size={20} /> },
  { name: 'Transport', path: '/transport', icon: <Car size={20} /> },
  { name: 'Accessibility', path: '/accessibility', icon: <Accessibility size={20} /> },
  { name: 'Emergency', path: '/emergency', icon: <AlertTriangle size={20} /> },
  { name: 'Organizer Dashboard', path: '/organizer-dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-30" onClick={onClose} />
      )}
      
      {/* Sidebar container */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-bg-base border-r border-border-subtle h-screen flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            FIFA 2026 OS
          </h1>
          <button aria-label="Close Sidebar" className="md:hidden text-text-muted hover:text-text-main" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <nav aria-label="Main Navigation" className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                // Auto close sidebar on mobile when navigating
                if (window.innerWidth < 768) {
                  onClose();
                }
              }}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-premium transition-colors ${
                  isActive 
                    ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30' 
                    : 'text-text-muted hover:text-text-main hover:bg-bg-elevated'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-border-subtle text-sm text-text-muted text-center">
          v2.0.0
        </div>
      </aside>
    </>
  );
};
