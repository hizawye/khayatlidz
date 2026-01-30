"use client";

import React, { Component, ReactNode } from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { Error as ErrorIcon, Refresh as RefreshIcon } from '@mui/icons-material';

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
        <Container maxWidth="md" className="py-16">
          <Paper className="p-8 text-center" elevation={3}>
            <Box className="flex flex-col items-center gap-4">
              <ErrorIcon className="text-red-500 text-6xl" />
              <Typography variant="h4" className="text-gray-800 font-bold">
                حدث خطأ غير متوقع
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-4">
                عذراً، حدث خطأ أثناء تحميل هذه الصفحة. يرجى المحاولة مرة أخرى.
              </Typography>
              {this.state.error && (
                <Box className="bg-gray-100 p-4 rounded-lg text-left max-w-full overflow-auto">
                  <Typography variant="caption" className="text-gray-700 font-mono">
                    {this.state.error.message}
                  </Typography>
                </Box>
              )}
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleReset}
                className="bg-purple-600 hover:bg-purple-700 mt-4"
              >
                إعادة تحميل الصفحة
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}
