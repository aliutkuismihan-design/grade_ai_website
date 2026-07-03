'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Camera, Upload, Cpu, Download as DownloadIcon, type LucideIcon } from 'lucide-react';

export default function HowItWorks() {
  const t = useTranslations('how');

  const steps: { key: string; Icon: LucideIcon }[] = [
    { key: 'step1', Icon: Camera },
    { key: 'step2', Icon: Upload },
    { key: 'step3', Icon: Cpu },
    { key: 'step4', Icon: DownloadIcon },
  ];

  return (
    <section id="how" className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-slate-400">{t('subtitle')}</p>
        </div>

        {/* Vertical timeline */}
        <ol className="relative mx-auto mt-16 max-w-2xl">
          {/* connecting line */}
          <div className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-aurora-primary/50 via-aurora-secondary/50 to-aurora-accent/50" />

          {steps.map(({ key, Icon }, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              <div className="relative z-10 grid h-12 w-12 flex-none place-items-center rounded-full border border-white/10 bg-aurora-bg text-white shadow-glow">
                <Icon className="h-5 w-5 text-aurora-secondary" />
              </div>
              <div className="pt-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-aurora-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-white">{t(`${key}.title`)}</h3>
                <p className="mt-1 max-w-md text-sm text-slate-400">{t(`${key}.desc`)}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
