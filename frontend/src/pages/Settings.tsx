import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Settings as SettingsIcon } from 'lucide-react';
import { useToast } from '../providers/ToastProvider';
import { useSettings } from '../hooks/useSettings';
import type { UserSettings } from '../types/settings';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Import subcomponents
import { 
  ProfileSection, 
  AppearanceLanguageSection, 
  NotificationsSection, 
  AccessibilitySection, 
  PrivacySection, 
  EmergencyContactsSection 
} from '../components/settings/SettingsSections';

export const Settings: React.FC = () => {
  const { showToast } = useToast();
  const { settings: savedSettings, isLoaded, saveSettings } = useSettings();
  
  const [localSettings, setLocalSettings] = useState<UserSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setLocalSettings(savedSettings);
    }
  }, [isLoaded, savedSettings]);

  if (!isLoaded || !localSettings) {
    return (
      <div className="flex items-center justify-center h-64 text-text-muted animate-pulse">
        Loading settings...
      </div>
    );
  }

  const handleSave = async () => {
    // Validation
    if (!localSettings.profile.name.trim() || !localSettings.profile.email.trim()) {
      showToast('Name and email are required.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await saveSettings(localSettings);
      showToast('Settings saved successfully!', 'success');
    } catch (e) {
      showToast('Failed to save settings. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300 pb-12">
        <header className="mb-6 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-primary/20 text-brand-primary rounded-xl">
              <SettingsIcon size={28} />
            </div>
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="min-w-[140px] flex justify-center">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ProfileSection 
              profile={localSettings.profile} 
              onChange={profile => setLocalSettings({ ...localSettings, profile })} 
            />
            
            <AppearanceLanguageSection 
              appearance={localSettings.appearance} 
              language={localSettings.language} 
              onChangeAppearance={appearance => setLocalSettings({ ...localSettings, appearance })} 
              onChangeLanguage={language => setLocalSettings({ ...localSettings, language })} 
            />
            
            <EmergencyContactsSection 
              contacts={localSettings.emergencyContacts} 
              onChange={emergencyContacts => setLocalSettings({ ...localSettings, emergencyContacts })} 
            />
          </div>

          <div className="space-y-6">
            <NotificationsSection 
              notifications={localSettings.notifications} 
              onChange={notifications => setLocalSettings({ ...localSettings, notifications })} 
            />
            
            <AccessibilitySection 
              accessibility={localSettings.accessibility} 
              onChange={accessibility => setLocalSettings({ ...localSettings, accessibility })} 
            />
            
            <PrivacySection 
              privacy={localSettings.privacy} 
              onChange={privacy => setLocalSettings({ ...localSettings, privacy })} 
            />
          </div>
        </div>
        
        {/* Sticky save bar for mobile */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg-base/90 backdrop-blur border-t border-border-subtle flex justify-end lg:hidden z-50">
           <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
             {isSaving ? 'Saving...' : 'Save Changes'}
           </Button>
        </div>
      </div>
    </ErrorBoundary>
  );
};
