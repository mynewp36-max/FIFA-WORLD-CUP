import React from 'react';
import { Card } from '../../Card';
import { Shield } from 'lucide-react';
import type { UserSettings } from '../../../types/settings';

export const PrivacySection: React.FC<{
  privacy: UserSettings['privacy'];
  onChange: (p: UserSettings['privacy']) => void;
}> = ({ privacy, onChange }) => {
  const Toggle = ({ label, checked, onChangeKey }: { label: string, checked: boolean, onChangeKey: keyof UserSettings['privacy'] }) => (
    <div className="flex items-center justify-between p-3 bg-bg-surface rounded-xl border border-border-subtle">
      <span className="text-sm text-text-main">{label}</span>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={e => onChange({ ...privacy, [onChangeKey]: e.target.checked })} 
        className="w-5 h-5 accent-brand-primary rounded" 
      />
    </div>
  );

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4 border-b border-border-subtle pb-3">
        <Shield size={20} className="text-brand-secondary" /> Privacy
      </h3>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Location Sharing</p>
          <select 
            className="w-full bg-bg-elevated border border-border-subtle text-text-main rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-primary transition-shadow"
            value={privacy.locationSharing} 
            onChange={e => onChange({ ...privacy, locationSharing: e.target.value as 'Always' | 'While Using' | 'Private' })}>
            <option value="Private">Private (GPS Off)</option>
            <option value="While Using">While Using App</option>
            <option value="Always">Always On</option>
          </select>
          <p className="text-xs text-text-muted mt-2">
            Location data is used exclusively to route you efficiently around the stadium.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Toggle label="Analytics" checked={privacy.analytics} onChangeKey="analytics" />
          <Toggle label="Personalization" checked={privacy.personalization} onChangeKey="personalization" />
          <Toggle label="Crash Reports" checked={privacy.crashReports} onChangeKey="crashReports" />
        </div>
      </div>
    </Card>
  );
};
