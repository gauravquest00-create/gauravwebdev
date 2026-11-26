'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { PROJECT_CATEGORIES, PROJECTS } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';

export function ProjectsDirectory() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof PROJECT_CATEGORIES)[number]>('All');

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All'
          ? true
          : selectedCategory === 'Featured'
            ? project.featured
            : project.categories.includes(selectedCategory);

      if (!matchesCategory) return false;
      if (!q) return true;

      const haystack = [
        project.name,
        project.type,
        project.tagline,
        project.description,
        ...project.tech,
        ...project.categories,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query, selectedCategory]);

  return (
    <div className="min-h-screen pb-28 lg:pb-16">
      {/* Sticky Glass Top Bar (z-40 so left sidebar z-[70] always stays clickable above) */}
      <header className="glass-header sticky top-0 z-40 px-5 py-3.5 sm:px-8 lg:pl-64 lg:pr-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="btn-secondary inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>

          <div className="relative flex-1 sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tech, category..."
              aria-label="Search shipped projects"
              className="field-input w-full rounded-xl py-2 pl-10 pr-9 text-xs sm:text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <ThemeToggleButton compact />
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl space-y-8 px-5 pt-10 sm:px-8 lg:pl-64 lg:pr-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Production Archive
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            All 12 Shipped Projects
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            Browse every live website, real estate platform, SaaS workspace, and D2C storefront with full case studies and production links.
          </p>
        </div>

        {/* Category Filter Pills + Dynamic Counter */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[var(--accent)] text-white shadow-sm'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {category === 'All' ? `All (${PROJECTS.length})` : category}
                </button>
              );
            })}
          </div>

          <p className="font-mono text-xs text-[var(--text-muted)]">
            Showing <strong className="text-[var(--text-primary)]">{filteredProjects.length}</strong> of{' '}
            {PROJECTS.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} from="projects" />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-10 text-center">
            <p className="font-display text-lg font-bold text-[var(--text-primary)]">
              No matching projects found
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Try clearing your search term or switching back to All categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('All');
              }}
              className="btn-primary mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Enquiry CTA Banner */}
        <div className="glass-card flex flex-col items-start justify-between gap-5 rounded-3xl p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
              Build Yours Next
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-[var(--text-primary)]">
              Want a custom website or web app like these?
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Walk through the 4-step guided enquiry to get a tailored scope and timeline.
            </p>
          </div>
          <Link
            href="/enquiry"
            className="btn-primary inline-flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold"
          >
            Start Website Enquiry
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
