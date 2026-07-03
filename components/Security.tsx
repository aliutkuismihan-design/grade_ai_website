'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  ShieldCheck,
  Lock,
  Ban,
  Award,
  KeyRound,
  EyeOff,
  Check,
  type LucideIcon,
} from 'lucide-react';

export default function Security() {
  const t = useTranslations('security');

  const items: { key: string; Icon: LucideIcon; soon?: boolean }[] = [
    { key: 'gdpr', Icon: ShieldCheck },
    { key: 'encryption', Icon: Lock },
    { key: 'noSell', Icon: Ban },
    { key: 'soc2', Icon: Award, soon: true },
    { key: 'ownership', Icon: KeyRound },
    { key: 'privacyAi', Icon: EyeOff },
  ];

  return (
    <section id="security" className="relative overflow-hidden py-24">
      {/* soft green glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            {t('subtitle')}
          </span>
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">{t('title')}</h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, Icon, soon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="relative rounded-2xl border border-emerald-400/20 bg-white/[0.04] p-6 backdrop-blur-md transition hover:border-emerald-400/50 hover:bg-white/[0.07]"
            >
              {soon && (
                <span className="absolute right-4 top-4 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                  {t('soon')}
                </span>
              )}
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30">
                <Icon className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="mt-5 flex items-center gap-2 text-lg font-semibold text-white">
                {t(`${key}.title`)}
                {!soon && <Check className="h-4 w-4 text-emerald-400" />}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{t(`${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
