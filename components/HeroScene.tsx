'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FileText, Sparkles, ChevronDown } from 'lucide-react';

// Age-appropriate grade shown on the badge per selected level.
const BADGES: Record<number, { main: string; sub: string }> = {
  1: { main: '3★', sub: '3 / 3' },
  2: { main: 'B+', sub: '88 / 100' },
  3: { main: 'A+', sub: '95 / 100' },
  4: { main: 'A', sub: '3.9 GPA' },
};

/** Animated papers scene: 3 floating 3D-tilted sheets, a scanning beam, rising
 * particles, a golden grade badge, and a difficulty selector that changes the
 * badge to an age-appropriate grading scale. */
export default function HeroScene() {
  const tLevels = useTranslations('levels');
  const tHero = useTranslations('hero');
  const [level, setLevel] = useState(3);
  const badge = BADGES[level];

  const papers = [
    { rotX: 14, rotY: -18, x: -70, y: 10, delay: 0 },
    { rotX: 10, rotY: -10, x: 0, y: -20, delay: 0.4 },
    { rotX: 8, rotY: 6, x: 70, y: 24, delay: 0.8 },
  ];

  return (
    <div className="relative mx-auto h-[460px] w-full max-w-md" style={{ perspective: '1200px' }}>
      {/* Decorative animated scene */}
      <div className="absolute inset-0" aria-hidden>
        {papers.map((p, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-64 w-48 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-100 to-slate-300 shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateX(${p.x}px) translateY(${p.y}px) rotateX(${p.rotX}deg) rotateY(${p.rotY}deg)`,
              zIndex: i,
            }}
            animate={{ y: [p.y, p.y - 16, p.y] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          >
            <div className="flex h-full flex-col gap-2 p-4">
              <div className="h-3 w-1/2 rounded bg-slate-400/70" />
              {Array.from({ length: 6 }).map((_, k) => (
                <div
                  key={k}
                  className="h-2 rounded bg-slate-400/40"
                  style={{ width: `${60 + ((k * 13) % 35)}%` }}
                />
              ))}
              <FileText className="mt-auto h-6 w-6 self-end text-slate-400/60" />
            </div>
            <div className="scan-beam pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-aurora-secondary/50 to-transparent" />
          </motion.div>
        ))}

        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="particle absolute bottom-24 h-1.5 w-1.5 rounded-full bg-aurora-accent"
            style={{ left: `${30 + ((i * 37) % 45)}%`, animationDelay: `${(i % 5) * 0.5}s` }}
          />
        ))}
      </div>

      {/* Golden grade badge (changes with level) */}
      <motion.div
        key={level}
        className="absolute -right-2 top-6 z-20 flex flex-col items-center rounded-2xl border border-aurora-accent/40 bg-aurora-accent/15 px-5 py-3 shadow-glow backdrop-blur"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: [0.5, 1.12, 1] }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="flex items-center gap-1 text-2xl font-black text-aurora-accent">
          <Sparkles className="h-5 w-5" /> {badge.main}
        </span>
        <span className="text-xs font-semibold text-amber-200">{badge.sub}</span>
      </motion.div>

      {/* Difficulty selector (interactive) */}
      <div className="absolute -left-2 top-6 z-20">
        <label className="mb-1 block text-[10px] uppercase tracking-wide text-slate-400">
          {tHero('levelLabel')}
        </label>
        <div className="relative">
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="appearance-none rounded-xl border border-white/15 bg-aurora-bg/80 py-2 pl-3 pr-9 text-sm text-white backdrop-blur transition hover:border-aurora-primary/60 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n} className="bg-aurora-bg text-white">
                {tLevels(`l${n}.name`)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
