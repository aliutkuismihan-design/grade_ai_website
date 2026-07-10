'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** 0 = indigo, 1 = teal — each particle sits somewhere on the field gradient */
  tone: number;
}

/** A short-lived "condensation" event: particles nearby converge and flare amber,
 * as if raw knowledge is gaining mass and crystallizing into a grade. */
interface Condensation {
  x: number;
  y: number;
  /** 0 → 1 lifetime */
  t: number;
  /** peak radius of the flare */
  radius: number;
}

const INDIGO = [99, 102, 241];
const TEAL = [20, 184, 166];
const AMBER = [245, 158, 11];

function mix(a: number[], b: number[], t: number) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

/**
 * "Quantum Grade Field" — the site's signature Higgs-field animation.
 *
 * Luminous particles drift through a deep-navy field, linked by faint indigo
 * filaments (a neural lattice). The cursor pulls a teal web around it and gently
 * repels particles. Periodically a *condensation event* fires: nearby particles
 * are drawn toward a point, flare warm amber, then scatter — the visual metaphor
 * for GradeAI turning raw work into a graded result, echoing how the Higgs field
 * gives particles their mass.
 *
 * Canvas-based, `pointer-events: none`, DPR-capped for performance. On phones it
 * renders a lighter static field; it freezes to a single frame under
 * `prefers-reduced-motion`.
 */
export default function HiggsField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const el = canvas;
    const c = ctx;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let condensations: Condensation[] = [];
    let raf = 0;
    let frame = 0;

    const LINK_DIST = 128;
    const MOUSE_DIST = 170;

    function resize() {
      width = el.clientWidth;
      height = el.clientHeight;
      el.width = Math.floor(width * dpr);
      el.height = Math.floor(height * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area, but capped hard for mobile/perf.
      const cap = isMobile ? 34 : 92;
      const count = Math.max(20, Math.min(cap, Math.floor((width * height) / 15000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: 0.8 + Math.random() * 1.8,
        tone: Math.random(),
      }));
      condensations = [];
    }

    function spawnCondensation() {
      // Prefer to condense where particles already cluster: pick a random particle.
      const seed = particles[(Math.random() * particles.length) | 0];
      if (!seed) return;
      condensations.push({
        x: seed.x,
        y: seed.y,
        t: 0,
        radius: 70 + Math.random() * 90,
      });
    }

    function render(animate: boolean) {
      c.clearRect(0, 0, width, height);
      c.globalCompositeOperation = 'lighter';

      // Occasionally trigger a condensation event (roughly every ~3.5s at 60fps).
      if (animate && !isMobile && frame % 210 === 0) spawnCondensation();
      frame++;

      // ---- update + draw condensation wells (behind particles) ----
      for (let i = condensations.length - 1; i >= 0; i--) {
        const cond = condensations[i];
        if (animate) cond.t += 0.012;
        if (cond.t >= 1) {
          condensations.splice(i, 1);
          continue;
        }
        // ease-out ring that expands and fades
        const ease = 1 - Math.pow(1 - cond.t, 3);
        const ringR = cond.radius * ease;
        const alpha = Math.sin(cond.t * Math.PI) * 0.5; // rise then fall

        const grad = c.createRadialGradient(cond.x, cond.y, 0, cond.x, cond.y, ringR + 1);
        grad.addColorStop(0, `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${alpha * 0.5})`);
        grad.addColorStop(0.6, `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${alpha * 0.12})`);
        grad.addColorStop(1, 'rgba(245,158,11,0)');
        c.fillStyle = grad;
        c.beginPath();
        c.arc(cond.x, cond.y, ringR + 1, 0, Math.PI * 2);
        c.fill();
      }

      // ---- update particles ----
      for (const p of particles) {
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          // cursor repulsion
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DIST && dist > 0) {
            const force = ((MOUSE_DIST - dist) / MOUSE_DIST) * 0.9;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }

          // condensation attraction — particles fall toward an active well
          for (const cond of condensations) {
            const cdx = cond.x - p.x;
            const cdy = cond.y - p.y;
            const cd = Math.hypot(cdx, cdy);
            if (cd < cond.radius && cd > 0.5) {
              const pull = (1 - cd / cond.radius) * (1 - cond.t) * 0.6;
              p.x += (cdx / cd) * pull;
              p.y += (cdy / cd) * pull;
            }
          }
        }
      }

      // ---- filaments between nearby particles ----
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const col = mix(INDIGO, TEAL, (a.tone + b.tone) / 2);
            const op = (1 - d / LINK_DIST) * 0.22;
            c.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${op})`;
            c.lineWidth = 1;
            c.beginPath();
            c.moveTo(a.x, a.y);
            c.lineTo(b.x, b.y);
            c.stroke();
          }
        }

        // cursor web (teal)
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE_DIST) {
          c.strokeStyle = `rgba(${TEAL[0]},${TEAL[1]},${TEAL[2]},${(1 - md / MOUSE_DIST) * 0.4})`;
          c.lineWidth = 1;
          c.beginPath();
          c.moveTo(a.x, a.y);
          c.lineTo(mouse.x, mouse.y);
          c.stroke();
        }
      }

      // ---- particles (glowing dots) ----
      for (const p of particles) {
        const col = mix(INDIGO, TEAL, p.tone);
        const glow = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},0.9)`);
        glow.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
        c.fillStyle = glow;
        c.beginPath();
        c.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        c.fill();

        c.fillStyle = `rgba(226,232,240,0.9)`;
        c.beginPath();
        c.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
        c.fill();
      }

      c.globalCompositeOperation = 'source-over';
      if (animate) raf = requestAnimationFrame(() => render(true));
    }

    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    render(!reduce);

    if (!reduce && !isMobile) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseout', onLeave);
    }
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
