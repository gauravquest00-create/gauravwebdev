'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { DepthZoomSection } from '@/components/effects/DepthZoomSection';
import { INDUSTRY_QUICK_SELECT, WEBSITE_PACKAGES } from '@/data/packages';

export function GetWebsiteSection() {
  const [selectedIndustryId, setSelectedIndustryId] = useState(INDUSTRY_QUICK_SELECT[0].id);

  const selectedIndustry =
    INDUSTRY_QUICK_SELECT.find((item) => item.id === selectedIndustryId) ??
    INDUSTRY_QUICK_SELECT[0];

  const buildEnquiryHref = (packageSlug: string) => {
    const params = new URLSearchParams();
    params.set('package', packageSlug);
    if (selectedIndustry.id !== 'all-businesses') {
      params.set('industry', selectedIndustry.enquiryValue);
    }
    return `/enquiry?${params.toString()}`;
  };

  return (
    <DepthZoomSection id="get-website">
      <div className="space-y-8">
        <div data-reveal="up" className="reveal max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            04 // Get Website
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Universal packages built for every industry.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            Pick your business category below to see how your site adapts, then select a scope to request a custom quote via the 4-step guided enquiry.
          </p>
        </div>

        {/* All-Industry Quick-Select Strip */}
        <div data-reveal="up" className="reveal space-y-3">
          <div className="flex flex-wrap gap-2">
            {INDUSTRY_QUICK_SELECT.map((industry) => {
              const isSelected = industry.id === selectedIndustryId;
              return (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => setSelectedIndustryId(industry.id)}
                  className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-[var(--accent)] text-white shadow-sm'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {industry.label}
                </button>
              );
            })}
          </div>

          <div className="glass-card rounded-2xl px-4 py-3 text-xs leading-relaxed text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--accent)]">{selectedIndustry.label}: </span>
            {selectedIndustry.contextNote}
          </div>
        </div>

        {/* 3 Universal Package Cards — Strictly ZERO Prices */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {WEBSITE_PACKAGES.map((pkg, idx) => (
            <div
              key={pkg.slug}
              data-reveal="up"
              style={{ transitionDelay: `${idx * 80}ms` }}
              className={`reveal glass-card relative flex flex-col justify-between rounded-3xl p-6 ${
                pkg.recommended
                  ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]/40'
                  : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${
                      pkg.recommended
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    }`}
                  >
                    {pkg.recommended && <Sparkles className="h-3 w-3" />}
                    {pkg.badge}
                  </span>
                  {pkg.recommended && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                      Most Popular
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold text-[var(--text-primary)]">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {pkg.subtitle}
                </p>

                <p className="mt-3 rounded-xl bg-[var(--bg-subtle)] px-3 py-2 text-xs text-[var(--text-muted)]">
                  <strong className="text-[var(--text-primary)]">Best for:</strong> {pkg.idealFor}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {pkg.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-4">
                <Link
                  href={buildEnquiryHref(pkg.slug)}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold ${
                    pkg.recommended ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  Enquire for this
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Help Me Choose Strip */}
        <div className="text-center">
          <Link
            href={buildEnquiryHref('help-me-choose')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:text-[var(--accent)]"
          >
            Not sure which scope fits best? Start the guided enquiry and let Smart Scope Fit recommend one →
          </Link>
        </div>
      </div>
    </DepthZoomSection>
  );
}
