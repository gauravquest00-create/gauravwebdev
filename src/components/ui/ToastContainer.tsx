'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-24 right-4 z-[120] flex flex-col gap-2 sm:bottom-6 sm:right-6"
    >
      {toasts.map((toast) => {
        const Icon =
          toast.tone === 'success'
            ? CheckCircle2
            : toast.tone === 'error'
              ? AlertCircle
              : Info;
        const iconColor =
          toast.tone === 'success'
            ? 'text-emerald-500'
            : toast.tone === 'error'
              ? 'text-rose-500'
              : 'text-[var(--accent)]';

        return (
          <div
            key={toast.id}
            className="glass-sidebar pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-2xl px-4 py-3 text-sm text-[var(--text-primary)]"
          >
            <Icon className={`h-4 w-4 shrink-0 ${iconColor}`} />
            <span className="leading-snug">{toast.text}</span>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="ml-1 rounded-lg p-1 text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
