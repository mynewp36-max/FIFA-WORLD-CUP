import React from 'react';
import { Card } from '../../Card';
import { Input } from '../../Input';
import { User, Camera } from 'lucide-react';
import type { UserSettings } from '../../../types/settings';

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
