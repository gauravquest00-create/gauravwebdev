'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useBlueprint } from '@/context/BlueprintContext';

export function BlueprintEntry() {
  const { isOpen, runKey, close } = useBlueprint();
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setExiting(false);

    if (prefersReducedMotion) {
      setPhase(4);
      const fastTimer = window.setTimeout(() => {
        setExiting(true);
        window.setTimeout(close, 260);
      }, 600);
      return () => window.clearTimeout(fastTimer);
    }

    setPhase(0);
    const t1 = window.setTimeout(() => setPhase(1), 90);
    const t2 = window.setTimeout(() => setPhase(2), 760);
    const t3 = window.setTimeout(() => setPhase(3), 1520);
    const t4 = window.setTimeout(() => setPhase(4), 2080);
    const tExit = window.setTimeout(() => setExiting(true), 2450);
    const tClose = window.setTimeout(() => close(), 2850);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(tExit);
      window.clearTimeout(tClose);
    };
  }, [isOpen, runKey, close]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExiting(true);
        window.setTimeout(close, 240);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const isVerified = phase >= 4;
  const strokeMain = isVerified ? '#34d399' : '#38bdf8';
  const strokeMuted = isVerified ? 'rgba(52, 211, 153, 0.45)' : 'rgba(56, 189, 248, 0.45)';

  const statusText =
    phase <= 1
      ? 'DRAFTING VIEWPORT GRID & DIMENSIONS...'
      : phase === 2
        ? 'WIRING GLASS SIDEBAR & 3D GEOMETRY...'
        : phase === 3
          ? 'COMPILING PRODUCTION COMPONENTS...'
          : 'BLUEPRINT VERIFIED — LAUNCHING PORTFOLIO';

  const progressPct = phase === 0 ? 4 : phase === 1 ? 34 : phase === 2 ? 68 : phase === 3 ? 92 : 100;

  const handleSkip = () => {
    setExiting(true);
    window.setTimeout(close, 220);
  };

  return (
    <div
      role="dialog"
      aria-label="Architectural Blueprint Entry"
      className={`blueprint-grid fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 text-sky-100 transition-all duration-500 ${
        exiting ? 'scale-105 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'
      }`}
    >
      {/* Corner CAD Registration Marks */}
      <div className="pointer-events-none absolute left-5 top-5 hidden font-mono text-[10px] tracking-[0.18em] text-sky-300/75 sm:block">
        GRID 48PX // X:000 Y:000
      </div>
      <div className="pointer-events-none absolute right-5 top-5 hidden font-mono text-[10px] tracking-[0.18em] text-sky-300/75 sm:block">
        SCALE 1:1 // REV 2.6
      </div>
      <div className="pointer-events-none absolute bottom-5 left-5 hidden font-mono text-[10px] tracking-[0.18em] text-sky-300/75 sm:block">
        ARCH: MERN + REACT + 3D
      </div>
      <div className="pointer-events-none absolute bottom-5 right-5 hidden font-mono text-[10px] tracking-[0.18em] text-sky-300/75 sm:block">
        GURUGRAM, IN
      </div>

      {/* Main CAD Wireframe Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-sky-400/25 bg-[#081326]/70 p-5 shadow-2xl backdrop-blur-md sm:p-7">
        {/* Drafting Scanline */}
        <div
          key={runKey}
          className="blueprint-scanline pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-sky-400/0 via-sky-400/20 to-sky-400/0"
        />

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                isVerified ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]' : 'bg-sky-400 animate-pulse'
              }`}
            />
            <span className="font-mono text-xs tracking-[0.16em] text-sky-200">
              GAURAV VERMA // CAD BLUEPRINT
            </span>
          </div>
          <button
            type="button"
            onClick={handleSkip}
            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-400/35 bg-sky-400/10 px-3 py-1.5 font-mono text-[11px] font-medium text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/20"
          >
            Enter Portfolio
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Animated SVG Website Wireframe */}
        <svg
          viewBox="0 0 520 270"
          className="h-auto w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Phase 1: Outer Viewport Browser Frame + Dimensions */}
          <g
            style={{
              opacity: phase >= 1 ? 1 : 0.15,
              transition: 'opacity 0.45s ease',
            }}
          >
            <rect
              x="22"
              y="26"
              width="476"
              height="218"
              rx="12"
              stroke={strokeMain}
              strokeWidth="1.4"
              strokeDasharray="1400"
              strokeDashoffset={phase >= 1 ? 0 : 1400}
              style={{ transition: 'stroke-dashoffset 0.7s ease, stroke 0.35s ease' }}
            />
            <line
              x1="22"
              y1="50"
              x2="498"
              y2="50"
              stroke={strokeMuted}
              strokeWidth="1"
              strokeDasharray="480"
              strokeDashoffset={phase >= 1 ? 0 : 480}
              style={{ transition: 'stroke-dashoffset 0.6s ease 0.1s' }}
            />
            <circle cx="38" cy="38" r="3" fill={strokeMain} />
            <circle cx="50" cy="38" r="3" fill={strokeMuted} />
            <circle cx="62" cy="38" r="3" fill={strokeMuted} />
            <text
              x="260"
              y="18"
              textAnchor="middle"
              fill={strokeMain}
              fontSize="8.5"
              fontFamily="monospace"
              letterSpacing="1.6"
            >
              1440PX RESPONSIVE VIEWPORT
            </text>
            <text
              x="12"
              y="142"
              textAnchor="middle"
              fill={strokeMuted}
              fontSize="8"
              fontFamily="monospace"
              transform="rotate(-90 12 142)"
              letterSpacing="1.4"
            >
              100DVH
            </text>
          </g>

          {/* Phase 2: Left Glass Sidebar, Hero Lines, CTA Buttons & 3D Hex Emblem */}
          <g
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transition: 'opacity 0.45s ease',
            }}
          >
            {/* Floating Left Sidebar */}
            <rect
              x="36"
              y="66"
              width="44"
              height="154"
              rx="10"
              stroke={strokeMain}
              strokeWidth="1.2"
              fill="rgba(56, 189, 248, 0.06)"
              strokeDasharray="420"
              strokeDashoffset={phase >= 2 ? 0 : 420}
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
            <circle cx="58" cy="84" r="8" stroke={strokeMain} strokeWidth="1.1" />
            <line x1="47" y1="106" x2="69" y2="106" stroke={strokeMuted} strokeWidth="2" />
            <line x1="47" y1="120" x2="69" y2="120" stroke={strokeMuted} strokeWidth="2" />
            <line x1="47" y1="134" x2="69" y2="134" stroke={strokeMuted} strokeWidth="2" />
            <line x1="47" y1="148" x2="69" y2="148" stroke={strokeMuted} strokeWidth="2" />

            {/* Hero Headline Wireframe */}
            <rect x="98" y="72" width="108" height="10" rx="5" stroke={strokeMuted} strokeWidth="1" />
            <line x1="98" y1="98" x2="310" y2="98" stroke={strokeMain} strokeWidth="3" strokeLinecap="round" />
            <line x1="98" y1="112" x2="275" y2="112" stroke={strokeMain} strokeWidth="3" strokeLinecap="round" />
            <line x1="98" y1="127" x2="240" y2="127" stroke={strokeMuted} strokeWidth="1.5" strokeLinecap="round" />

            {/* CTA Buttons */}
            <rect
              x="98"
              y="140"
              width="78"
              height="20"
              rx="6"
              stroke={strokeMain}
              strokeWidth="1.2"
              fill="rgba(56, 189, 248, 0.14)"
            />
            <rect
              x="184"
              y="140"
              width="72"
              height="20"
              rx="6"
              stroke={strokeMuted}
              strokeWidth="1.1"
            />

            {/* Right 3D Hexagonal Emblem */}
            <polygon
              points="422,74 458,94 458,136 422,156 386,136 386,94"
              stroke={strokeMain}
              strokeWidth="1.3"
              strokeDasharray="280"
              strokeDashoffset={phase >= 2 ? 0 : 280}
              style={{ transition: 'stroke-dashoffset 0.65s ease' }}
            />
            <polygon
              points="422,86 446,100 446,130 422,144 398,130 398,100"
              stroke={strokeMuted}
              strokeWidth="1"
            />
            <line x1="422" y1="74" x2="422" y2="156" stroke={strokeMuted} strokeWidth="0.9" />
            <line x1="386" y1="94" x2="458" y2="136" stroke={strokeMuted} strokeWidth="0.9" />
            <line x1="458" y1="94" x2="386" y2="136" stroke={strokeMuted} strokeWidth="0.9" />
          </g>

          {/* Phase 3: Bottom 3-Column Project Cards + Emerald Precision Nodes */}
          <g
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transition: 'opacity 0.45s ease',
            }}
          >
            <rect x="98" y="176" width="118" height="52" rx="8" stroke={strokeMain} strokeWidth="1.15" />
            <rect x="228" y="176" width="118" height="52" rx="8" stroke={strokeMain} strokeWidth="1.15" />
            <rect x="358" y="176" width="118" height="52" rx="8" stroke={strokeMain} strokeWidth="1.15" />

            <line x1="110" y1="194" x2="178" y2="194" stroke={strokeMuted} strokeWidth="2" />
            <line x1="110" y1="208" x2="198" y2="208" stroke={strokeMuted} strokeWidth="1.2" />

            <line x1="240" y1="194" x2="308" y2="194" stroke={strokeMuted} strokeWidth="2" />
            <line x1="240" y1="208" x2="328" y2="208" stroke={strokeMuted} strokeWidth="1.2" />

            <line x1="370" y1="194" x2="438" y2="194" stroke={strokeMuted} strokeWidth="2" />
            <line x1="370" y1="208" x2="458" y2="208" stroke={strokeMuted} strokeWidth="1.2" />

            {/* Emerald Precision Corner Nodes */}
            <circle cx="22" cy="26" r="3" fill="#34d399" />
            <circle cx="498" cy="26" r="3" fill="#34d399" />
            <circle cx="22" cy="244" r="3" fill="#34d399" />
            <circle cx="498" cy="244" r="3" fill="#34d399" />

            <text
              x="260"
              y="260"
              textAnchor="middle"
              fill={isVerified ? '#34d399' : '#7dd3fc'}
              fontSize="8.5"
              fontFamily="monospace"
              letterSpacing="1.6"
            >
              STATUS: PRODUCTION UI VERIFIED
            </text>
          </g>
        </svg>

        {/* Progress & Status Footer */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-wider">
            <span className={isVerified ? 'text-emerald-300' : 'text-sky-200'}>{statusText}</span>
            <span className="text-sky-300/80">{progressPct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-sky-950/90">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isVerified ? 'bg-emerald-400' : 'bg-sky-400'
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      <p className="mt-4 font-mono text-[11px] tracking-widest text-sky-300/65">
        PRESS ESC TO SKIP
      </p>
    </div>
  );
}
