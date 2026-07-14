import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { flattenObject } from '../../utils/normalizers';
import type { FacilityItem, SeatingItem, MedicalItem, ServiceItem } from '../../types/accessibility';

interface FacilityListCardProps {
  title: string;
  icon: string;
  items: unknown[];
  accentClass?: string;
  type: 'facility' | 'seating' | 'medical' | 'service';
}

const FacilityListCard: React.FC<FacilityListCardProps> = React.memo(({ title, icon, items, accentClass = 'border-brand-primary', type }) => {
  if (!items || items.length === 0) return null;

  return (
    <Card elevation="low" className={`border-l-4 ${accentClass}`} role="region" aria-label={title}>
      <h4 className="font-semibold text-text-main mb-3 flex items-center gap-2 text-base">
        <span aria-hidden="true">{icon}</span> {title}
      </h4>
      <ul className="space-y-3" aria-label={`${title} list`}>
        {items.map((item, i) => {
          let primary = '';
          let secondary = '';
          let badgeText = '';

          if (type === 'facility') {
            const f = item as FacilityItem;
            primary = flattenObject(f.location || f);
            badgeText = flattenObject(f.status || '');
          } else if (type === 'seating') {
            const s = item as SeatingItem;
            primary = flattenObject(s.section || s);
            badgeText = flattenObject(s.status || '');
            secondary = flattenObject(s.capacity || '');
          } else if (type === 'medical') {
            const m = item as MedicalItem;
            primary = flattenObject(m.location || m);
            secondary = flattenObject(m.services || '');
          } else if (type === 'service') {
            const s = item as ServiceItem;
            primary = flattenObject(s.serviceName || s);
            secondary = flattenObject(s.description || '');
          }

          return (
            <li key={i} className="text-sm text-text-main flex items-start gap-2 border-b border-border-subtle/50 pb-2 last:border-0 last:pb-0">
              <span className="text-brand-primary mt-0.5 shrink-0" aria-hidden="true">›</span>
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-medium">{primary}</span>
                  {badgeText && (
                    <Badge variant={badgeText.toLowerCase().includes('available') ? 'success' : 'info'} className="text-[10px] py-0 px-1.5 shrink-0">
                      {badgeText}
                    </Badge>
                  )}
                </div>
                {secondary && <p className="text-xs text-text-muted mt-1">{secondary}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
});
FacilityListCard.displayName = 'FacilityListCard';

interface FacilityCardsProps {
  entrances: FacilityItem[];
  elevators: FacilityItem[];
  ramps: FacilityItem[];
  restrooms: FacilityItem[];
  seating: SeatingItem[];
  medical: MedicalItem[];
  services: ServiceItem[];
}

export const FacilityCards: React.FC<FacilityCardsProps> = React.memo(({
  entrances,
  elevators,
  ramps,
  restrooms,
  seating,
  medical,
  services
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FacilityListCard type="facility" title="Accessible Entrances" icon="🚪" items={entrances} accentClass="border-info" />
      <FacilityListCard type="facility" title="Elevators" icon="🛗" items={elevators} accentClass="border-brand-primary" />
      <FacilityListCard type="facility" title="Ramps" icon="♿" items={ramps} accentClass="border-brand-secondary" />
      <FacilityListCard type="facility" title="Accessible Restrooms" icon="🚻" items={restrooms} accentClass="border-success" />
      <FacilityListCard type="seating" title="Accessible Seating" icon="🪑" items={seating} accentClass="border-warning" />
      <FacilityListCard type="medical" title="Medical Support" icon="🏥" items={medical} accentClass="border-error" />
      <FacilityListCard type="service" title="Accessibility Services" icon="🤝" items={services} accentClass="border-info" />
    </div>
  );
});
FacilityCards.displayName = 'FacilityCards';
