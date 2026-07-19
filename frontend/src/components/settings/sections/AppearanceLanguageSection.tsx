import React from 'react';
import { Card } from '../../Card';
import { Globe } from 'lucide-react';
import type { UserSettings } from '../../../types/settings';

export const AppearanceLanguageSection: React.FC<{
  appearance: UserSettings['appearance'];
  language: UserSettings['language'];
  onChangeAppearance: (app: UserSettings['appearance']) => void;
  onChangeLanguage: (lang: UserSettings['language']) => void;
}> = ({ appearance, language, onChangeAppearance, onChangeLanguage }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4 border-b border-border-subtle pb-3">
        <Globe size={20} className="text-info" /> Appearance & Language
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Theme</p>
          <select 
            className="w-full bg-bg-elevated border border-border-subtle text-text-main rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-primary transition-shadow"
            value={appearance.theme} 
            onChange={e => onChangeAppearance({ ...appearance, theme: e.target.value as 'System' | 'Dark' | 'Light' })}>
            <option value="Dark">Dark Mode</option>
            <option value="Light">Light Mode</option>
            <option value="System">System Default</option>
          </select>
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Language</p>
          <select 
            className="w-full bg-bg-elevated border border-border-subtle text-text-main rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-primary transition-shadow"
            value={language.preferred} 
            onChange={e => onChangeLanguage({ ...language, preferred: e.target.value })}>
            <option value="English">English</option>
            <option value="Spanish">Spanish (Español)</option>
            <option value="French">French (Français)</option>
            <option value="Arabic">Arabic (العربية)</option>
          </select>
        </div>
      </div>
    </Card>
  );
};
