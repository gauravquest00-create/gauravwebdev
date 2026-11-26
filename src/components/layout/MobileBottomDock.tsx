'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Github, Linkedin, Mail, MessageCircle, RotateCcw, X, MapPin } from 'lucide-react';
import { SIDEBAR_NAV_ITEMS } from './GlassSidebar';
import { DEVELOPER_PROFILE } from '@/data/profile';
import { useBlueprint } from '@/context/BlueprintContext';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';

export function MobileBottomDock() {
  const pathname = usePathname();
  const router = useRouter();
  const { replay } = useBlueprint();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('home');

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
      const marker = window.scrollY + window.innerHeight * 0.4;
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

  const handleNavClick = (sectionId: string) => {
    setSheetOpen(false);
    if (pathname === '/') {
      const target = document.getElementById(sectionId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `/#${sectionId}`);
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <>
      {/* Mobile Profile Bottom Sheet */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-[85] flex items-end justify-center bg-slate-950/50 p-4 backdrop-blur-sm lg:hidden"
          onClick={() => setSheetOpen(false)}
        >
          <div
            className="glass-sidebar w-full max-w-md rounded-3xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 font-display text-sm font-bold text-white">
                  {DEVELOPER_PROFILE.initials}
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--bg-solid)] bg-emerald-500" />
                </div>
                <div>
                  <p className="font-display text-base font-bold text-[var(--text-primary)]">
                    {DEVELOPER_PROFILE.name}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{DEVELOPER_PROFILE.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close profile sheet"
                className="rounded-xl p-2 text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[var(--text-secondary)]">
              {DEVELOPER_PROFILE.shortBio}
            </p>

            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
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

            <button
              type="button"
              onClick={() => {
                setSheetOpen(false);
                replay();
              }}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[var(--border-subtle)] px-3 py-2 font-mono text-[11px] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Replay Blueprint Entry
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Glass Dock */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 lg:hidden"
      >
        <div className="glass-sidebar flex items-center gap-1 rounded-2xl px-2 py-1.5">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-label="Open developer profile"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 font-display text-xs font-bold text-white"
          >
            {DEVELOPER_PROFILE.initials}
          </button>

          {SIDEBAR_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-label={item.label}
                title={item.label}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                  isActive
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}

          <ThemeToggleButton compact />
        </div>
      </nav>
    </>
  );
}
