'use client';

import React from 'react';
import {
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
} from 'lucide-react';

export interface LiveBriefSummaryProps {
  completionPct: number;
  recommendedScope: string;
  selectedPackageLabel: string;
  industry: string;
  clientName: string;
  phone: string;
  city: string;
  contentSize: string;
  goalsCount: number;
  goLiveWindow: string;
  budgetRange: string;
  submitting: boolean;
  submittedLeadId: string | null;
  onSubmitDirect: () => void;
  onSendWhatsApp: () => void;
  onCopyBrief: () => void;
  onEmailBrief: () => void;
}

export function LiveBriefSummary({
  completionPct,
  recommendedScope,
  selectedPackageLabel,
  industry,
  clientName,
  phone,
  city,
  contentSize,
  goalsCount,
  goLiveWindow,
  budgetRange,
  submitting,
  submittedLeadId,
  onSubmitDirect,
  onSendWhatsApp,
  onCopyBrief,
  onEmailBrief,
}: LiveBriefSummaryProps) {
  return (
    <aside className="glass-card sticky top-24 space-y-5 rounded-3xl p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
          Live Brief Summary
        </h2>
        <span className="font-mono text-xs font-bold text-[var(--accent)]">
          {completionPct}%
        </span>
      </div>

      {/* Completion Progress Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 transition-all duration-300"
          style={{ width: `${completionPct}%` }}
        />
      </div>

      {/* Smart Scope Fit Auto-Recommendation */}
      <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
          <Sparkles className="h-3.5 w-3.5" />
          Smart Scope Fit
        </div>
        <p className="mt-1 font-display text-sm font-bold text-[var(--text-primary)]">
          {recommendedScope}
        </p>
        <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
          Auto-calculated from your industry, content size, and goals.
        </p>
      </div>

      {/* Key-Value Summary Rows */}
      <dl className="space-y-2.5 border-y border-[var(--border-subtle)] py-4 text-xs">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-[var(--text-muted)]">Selected Package</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{selectedPackageLabel}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-[var(--text-muted)]">Industry</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{industry}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-[var(--text-muted)]">Client / Business</dt>
          <dd className="truncate font-semibold text-[var(--text-primary)]">
            {clientName || '—'}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-[var(--text-muted)]">Mobile</dt>
          <dd className="font-mono font-semibold text-[var(--text-primary)]">
            {phone ? `+91 ${phone}` : '—'}
          </dd>
        </div>
        {city && (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[var(--text-muted)]">City / Area</dt>
            <dd className="truncate font-semibold text-[var(--text-primary)]">{city}</dd>
          </div>
        )}
        <div className="flex items-center justify-between gap-3">
          <dt className="text-[var(--text-muted)]">Scope & Goals</dt>
          <dd className="font-semibold text-[var(--text-primary)]">
            {contentSize} · {goalsCount} goal{goalsCount === 1 ? '' : 's'}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-[var(--text-muted)]">Go-Live Window</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{goLiveWindow}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-[var(--text-muted)]">Comfort Budget</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{budgetRange}</dd>
        </div>
      </dl>

      {submittedLeadId && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Saved · Ref {submittedLeadId}</span>
        </div>
      )}

      {/* 4 Action Buttons */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={onSubmitDirect}
          disabled={submitting}
          className="btn-primary flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving Enquiry...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit & Save Enquiry
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onSendWhatsApp}
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-500/20 dark:text-emerald-300"
        >
          <MessageCircle className="h-4 w-4" />
          Send Brief on WhatsApp ↗
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onCopyBrief}
            disabled={submitting}
            className="btn-secondary flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy Brief
          </button>
          <button
            type="button"
            onClick={onEmailBrief}
            disabled={submitting}
            className="btn-secondary flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold"
          >
            <Mail className="h-3.5 w-3.5" />
            Email Brief
          </button>
        </div>
      </div>
    </aside>
  );
}
