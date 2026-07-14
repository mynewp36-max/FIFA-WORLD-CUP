import React from 'react';
import { useEmergency } from '../hooks/useEmergency';
import { IncidentTypeSelector } from '../components/emergency/IncidentTypeSelector';
import { SituationSummaryCard } from '../components/emergency/SituationSummaryCard';
import { ActionsTimeline } from '../components/emergency/ActionsTimeline';
import { SafetyGuidanceCard, CommunicationMessageCard } from '../components/emergency/ResponseCards';
import { IncidentMetadataCard } from '../components/emergency/IncidentMetadataCard';
import { EventTimeline } from '../components/emergency/EventTimeline';
import { EmergencyLoadingSkeleton, EmergencyEmptyState } from '../components/emergency/States';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Map, Zap, PhoneCall, HeartPulse, Clock, Activity } from 'lucide-react';
import { useToast } from '../providers/ToastProvider';

export const Emergency: React.FC = () => {
  const hook = useEmergency();
  const { showToast } = useToast();

  return (
    <main className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-error/20 rounded-xl text-2xl" aria-hidden="true">🚨</div>
          <h1 className="text-3xl font-bold text-white">Emergency Assistant</h1>
        </div>
        <p className="text-text-muted">
          AI-powered incident guidance for stadium staff and visitors. This system provides guidance only —
          always contact real emergency services for life-threatening situations.
        </p>
      </header>

      <div className="p-4 bg-warning/10 border border-warning/30 rounded-premium text-warning text-sm flex items-start gap-3" role="note" aria-label="AI disclaimer">
        <span className="text-xl shrink-0" aria-hidden="true">⚠️</span>
        <p>
          <strong>AI Guidance Only.</strong> This assistant provides situational guidance. For life-threatening emergencies,
          immediately contact on-site security, medical staff, or call emergency services directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 space-y-5" aria-label="Incident report form">
          <Card className="space-y-5">
            <IncidentTypeSelector selected={hook.incidentType} onSelect={hook.setIncidentType} />

            <Input
              label="Your Location"
              placeholder="e.g. Gate B, Section 203, Concourse Level 2"
              value={hook.location}
              onChange={(e) => hook.setLocation(e.target.value)}
              aria-label="Your current location in the stadium"
              aria-required="true"
            />

            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Description (optional)</p>
              <textarea
                value={hook.description}
                onChange={(e) => hook.setDescription(e.target.value)}
                rows={3}
                placeholder="Describe the situation briefly..."
                className="w-full bg-bg-elevated border border-border-subtle text-text-main placeholder-text-muted rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary resize-none"
              />
            </div>

            <Button
              className="w-full bg-error hover:bg-red-700"
              onClick={hook.getGuidance}
              disabled={hook.isLoading || !hook.location.trim()}
            >
              {hook.isLoading ? 'Generating Guidance...' : '🚨 Get Emergency Guidance'}
            </Button>

            {(hook.result || hook.error) && (
              <Button variant="ghost" className="w-full" onClick={hook.reset}>
                Start New Incident
              </Button>
            )}
          </Card>

          {/* Quick SOS Card */}
          <Card className="border-l-4 border-l-error">
             <h3 className="font-bold text-white mb-3">Quick SOS Actions</h3>
             <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => showToast('Calling Security...')} variant="danger" className="text-xs py-2 flex flex-col gap-1 items-center justify-center">
                  <ShieldAlertIcon /> Security
                </Button>
                <Button onClick={() => showToast('Calling Medical...')} variant="danger" className="text-xs py-2 flex flex-col gap-1 items-center justify-center">
                  <HeartPulse size={16} /> Medical
                </Button>
                <Button onClick={() => showToast('Calling Police...')} variant="danger" className="text-xs py-2 flex flex-col gap-1 items-center justify-center">
                  <PhoneCall size={16} /> 911
                </Button>
                <Button onClick={() => showToast('Alarm Activated')} variant="secondary" className="text-xs py-2 flex flex-col gap-1 items-center justify-center text-error">
                  <Zap size={16} /> Panic
                </Button>
             </div>
          </Card>
          
          {hook.result?.incidentMetadata && (
             <IncidentMetadataCard metadata={hook.result.incidentMetadata} />
          )}
        </aside>

        <section className="lg:col-span-2 space-y-6" aria-label="Emergency guidance results" aria-live="assertive">
          {hook.error && <Alert title="Error" message={hook.error} variant="error" />}
          {hook.isLoading && <EmergencyLoadingSkeleton />}
          {!hook.isLoading && !hook.result && !hook.error && <EmergencyEmptyState />}

          {!hook.isLoading && hook.result && (
            <ErrorBoundary>
              <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                <SituationSummaryCard
                  summary={hook.result.summary}
                  priority={hook.result.priority}
                  status={hook.result.status || 'Active'}
                  generatedAt={hook.result.generatedAt}
                />

                {/* Response ETA & Map */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card elevation="low" className="bg-bg-surface/30 p-0 overflow-hidden border-brand-primary/20 flex flex-col">
                     <div className="p-4 border-b border-border-subtle bg-bg-elevated flex items-center justify-between">
                       <h4 className="font-bold text-white flex items-center gap-2"><Clock size={16} className="text-warning"/> Response ETA</h4>
                       <span className="text-2xl font-black text-warning">03:45</span>
                     </div>
                     <div className="p-4 flex-1 flex flex-col justify-center">
                       <p className="text-sm text-text-muted mb-2">Nearest responding unit:</p>
                       <p className="font-bold text-white flex items-center gap-2"><Activity size={16} className="text-brand-primary"/> Medical Team Alpha</p>
                       <p className="text-xs text-gray-500 mt-1">Currently traversing Sector 2</p>
                     </div>
                  </Card>
                  
                  <Card elevation="low" className="p-0 overflow-hidden relative flex flex-col">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/blueprint.png')]"></div>
                    <div className="p-4 border-b border-border-subtle bg-bg-elevated relative z-10">
                       <h4 className="font-bold text-white flex items-center gap-2"><Map size={16} className="text-brand-primary"/> Incident Map</h4>
                    </div>
                    <div className="flex-1 flex items-center justify-center bg-bg-base/50 relative z-10 p-6">
                       <div className="relative w-full h-full min-h-[100px] border border-dashed border-error/50 rounded-lg flex items-center justify-center">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="relative flex h-6 w-6">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-6 w-6 bg-error"></span>
                            </span>
                          </div>
                       </div>
                    </div>
                  </Card>
                </div>

                <ActionsTimeline actions={hook.result.recommendedActions} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SafetyGuidanceCard guidance={hook.result.safetyGuidance} />
                  <CommunicationMessageCard message={hook.result.communicationMessage} />
                </div>
                
                <EventTimeline events={hook.result.timeline || []} />
              </div>
            </ErrorBoundary>
          )}
        </section>
      </div>
    </main>
  );
};

// Helper icon
const ShieldAlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
