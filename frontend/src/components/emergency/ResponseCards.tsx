import React, { useState } from 'react';
import { Card } from '../Card';
import { ShieldCheck, Megaphone, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';
import { flattenObject } from '../../utils/normalizers';

interface SafetyGuidanceCardProps {
  guidance: string[];
}

interface CommunicationMessageCardProps {
  message: string;
}

export const SafetyGuidanceCard: React.FC<SafetyGuidanceCardProps> = ({ guidance }) => {
  if (!guidance || guidance.length === 0) return null;

  return (
    <Card elevation="low" className="border-l-4 border-success" role="region" aria-label="Safety guidance">
      <h4 className="font-semibold text-text-main flex items-center gap-2 mb-4">
        <ShieldCheck size={18} className="text-success" aria-hidden="true" />
        Safety Guidance
      </h4>
      <ul className="space-y-3">
        {guidance.map((tipObj, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
            <span className="text-success font-bold shrink-0 mt-0.5" aria-hidden="true">✓</span>
            {flattenObject(tipObj)}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export const CommunicationMessageCard: React.FC<CommunicationMessageCardProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!message) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card elevation="low" className="border-l-4 border-info flex flex-col h-full" role="region" aria-label="Communication message for PA announcement">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-text-main flex items-center gap-2">
          <Megaphone size={18} className="text-info" aria-hidden="true" />
          PA Announcement
          <span className="text-xs text-text-muted font-normal">(Ready to broadcast)</span>
        </h4>
        <div className="flex items-center gap-2">
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 text-text-muted hover:text-white bg-bg-surface rounded transition-colors" title={expanded ? "Collapse" : "Expand"}>
            {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button onClick={handleCopy} className="p-1.5 text-text-muted hover:text-white bg-bg-surface rounded transition-colors" title="Copy to clipboard">
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <blockquote className={`bg-info/10 border border-info/30 rounded-xl px-4 py-3 text-text-main text-sm leading-relaxed italic whitespace-pre-wrap flex-1 ${!expanded && 'line-clamp-4'}`}>
        "{message}"
      </blockquote>
    </Card>
  );
};
