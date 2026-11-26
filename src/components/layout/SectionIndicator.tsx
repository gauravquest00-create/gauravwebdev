'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const HOME_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'service', label: 'Service' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'get-website', label: 'Get Website' },
  { id: 'testimonial', label: 'Testimonial' },
  { id: 'contact', label: 'Contact' },
] as const;

export function SectionIndicator() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.4;
      let current = 0;

      HOME_SECTIONS.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= marker) {
          current = idx;
        }
      });

      setActiveIndex(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (pathname !== '/') return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="Section progress"
      className="fixed right-5 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"
    >
      <div className="flex flex-col items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass-sidebar)] px-2 py-3 backdrop-blur-xl">
        {HOME_SECTIONS.map((sec, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              title={sec.label}
              aria-label={`Jump to ${sec.label}`}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'h-6 w-2 bg-[var(--accent)]'
                  : 'h-2 w-2 bg-[var(--text-muted)]/40 hover:bg-[var(--accent)]/70'
              }`}
            />
          );
        })}
      </div>
      <span className="font-mono text-[10px] font-medium tracking-widest text-[var(--text-muted)]">
        {String(activeIndex + 1).padStart(2, '0')} / 06
      </span>
    </aside>
  );
}
