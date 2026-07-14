import React from 'react';
import { X, Moon, Sun, Globe } from 'lucide-react';
import { useToast } from '../../providers/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { useSettingsContext } from '../../contexts/SettingsContext';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { theme, setTheme, language, setLanguage } = useSettingsContext();
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-bg-base/60 backdrop-blur-sm z-40" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-80 bg-bg-surface border-l border-border-subtle shadow-premium z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
      <div className="flex items-center justify-between p-6 border-b border-border-subtle">
        <h2 className="text-xl font-semibold text-text-main">Settings</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-bg-elevated text-text-muted hover:text-text-main transition-colors">
          <X size={20} />
        </button>
      </div>
      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text-muted mb-4 uppercase tracking-wider">Appearance</h3>
          <div className="space-y-3">
            <button onClick={() => setTheme('dark')} className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-bg-elevated border-brand-primary/50 text-text-main' : 'bg-transparent border-transparent text-text-muted hover:text-text-main hover:bg-bg-elevated'}`}>
              <div className="flex items-center gap-3"><Moon size={18} /> Dark Theme</div>
              {theme === 'dark' && <div className="w-4 h-4 rounded-full bg-brand-primary"></div>}
            </button>
            <button onClick={() => setTheme('light')} className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${theme === 'light' ? 'bg-bg-elevated border-brand-primary/50 text-text-main' : 'bg-transparent border-transparent text-text-muted hover:text-text-main hover:bg-bg-elevated'}`}>
              <div className="flex items-center gap-3"><Sun size={18} /> Light Theme</div>
              {theme === 'light' && <div className="w-4 h-4 rounded-full bg-brand-primary"></div>}
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-muted mb-4 uppercase tracking-wider">Language</h3>
          <button onClick={() => {
            const nextLang = language === 'English' ? 'Spanish' : 'English';
            setLanguage(nextLang);
            showToast(`Language set to ${nextLang}`, 'success');
          }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-bg-elevated text-text-main transition-colors">
            <Globe size={18} /> {language}
          </button>
        </div>
        <div className="pt-6 border-t border-border-subtle">
          <Button 
            onClick={() => {
              onClose();
              navigate('/settings');
            }}
            variant="secondary"
            className="w-full justify-center"
          >
            Advanced Settings
          </Button>
        </div>
      </div>
    </div >
    </>
  );
};
