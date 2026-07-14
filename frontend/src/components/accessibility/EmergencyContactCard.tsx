import React from 'react';
import { Card } from '../Card';
import { Phone } from 'lucide-react';
import type { EmergencyContact } from '../../types/accessibility';
import { flattenObject } from '../../utils/normalizers';

interface EmergencyContactCardProps {
  dynamicContacts?: EmergencyContact[];
}

const FALLBACK_CONTACTS = [
  { name: 'Stadium Medical Center', phone: '+1 800 FIFA MED' },
  { name: 'Accessibility Help Desk', phone: '+1 800 ACCESS 1' },
  { name: 'Security Control Room', phone: '+1 800 STADIUM' },
];

export const EmergencyContactCard: React.FC<EmergencyContactCardProps> = ({ dynamicContacts }) => {
  const contacts = (dynamicContacts && dynamicContacts.length > 0) ? dynamicContacts : FALLBACK_CONTACTS;

  return (
    <Card elevation="low" className="border-l-4 border-error" role="complementary" aria-label="Emergency contacts">
      <h4 className="font-semibold text-error mb-4 flex items-center gap-2">
        <Phone size={18} aria-hidden="true" /> Emergency Contacts
      </h4>
      <ul className="space-y-3">
        {contacts.map((c, i) => {
          const name = flattenObject(c.name || c);
          const phone = flattenObject(c.phone || '+1 800 CONTACT');
          
          return (
            <li key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle/30 pb-2 last:border-0 last:pb-0">
              <span className="text-sm text-text-main font-medium">{name}</span>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="text-sm font-mono text-brand-primary hover:underline focus:outline-none focus:ring-2 focus:ring-brand-primary rounded px-1 shrink-0"
                aria-label={`Call ${name}: ${phone}`}
              >
                {phone}
              </a>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
