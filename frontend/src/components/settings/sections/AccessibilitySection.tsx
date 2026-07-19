import React from 'react';
import { Card } from '../../Card';
import { Accessibility } from 'lucide-react';
import type { UserSettings } from '../../../types/settings';

export const AccessibilitySection: React.FC<{
  accessibility: UserSettings['accessibility'];
  onChange: (a: UserSettings['accessibility']) => void;
}> = ({ accessibility, onChange }) => {
  const Toggle = ({ label, checked, onChangeKey }: { label: string, checked: boolean, onChangeKey: keyof UserSettings['accessibility'] }) => (
    <div className="flex items-center justify-between p-3 bg-bg-surface rounded-xl border border-border-subtle">
      <span className="text-sm text-text-main">{label}</span>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={e => onChange({ ...accessibility, [onChangeKey]: e.target.checked })} 
        className="w-5 h-5 accent-brand-primary rounded" 
      />
    </div>
  );

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4 border-b border-border-subtle pb-3">
        <Accessibility size={20} className="text-success" /> Accessibility Preferences
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Toggle label="Wheelchair Accessible Routing" checked={accessibility.wheelchair} onChangeKey="wheelchair" />
        <Toggle label="Visual Assistance" checked={accessibility.visualAssistance} onChangeKey="visualAssistance" />
        <Toggle label="Hearing Assistance" checked={accessibility.hearingAssistance} onChangeKey="hearingAssistance" />
        <Toggle label="High Contrast Mode" checked={accessibility.highContrast} onChangeKey="highContrast" />
        <Toggle label="Large Text" checked={accessibility.largeText} onChangeKey="largeText" />
        <Toggle label="Screen Reader Ready" checked={accessibility.screenReader} onChangeKey="screenReader" />
      </div>
    </Card>
  );
};
