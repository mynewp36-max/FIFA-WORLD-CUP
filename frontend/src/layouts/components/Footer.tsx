import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 border-t border-border-subtle bg-bg-base/50 text-center text-sm text-text-muted">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <p>&copy; {new Date().getFullYear()} FIFA World Cup 2026 AI Stadium OS. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Contact Support</a>
        </div>
      </div>
    </footer>
  );
};
