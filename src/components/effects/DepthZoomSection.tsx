'use client';

import React, { useEffect, useRef } from 'react';

interface DepthZoomSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function DepthZoomSection({ id, children, className = '' }: DepthZoomSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal Observer for child .reveal elements
    const revealTargets = Array.from(el.querySelectorAll<HTMLElement>('.reveal'));
    if (prefersReducedMotion) {
      revealTargets.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((node) => observer.observe(node));

    // Hardware-accelerated scroll depth-zoom
    let rafId = 0;

    const updateDepthZoom = () => {
      rafId = 0;
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Keep tall sections (e.g. Case Studies) locked crisp at scale(1) while reading
      if (rect.height > vh * 1.15) {
        sectionRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
        sectionRef.current.style.opacity = '1';
        return;
      }

      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const normalizedDist = Math.min(1, Math.abs(sectionCenter - viewportCenter) / vh);

      const scale = 1 - normalizedDist * 0.055; // 1.0 -> 0.945
      const translateY = (sectionCenter - viewportCenter) * 0.03;
      const opacity = Math.max(0.84, 1 - normalizedDist * 0.16);

      sectionRef.current.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
      sectionRef.current.style.opacity = opacity.toFixed(3);
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateDepthZoom);
      }
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`depth-zoom-section relative z-10 flex w-full flex-col justify-center scroll-mt-4 px-5 py-20 sm:px-8 lg:pl-64 lg:pr-16 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
