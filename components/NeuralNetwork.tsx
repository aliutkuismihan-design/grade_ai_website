'use client';

import { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * A subtle "Higgs Field AI" neural-network background: drifting nodes connected
 * by lines when close, reacting to the mouse (nodes ease away, and a teal web
 * links the cursor to nearby nodes). Rendered on a canvas; pointer-events none so
 * it never blocks the UI. Static single frame under `prefers-reduced-motion`.
 */
export default function NeuralNetwork({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Disable on mobile / touch devices — canvas is too heavy for phones
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Non-null aliases so nested closures keep the narrowed (non-null) types.
    const el = canvas;
    const c = ctx;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;

    const LINK_DIST = 120;
    const MOUSE_DIST = 160;

    function resize() {
      width = el.clientWidth;
      height = el.clientHeight;
      el.width = Math.floor(width * dpr);
      el.height = Math.floor(height * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(24, Math.min(80, Math.floor((width * height) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    }

    function render(animate: boolean) {
      c.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (animate) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DIST && dist > 0) {
            const force = ((MOUSE_DIST - dist) / MOUSE_DIST) * 0.8;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }
      }

      // node-to-node links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            c.strokeStyle = `rgba(99,102,241,${(1 - d / LINK_DIST) * 0.28})`;
            c.lineWidth = 1;
            c.beginPath();
            c.moveTo(a.x, a.y);
            c.lineTo(b.x, b.y);
            c.stroke();
          }
        }

        // cursor-to-node links
        const md = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
        if (md < MOUSE_DIST) {
          c.strokeStyle = `rgba(20,184,166,${(1 - md / MOUSE_DIST) * 0.45})`;
          c.lineWidth = 1;
          c.beginPath();
          c.moveTo(nodes[i].x, nodes[i].y);
          c.lineTo(mouse.x, mouse.y);
          c.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        c.fillStyle = 'rgba(148,163,184,0.75)';
        c.beginPath();
        c.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        c.fill();
      }

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

    if (!reduce) {
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

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
