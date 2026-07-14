import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { Card } from '../Card';
import type {  UserRole  } from '../../types/transport';
import { MapPin, Users } from 'lucide-react';

const ROLES: UserRole[] = ['Fan', 'Volunteer', 'Organizer', 'Staff', 'VIP', 'Family', 'International'];

interface TransportSearchCardProps {
  currentLocation: string;
  setCurrentLocation: (v: string) => void;
  destination: string;
  setDestination: (v: string) => void;
  userRole: UserRole;
  setUserRole: (v: UserRole) => void;
  groupSize: number;
  setGroupSize: (v: number) => void;
  wheelchair: boolean;
  setWheelchair: (v: boolean) => void;
  avoidCrowd: boolean;
  setAvoidCrowd: (v: boolean) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const TransportSearchCard: React.FC<TransportSearchCardProps> = ({
  currentLocation, setCurrentLocation,
  destination, setDestination,
  userRole, setUserRole,
  groupSize, setGroupSize,
  wheelchair, setWheelchair,
  avoidCrowd, setAvoidCrowd,
  onSearch, isLoading,
}) => {
  const canSearch = currentLocation.trim() && destination.trim() && !isLoading;

  return (
    <Card className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold text-text-main flex items-center gap-2">
        <MapPin size={20} className="text-brand-primary" />
        Transport Planner
      </h3>

      <Input label="Current Location" placeholder="e.g. Gate B, Parking Zone 3"
        value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} />

      <Input label="Destination" placeholder="e.g. Downtown, Airport, Hotel"
        value={destination} onChange={(e) => setDestination(e.target.value)} />

      {/* Role Selector */}
      <div>
        <p className="text-sm font-medium text-text-muted mb-2">Visitor Type</p>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <button key={r} onClick={() => setUserRole(r)} aria-pressed={userRole === r}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${userRole === r ? 'bg-brand-primary/20 border-brand-primary text-brand-primary' : 'bg-bg-elevated border-border-subtle text-text-muted hover:text-text-main'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Group Size */}
      <div className="flex items-center gap-4">
        <Users size={18} className="text-text-muted" aria-hidden="true" />
        <label htmlFor="group-size" className="text-sm text-text-muted shrink-0">Group Size</label>
        <input id="group-size" type="number" min={1} max={50} value={groupSize}
          onChange={(e) => setGroupSize(Number(e.target.value))}
          className="w-20 bg-bg-elevated border border-border-subtle text-text-main rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary"
          aria-label="Number of people in your group" />
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        {[
          { label: '♿ Wheelchair / Accessibility', value: wheelchair, toggle: () => setWheelchair(!wheelchair) },
          { label: '🚶 Avoid Crowds', value: avoidCrowd, toggle: () => setAvoidCrowd(!avoidCrowd) },
        ].map(({ label, value, toggle }) => (
          <button key={label} role="switch" aria-checked={value} onClick={toggle}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${value ? 'bg-brand-primary/20 border-brand-primary text-brand-primary' : 'bg-bg-elevated border-border-subtle text-text-muted hover:text-text-main'}`}>
            <span>{label}</span>
            <span className={`w-10 h-5 rounded-full flex items-center transition-colors ${value ? 'bg-brand-primary' : 'bg-bg-base'}`}>
              <span className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
            </span>
          </button>
        ))}
      </div>

      <Button className="w-full" onClick={onSearch} disabled={!canSearch} aria-label="Get transport recommendation">
        {isLoading ? 'Planning Route...' : 'Plan My Journey'}
      </Button>
    </Card>
  );
};
