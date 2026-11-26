'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { DepthZoomSection } from '@/components/effects/DepthZoomSection';
import { TESTIMONIALS } from '@/data/profile';

export function TestimonialsSection() {
  return (
    <DepthZoomSection id="testimonial">
      <div className="space-y-10">
        <div data-reveal="up" className="reveal max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            05 // Testimonial
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Trusted by founders, brokers, and local brands.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((item, idx) => (
            <blockquote
              key={item.id}
              data-reveal="up"
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="reveal glass-card flex flex-col justify-between rounded-3xl p-6"
            >
              <div>
                <Quote className="h-6 w-6 text-[var(--accent)] opacity-60" />
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <footer className="mt-6 flex items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold text-white"
                  style={{ backgroundColor: item.accent }}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-[var(--text-primary)]">
                    {item.name}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{item.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </DepthZoomSection>
  );
}
