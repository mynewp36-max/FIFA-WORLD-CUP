import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { useToast } from '../providers/ToastProvider';
import { Ticket, QrCode, Clock, CloudRain, Car, Bell, Navigation, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export const FanDashboard: React.FC = () => {
  const { showToast } = useToast();
  const [hasTicket, setHasTicket] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 15, s: 0 });

  // Mock Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!hasTicket) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-primary/20 text-brand-primary rounded-xl">
              <Ticket size={28} />
            </div>
            <h1 className="text-3xl font-bold text-white">Fan Dashboard</h1>
          </div>
          <Button onClick={() => setHasTicket(true)} variant="secondary" size="sm">Mock Load Ticket</Button>
        </header>
        
        <Card className="text-center py-16 border border-dashed border-border-subtle bg-bg-surface/30">
          <EmptyState 
            title="Your FIFA 2026 Journey Awaits"
            description="Link your official FIFA ticket to unlock your personalized stadium companion, live navigation, and exclusive match day insights."
            action={
              <div className="flex gap-4 justify-center mt-4">
                <Button onClick={() => setHasTicket(true)} className="flex items-center gap-2">
                  <QrCode size={18} /> Scan Ticket QR
                </Button>
                <Button onClick={() => setHasTicket(true)} variant="secondary">
                  Login with FIFA ID
                </Button>
              </div>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-primary/20 text-brand-primary rounded-xl">
            <Ticket size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white">Match Day Dashboard</h1>
        </div>
        <Button onClick={() => setHasTicket(false)} variant="ghost" size="sm" className="text-text-muted">Unlink Ticket</Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Core Match Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Digital Ticket Widget */}
          <Card className="relative overflow-hidden border-none shadow-premium p-0 bg-gradient-to-br from-bg-surface to-bg-elevated group">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transition-transform group-hover:scale-110 duration-500">
              <Ticket size={180} />
            </div>
            
            <div className="flex flex-col md:flex-row">
              {/* Ticket details */}
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Badge variant="success" className="mb-3">Verified Official Ticket</Badge>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">USA <span className="text-text-muted mx-2">vs</span> ENG</h2>
                    <p className="text-brand-secondary font-medium">Group Stage • Matchday 4</p>
                  </div>
                  <ShieldCheck size={32} className="text-success hidden md:block" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 bg-bg-base/50 p-4 rounded-xl border border-border-subtle mb-6">
                  <div>
                    <p className="text-xs text-text-muted uppercase mb-1">Gate</p>
                    <p className="font-bold text-lg text-white">B4</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase mb-1">Section</p>
                    <p className="font-bold text-lg text-white">112</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase mb-1">Seat</p>
                    <p className="font-bold text-lg text-white">Row 14, 2B</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => showToast('Navigation starting...')} size="sm" className="flex items-center gap-2">
                    <Navigation size={16} /> Route to Seat
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => showToast('Added to Apple Wallet')}>
                    Add to Wallet
                  </Button>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="bg-white p-8 flex flex-col items-center justify-center border-l border-border-subtle/10 md:w-64">
                <div className="bg-black p-2 rounded-xl mb-3 shadow-lg flex items-center justify-center">
                  <QrCode size={120} className="text-white" />
                </div>
                <p className="text-xs font-mono text-gray-500 font-bold tracking-widest uppercase mt-2">ID: 8A9F-294B</p>
                <p className="text-[10px] text-gray-400 mt-1 text-center font-medium leading-tight">Hold near reader at Gate B4</p>
              </div>
            </div>
          </Card>

          {/* AI Recommendations & Journey */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card elevation="low" className="border-t-4 border-t-brand-primary flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={20} className="text-brand-primary" />
                  <h3 className="font-bold text-lg text-text-main">AI Smart Journey</h3>
                </div>
                <p className="text-sm text-text-muted mb-4">
                  Traffic is building up near Route 3. We recommend taking the NJ Transit train from Penn Station to arrive comfortably before kickoff.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-gray-300">Leave home by 3:45 PM</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-warning"></div>
                    <span className="text-gray-300">Train departs 4:10 PM</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm opacity-50">
                    <div className="w-2 h-2 rounded-full bg-border-strong"></div>
                    <span className="text-gray-400">Arrive at Stadium 4:55 PM</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => showToast('Opening Transport options')} variant="secondary" className="w-full flex justify-between items-center group mt-auto">
                View Transport Options <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>

            <Card elevation="low" className="border-t-4 border-t-brand-secondary flex flex-col justify-between">
               <div>
                <div className="flex items-center gap-2 mb-4">
                  <Bell size={20} className="text-brand-secondary" />
                  <h3 className="font-bold text-lg text-text-main">Live Updates</h3>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="bg-bg-base p-3 rounded-lg border border-border-subtle">
                    <p className="text-xs text-brand-secondary font-bold mb-1">10 MINS AGO</p>
                    <p className="text-sm text-gray-300 leading-snug">Pre-match fan zone DJ set starting now at the North Plaza.</p>
                  </div>
                  <div className="bg-bg-base p-3 rounded-lg border border-border-subtle">
                    <p className="text-xs text-error font-bold mb-1">35 MINS AGO</p>
                    <p className="text-sm text-gray-300 leading-snug">Heavy congestion at Gate A. Your assigned Gate B4 is clear.</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => showToast('Opening full timeline')} variant="ghost" className="w-full text-brand-secondary mt-auto">
                View All Notifications
              </Button>
            </Card>
          </div>
        </div>

        {/* Right Column - Status Widgets */}
        <div className="space-y-6">
          
          {/* Countdown Widget */}
          <Card className="text-center border border-brand-primary/20 bg-brand-primary/5">
            <h3 className="text-sm font-bold text-brand-primary uppercase tracking-wider mb-4">Match Kickoff</h3>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white tabular-nums">{String(timeLeft.h).padStart(2, '0')}</span>
                <span className="text-xs text-text-muted mt-1 uppercase">Hours</span>
              </div>
              <span className="text-3xl text-brand-primary font-bold mt-1 opacity-50">:</span>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white tabular-nums">{String(timeLeft.m).padStart(2, '0')}</span>
                <span className="text-xs text-text-muted mt-1 uppercase">Mins</span>
              </div>
              <span className="text-3xl text-brand-primary font-bold mt-1 opacity-50">:</span>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white tabular-nums">{String(timeLeft.s).padStart(2, '0')}</span>
                <span className="text-xs text-text-muted mt-1 uppercase">Secs</span>
              </div>
            </div>
          </Card>

          {/* Quick Widgets */}
          <div className="grid grid-cols-2 gap-4">
            <Card elevation="low" className="p-4 flex flex-col items-center justify-center text-center hover:bg-bg-elevated transition-colors cursor-pointer group" onClick={() => showToast('Opening Weather Map')}>
              <CloudRain size={28} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-white text-lg">72°F</h4>
              <p className="text-[10px] text-text-muted uppercase font-bold mt-1 tracking-wider">Weather</p>
            </Card>
            <Card elevation="low" className="p-4 flex flex-col items-center justify-center text-center hover:bg-bg-elevated transition-colors cursor-pointer group" onClick={() => showToast('Opening Parking Pass')}>
              <Car size={28} className="text-brand-secondary mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-white text-lg">Lot C</h4>
              <p className="text-[10px] text-text-muted uppercase font-bold mt-1 tracking-wider">Parking Pass</p>
            </Card>
          </div>

          {/* Schedule */}
          <Card elevation="low">
            <h3 className="font-bold text-lg text-text-main mb-4 flex items-center gap-2">
              <Clock size={18} /> Today's Schedule
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 text-right shrink-0">
                  <p className="text-sm font-bold text-white">16:00</p>
                </div>
                <div className="border-l-2 border-brand-primary pl-4 pb-4">
                  <p className="text-sm font-bold text-brand-primary">Fan Zone</p>
                  <p className="text-xs text-text-muted mt-1 leading-snug">Live entertainment at North Plaza</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 text-right shrink-0">
                  <p className="text-sm font-bold text-white">17:30</p>
                </div>
                <div className="border-l-2 border-success pl-4 pb-4">
                  <p className="text-sm font-bold text-success">Gates Open</p>
                  <p className="text-xs text-text-muted mt-1 leading-snug">Head to Gate B4 for entry</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 text-right shrink-0">
                  <p className="text-sm font-bold text-white">19:15</p>
                </div>
                <div className="border-l-2 border-border-subtle pl-4">
                  <p className="text-sm font-bold text-white">Kickoff</p>
                  <p className="text-xs text-text-muted mt-1 leading-snug">USA vs ENG</p>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};
