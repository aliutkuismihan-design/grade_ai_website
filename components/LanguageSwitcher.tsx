'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Globe, Check } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname(); // locale-stripped path from next-intl navigation
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function switchTo(next: Locale) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-aurora-primary/60 hover:bg-white/10"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeFlags[locale as Locale]}</span>
        <span className="uppercase">{locale}</span>
      </button>

      {open && (
        <ul
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-aurora-bg/95 p-1 shadow-glow backdrop-blur"
          role="listbox"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                onClick={() => switchTo(l)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                role="option"
                aria-selected={l === locale}
              >
                <span className="flex items-center gap-2">
                  <span>{localeFlags[l]}</span>
                  {localeNames[l]}
                </span>
                {l === locale && <Check className="h-4 w-4 text-aurora-secondary" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
