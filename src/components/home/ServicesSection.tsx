'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Code2, Cpu, Globe } from 'lucide-react';
import { DepthZoomSection } from '@/components/effects/DepthZoomSection';
import { SERVICES } from '@/data/profile';

const SERVICE_ICONS = [Globe, Code2, Cpu];

export function ServicesSection() {
  return (
    <DepthZoomSection id="service">
      <div className="space-y-10">
        <div data-reveal="up" className="reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              02 // Services
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Built for speed, clarity, and real leads.
            </h2>
          </div>
          <Link
            href="/enquiry"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Discuss your project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {SERVICES.map((service, idx) => {
            const Icon = SERVICE_ICONS[idx] || Globe;
            return (
              <div
                key={service.id}
                data-reveal="up"
                style={{ transitionDelay: `${idx * 90}ms` }}
                className="reveal glass-card flex flex-col justify-between rounded-3xl p-6 hover:-translate-y-1 hover:border-[var(--accent)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[var(--text-muted)]">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-[var(--text-primary)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 space-y-4 border-t border-[var(--border-subtle)] pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-[var(--text-muted)]">
                    {service.deliverableHighlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DepthZoomSection>
  );
}
