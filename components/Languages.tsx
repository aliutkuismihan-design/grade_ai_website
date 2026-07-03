'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { locales, localeNames, localeFlags } from '@/i18n/config';

export default function Languages() {
  const t = useTranslations('languages');

  return (
    <section id="languages" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-slate-400">{t('subtitle')}</p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {locales.map((l, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -6, rotate: -1 }}
            className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-aurora-secondary/50 hover:shadow-glow"
          >
            <span className="text-5xl">{localeFlags[l]}</span>
            <span className="font-semibold text-white">{localeNames[l]}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
