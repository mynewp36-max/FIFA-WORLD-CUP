import React from 'react';
import { useOperations } from '../hooks/useOperations';
import { ExecutiveSummaryCard } from '../components/operations/ExecutiveSummaryCard';
import { StatusOverviewCards } from '../components/operations/StatusOverviewCards';
import { RecommendationsPanel } from '../components/operations/RecommendationsPanel';
import { CriticalAlertsPanel } from '../components/operations/CriticalAlertsPanel';
import { OperationsLoadingSkeleton, OperationsEmptyState } from '../components/operations/States';
import { Alert } from '../components/Alert';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { RefreshCw, LayoutDashboard, TrendingUp, ShieldAlert, Activity, CheckCircle2 } from 'lucide-react';
import type { OrganizerRole } from '../types/operations';


const ROLES: OrganizerRole[] = ['Organizer', 'Venue Manager', 'Operations Director', 'Security Chief'];
const WEATHER_OPTIONS = ['Clear', 'Cloudy', 'Rain', 'Storm', 'Extreme Heat'];

export const OrganizerDashboard: React.FC = () => {
  const hook = useOperations();

  return (
    <main className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-brand-primary/20 rounded-xl" aria-hidden="true">
              <LayoutDashboard size={24} className="text-brand-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white">Command Center</h1>
          </div>
          <p className="text-text-muted">AI-powered operational intelligence for MetLife Stadium</p>
        </div>

        {hook.result && (
          <Button variant="secondary" onClick={hook.generateSummary} disabled={hook.isLoading}
            className="flex items-center gap-2" aria-label="Refresh operations summary">
            <RefreshCw size={16} className={hook.isLoading ? 'animate-spin' : ''} aria-hidden="true" />
            Refresh
          </Button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-5" aria-label="Operations input panel">
          <Card className="space-y-5">
            <h3 className="text-sm font-semibold text-text-main uppercase tracking-wider">Status Inputs</h3>

            <div>
              <p className="text-xs text-text-muted mb-2">Your Role</p>
              <div className="space-y-2">
                {ROLES.map((r) => (
                  <button key={r} onClick={() => hook.setUserRole(r)} aria-pressed={hook.userRole === r}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all border ${hook.userRole === r ? 'bg-brand-primary/20 border-brand-primary text-brand-primary' : 'bg-bg-elevated border-border-subtle text-text-muted hover:text-text-main'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {[
              { label: '👥 Crowd Status', value: hook.crowdStatus, set: hook.setCrowdStatus },
              { label: '🚇 Transport Status', value: hook.transportStatus, set: hook.setTransportStatus },
            ].map(({ label, value, set }) => (
              <div key={label}>
                <p className="text-xs text-text-muted mb-2">{label}</p>
                <select value={value} onChange={(e) => set(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-subtle text-text-main rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary"
                  aria-label={label}>
                  {hook.statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}

            <div>
              <p className="text-xs text-text-muted mb-2">⛅ Weather</p>
              <div className="flex flex-wrap gap-2">
                {WEATHER_OPTIONS.map((w) => (
                  <button key={w} onClick={() => hook.setWeather(w)} aria-pressed={hook.weather === w}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all ${hook.weather === w ? 'bg-brand-primary/20 border-brand-primary text-brand-primary' : 'bg-bg-elevated border-border-subtle text-text-muted hover:text-text-main'}`}>
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-text-muted mb-2">📝 Incident Notes (optional)</p>
              <textarea value={hook.incidentNotes} onChange={(e) => hook.setIncidentNotes(e.target.value)}
                rows={3} placeholder="Any active incidents..."
                className="w-full bg-bg-elevated border border-border-subtle text-text-main placeholder-text-muted rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                aria-label="Optional incident notes for AI context" />
            </div>

            <Button className="w-full" onClick={hook.generateSummary} disabled={hook.isLoading}
              aria-label="Generate AI operations summary">
              {hook.isLoading ? 'Generating...' : '⚡ Generate Summary'}
            </Button>
          </Card>
        </aside>

        <section className="lg:col-span-3 space-y-6" aria-label="Operations intelligence results" aria-live="polite">
          {hook.error && <Alert title="Error" message={hook.error} variant="error" />}
          {hook.isLoading && <OperationsLoadingSkeleton />}
          {!hook.isLoading && !hook.result && !hook.error && <OperationsEmptyState />}

          {!hook.isLoading && hook.result && (
            <ErrorBoundary>
              <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                
                {/* Executive KPIs Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card elevation="low" className="p-4 border-l-2 border-brand-primary">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Active Incidents</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-black text-white">{hook.result.criticalAlerts?.length || 0}</p>
                      <ShieldAlert size={20} className={hook.result.criticalAlerts?.length ? "text-error" : "text-success"} />
                    </div>
                  </Card>
                  <Card elevation="low" className="p-4 border-l-2 border-brand-secondary">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Risk Trend</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-black text-white">Stable</p>
                      <TrendingUp size={20} className="text-brand-secondary" />
                    </div>
                  </Card>
                  <Card elevation="low" className="p-4 border-l-2 border-success">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">AI Confidence</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-black text-white">94%</p>
                      <CheckCircle2 size={20} className="text-success" />
                    </div>
                  </Card>
                  <Card elevation="low" className="p-4 border-l-2 border-warning">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Live Metrics Update</p>
                    <div className="flex items-center justify-between">
                       <p className="text-sm font-bold text-white leading-tight">Live<br/>Stream</p>
                      <Activity size={20} className="text-warning animate-pulse" />
                    </div>
                  </Card>
                </div>

                <ExecutiveSummaryCard
                  summary={hook.result.executiveSummary}
                  generatedAt={hook.result.generatedAt}
                  risk={hook.result.overallRisk}
                  priority={hook.result.priorityLevel}
                  crowdStatus={hook.crowdStatus}
                  transportStatus={hook.transportStatus}
                  weather={hook.weather}
                />

                <CriticalAlertsPanel alerts={hook.result.criticalAlerts} />

                <StatusOverviewCards
                  crowdOverview={hook.result.crowdOverview}
                  transportOverview={hook.result.transportOverview}
                  accessibilityOverview={hook.result.accessibilityOverview}
                />

                <RecommendationsPanel
                  recommendations={hook.result.recommendedActions}
                  nextSteps={hook.result.nextSteps}
                />
              </div>
            </ErrorBoundary>
          )}
        </section>
      </div>
    </main>
  );
};
