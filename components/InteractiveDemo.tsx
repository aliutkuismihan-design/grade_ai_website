'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { UploadCloud, Wand2, Check, RotateCcw } from 'lucide-react';

type Phase = 'idle' | 'processing' | 'done';

export default function InteractiveDemo() {
  const t = useTranslations('demo');
  const [phase, setPhase] = useState<Phase>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  function grade() {
    setPhase('processing');
    timer.current = setTimeout(() => setPhase('done'), 2400);
  }
  function reset() {
    clearTimeout(timer.current);
    setPhase('idle');
  }

  const questions = [
    { label: t('q1'), score: 30, max: 30 },
    { label: t('q2'), score: 38, max: 40 },
    { label: t('q3'), score: 17, max: 30 },
  ];

  return (
    <section id="demo" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-slate-400">{t('subtitle')}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {/* Left: paper + upload mockup */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-100 to-slate-300 p-4 shadow-2xl">
            <div className="mb-3 h-3 w-1/2 rounded bg-slate-400/70" />
            {Array.from({ length: 9 }).map((_, k) => (
              <div
                key={k}
                className="mb-2 h-2 rounded bg-slate-400/40"
                style={{ width: `${55 + ((k * 17) % 40)}%` }}
              />
            ))}
            {/* scanning bar during processing */}
            {phase === 'processing' && (
              <div className="scan-beam pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-aurora-secondary/60 to-transparent" />
            )}
            {/* neural nodes lighting up */}
            {phase === 'processing' &&
              Array.from({ length: 6 }).map((_, k) => (
                <motion.span
                  key={k}
                  className="absolute h-2 w-2 rounded-full bg-aurora-primary"
                  style={{ left: `${15 + ((k * 29) % 70)}%`, top: `${20 + ((k * 23) % 60)}%` }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: k * 0.15 }}
                />
              ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 text-center text-sm text-slate-400">
            <UploadCloud className="h-5 w-5" />
            <span>
              {t('dropHint')} <span className="text-slate-500">{t('browse')}</span>
            </span>
          </div>
        </div>

        {/* Right: action + result */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <AnimatePresence mode="wait">
            {phase !== 'done' ? (
              <motion.div
                key="action"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col items-center justify-center gap-5 py-10 text-center"
              >
                <p className="text-slate-400">
                  {phase === 'processing' ? t('processing') : t('sampleAlt')}
                </p>
                <button
                  onClick={grade}
                  disabled={phase === 'processing'}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-aurora-primary to-aurora-secondary px-6 py-3 font-semibold text-white shadow-glow transition hover:opacity-95 disabled:opacity-60"
                >
                  <Wand2 className="h-5 w-5" />
                  {t('grade')}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="flex flex-1 flex-col"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    <Check className="h-3.5 w-3.5" /> {t('resultTitle')}
                  </span>
                  <div className="text-right">
                    <div className="text-3xl font-black text-white">85/100</div>
                    <div className="text-xs text-slate-500">{t('scoreLabel')}</div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {questions.map((q) => (
                    <div key={q.label}>
                      <div className="flex justify-between text-sm text-slate-300">
                        <span>{q.label}</span>
                        <span>
                          {q.score}/{q.max}
                        </span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-aurora-primary to-aurora-secondary"
                          style={{ width: `${(q.score / q.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-5 rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-slate-300">
                  {t('feedback')}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#download"
                    className="inline-flex items-center rounded-xl bg-aurora-accent px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110"
                  >
                    {t('cta')}
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" />
                    {t('again')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
