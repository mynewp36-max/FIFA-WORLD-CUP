import React, { useState } from 'react';
import { Card } from '../components/Card';
import { useToast } from '../providers/ToastProvider';
import { Users, TrendingUp, AlertTriangle, ShieldCheck, Clock, Map, Activity, Zap, BarChart3, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export const CrowdIntelligence: React.FC = () => {
  const { showToast } = useToast();
  const [activeSector, setActiveSector] = useState('North Plaza');

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl">
            <Users size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white">Crowd Intelligence</h1>
        </div>
        <Badge variant="success" className="animate-pulse">Live Tracking Active</Badge>
      </header>

      {/* Top Overview KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card elevation="low" className="p-4 border-l-2 border-brand-primary">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Est. Crowd</h3>
            <Users size={16} className="text-brand-primary" />
          </div>
          <p className="text-2xl font-black text-white">42,500</p>
          <p className="text-xs text-brand-primary mt-1 flex items-center gap-1"><TrendingUp size={12} /> +2,100 past 15m</p>
        </Card>
        
        <Card elevation="low" className="p-4 border-l-2 border-warning">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Overall Density</h3>
            <Activity size={16} className="text-warning" />
          </div>
          <p className="text-2xl font-black text-white">68%</p>
          <p className="text-xs text-text-muted mt-1">Moderate Congestion</p>
        </Card>

        <Card elevation="low" className="p-4 border-l-2 border-error">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Peak Risk Area</h3>
            <AlertTriangle size={16} className="text-error" />
          </div>
          <p className="text-2xl font-black text-white">Gate A</p>
          <p className="text-xs text-error mt-1">Avoid if possible</p>
        </Card>

        <Card elevation="low" className="p-4 border-l-2 border-success">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">AI Confidence</h3>
            <ShieldCheck size={16} className="text-success" />
          </div>
          <p className="text-2xl font-black text-white">96%</p>
          <p className="text-xs text-success mt-1">Based on 14k sensors</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Heatmap & Sectors */}
        <div className="lg:col-span-2 space-y-6">
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                <Map size={20} className="text-brand-primary" /> Live Sector Heatmap
              </h3>
              <div className="flex gap-2">
                <Badge variant="error">High</Badge>
                <Badge variant="warning">Med</Badge>
                <Badge variant="success">Low</Badge>
              </div>
            </div>

            {/* Mock Visual Heatmap using Tailwind Grid/Gradients */}
            <div className="relative aspect-video bg-bg-base/50 rounded-xl overflow-hidden border border-border-subtle p-4">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
              
              <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full relative z-10">
                <div onClick={() => setActiveSector('North Plaza')} className={`rounded-lg cursor-pointer transition-all border ${activeSector === 'North Plaza' ? 'border-brand-primary border-2 scale-[1.02]' : 'border-transparent'} bg-gradient-to-br from-warning/40 to-warning/10 flex items-center justify-center relative overflow-hidden group`}>
                  <div className="absolute inset-0 bg-warning/20 animate-pulse"></div>
                  <span className="font-bold text-white relative z-10 shadow-sm drop-shadow-md">North Plaza (74%)</span>
                </div>
                
                <div onClick={() => setActiveSector('Gate A')} className={`rounded-lg cursor-pointer transition-all border ${activeSector === 'Gate A' ? 'border-brand-primary border-2 scale-[1.02]' : 'border-transparent'} bg-gradient-to-br from-error/60 to-error/20 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-error/30 animate-pulse" style={{ animationDuration: '1.5s'}}></div>
                  <span className="font-bold text-white relative z-10 shadow-sm drop-shadow-md">Gate A (92%)</span>
                </div>
                
                <div onClick={() => setActiveSector('East Concourse')} className={`rounded-lg cursor-pointer transition-all border ${activeSector === 'East Concourse' ? 'border-brand-primary border-2 scale-[1.02]' : 'border-transparent'} bg-gradient-to-br from-success/40 to-success/10 flex items-center justify-center`}>
                   <span className="font-bold text-white shadow-sm drop-shadow-md">East Concourse (31%)</span>
                </div>

                <div className="col-span-3 row-span-2 rounded-lg border-2 border-dashed border-border-strong flex flex-col items-center justify-center bg-bg-surface/20">
                  <div className="text-4xl font-black text-brand-primary/20 uppercase tracking-widest">Pitch</div>
                  <div className="text-xs text-text-muted mt-2">Inner Bowl Status: 45% Capacity</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Predictive AI Trend Graph Mock */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                <BarChart3 size={20} className="text-brand-secondary" /> Flow Prediction (Next 2 Hrs)
              </h3>
            </div>
            <div className="h-48 flex items-end justify-between gap-2 px-2 mt-4 border-b border-border-subtle pb-2 relative">
               <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-error/50 z-0"></div>
               <span className="absolute top-1/2 -mt-5 right-0 text-[10px] text-error font-bold tracking-wider">CRITICAL CAPACITY</span>
               
               {/* Mock bars */}
               {[30, 45, 60, 75, 90, 85, 70, 50].map((h, i) => (
                 <div key={i} className="w-full bg-bg-base/50 rounded-t-sm relative z-10 group h-full flex items-end">
                   <div 
                     className={`w-full rounded-t-sm transition-all duration-1000 ease-out ${h > 80 ? 'bg-error' : h > 60 ? 'bg-warning' : 'bg-brand-primary'}`} 
                     style={{ height: `${h}%` }}
                   >
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-bg-elevated px-2 py-1 rounded text-xs text-white font-bold transition-opacity whitespace-nowrap">
                       {h}% Density
                     </div>
                   </div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between text-xs text-text-muted mt-2 px-2 font-mono">
              <span>Now</span>
              <span>+30m</span>
              <span>+60m</span>
              <span>+90m</span>
              <span>+120m</span>
            </div>
          </Card>

        </div>

        {/* Right Column - AI Insights & Selected Sector */}
        <div className="space-y-6">
          
          {/* Active Sector Drilldown */}
          <Card className="border-t-4 border-t-brand-primary">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-brand-primary font-bold uppercase tracking-wider mb-1">Sector Analysis</p>
                <h3 className="text-xl font-bold text-white">{activeSector}</h3>
              </div>
              <Badge variant={activeSector === 'Gate A' ? 'error' : activeSector === 'North Plaza' ? 'warning' : 'success'}>
                {activeSector === 'Gate A' ? 'Critical' : activeSector === 'North Plaza' ? 'Heavy' : 'Clear'}
              </Badge>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
                <span className="text-sm text-text-muted flex items-center gap-2"><Users size={14} /> Density Level</span>
                <span className="text-sm font-bold text-white">{activeSector === 'Gate A' ? '92%' : activeSector === 'North Plaza' ? '74%' : '31%'}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
                <span className="text-sm text-text-muted flex items-center gap-2"><Clock size={14} /> Est. Queue Time</span>
                <span className="text-sm font-bold text-white">{activeSector === 'Gate A' ? '28 mins' : activeSector === 'North Plaza' ? '12 mins' : '3 mins'}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
                <span className="text-sm text-text-muted flex items-center gap-2"><Activity size={14} /> Peak Prediction</span>
                <span className="text-sm font-bold text-white">{activeSector === 'Gate A' ? 'Occurring Now' : 'In 45 mins'}</span>
              </div>
            </div>

            <Button onClick={() => showToast(`Opening cameras for ${activeSector}`)} className="w-full flex items-center justify-between" variant="secondary">
              View Live Camera <ChevronRight size={16} />
            </Button>
          </Card>

          {/* AI Strategic Recommendation */}
          <Card className="bg-gradient-to-br from-brand-primary/10 to-transparent border-brand-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={20} className="text-brand-primary animate-pulse" />
              <h3 className="font-bold text-white">AI Strategy</h3>
            </div>
            {activeSector === 'Gate A' ? (
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Gate A is currently exceeding safety thresholds. <strong className="text-error">Divert incoming pedestrian traffic</strong> to Gate B and C. Deploy rapid response crowd management team to sector A2 to prevent bottlenecking at the turnstiles.
              </p>
            ) : activeSector === 'North Plaza' ? (
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Crowd is building up steadily. Consider opening overflow concession stands in the East Concourse to distribute density naturally before the 17:30 peak.
              </p>
            ) : (
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Sector is currently clear and operating below 40% capacity. Ideal candidate for routing diverted traffic from congested zones.
              </p>
            )}
            
            <div className="space-y-2">
              <Button onClick={() => showToast('Action Dispatched')} size="sm" className="w-full bg-brand-primary text-white border-none">
                Execute AI Recommendation
              </Button>
              {activeSector === 'Gate A' && (
                <Button onClick={() => showToast('Alternative routes broadcasted via push notification')} size="sm" variant="secondary" className="w-full text-brand-secondary">
                  Broadcast Alternative Route
                </Button>
              )}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};
