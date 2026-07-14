import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { AccessibilityNeedsSelector } from '../components/accessibility/AccessibilityNeedsSelector';
import { AccessibleRouteCard } from '../components/accessibility/AccessibleRouteCard';
import { FacilityCards } from '../components/accessibility/FacilityCards';
import { WarningsPanel } from '../components/accessibility/WarningsPanel';
import { EmergencyContactCard } from '../components/accessibility/EmergencyContactCard';
import { AccessibilityLoadingSkeleton, AccessibilityEmptyState } from '../components/accessibility/States';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { Badge } from '../components/Badge';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Clock, Headphones, Eye, HeartHandshake } from 'lucide-react';
import { useToast } from '../providers/ToastProvider';

export const Accessibility: React.FC = () => {
  const {
    selectedNeeds,
    destination,
    setDestination,
    toggleNeed,
    isLoading,
    result,
    error,
    getGuidance,
    reset,
  } = useAccessibility();
  const { showToast } = useToast();

  const canSubmit = selectedNeeds.length > 0 && destination.trim().length > 0 && !isLoading;

  return (
    <main className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-success/20 text-success rounded-xl" aria-hidden="true">
            <span className="text-2xl">♿</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Accessibility Assistant</h1>
          <Badge variant="success">AI Powered</Badge>
        </div>
        <p className="text-text-muted">
          Personalized accessibility guidance for every visitor at MetLife Stadium.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 space-y-6" aria-label="Accessibility request form">
          <Card>
            <AccessibilityNeedsSelector selected={selectedNeeds} onToggle={toggleNeed} />

            <div className="mt-6">
              <Input
                label="Your Destination"
                placeholder="e.g. Section A12, Concession Stand"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                aria-label="Destination inside the stadium"
                aria-required="true"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && canSubmit) getGuidance();
                }}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                className="flex-1"
                onClick={getGuidance}
                disabled={!canSubmit}
                aria-label="Get personalized accessibility guidance"
              >
                {isLoading ? 'Generating...' : 'Get Guidance'}
              </Button>
              {(result || error) && (
                <Button variant="ghost" onClick={reset} aria-label="Clear and start over">
                  Clear
                </Button>
              )}
            </div>
          </Card>

          <Card className="border-l-4 border-l-brand-secondary">
             <h3 className="font-bold text-white mb-3">Live Companion Services</h3>
             <div className="space-y-3">
               <Button onClick={() => showToast('Requesting Sign Language Interpreter')} variant="secondary" className="w-full flex justify-between group">
                 <span className="flex items-center gap-2"><Eye size={16}/> Sign Language</span>
                 <Badge variant="info">Available</Badge>
               </Button>
               <Button onClick={() => showToast('Audio Description headset requested')} variant="secondary" className="w-full flex justify-between group">
                 <span className="flex items-center gap-2"><Headphones size={16}/> Audio Desc.</span>
                 <Badge variant="success">Ready</Badge>
               </Button>
               <Button onClick={() => showToast('Medical companion on standby')} variant="secondary" className="w-full flex justify-between group">
                 <span className="flex items-center gap-2"><HeartHandshake size={16}/> Med Companion</span>
                 <Badge variant="warning">5m Wait</Badge>
               </Button>
             </div>
          </Card>

          <EmergencyContactCard dynamicContacts={result?.emergencyContacts || []} />
        </aside>

        <section className="lg:col-span-2 space-y-6" aria-label="Accessibility guidance results" aria-live="polite">
          {error && <Alert title="Error" message={`Failed to generate guidance: ${error}`} variant="error" />}
          {isLoading && <AccessibilityLoadingSkeleton />}
          {!isLoading && !result && !error && <AccessibilityEmptyState />}

          {!isLoading && result && (
            <ErrorBoundary>
              <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                <Card className="bg-gradient-to-br from-brand-primary/10 to-transparent border-brand-primary/30">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-sm font-medium text-brand-primary uppercase tracking-wider">AI Summary</p>
                    {result.estimatedTravelTime && (
                      <Badge variant="info" className="flex items-center gap-1">
                        <Clock size={12} /> ETA: {result.estimatedTravelTime}
                      </Badge>
                    )}
                  </div>
                  <p className="text-text-main leading-relaxed">{result.summary}</p>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card elevation="low" className="p-4 border-t-2 border-t-brand-secondary flex flex-col items-center justify-center text-center cursor-pointer hover:bg-bg-elevated transition-colors" onClick={() => showToast('Opening Accessible Route')}>
                    <span className="text-3xl mb-2">🦽</span>
                    <h4 className="font-bold text-white text-sm">Wheelchair Route</h4>
                    <p className="text-xs text-text-muted mt-1">Stairs avoided. Elevators preferred.</p>
                  </Card>
                  <Card elevation="low" className="p-4 border-t-2 border-t-success flex flex-col items-center justify-center text-center cursor-pointer hover:bg-bg-elevated transition-colors" onClick={() => showToast('Highlighting facilities')}>
                    <span className="text-3xl mb-2">🚻</span>
                    <h4 className="font-bold text-white text-sm">Nearest Restroom</h4>
                    <p className="text-xs text-text-muted mt-1">Section 114 (Accessible)</p>
                  </Card>
                </div>

                <WarningsPanel 
                  warnings={result.warnings || []} 
                  importantInstructions={result.importantInstructions}
                  thingsToAvoid={result.thingsToAvoid}
                />

                <Card>
                  <AccessibleRouteCard route={result.recommendedRoute} />
                </Card>

                <FacilityCards
                  entrances={result.accessibleEntrances}
                  elevators={result.elevators}
                  ramps={result.ramps}
                  restrooms={result.accessibleRestrooms}
                  seating={result.accessibleSeating}
                  medical={result.medicalSupport}
                  services={result.accessibilityServices}
                />
              </div>
            </ErrorBoundary>
          )}
        </section>
      </div>
    </main>
  );
};
