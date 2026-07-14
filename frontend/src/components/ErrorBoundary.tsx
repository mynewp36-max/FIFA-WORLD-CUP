import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in UI component:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
          <Card className="max-w-md w-full text-center border-error/50 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-error/20">
              <AlertTriangle size={32} className="text-error" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Application Error</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              We encountered an unexpected error while rendering this view. Our engineering team has been notified.
            </p>
            <div className="bg-bg-elevated p-4 rounded-xl text-left border border-border-subtle mb-6 overflow-hidden">
               <p className="text-xs text-error font-mono truncate">{this.state.error?.message || 'Unknown render error'}</p>
            </div>
            <Button onClick={this.handleReload} variant="danger" className="w-full gap-2">
              <RefreshCw size={18} /> Reload Application
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
