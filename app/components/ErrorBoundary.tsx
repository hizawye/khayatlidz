"use client";

import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="max-w-3xl mx-auto py-16 px-4">
          <div className="bg-white p-8 text-center rounded-lg shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <AlertCircle className="text-red-500 w-16 h-16" />
              <h1 className="text-3xl text-gray-800 font-bold">
                حدث خطأ غير متوقع
              </h1>
              <p className="text-base text-gray-600 mb-4">
                عذراً، حدث خطأ أثناء تحميل هذه الصفحة. يرجى المحاولة مرة أخرى.
              </p>
              {this.state.error && (
                <div className="bg-gray-100 p-4 rounded-lg text-left max-w-full overflow-auto w-full">
                  <code className="text-xs text-gray-700 font-mono">
                    {this.state.error.message}
                  </code>
                </div>
              )}
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md mt-4 font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                إعادة تحميل الصفحة
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
