import React from 'react';
import { Button } from '../Button';
import { Play, RefreshCw, Share2, Bookmark } from 'lucide-react';

export const RouteActions: React.FC<{ onRecalculate: () => void }> = ({ onRecalculate }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 flex items-center justify-center gap-2">
        <Play size={16} /> Start
      </Button>
      <Button variant="secondary" onClick={onRecalculate} className="w-full flex items-center justify-center gap-2">
        <RefreshCw size={16} /> Recalculate
      </Button>
      <Button variant="ghost" className="w-full flex items-center justify-center gap-2 border border-border-subtle hover:bg-bg-elevated">
        <Share2 size={16} /> Share
      </Button>
      <Button variant="ghost" className="w-full flex items-center justify-center gap-2 border border-border-subtle hover:bg-bg-elevated">
        <Bookmark size={16} /> Save
      </Button>
    </div>
  );
};
