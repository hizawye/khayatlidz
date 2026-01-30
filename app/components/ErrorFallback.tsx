"use client";

import { AlertCircle, Home } from 'lucide-react';
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
    <div className="max-w-sm mx-auto py-16">
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="text-red-500 w-12 h-12" />
          <h2 className="text-2xl text-gray-800 font-bold">
            {title}
          </h2>
          <p className="text-base text-gray-600">
            {message}
          </p>
          <div className="flex gap-3 mt-4">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors"
              >
                إعادة المحاولة
              </button>
            )}
            {showHomeButton && (
              <Link href="/ar">
                <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-md font-medium transition-colors flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  العودة للرئيسية
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function QueryErrorFallback({ error, retry }: { error: Error; retry?: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <p className="text-sm text-red-800 font-semibold mb-2">
        خطأ في تحميل البيانات
      </p>
      <p className="text-xs text-red-600">
        {error.message}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="mt-2 px-3 py-1 text-sm text-red-700 hover:bg-red-100 rounded transition-colors"
        >
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}
