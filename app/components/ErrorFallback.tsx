"use client";

import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { Error as ErrorIcon, Home as HomeIcon } from '@mui/icons-material';
import Link from 'next/link';

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  onRetry?: () => void;
}

export function ErrorFallback({
  title = "حدث خطأ",
  message = "عذراً، لم نتمكن من تحميل هذه البيانات. يرجى المحاولة مرة أخرى.",
  showHomeButton = true,
  onRetry
}: ErrorFallbackProps) {
  return (
    <Container maxWidth="sm" className="py-16">
      <Paper className="p-8 text-center" elevation={2}>
        <Box className="flex flex-col items-center gap-4">
          <ErrorIcon className="text-red-500 text-5xl" />
          <Typography variant="h5" className="text-gray-800 font-bold">
            {title}
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            {message}
          </Typography>
          <Box className="flex gap-3 mt-4">
            {onRetry && (
              <Button
                variant="contained"
                onClick={onRetry}
                className="bg-purple-600 hover:bg-purple-700"
              >
                إعادة المحاولة
              </Button>
            )}
            {showHomeButton && (
              <Link href="/ar">
                <Button
                  variant="outlined"
                  startIcon={<HomeIcon />}
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  العودة للرئيسية
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export function QueryErrorFallback({ error, retry }: { error: Error; retry?: () => void }) {
  return (
    <Box className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <Typography variant="body2" className="text-red-800 font-semibold mb-2">
        خطأ في تحميل البيانات
      </Typography>
      <Typography variant="caption" className="text-red-600">
        {error.message}
      </Typography>
      {retry && (
        <Button
          size="small"
          onClick={retry}
          className="mt-2 text-red-700 hover:bg-red-100"
        >
          إعادة المحاولة
        </Button>
      )}
    </Box>
  );
}
