'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Mesh3D {
  vertices: Vec3[];
  faces: number[][];
}

function createShadedIcosahedron(radius: number): Mesh3D {
  const t = (1 + Math.sqrt(5)) / 2;
  const raw: [number, number, number][] = [
    [-1, t, 0],
    [1, t, 0],
    [-1, -t, 0],
    [1, -t, 0],
    [0, -1, t],
    [0, 1, t],
    [0, -1, -t],
    [0, 1, -t],
    [t, 0, -1],
    [t, 0, 1],
    [-t, 0, -1],
    [-t, 0, 1],
  ];

  const vertices: Vec3[] = raw.map(([x, y, z]) => {
    const len = Math.hypot(x, y, z);
    return {
      x: (x / len) * radius,
      y: (y / len) * radius,
      z: (z / len) * radius,
    };
  });

  const faces: number[][] = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  return { vertices, faces };
}

function createCube(size: number): Mesh3D {
  const s = size / 2;
  const vertices: Vec3[] = [
    { x: -s, y: -s, z: -s },
    { x: s, y: -s, z: -s },
    { x: s, y: s, z: -s },
    { x: -s, y: s, z: -s },
    { x: -s, y: -s, z: s },
    { x: s, y: -s, z: s },
    { x: s, y: s, z: s },
    { x: -s, y: s, z: s },
  ];

  const faces: number[][] = [
    [4, 5, 6, 7], // front
    [1, 0, 3, 2], // back
    [0, 4, 7, 3], // left
    [5, 1, 2, 6], // right
    [3, 7, 6, 2], // top
    [0, 1, 5, 4], // bottom
  ];

  return { vertices, faces };
}

function createTorusRing(radius: number, segments: number): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i < segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    pts.push({
      x: Math.cos(theta) * radius,
      y: Math.sin(theta) * radius,
      z: 0,
    });
  }
  return pts;
}

function rotatePoint(p: Vec3, rx: number, ry: number, rz: number): Vec3 {
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y1 = p.y * cosX - p.z * sinX;
  const z1 = p.y * sinX + p.z * cosX;

  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x2 = p.x * cosY + z1 * sinY;
  const z2 = -p.x * sinY + z1 * cosY;

  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);
  return {
    x: x2 * cosZ - y1 * sinZ,
    y: x2 * sinZ + y1 * cosZ,
    z: z2,
  };
}

