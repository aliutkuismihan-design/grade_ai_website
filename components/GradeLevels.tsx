'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Baby, BookOpen, GraduationCap, Building2, ArrowRight, type LucideIcon } from 'lucide-react';

function ComplexityRing({ level, color }: { level: number; color: string }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const pct = level / 4;
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" className="flex-none">
      <circle cx="23" cy="23" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
      <circle
        cx="23"
        cy="23"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        transform="rotate(-90 23 23)"
      />
      <text x="23" y="27" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>
        {level}
      </text>
    </svg>
  );
}

export default function GradeLevels() {
  const t = useTranslations('levels');

  const rows: { key: string; Icon: LucideIcon; color: string }[] = [
    { key: 'l1', Icon: Baby, color: '#10B981' },
    { key: 'l2', Icon: BookOpen, color: '#3B82F6' },
    { key: 'l3', Icon: GraduationCap, color: '#8B5CF6' },
    { key: 'l4', Icon: Building2, color: '#EF4444' },
  ];

  return (
    <section id="levels" className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-slate-400">{t('subtitle')}</p>
        </div>

        <div className="mt-14 flex flex-col gap-5">
          {rows.map(({ key, Icon, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] sm:flex-row sm:gap-5"
            >
              {/* color bar */}
              <span className="h-1.5 w-full rounded-full sm:h-auto sm:w-1.5 sm:rounded-full" style={{ backgroundColor: color }} />

              <div
                className="grid h-12 w-12 flex-none place-items-center rounded-xl"
                style={{ backgroundColor: `${color}22`, boxShadow: `inset 0 0 0 1px ${color}55` }}
              >
                <Icon className="h-6 w-6" style={{ color }} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="text-lg font-semibold text-white">{t(`${key}.name`)}</h3>
                  <span className="text-sm text-slate-400">({t(`${key}.native`)})</span>
                  <span className="text-xs text-slate-500">· {t(`${key}.age`)}</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{t(`${key}.desc`)}</p>

                {/* revealed on hover */}
                <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {t('exampleLabel')}
                      </p>
                      <p className="mt-1 text-sm text-slate-300">{t(`${key}.example`)}</p>
                    </div>
                    <span
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium"
                      style={{ color }}
                    >
                      {t('learnMore')} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-none flex-row items-center gap-3 sm:flex-col sm:justify-center sm:gap-0">
                <ComplexityRing level={i + 1} color={color} />
                <span className="text-[10px] uppercase tracking-wide text-slate-500 sm:mt-1">
                  {t('complexity')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
