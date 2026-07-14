import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Trophy, Navigation, Users, Ticket, ArrowRight, PlayCircle, MapPin, Wind, Sun, Clock, Zap, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary/20 via-bg-surface to-brand-secondary/10 border border-border-subtle p-8 md:p-12 shadow-premium">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none transition-transform hover:scale-110 duration-1000">
          <Trophy size={250} className="text-brand-primary" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <Badge variant="success" className="animate-pulse">Live Tournament</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4 leading-tight tracking-tight">
            Experience the World Cup <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Like Never Before</span>
          </h1>
          <p className="text-lg text-text-muted mb-8 leading-relaxed">
            Your all-in-one stadium companion for FIFA 2026. Navigate crowds, manage tickets, and experience the game with cutting-edge technology.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => navigate('/fan-dashboard')} size="lg" className="flex items-center gap-2 font-bold shadow-glow">
              <Ticket size={20} /> View My Ticket
            </Button>
            <Button variant="secondary" size="lg" className="flex items-center gap-2">
              <PlayCircle size={20} /> Watch Highlights
            </Button>
          </div>
        </div>
      </section>

      {/* Live Match Widget & Attendance (Command Hub) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <Card className="md:col-span-2 bg-gradient-to-br from-bg-elevated to-bg-surface border-brand-primary/30 p-6 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <Trophy size={150} />
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <Badge variant="warning" className="animate-pulse">Match in Progress</Badge>
              <span className="text-xs text-text-muted font-bold tracking-widest uppercase">MetLife Stadium</span>
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className="text-center">
                <span className="text-3xl font-black text-white block mb-1">USA</span>
                <Badge variant="info">1</Badge>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-brand-primary font-bold mb-1">64:22</span>
                <span className="text-2xl font-black text-white/50">-</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-black text-white block mb-1">ENG</span>
                <Badge variant="info">1</Badge>
              </div>
            </div>
         </Card>
         <Card elevation="low" className="p-4 flex flex-col items-center justify-center text-center">
           <Users size={24} className="text-brand-primary mb-2" />
           <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Live Attendance</p>
           <h3 className="text-2xl font-black text-white">82,410</h3>
           <p className="text-xs text-success mt-1">98% Capacity</p>
         </Card>
         <Card elevation="low" className="p-4 flex flex-col items-center justify-center text-center">
           <Sun size={24} className="text-brand-secondary mb-2" />
           <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Weather Status</p>
           <h3 className="text-2xl font-black text-white">72°F</h3>
           <p className="text-xs text-brand-secondary mt-1 flex items-center gap-1 justify-center"><Wind size={10}/> 12mph Wind</p>
         </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-main flex items-center gap-2"><Zap size={24} className="text-brand-primary"/> Explore Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card onClick={() => navigate('/navigation')} className="hover:-translate-y-1 transition-transform cursor-pointer group border-transparent hover:border-brand-primary/50">
              <div className="p-3 bg-brand-primary/20 text-brand-primary w-fit rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Navigation size={28} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Stadium Navigation</h3>
              <p className="text-text-muted text-sm">Find your seat, restrooms, and the shortest routes instantly with our interactive AI routing.</p>
            </Card>
            <Card onClick={() => navigate('/crowd-intelligence')} className="hover:-translate-y-1 transition-transform cursor-pointer group border-transparent hover:border-brand-secondary/50">
              <div className="p-3 bg-brand-secondary/20 text-brand-secondary w-fit rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Crowd Intelligence</h3>
              <p className="text-text-muted text-sm">Check real-time density and estimated wait times for concessions to beat the lines.</p>
            </Card>
          </div>

          {/* AI Highlights & News */}
          <Card className="bg-bg-surface/30">
            <h2 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2"><FileText size={20} className="text-brand-secondary"/> Tournament Updates</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-border-subtle group cursor-pointer">
                <div className="w-24 h-16 bg-bg-elevated rounded-lg shrink-0 border border-border-subtle group-hover:border-brand-primary transition-colors flex items-center justify-center">
                  <PlayCircle size={24} className="text-text-muted group-hover:text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-brand-primary transition-colors text-sm">Mbappe scores stunning hat-trick against Spain</h4>
                  <p className="text-xs text-text-muted mt-1">2 hours ago • Highlights</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-2 group cursor-pointer">
                <div className="w-24 h-16 bg-bg-elevated rounded-lg shrink-0 border border-border-subtle group-hover:border-brand-secondary transition-colors flex items-center justify-center">
                  <FileText size={20} className="text-text-muted group-hover:text-brand-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-brand-secondary transition-colors text-sm">FIFA announces new AI referee assistant testing phase</h4>
                  <p className="text-xs text-text-muted mt-1">5 hours ago • Official News</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4 text-brand-primary">View All News <ArrowRight size={16}/></Button>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-main">Quick Actions</h2>
          </div>
          <Card className="flex flex-col gap-3">
            <Button onClick={() => navigate('/transport')} variant="secondary" className="w-full justify-start text-left flex items-center gap-3">
               <MapPin size={16} /> Plan Transport
            </Button>
            <Button onClick={() => navigate('/fan-dashboard')} variant="secondary" className="w-full justify-start text-left flex items-center gap-3">
               <Ticket size={16} /> Manage Tickets
            </Button>
            <Button onClick={() => navigate('/accessibility')} variant="secondary" className="w-full justify-start text-left flex items-center gap-3">
               <span className="text-lg leading-none">♿</span> Request Accessibility
            </Button>
            <Button onClick={() => navigate('/emergency')} variant="danger" className="w-full mt-4 flex justify-center items-center gap-2">
              <span className="text-lg leading-none">🚨</span> Emergency SOS
            </Button>
          </Card>

          <Card elevation="low">
             <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wider flex items-center gap-2"><Clock size={16} className="text-brand-secondary"/> Upcoming Matches</h3>
             <div className="space-y-3">
               <div className="bg-bg-elevated p-3 rounded-lg border border-border-subtle flex justify-between items-center hover:border-brand-primary transition-colors cursor-pointer">
                 <div>
                   <p className="font-bold text-white text-sm">BRA vs ARG</p>
                   <p className="text-xs text-text-muted mt-0.5">Tomorrow, 19:00</p>
                 </div>
                 <Badge variant="success">Tickets Avail</Badge>
               </div>
               <div className="bg-bg-elevated p-3 rounded-lg border border-border-subtle flex justify-between items-center hover:border-brand-primary transition-colors cursor-pointer">
                 <div>
                   <p className="font-bold text-white text-sm">FRA vs GER</p>
                   <p className="text-xs text-text-muted mt-0.5">Fri, 21:00</p>
                 </div>
                 <Badge variant="warning">Sold Out</Badge>
               </div>
             </div>
          </Card>
        </div>
      </section>

    </div>
  );
};
