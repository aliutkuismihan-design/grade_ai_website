'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Sparkles, QrCode, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import DownloadButtons from './DownloadButtons';
import HeroScene from './HeroScene';
import TypingText from './TypingText';
import HiggsField from './HiggsField';

// "Quantum Grade Field" hero visuals generated with Higgsfield AI.
//  - HIGGS_ART:   still hero art (nano_banana_pro) — used as the video poster.
//  - HIGGS_LOOP:  seamless animated loop (kling3_0_turbo) animating that art.
const HIGGS_ART =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3FImhQ6WllJadHNcJJBy5dO7E68/hf_20260710_011153_e73c7d66-7126-4ae0-a4ce-4902d82b7139.png';
const HIGGS_LOOP =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3FImhQ6WllJadHNcJJBy5dO7E68/hf_20260710_011659_8d46b21e-9321-4c75-b0c2-5cca6f608996.mp4';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="aurora-mesh relative overflow-hidden">
      {/* Higgsfield AI animated backdrop — the generated Higgs-field loop, with the
          still art as its poster; sits behind the live interactive particle field. */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
        autoPlay
        muted
        loop
        playsInline
        poster={HIGGS_ART}
        aria-hidden
      >
        <source src={HIGGS_LOOP} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-aurora-bg/50 via-aurora-bg/40 to-aurora-bg/80" />

      {/* Live "Quantum Grade Field" — Higgs-field particle animation (mouse-reactive) */}
      <HiggsField className="absolute inset-0 z-[1]" />

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
