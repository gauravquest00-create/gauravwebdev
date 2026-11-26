'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Briefcase, MessageCircle, Sparkles } from 'lucide-react';
import { DepthZoomSection } from '@/components/effects/DepthZoomSection';
import { DEVELOPER_PROFILE, HERO_STATS } from '@/data/profile';

export function HeroSection() {
  return (
    <DepthZoomSection id="home" className="pt-24 lg:pt-20">
      <div className="max-w-4xl">
        {/* Availability Pill */}
        <div
          data-reveal="up"
          className="reveal inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{DEVELOPER_PROFILE.availability}</span>
          <span className="hidden text-[var(--text-muted)] sm:inline">· {DEVELOPER_PROFILE.location}</span>
        </div>

        {/* Display Headline */}
        <h1
          data-reveal="blur"
          className="reveal mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
        >
          {DEVELOPER_PROFILE.headline}
        </h1>

        <p
          data-reveal="up"
          style={{ transitionDelay: '80ms' }}
          className="reveal mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
        >
          {DEVELOPER_PROFILE.subheadline}
        </p>

        {/* Primary CTA Row */}
        <div
          data-reveal="up"
          style={{ transitionDelay: '140ms' }}
          className="reveal mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/enquiry"
            className="btn-primary inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold shadow-lg"
          >
            <Sparkles className="h-4 w-4" />
            Get a Website
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <Link
            href="/projects"
            className="btn-secondary inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold"
          >
            <Briefcase className="h-4 w-4 text-[var(--accent)]" />
            Explore 12 Live Projects
          </Link>

          <a
            href={DEVELOPER_PROFILE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4 text-emerald-500" />
            WhatsApp
          </a>
        </div>

        {/* 4-Stat Strip */}
        <div
          data-reveal="scale"
          style={{ transitionDelay: '200ms' }}
          className="reveal mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-4">
              <p className="font-mono text-2xl font-bold text-[var(--text-primary)]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll Cue */}
        <div className="mt-12 flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
          <a
            href="#service"
            className="inline-flex items-center gap-2 transition hover:text-[var(--accent)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest">
              Scroll to explore
            </span>
          </a>
        </div>
      </div>
    </DepthZoomSection>
  );
}
