import React from 'react';
import { Card } from '../Card';
import { Users, Car, Accessibility } from 'lucide-react';

interface StatusOverviewCardsProps {
  crowdOverview: string;
  transportOverview: string;
  accessibilityOverview: string;
}

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  accentClass: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ icon, title, text, accentClass }) => (
  <Card elevation="low" className={`border-t-2 ${accentClass}`} role="region" aria-label={title}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 rounded-lg bg-opacity-20 ${accentClass.replace('border-', 'bg-').replace('-500', '-500/20')}`}>
        {icon}
      </div>
      <h4 className="font-semibold text-text-main text-sm">{title}</h4>
    </div>
    <p className="text-text-muted text-sm leading-relaxed">{text}</p>
  </Card>
);

export const StatusOverviewCards: React.FC<StatusOverviewCardsProps> = React.memo(({
  crowdOverview, transportOverview, accessibilityOverview
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <OverviewCard
      icon={<Users size={18} className="text-warning" />}
      title="Crowd Status"
      text={crowdOverview}
      accentClass="border-warning"
    />
    <OverviewCard
      icon={<Car size={18} className="text-info" />}
      title="Transport Status"
      text={transportOverview}
      accentClass="border-info"
    />
    <OverviewCard
      icon={<Accessibility size={18} className="text-success" />}
      title="Accessibility Status"
      text={accessibilityOverview}
      accentClass="border-success"
    />
  </div>
));
StatusOverviewCards.displayName = 'StatusOverviewCards';
