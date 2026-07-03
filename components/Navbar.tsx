'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GraduationCap, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#features', label: t('features') },
    { href: '#security', label: t('security') },
    { href: '#how', label: t('how') },
    { href: '#levels', label: t('levels') },
    { href: '#pricing', label: t('pricing') },
    { href: '#download', label: t('download') },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-aurora-bg/70 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-2 font-bold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-aurora-primary to-aurora-secondary">
            <GraduationCap className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg">
            Grade<span className="text-aurora-primary">AI</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#download"
            className="hidden rounded-lg bg-aurora-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 sm:inline-block"
          >
            {t('cta')}
          </a>
          <button
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-aurora-bg/95 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-slate-200 transition hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
