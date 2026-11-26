'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DepthZoomSection } from '@/components/effects/DepthZoomSection';
import { PROJECT_CATEGORIES, PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export function CaseStudiesSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof PROJECT_CATEGORIES)[number]>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    if (selectedCategory === 'Featured') return PROJECTS.filter((p) => p.featured);
    return PROJECTS.filter((p) => p.categories.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <DepthZoomSection id="case-studies">
      <div className="space-y-8">
        <div
          data-reveal="up"
          className="reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              03 // Case Studies
            </p>
            <Link href="/projects" className="group inline-flex items-center gap-2">
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] transition group-hover:text-[var(--accent)] sm:text-4xl">
                All 12 Shipped Projects
              </h2>
              <ArrowUpRight className="mt-2 h-6 w-6 text-[var(--accent)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
              Real production URLs across PropTech, SaaS CRMs, D2C e-commerce, fitness platforms, and business websites.
            </p>
          </div>

          <Link
            href="/projects"
            className="btn-secondary inline-flex shrink-0 items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-semibold"
          >
            Open Full Directory
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {PROJECT_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const label = category === 'All' ? `All (${PROJECTS.length})` : category;
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
                {label}
              </button>
            );
          })}
        </div>

        {/* Responsive 3-Column Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} from="home" />
          ))}
        </div>
      </div>
    </DepthZoomSection>
  );
}
