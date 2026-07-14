import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { NavigationSearchCard } from '../components/navigation/NavigationSearchCard';
import { RouteSummaryCard } from '../components/navigation/RouteSummaryCard';
import { LiveRouteInfo } from '../components/navigation/LiveRouteInfo';
import { RouteTimeline } from '../components/navigation/RouteTimeline';

import { LoadingSkeleton } from '../components/navigation/LoadingSkeleton';
import { Alert } from '../components/Alert';
import { Map, Mic, EyeOff, Waypoints, Target, Play } from 'lucide-react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { useToast } from '../providers/ToastProvider';

export const StadiumNavigation: React.FC = () => {
  const { isLoading, routeResult, error, calculateRoute } = useNavigation();
  const { showToast } = useToast();
  const [navStarted, setNavStarted] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-brand-primary/20 text-brand-primary rounded-xl">
            <Map size={28} />
          </div>
          Smart Stadium Navigation
        </h1>
        <p className="text-text-muted mt-2">AI-powered routing to help you find your way around MetLife Stadium.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <NavigationSearchCard onSearch={calculateRoute} isLoading={isLoading} />
          {routeResult && !isLoading && (
            <LiveRouteInfo data={routeResult} />
          )}
          
          <Card className="border-t-4 border-t-success">
             <h3 className="font-bold text-white flex items-center gap-2 mb-4"><Waypoints size={18}/> Smart Features</h3>
             <div className="space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-300">Crowd Avoidance</span>
                 <Badge variant="success">Active</Badge>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-300">Voice Guidance</span>
                 <Badge variant="info">Ready</Badge>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-300">Landmarks</span>
                 <Badge variant="success">Enabled</Badge>
               </div>
             </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {error && <div className="mb-6"><Alert title="Routing Error" message={error} variant="error" /></div>}
          {isLoading && <LoadingSkeleton />}

          {!isLoading && routeResult && (
            <ErrorBoundary>
              <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in">
                
                {navStarted ? (
                  <Card className="bg-bg-elevated border-brand-primary/30 text-center py-12">
                    <div className="inline-block p-4 bg-brand-primary/20 rounded-full text-brand-primary mb-4 animate-pulse">
                      <Target size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Navigation Started</h2>
                    <p className="text-text-muted mb-6">Follow the on-screen arrows or listen to voice guidance.</p>
                    
                    <div className="w-full bg-bg-base h-2 rounded-full mb-8 overflow-hidden">
                      <div className="bg-brand-primary h-full w-1/4 animate-pulse"></div>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <Button onClick={() => showToast('Voice Guidance Muted')} variant="secondary" className="gap-2">
                        <EyeOff size={16} /> Mute Voice
                      </Button>
                      <Button onClick={() => setNavStarted(false)} variant="danger">
                        End Route
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <Button onClick={() => setNavStarted(true)} className="flex-1 text-lg font-bold py-6 bg-brand-primary hover:bg-brand-primary/90 gap-2">
                        <Play size={20} /> Start Navigation
                      </Button>
                      <Button onClick={() => showToast('Voice Guidance Enabled')} variant="secondary" className="w-16 flex items-center justify-center">
                        <Mic size={20} />
                      </Button>
                    </div>

                    <RouteSummaryCard data={routeResult} />
                    
                    {routeResult.warnings && routeResult.warnings.length > 0 && (
                      <div className="mb-6">
                        <Alert title="Route Warnings" message={routeResult.warnings.join(' • ')} variant="warning" />
                      </div>
                    )}

                    <div className="bg-bg-surface/50 border border-border-subtle rounded-premium p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Your Route</h3>
                        <Badge variant="info">AI Confidence: {routeResult.confidenceScore}</Badge>
                      </div>
                      <RouteTimeline route={routeResult.route} />
                    </div>
                  </>
                )}
              </div>
            </ErrorBoundary>
          )}

          {!isLoading && !routeResult && !error && (
            <div className="flex flex-col items-center justify-center h-64 text-center bg-bg-surface/30 border border-dashed border-border-subtle rounded-premium p-6">
              <Map size={48} className="text-text-muted mb-4 opacity-50" />
              <p className="text-text-muted">No route found. Please choose another destination.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
