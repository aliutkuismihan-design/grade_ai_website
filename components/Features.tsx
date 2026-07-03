'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  BrainCircuit,
  ScanText,
  Languages as LanguagesIcon,
  BarChart3,
  FileDown,
  WifiOff,
  Users,
  Target,
  Trophy,
  Star,
  type LucideIcon,
} from 'lucide-react';

export default function Features() {
  const t = useTranslations('features');

  const items: { key: string; Icon: LucideIcon; color: string; unique?: boolean }[] = [
    { key: 'aiCurriculum', Icon: BrainCircuit, color: 'text-aurora-primary', unique: true },
    { key: 'ocr', Icon: ScanText, color: 'text-aurora-secondary' },
    { key: 'languages', Icon: LanguagesIcon, color: 'text-aurora-accent' },
    { key: 'analytics', Icon: BarChart3, color: 'text-aurora-primary' },
    { key: 'pdf', Icon: FileDown, color: 'text-aurora-secondary' },
    { key: 'offline', Icon: WifiOff, color: 'text-aurora-accent', unique: true },
    { key: 'collab', Icon: Users, color: 'text-aurora-primary', unique: true },
    { key: 'confidence', Icon: Target, color: 'text-aurora-secondary', unique: true },
    { key: 'gamification', Icon: Trophy, color: 'text-aurora-accent' },
  ];

  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-slate-400">{t('subtitle')}</p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ key, Icon, color, unique }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-aurora-primary/40 hover:bg-white/[0.06]"
          >
            {unique && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-aurora-accent/40 bg-aurora-accent/15 px-2.5 py-1 text-[10px] font-semibold text-amber-200">
                <Star className="h-3 w-3" />
                {t('unique')}
              </span>
            )}
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5">
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-white">{t(`${key}.title`)}</h3>
            <p className="mt-2 text-sm text-slate-400">{t(`${key}.desc`)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
