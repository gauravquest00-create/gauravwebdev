'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Layers,
  Briefcase,
  Globe,
  MessageSquareQuote,
  Mail,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  MessageCircle,
  RotateCcw,
  MapPin,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '@/data/profile';
import { useBlueprint } from '@/context/BlueprintContext';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';

export const SIDEBAR_NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'service', label: 'Service', icon: Layers },
  { id: 'case-studies', label: 'Case Studies', icon: Briefcase },
  { id: 'get-website', label: 'Get Website', icon: Globe },
  { id: 'testimonial', label: 'Testimonial', icon: MessageSquareQuote },
  { id: 'contact', label: 'Contact', icon: Mail },
] as const;

export function GlassSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { replay } = useBlueprint();

  const [collapsed, setCollapsed] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('home');
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // Determine active section across routes and scroll position on Home
  useEffect(() => {
    if (pathname.startsWith('/projects')) {
      setActiveId('case-studies');
      return;
    }
    if (pathname.startsWith('/enquiry')) {
      setActiveId('get-website');
      return;
    }

    const handleScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.38;
      let current = 'home';
      SIDEBAR_NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= marker) {
          current = item.id;
        }
      });
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Smooth scroll when arriving on / with hash
  useEffect(() => {
    if (pathname !== '/') return;
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Close bio popover on outside click
  useEffect(() => {
    if (!bioOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setBioOpen(false);
      }
    };
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [bioOpen]);

  const handleNavClick = (sectionId: string) => {
    setBioOpen(false);
    if (pathname === '/') {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.history.replaceState(null, '', `/#${sectionId}`);
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <aside
      aria-label="Primary Portfolio Navigation"
      className="fixed left-5 top-1/2 z-[70] hidden -translate-y-1/2 lg:flex"
    >
      <div
        className={`glass-sidebar relative flex flex-col justify-between rounded-3xl p-3 ${
          collapsed ? 'w-[70px]' : 'w-[206px]'
        }`}
      >
        {/* Top Profile Trigger + Bio Popover */}
        <div ref={popoverRef} className="relative">
          <button
            type="button"
            onClick={() => setBioOpen((o) => !o)}
            className={`flex w-full items-center gap-3 rounded-2xl p-1.5 text-left transition hover:bg-[var(--accent-soft)] ${
              collapsed ? 'justify-center' : ''
            }`}
            aria-expanded={bioOpen}
            title="Developer Quick Bio"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 font-display text-sm font-bold text-white shadow-md">
              {DEVELOPER_PROFILE.initials}
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--bg-solid)] bg-emerald-500" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-[var(--text-primary)]">
                  Gaurav Verma
                </p>
                <p className="truncate text-[11px] text-[var(--text-muted)]">
                  Website Developer
                </p>
              </div>
            )}
          </button>

          {bioOpen && (
            <div className="glass-sidebar absolute left-[calc(100%+16px)] top-0 z-[75] w-80 rounded-3xl p-5 shadow-2xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {DEVELOPER_PROFILE.availability}
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold text-[var(--text-primary)]">
                    {DEVELOPER_PROFILE.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">{DEVELOPER_PROFILE.role}</p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                {DEVELOPER_PROFILE.shortBio}
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>{DEVELOPER_PROFILE.location}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={DEVELOPER_PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
                <a
                  href={DEVELOPER_PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${DEVELOPER_PROFILE.email}`}
                  className="btn-secondary flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </a>
                <a
                  href={DEVELOPER_PROFILE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </div>

              
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="my-4 flex flex-col gap-1">
          {SIDEBAR_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                title={collapsed ? item.label : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  collapsed ? 'justify-center px-0' : ''
                } ${
                  isActive
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}

                {collapsed && (
                  <span className="pointer-events-none absolute left-[calc(100%+12px)] whitespace-nowrap rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-solid)] px-2.5 py-1 text-xs font-medium text-[var(--text-primary)] opacity-0 shadow-lg transition group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Controls */}
        <div
          className={`flex items-center gap-2 border-t border-[var(--border-subtle)] pt-3 ${
            collapsed ? 'flex-col' : 'justify-between'
          }`}
        >
          <ThemeToggleButton compact={collapsed} showLabel={!collapsed} />
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