function computeNormal(a: Vec3, b: Vec3, c: Vec3): Vec3 {
  const ux = b.x - a.x;
  const uy = b.y - a.y;
  const uz = b.z - a.z;
  const vx = c.x - a.x;
  const vy = c.y - a.y;
  const vz = c.z - a.z;

  const nx = uy * vz - uz * vy;
  const ny = uz * vx - ux * vz;
  const nz = ux * vy - uy * vx;
  const len = Math.hypot(nx, ny, nz) || 1;

  return { x: nx / len, y: ny / len, z: nz / len };
}

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const coreModel = createShadedIcosahedron(1.75);
    const outerShell = createShadedIcosahedron(2.42);
    const miniCube = createCube(0.46);
    const torusRing = createTorusRing(3.55, 84);

    const satellites = [
      { orbitRadius: 3.15, speed: 0.011, angle: 0.4, tiltX: 0.55, tiltY: 0.2 },
      { orbitRadius: 3.65, speed: -0.0085, angle: 2.5, tiltX: -0.4, tiltY: 0.65 },
      { orbitRadius: 2.85, speed: 0.013, angle: 4.6, tiltX: 0.25, tiltY: -0.5 },
    ];

    const particleCount = window.innerWidth < 768 ? 42 : 95;
    const particles: Vec3[] = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: (Math.random() - 0.5) * 11,
      z: (Math.random() - 0.5) * 8,
    }));

    const cursor = {
      normX: 0,
      normY: 0,
      targetNormX: 0,
      targetNormY: 0,
      px: window.innerWidth * 0.72,
      py: window.innerHeight * 0.48,
      targetPx: window.innerWidth * 0.72,
      targetPy: window.innerHeight * 0.48,
      active: false,
    };

    let targetCameraZ = 11.2;
    let cameraZ = 11.2;

    let rotX = 0.3;
    let rotY = 0.5;
    let ringRotZ = 0;
    let particleRotY = 0;
    let time = 0;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (event: MouseEvent) => {
      cursor.active = true;
      cursor.targetPx = event.clientX;
      cursor.targetPy = event.clientY;
      cursor.targetNormX = (event.clientX / window.innerWidth - 0.5) * 2;
      cursor.targetNormY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      cursor.active = false;
      cursor.targetNormX = 0;
      cursor.targetNormY = 0;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      targetCameraZ = 11.2 - progress * 2.1;
    };

    resize();
    handleScroll();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';
      const isMobile = width < 768;

      // Cursor-reactive floating origin for the 3D model
      const baseOriginX = isMobile ? width * 0.5 : width * 0.72;
      const baseOriginY = height * 0.48;
      const floatY = Math.sin(time * 0.025) * 10;
      const originX = baseOriginX + cursor.normX * (isMobile ? 16 : 42);
      const originY = baseOriginY + cursor.normY * (isMobile ? 14 : 32) + floatY;
      const focalLength = Math.min(width, height) * 0.92;

      // 0. Cursor Spotlight Glow on the Small Square Grid
      if (cursor.active && !isMobile) {
        const spot = ctx.createRadialGradient(cursor.px, cursor.py, 0, cursor.px, cursor.py, 240);
        spot.addColorStop(0, isDark ? 'rgba(99, 102, 241, 0.16)' : 'rgba(79, 70, 229, 0.10)');
        spot.addColorStop(0.5, isDark ? 'rgba(56, 189, 248, 0.06)' : 'rgba(56, 189, 248, 0.04)');
        spot.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, width, height);
      }

      // Ambient Glow behind 3D Model
      const glow = ctx.createRadialGradient(
        originX,
        originY,
        20,
        originX,
        originY,
        Math.max(width, height) * 0.42
      );
      glow.addColorStop(0, isDark ? 'rgba(129, 140, 248, 0.18)' : 'rgba(79, 70, 229, 0.11)');
      glow.addColorStop(0.55, isDark ? 'rgba(56, 189, 248, 0.06)' : 'rgba(99, 102, 241, 0.04)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const project = (p: Vec3, centerX: number, centerY: number) => {
        const depth = Math.max(1.5, cameraZ - p.z);
        const scale = focalLength / depth;
        return {
          x: centerX + p.x * scale,
          y: centerY - p.y * scale,
          z: p.z,
          scale,
        };
      };

      // Dynamic 3D Light Direction driven by cursor
      const lightRaw = {
        x: 0.45 + cursor.normX * 0.85,
        y: 0.55 - cursor.normY * 0.85,
        z: 1.0,
      };
      const lightLen = Math.hypot(lightRaw.x, lightRaw.y, lightRaw.z) || 1;
      const lightDir: Vec3 = {
        x: lightRaw.x / lightLen,
        y: lightRaw.y / lightLen,
        z: lightRaw.z / lightLen,
      };

      // 1. 3D Particle Constellation
      for (const pt of particles) {
        const rotated = rotatePoint(pt, cursor.normY * 0.14, particleRotY + cursor.normX * 0.22, 0);
        const p2d = project(rotated, width * 0.5, height * 0.5);
        const depthAlpha = Math.max(0.12, Math.min(0.65, (rotated.z + 5) / 10));
        const r = Math.max(0.8, Math.min(2.3, p2d.scale * 0.019));
        ctx.fillStyle = isDark
          ? `rgba(148, 163, 184, ${(depthAlpha * 0.62).toFixed(3)})`
          : `rgba(100, 116, 139, ${(depthAlpha * 0.44).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p2d.x, p2d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Orbiting 3D Torus Ring
      const projectedRing = torusRing.map((pt) => {
        const spun = rotatePoint(pt, 0, 0, ringRotZ);
        const tilted = rotatePoint(
          spun,
          Math.PI * 0.36 + cursor.normY * 0.42,
          Math.PI * 0.18 + cursor.normX * 0.52,
          0
        );
        return project(tilted, originX, originY);
      });

      ctx.lineWidth = 1.2;
      for (let i = 0; i < projectedRing.length; i++) {
        const a = projectedRing[i];
        const b = projectedRing[(i + 1) % projectedRing.length];
        const avgZ = (a.z + b.z) * 0.5;
        const alpha = Math.max(0.08, Math.min(0.45, (avgZ + 4) / 8)) * (isDark ? 0.9 : 0.65);
        ctx.strokeStyle = isDark
          ? `rgba(56, 189, 248, ${alpha.toFixed(3)})`
          : `rgba(99, 102, 241, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Helper to render shaded 3D mesh with painter's algorithm & cursor-lit facets
      const drawShadedMesh = (
        mesh: Mesh3D,
        offset: Vec3,
        rx: number,
        ry: number,
        rz: number,
        fillOpacity: number,
        strokeOpacity: number,
        accentTint: 'indigo' | 'sky'
      ) => {
        const transformed = mesh.vertices.map((v) => {
          const r = rotatePoint(v, rx, ry, rz);
          return { x: r.x + offset.x, y: r.y + offset.y, z: r.z + offset.z };
        });

        const sortedFaces = mesh.faces
          .map((indices) => {
            const pts = indices.map((idx) => transformed[idx]);
            const avgZ = pts.reduce((acc, p) => acc + p.z, 0) / pts.length;
            const normal = computeNormal(pts[0], pts[1], pts[2]);
            return { indices, pts, avgZ, normal };
          })
          .sort((a, b) => a.avgZ - b.avgZ);

        for (const face of sortedFaces) {
          // Only render front-facing facets for clean solid 3D look
          if (face.normal.z < -0.15) continue;

          const intensity = Math.max(
            0.18,
            Math.min(
              1,
              face.normal.x * lightDir.x +
                face.normal.y * lightDir.y +
                face.normal.z * lightDir.z
            )
          );

          const projected = face.pts.map((p) => project(p, originX, originY));

          ctx.beginPath();
          ctx.moveTo(projected[0].x, projected[0].y);
          for (let i = 1; i < projected.length; i++) {
            ctx.lineTo(projected[i].x, projected[i].y);
          }
          ctx.closePath();

          if (accentTint === 'sky') {
            const r = isDark ? Math.round(30 + intensity * 45) : Math.round(56 + intensity * 70);
            const g = isDark ? Math.round(110 + intensity * 95) : Math.round(130 + intensity * 80);
            const b = isDark ? Math.round(210 + intensity * 45) : Math.round(230 + intensity * 25);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(fillOpacity * (0.55 + intensity * 0.55)).toFixed(3)})`;
          } else {
            const r = isDark ? Math.round(62 + intensity * 85) : Math.round(68 + intensity * 75);
            const g = isDark ? Math.round(70 + intensity * 90) : Math.round(64 + intensity * 82);
            const b = isDark ? Math.round(185 + intensity * 68) : Math.round(210 + intensity * 42);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(fillOpacity * (0.55 + intensity * 0.55)).toFixed(3)})`;
          }
          ctx.fill();

          ctx.lineWidth = 1;
          ctx.strokeStyle = isDark
            ? `rgba(199, 210, 254, ${(strokeOpacity * (0.45 + intensity * 0.55)).toFixed(3)})`
            : `rgba(79, 70, 229, ${(strokeOpacity * (0.45 + intensity * 0.55)).toFixed(3)})`;
          ctx.stroke();
        }
      };

      // 3. Main Shaded 3D Faceted Model (tilts & illuminates toward cursor)
      const modelRx = rotX + cursor.normY * 0.55;
      const modelRy = rotY + cursor.normX * 0.65;
      drawShadedMesh(
        coreModel,
        { x: 0, y: 0, z: 0 },
        modelRx,
        modelRy,
        0,
        isDark ? 0.38 : 0.24,
        isDark ? 0.52 : 0.34,
        'indigo'
      );

      // 4. Outer Wireframe Cage around the 3D Model
      const shellPts = outerShell.vertices.map((v) => {
        const r = rotatePoint(v, -modelRx * 0.65, modelRy * 0.8, 0);
        return project(r, originX, originY);
      });
      ctx.lineWidth = 0.9;
      for (const face of outerShell.faces) {
        const a = shellPts[face[0]];
        const b = shellPts[face[1]];
        const c = shellPts[face[2]];
        const avgZ = (a.z + b.z + c.z) / 3;
        const alpha = Math.max(0.05, Math.min(0.24, (avgZ + 3.2) / 14)) * (isDark ? 1.2 : 0.9);
        ctx.strokeStyle = isDark
          ? `rgba(129, 140, 248, ${alpha.toFixed(3)})`
          : `rgba(79, 70, 229, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();
        ctx.stroke();
      }

      // 5. Three Orbiting 3D Mini-Cube Satellites
      satellites.forEach((sat, idx) => {
        const a = sat.angle + time * sat.speed;
        const rawPos: Vec3 = {
          x: Math.cos(a) * sat.orbitRadius,
          y: Math.sin(a) * sat.orbitRadius * 0.55,
          z: Math.sin(a) * sat.orbitRadius * 0.85,
        };
        const orbitPos = rotatePoint(
          rawPos,
          sat.tiltX + cursor.normY * 0.35,
          sat.tiltY + cursor.normX * 0.45,
          0
        );
        drawShadedMesh(
          miniCube,
          orbitPos,
          time * 0.02 + idx,
          time * 0.025 + cursor.normX * 0.8,
          idx * 0.7,
          isDark ? 0.42 : 0.28,
          isDark ? 0.58 : 0.38,
          idx % 2 === 0 ? 'sky' : 'indigo'
        );
      });
    };

    if (prefersReducedMotion) {
      renderFrame();
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('scroll', handleScroll);
      };
    }

    let frameId = 0;
    const animate = () => {
      frameId = window.requestAnimationFrame(animate);

      cursor.normX += (cursor.targetNormX - cursor.normX) * 0.06;
      cursor.normY += (cursor.targetNormY - cursor.normY) * 0.06;
      cursor.px += (cursor.targetPx - cursor.px) * 0.1;
      cursor.py += (cursor.targetPy - cursor.py) * 0.1;
      cameraZ += (targetCameraZ - cameraZ) * 0.05;

      rotY += 0.0045;
      rotX += 0.002;
      ringRotZ -= 0.0038;
      particleRotY += 0.0007;
      time += 1;

      renderFrame();
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{
        backgroundImage: isDark
          ? 'linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)'
          : 'linear-gradient(to right, rgba(15, 23, 42, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.055) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}