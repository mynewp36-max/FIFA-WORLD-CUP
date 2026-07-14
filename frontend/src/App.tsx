import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { ToastProvider } from './providers/ToastProvider';
import { Layout } from './layouts/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Skeleton } from './components/Skeleton';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const FanDashboard = lazy(() => import('./pages/FanDashboard').then(m => ({ default: m.FanDashboard })));
const AiAssistant = lazy(() => import('./pages/AiAssistant').then(m => ({ default: m.AiAssistant })));
const StadiumNavigation = lazy(() => import('./pages/StadiumNavigation').then(m => ({ default: m.StadiumNavigation })));
const CrowdIntelligence = lazy(() => import('./pages/CrowdIntelligence').then(m => ({ default: m.CrowdIntelligence })));
const Transport = lazy(() => import('./pages/Transport').then(m => ({ default: m.Transport })));
const Accessibility = lazy(() => import('./pages/Accessibility').then(m => ({ default: m.Accessibility })));
const Emergency = lazy(() => import('./pages/Emergency').then(m => ({ default: m.Emergency })));
const OrganizerDashboard = lazy(() => import('./pages/OrganizerDashboard').then(m => ({ default: m.OrganizerDashboard })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));

// Premium loading fallback for lazy-loaded dashboard components
const PageLoader = () => (
  <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
    <div className="flex items-center gap-4 mb-8">
      <Skeleton variant="circular" className="w-12 h-12" />
      <div>
        <Skeleton variant="text" className="w-48 mb-2" />
        <Skeleton variant="text" className="w-96" />
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
      <div className="col-span-1 space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <SettingsProvider>
      <ToastProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="fan-dashboard" element={<FanDashboard />} />
                <Route path="ai-assistant" element={<AiAssistant />} />
                <Route path="navigation" element={<StadiumNavigation />} />
                <Route path="crowd-intelligence" element={<CrowdIntelligence />} />
                <Route path="transport" element={<Transport />} />
                <Route path="accessibility" element={<Accessibility />} />
                <Route path="emergency" element={<Emergency />} />
                <Route path="organizer-dashboard" element={<OrganizerDashboard />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </ToastProvider>
    </SettingsProvider>
  );
}

export default App;
