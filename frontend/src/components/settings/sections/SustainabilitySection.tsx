import React from 'react';
import { Card } from '../../Card';
import { Globe } from 'lucide-react';
import type { UserSettings } from '../../../types/settings';

export const SustainabilitySection: React.FC<{
  sustainability: UserSettings['sustainability'];
  onChange: (s: UserSettings['sustainability']) => void;
}> = ({ sustainability, onChange }) => {
  const Toggle = ({ label, checked, onChangeKey }: { label: string, checked: boolean, onChangeKey: keyof UserSettings['sustainability'] }) => (
    <div className="flex items-center justify-between p-3 bg-bg-surface rounded-xl border border-border-subtle">
      <span className="text-sm text-text-main">{label}</span>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={e => onChange({ ...sustainability, [onChangeKey]: e.target.checked })} 
        className="w-5 h-5 accent-brand-primary rounded" 
      />
    </div>
  );

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4 border-b border-border-subtle pb-3">
        <Globe size={20} className="text-success" /> Sustainability
      </h3>
      <div className="space-y-4">
        <p className="text-xs text-text-muted mt-2">
          Prioritize low-carbon transport, eco-friendly navigation, and display carbon footprint estimations during your journey.
        </p>
        <div className="grid grid-cols-1 gap-3 pt-2">
          <Toggle label="Eco-Friendly AI Routing" checked={sustainability.ecoFriendly} onChangeKey="ecoFriendly" />
        </div>
      </div>
    </Card>
  );
};
