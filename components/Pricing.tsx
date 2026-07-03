'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

export default function Pricing() {
  const t = useTranslations('pricing');

  const tiers = [
    { key: 'free', highlight: false, priceSuffix: '' },
    { key: 'pro', highlight: true, priceSuffix: t('perMonth') },
    { key: 'school', highlight: false, priceSuffix: '' },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-slate-400">{t('subtitle')}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3 md:items-start">
        {tiers.map(({ key, highlight, priceSuffix }, i) => {
          const features = t.raw(`${key}.features`) as string[];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 transition hover:-translate-y-1.5 ${
                highlight
                  ? 'border-aurora-primary/60 bg-aurora-primary/[0.08] shadow-glow md:-mt-4'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20'
              }`}
            >
              {highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-aurora-primary to-aurora-secondary px-4 py-1 text-xs font-semibold text-white shadow-glow">
                  {t('mostPopular')}
                </span>
              )}

              <h3 className="text-lg font-semibold text-white">{t(`${key}.name`)}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">{t(`${key}.price`)}</span>
                {priceSuffix && <span className="text-sm text-slate-400">{priceSuffix}</span>}
              </div>

              <ul className="mt-6 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check
                      className={`mt-0.5 h-4 w-4 flex-none ${
                        highlight ? 'text-aurora-secondary' : 'text-aurora-primary'
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#download"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  highlight
                    ? 'bg-gradient-to-r from-aurora-primary to-aurora-secondary text-white hover:opacity-95'
                    : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {key === 'school' ? t('contactCta') : t('cta')}
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
