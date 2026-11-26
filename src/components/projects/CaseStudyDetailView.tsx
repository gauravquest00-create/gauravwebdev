'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Sparkles,
} from 'lucide-react';
import type { ProjectItem } from '@/data/projects';
import { PROJECTS } from '@/data/projects';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';

interface CaseStudyDetailViewProps {
  project: ProjectItem;
  prevProject: ProjectItem;
  nextProject: ProjectItem;
}

export function CaseStudyDetailView({
  project,
  prevProject,
  nextProject,
}: CaseStudyDetailViewProps) {
  const searchParams = useSearchParams();
  const fromProjects = searchParams.get('from') === 'projects';
  const backHref = fromProjects ? '/projects' : '/#case-studies';
  const backLabel = fromProjects ? 'All Projects' : 'Case Studies';

  return (
    <div className="min-h-screen pb-28 lg:pb-16">
      {/* Sticky Glass Header (z-40 so left sidebar z-[70] stays above) */}
      <header className="glass-header sticky top-0 z-40 px-5 py-3.5 sm:px-8 lg:pl-64 lg:pr-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href={backHref}
              className="btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {backLabel}
            </Link>
            <span className="hidden font-mono text-xs text-[var(--text-muted)] sm:inline">
              Case Study {project.number} / {PROJECTS.length} ·{' '}
              <strong className="text-[var(--text-primary)]">{project.name}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggleButton compact />
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold"
              >
                <Github className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold"
            >
              Live Site
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Editorial Content */}
      <article className="mx-auto max-w-5xl space-y-8 px-5 pt-10 sm:px-8 lg:pl-64 lg:pr-12">
        {/* Editorial Hero Card */}
        <div className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: project.accentColor }}
          />

          <div className="relative space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold text-white"
                style={{ backgroundColor: project.accentColor }}
              >
                {project.number} / {PROJECTS.length}
              </span>

              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                  <Sparkles className="h-3 w-3" />
                  Featured Case Study
                </span>
              )}

              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                >
                  {cat}
                </span>
              ))}
            </div>

            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl">
                {project.name}
              </h1>
              <p className="mt-2 text-sm font-semibold text-[var(--accent)] sm:text-base">
                {project.type}
              </p>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                {project.tagline}
              </p>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold"
              >
                Visit Live Project
                <ExternalLink className="h-4 w-4" />
              </a>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold"
                >
                  <Github className="h-4 w-4" />
                  View GitHub
                </a>
              )}

              <Link
                href={`/enquiry?package=custom-pro`}
                className="btn-secondary inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold"
              >
                Want something similar? Enquire
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3-Column Stats Strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {project.stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                {stat.label}
              </p>
              <p className="mt-1.5 font-display text-xl font-bold text-[var(--text-primary)]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* 2-Column Body */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Overview + Engineering Highlights */}
          <div className="space-y-6 lg:col-span-7">
            <section className="glass-card rounded-3xl p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Project Overview
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {project.overview}
              </p>
            </section>

            <section className="glass-card rounded-3xl p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Engineering Highlights
              </h2>
              <ol className="mt-4 space-y-4">
                {project.highlights.map((highlight, index) => (
                  <li key={highlight} className="flex items-start gap-3.5">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold text-white"
                      style={{ backgroundColor: project.accentColor }}
                    >
                      0{index + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Right: Core Features + Tech Stack */}
          <div className="space-y-6 lg:col-span-5">
            <section className="glass-card rounded-3xl p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Core Features
              </h2>
              <ul className="mt-4 space-y-3">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="glass-card rounded-3xl p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Tech Stack
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-1.5 font-mono text-xs font-medium text-[var(--text-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Previous / Next Project Navigation */}
        <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
          <Link
            href={`/projects/${prevProject.slug}${fromProjects ? '?from=projects' : ''}`}
            className="glass-card group flex items-center justify-between gap-4 rounded-2xl p-5 hover:border-[var(--accent)]"
          >
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                ← Previous Project
              </p>
              <p className="mt-1 truncate font-display text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                {prevProject.number} · {prevProject.name}
              </p>
            </div>
            <ArrowLeft className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition group-hover:-translate-x-1 group-hover:text-[var(--accent)]" />
          </Link>

          <Link
            href={`/projects/${nextProject.slug}${fromProjects ? '?from=projects' : ''}`}
            className="glass-card group flex items-center justify-between gap-4 rounded-2xl p-5 text-right hover:border-[var(--accent)]"
          >
            <ArrowRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Next Project →
              </p>
              <p className="mt-1 truncate font-display text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                {nextProject.number} · {nextProject.name}
              </p>
            </div>
          </Link>
        </div>
      </article>
    </div>
  );
}
