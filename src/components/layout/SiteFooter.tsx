 'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowUp,
  ArrowUpRight,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { useBlueprint } from '@/context/BlueprintContext';
import { useToast } from '@/context/ToastContext';
import { copyToClipboard } from '@/lib/clipboard';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';

export function SiteFooter() {
  const { replay } = useBlueprint();
  const { showToast } = useToast();
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 6);

  const handleCopyEmail = async () => {
    const ok = await copyToClipboard(DEVELOPER_PROFILE.email);
    showToast(
      ok ? `Copied ${DEVELOPER_PROFILE.email}` : 'Could not copy email automatically.',
      ok ? 'success' : 'error'
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 pb-28 pt-16 backdrop-blur-xl sm:px-8 lg:pb-12 lg:pl-64 lg:pr-16">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Top Glass CTA Banner */}
        <div className="glass-card flex flex-col items-start justify-between gap-6 rounded-3xl p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
              Ready to Launch?
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Let&apos;s build a clean, fast website for your business.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
              Share your requirements in 2 minutes using the guided enquiry wizard or message directly on WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/enquiry"
              className="btn-primary inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold"
            >
              Start Website Enquiry
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={DEVELOPER_PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold"
            >
              <MessageCircle className="h-4 w-4 text-emerald-500" />
              WhatsApp Now
            </a>
          </div>
        </div>

        {/* 4-Column Detailed Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand + Stack + Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 font-display text-sm font-bold text-white">
                {DEVELOPER_PROFILE.initials}
              </div>
              <div>
                <p className="font-display text-base font-bold text-[var(--text-primary)]">
                  {DEVELOPER_PROFILE.name}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{DEVELOPER_PROFILE.role}</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              {DEVELOPER_PROFILE.shortBio}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {DEVELOPER_PROFILE.stackSummary.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={DEVELOPER_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn-secondary flex h-9 w-9 items-center justify-center rounded-xl"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={DEVELOPER_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn-secondary flex h-9 w-9 items-center justify-center rounded-xl"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={DEVELOPER_PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="btn-secondary flex h-9 w-9 items-center justify-center rounded-xl"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href="/#home" className="transition hover:text-[var(--accent)]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#service" className="transition hover:text-[var(--accent)]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="transition hover:text-[var(--accent)]">
                  All 12 Shipped Projects
                </Link>
              </li>
              <li>
                <Link href="/#get-website" className="transition hover:text-[var(--accent)]">
                  Website Packages
                </Link>
              </li>
              <li>
                <Link href="/enquiry" className="transition hover:text-[var(--accent)]">
                  4-Step Website Enquiry
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="transition hover:text-[var(--accent)]">
                  Quick Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: 6 Featured Case Studies */}
          <div>
            <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">
              Featured Case Studies
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
              {featuredProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 transition hover:text-[var(--accent)]"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span>{project.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Contact */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">
              Direct Contact
            </h3>
            <div className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-2">
                <a
                  href={`mailto:${DEVELOPER_PROFILE.email}`}
                  className="inline-flex min-w-0 items-center gap-2 truncate text-xs font-medium text-[var(--text-primary)] hover:text-[var(--accent)]"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                  <span className="truncate">{DEVELOPER_PROFILE.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  title="Copy email"
                  className="rounded-lg p-1 text-[var(--text-muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>

              <a
                href={DEVELOPER_PROFILE.phoneHref}
                className="flex items-center gap-2 text-xs transition hover:text-[var(--accent)]"
              >
                <Phone className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>Call: {DEVELOPER_PROFILE.phoneDisplay}</span>
              </a>

              <a
                href={DEVELOPER_PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs transition hover:text-[var(--accent)]"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>WhatsApp: {DEVELOPER_PROFILE.whatsappDisplay}</span>
              </a>

              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>{DEVELOPER_PROFILE.location}</span>
              </div>

              <p className="rounded-xl bg-[var(--accent-soft)] px-3 py-2 text-[11px] font-medium text-[var(--accent)]">
                {DEVELOPER_PROFILE.responseTime}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {DEVELOPER_PROFILE.name}. Built with Next.js App Router,
            TypeScript & Three.js.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            
            <ThemeToggleButton showLabel />
            <button
              type="button"
              onClick={scrollToTop}
              className="btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
