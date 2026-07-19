import React from 'react';
import { Card } from '../../Card';
import { Bell } from 'lucide-react';
import type { UserSettings } from '../../../types/settings';

export const NotificationsSection: React.FC<{
  notifications: UserSettings['notifications'];
  onChange: (n: UserSettings['notifications']) => void;
}> = ({ notifications, onChange }) => {
  const Toggle = ({ label, checked, onChangeKey }: { label: string, checked: boolean, onChangeKey: keyof UserSettings['notifications'] }) => (
    <div className="flex items-center justify-between p-3 bg-bg-surface rounded-xl border border-border-subtle">
      <span className="text-sm text-text-main">{label}</span>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={e => onChange({ ...notifications, [onChangeKey]: e.target.checked })} 
        className="w-5 h-5 accent-brand-primary rounded" 
      />
    </div>
  );

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4 border-b border-border-subtle pb-3">
        <Bell size={20} className="text-warning" /> Notifications
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Toggle label="Match Alerts" checked={notifications.matchAlerts} onChangeKey="matchAlerts" />
        <Toggle label="Emergency Alerts" checked={notifications.emergencyAlerts} onChangeKey="emergencyAlerts" />
        <Toggle label="Transportation Updates" checked={notifications.transportUpdates} onChangeKey="transportUpdates" />
        <Toggle label="Crowd Alerts" checked={notifications.crowdAlerts} onChangeKey="crowdAlerts" />
        <Toggle label="AI Recommendations" checked={notifications.aiRecommendations} onChangeKey="aiRecommendations" />
      </div>
    </Card>
  );
};
