'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import type { ProjectItem } from '@/data/projects';

interface ProjectCardProps {
  project: ProjectItem;
  from?: 'home' | 'projects';
}

export function ProjectCard({ project, from = 'home' }: ProjectCardProps) {
  const detailHref =
    from === 'projects'
      ? `/projects/${project.slug}?from=projects`
      : `/projects/${project.slug}`;

  return (
    <article className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-3xl p-5 hover:-translate-y-1 hover:border-[var(--accent)]">
      {/* Subtle accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
        style={{ backgroundColor: project.accentColor }}
      />

      <div>
        {/* Top Metadata Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
            <span className="font-mono text-xs font-semibold text-[var(--text-muted)]">
              {project.number}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                <Sparkles className="h-2.5 w-2.5" />
                Featured
              </span>
            )}
          </div>

          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} live site`}
            title="Visit Live Site"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Live
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Clickable Main Content */}
        <Link href={detailHref} className="mt-4 block">
          <h3 className="font-display text-lg font-bold text-[var(--text-primary)] transition group-hover:text-[var(--accent)]">
            {project.name}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">{project.type}</p>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {project.description}
          </p>
        </Link>
      </div>

      {/* Bottom Tech Pills + Details Link */}
      <div className="mt-5 space-y-3 border-t border-[var(--border-subtle)] pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-lg bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          href={detailHref}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] transition group-hover:gap-2"
        >
          View Case Study
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
