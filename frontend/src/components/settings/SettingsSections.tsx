import React, { useState } from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { User, Bell, Shield, Phone, Accessibility, Globe, Plus, Trash2, Camera } from 'lucide-react';
import type { UserSettings, EmergencyContact } from '../../types/settings';

// --- Profile ---
export const ProfileSection: React.FC<{
  profile: UserSettings['profile'];
  onChange: (profile: UserSettings['profile']) => void;
}> = ({ profile, onChange }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4 border-b border-border-subtle pb-3">
        <User size={20} className="text-brand-primary" /> Profile
      </h3>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="shrink-0 flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-bg-surface border-2 border-border-subtle flex items-center justify-center relative overflow-hidden group">
            {profile.avatar ? (
               <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <User size={40} className="text-text-muted" />
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          <span className="text-xs text-text-muted">Edit Avatar</span>
        </div>
        <div className="flex-1 w-full space-y-4">
          <Input 
            label="Full Name" 
            value={profile.name} 
            onChange={e => onChange({ ...profile, name: e.target.value })} 
          />
          <Input 
            label="Email Address" 
            type="email" 
            value={profile.email} 
            onChange={e => onChange({ ...profile, email: e.target.value })} 
          />
        </div>
      </div>
    </Card>
  );
};

// --- Appearance & Language ---
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

// --- Notifications ---
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

// --- Accessibility ---
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

// --- Privacy ---
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

// --- Emergency Contacts ---
export const EmergencyContactsSection: React.FC<{
  contacts: EmergencyContact[];
  onChange: (c: EmergencyContact[]) => void;
}> = ({ contacts, onChange }) => {
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });
  const [error, setError] = useState('');

  const handleAdd = () => {
    setError('');
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      setError('Name and phone number are required.');
      return;
    }
    if (contacts.some(c => c.phone.trim() === newContact.phone.trim())) {
      setError('This phone number is already an emergency contact.');
      return;
    }

    const contact: EmergencyContact = {
      id: Date.now().toString(),
      name: newContact.name.trim(),
      phone: newContact.phone.trim(),
      relation: newContact.relation.trim()
    };
    
    onChange([...contacts, contact]);
    setNewContact({ name: '', phone: '', relation: '' });
  };

  const handleRemove = (id: string) => {
    onChange(contacts.filter(c => c.id !== id));
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4 border-b border-border-subtle pb-3">
        <Phone size={20} className="text-error" /> Emergency Contacts
      </h3>
      
      {/* Existing Contacts */}
      <div className="space-y-3 mb-6">
        {contacts.length === 0 ? (
          <div className="p-4 border border-dashed border-border-subtle rounded-xl text-center">
            <p className="text-sm text-text-muted">No emergency contacts added yet.</p>
          </div>
        ) : (
          contacts.map(c => (
            <div key={c.id} className="flex items-center justify-between p-3 bg-bg-surface border border-border-subtle rounded-xl">
              <div>
                <p className="text-sm font-medium text-text-main">{c.name}</p>
                <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                  <span className="font-mono">{c.phone}</span>
                  {c.relation && (
                    <>
                      <span>•</span>
                      <span>{c.relation}</span>
                    </>
                  )}
                </div>
              </div>
              <button 
                onClick={() => handleRemove(c.id)}
                className="p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                aria-label="Remove contact"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add New Contact Form */}
      <div className="bg-bg-elevated/50 p-4 rounded-xl border border-border-subtle space-y-4">
        <h4 className="text-sm font-medium text-text-main flex items-center gap-2">
          <Plus size={16} /> Add Contact
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input 
            label="Name" 
            placeholder="e.g. Jane Doe" 
            value={newContact.name} 
            onChange={e => setNewContact({...newContact, name: e.target.value})} 
          />
          <Input 
            label="Phone Number" 
            placeholder="e.g. +1 555-0123" 
            value={newContact.phone} 
            onChange={e => setNewContact({...newContact, phone: e.target.value})} 
          />
        </div>
        <Input 
          label="Relation (Optional)" 
          placeholder="e.g. Spouse, Parent" 
          value={newContact.relation} 
          onChange={e => setNewContact({...newContact, relation: e.target.value})} 
        />
        {error && <p className="text-xs text-error mt-1">{error}</p>}
        <div className="flex justify-end pt-2">
          <Button variant="secondary" onClick={handleAdd} className="text-sm">
            Add Contact
          </Button>
        </div>
      </div>
    </Card>
  );
};
