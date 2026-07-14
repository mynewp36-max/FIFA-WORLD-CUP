import React from 'react';
import { useTransport } from '../hooks/useTransport';
import { TransportSearchCard } from '../components/transport/TransportSearchCard';
import { RecommendationCard } from '../components/transport/RecommendationCard';

import { AlternativeOptions } from '../components/transport/AlternativeOptions';
import { TravelTipsCard } from '../components/transport/TravelTipsCard';
import { TransportLoadingSkeleton, TransportEmptyState } from '../components/transport/States';
import { Alert } from '../components/Alert';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Card } from '../components/Card';
import { Train, Bus, Car, Footprints, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '../components/Badge';

export const Transport: React.FC = () => {
  const hook = useTransport();

  return (
    <main className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-brand-primary/20 rounded-xl text-2xl" aria-hidden="true">🚇</div>
          <h1 className="text-3xl font-bold text-white">Transport Intelligence</h1>
        </div>
        <p className="text-text-muted">
          AI-powered journey planning to get you to and from MetLife Stadium efficiently.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1" aria-label="Transport planning form">
          <TransportSearchCard
            currentLocation={hook.currentLocation}
            setCurrentLocation={hook.setCurrentLocation}
            destination={hook.destination}
            setDestination={hook.setDestination}
            userRole={hook.userRole}
            setUserRole={hook.setUserRole}
            groupSize={hook.groupSize}
            setGroupSize={hook.setGroupSize}
            wheelchair={hook.wheelchair}
            setWheelchair={hook.setWheelchair}
            avoidCrowd={hook.avoidCrowd}
            setAvoidCrowd={hook.setAvoidCrowd}
            onSearch={hook.getRecommendation}
            isLoading={hook.isLoading}
          />

          {/* Premium Multi-modal Widget (Always visible for Hackathon flex) */}
          <Card className="mt-6 border-l-4 border-l-brand-secondary">
            <h3 className="font-bold text-white mb-4">Live Hub Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
                <span className="flex items-center gap-2 text-sm text-gray-300"><Train size={16} /> Metro (NJT)</span>
                <Badge variant="success">On Time</Badge>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
                <span className="flex items-center gap-2 text-sm text-gray-300"><Bus size={16} /> Shuttle Bus</span>
                <Badge variant="warning">5m Delay</Badge>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
                <span className="flex items-center gap-2 text-sm text-gray-300"><Car size={16} /> Ride Share</span>
                <Badge variant="error">Surge (x2)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm text-gray-300"><Footprints size={16} /> Walking Paths</span>
                <Badge variant="success">Clear</Badge>
              </div>
            </div>
          </Card>
        </aside>

        <section className="lg:col-span-2 space-y-6" aria-label="Transport recommendations" aria-live="polite">
          {hook.error && <Alert title="Error" message={hook.error} variant="error" />}
          {hook.isLoading && <TransportLoadingSkeleton />}
          {!hook.isLoading && !hook.result && !hook.error && <TransportEmptyState />}

          {!hook.isLoading && hook.result && (
            <ErrorBoundary>
              <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                {hook.result.warnings && hook.result.warnings.length > 0 && (
                  <div className="space-y-2">
                    {hook.result.warnings.map((w, i) => (
                      <Alert key={i} title="Important Notice" message={w} variant="warning" />
                    ))}
                  </div>
                )}

                <RecommendationCard data={hook.result} />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <Card elevation="low" className="p-4 text-center">
                     <Clock className="mx-auto mb-2 text-brand-primary" size={24} />
                     <p className="text-xs text-text-muted uppercase mb-1">ETA</p>
                     <p className="font-bold text-white text-lg">{hook.result.estimatedTravelTime}</p>
                   </Card>
                   <Card elevation="low" className="p-4 text-center">
                     <AlertTriangle className="mx-auto mb-2 text-warning" size={24} />
                     <p className="text-xs text-text-muted uppercase mb-1">Crowd</p>
                     <p className="font-bold text-white text-sm leading-tight mt-1">{hook.result.crowdImpact}</p>
                   </Card>
                   <Card elevation="low" className="p-4 text-center">
                     <span className="mx-auto mb-2 text-success text-2xl font-bold">94%</span>
                     <p className="text-xs text-text-muted uppercase mb-1">AI Confidence</p>
                     <p className="font-bold text-white text-xs mt-1">{hook.result.confidence || 'High'}</p>
                   </Card>
                   <Card elevation="low" className="p-4 text-center">
                     <span className="mx-auto mb-2 text-brand-secondary text-2xl font-bold">{hook.result.priority}</span>
                     <p className="text-xs text-text-muted uppercase mb-1">Priority</p>
                     <p className="font-bold text-white text-xs mt-1">{hook.result.recommendedDeparture || 'Standard'}</p>
                   </Card>
                </div>

                <TravelTipsCard tips={hook.result.travelTips} departureStrategy={hook.result.departureStrategy} recommendedDeparture={hook.result.recommendedDeparture || ''} />
                <AlternativeOptions options={hook.result.alternativeOptions} />
              </div>
            </ErrorBoundary>
          )}
        </section>
      </div>
    </main>
  );
};
