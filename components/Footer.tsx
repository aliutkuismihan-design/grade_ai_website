'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, Mail, ShieldCheck } from 'lucide-react';

const EMAIL = 'ali.utku.ismihan@gmail.com';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-aurora-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-aurora-primary to-aurora-secondary">
              <GraduationCap className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg">
              Grade<span className="text-aurora-primary">AI</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-slate-400">{t('tagline')}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            {t('certifications')}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">{t('product')}</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li><a className="transition hover:text-white" href="#features">{t('features')}</a></li>
            <li><a className="transition hover:text-white" href="#how">{t('how')}</a></li>
            <li><a className="transition hover:text-white" href="#pricing">{t('pricing')}</a></li>
            <li><a className="transition hover:text-white" href="#download">{t('download')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">{t('company')}</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li><a className="transition hover:text-white" href="#security">{t('security')}</a></li>
            <li><a className="transition hover:text-white" href="#">{t('privacy')}</a></li>
            <li><a className="transition hover:text-white" href={`mailto:${EMAIL}`}>{t('contact')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">{t('contact')}</h4>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <p className="mx-auto max-w-6xl px-5 py-6 text-center text-xs text-slate-500">
          © {year} GradeAI. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
