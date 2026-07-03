'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Sparkles, QrCode, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import DownloadButtons from './DownloadButtons';
import HeroScene from './HeroScene';
import TypingText from './TypingText';
import NeuralNetwork from './NeuralNetwork';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="aurora-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora-bg/40" />

      {/* Higgs Field AI neural-network layer (reacts to the mouse) */}
      <NeuralNetwork className="absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-12 px-5 pb-16 pt-32 md:flex-row md:pt-28">
        {/* Copy */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-aurora-primary/30 bg-aurora-primary/10 px-4 py-1.5 text-sm text-indigo-200">
            <Sparkles className="h-4 w-4" />
            {t('badge')}
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            <TypingText text={t('title')} />
          </h1>

          <p className="mt-5 max-w-xl text-lg text-slate-300">{t('subtitle')}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="#download">
              {t('cta')} <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
          </div>

          <div className="mt-8">
            <DownloadButtons />
          </div>

          {/* QR placeholder */}
          <div className="mt-8 flex items-center gap-3">
            <div className="grid h-20 w-20 place-items-center rounded-xl border border-white/15 bg-white/5">
              <QrCode className="h-10 w-10 text-slate-300" />
            </div>
            <p className="text-sm text-slate-400">{t('scanQr')}</p>
          </div>
        </motion.div>

        {/* Animated scene */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  );
}
