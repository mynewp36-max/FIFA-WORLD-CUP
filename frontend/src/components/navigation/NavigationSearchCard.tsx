import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Input } from '../Input';
import type {  NavigationRequest  } from '../../types/navigation';
import { MapPin, Search } from 'lucide-react';

interface NavigationSearchCardProps {
  onSearch: (request: NavigationRequest) => void;
  isLoading: boolean;
}

export const NavigationSearchCard: React.FC<NavigationSearchCardProps> = ({ onSearch, isLoading }) => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');

  const handleSearch = () => {
    if (!currentLocation.trim() || !destination.trim()) return;
    
    onSearch({
      currentLocation,
      destination,
      stadium: 'MetLife Stadium',
      userRole: 'Fan',
      wheelchair: false,
      avoidCrowd: false,
      language: 'English'
    });
  };

  return (
    <Card className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-text-main flex items-center gap-2">
        <Search size={20} className="text-brand-primary" />
        Find Your Way
      </h3>
      
      <div className="space-y-4">
        <div className="relative">
          <Input 
            label="Current Location" 
            placeholder="e.g. Gate B, Section 102" 
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
          />
          <MapPin size={16} className="absolute right-4 top-[38px] text-text-muted" />
        </div>
        
        <div className="relative">
          <Input 
            label="Destination" 
            placeholder="e.g. Restroom, Seat C45" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <MapPin size={16} className="absolute right-4 top-[38px] text-brand-primary" />
        </div>
        
        <Button 
          className="w-full mt-2" 
          onClick={handleSearch} 
          disabled={isLoading || !currentLocation.trim() || !destination.trim()}
        >
          {isLoading ? 'Calculating Route...' : 'Get Route'}
        </Button>
      </div>
    </Card>
  );
};
