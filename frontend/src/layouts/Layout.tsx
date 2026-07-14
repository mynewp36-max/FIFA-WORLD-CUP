import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './components/Footer';

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-bg-base text-text-main font-primary overflow-hidden selection:bg-brand-primary/30">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Navbar onMenuToggle={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto relative flex flex-col">
          {/* Subtle background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 pointer-events-none" />
          
          <div className="p-4 md:p-8 w-full max-w-7xl mx-auto relative z-0 flex-1">
            <Outlet />
          </div>
          
          <Footer />
        </main>
      </div>
    </div>
  );
};
