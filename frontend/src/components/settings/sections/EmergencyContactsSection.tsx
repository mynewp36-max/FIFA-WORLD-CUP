import React, { useState } from 'react';
import { Card } from '../../Card';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Phone, Plus, Trash2 } from 'lucide-react';
import type { EmergencyContact } from '../../../types/settings';

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
