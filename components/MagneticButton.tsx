'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

/**
 * A "magnetic" button — it eases toward the cursor while hovered — wrapped in an
 * animated gradient border (see `.magnetic-border` in globals.css).
 */
export default function MagneticButton({ children, href = '#download', className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.35);
    y.set(my * 0.35);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`magnetic-border inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-aurora-primary to-aurora-secondary px-8 py-4 text-base font-semibold text-white shadow-glow transition-transform ${className}`}
    >
      {children}
    </motion.a>
  );
}
