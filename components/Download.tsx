'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import DownloadButtons from './DownloadButtons';

export default function Download() {
  const t = useTranslations('download');

  return (
    <section id="download" className="mx-auto max-w-6xl px-5 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-aurora-primary/20 via-aurora-secondary/10 to-aurora-accent/10 px-6 py-16 text-center shadow-glow"
      >
        <div className="aurora-mesh absolute inset-0 opacity-20" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">{t('subtitle')}</p>
          <div className="mt-8 flex justify-center">
            <DownloadButtons size="lg" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
