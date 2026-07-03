'use client';

import { useTranslations } from 'next-intl';
import { Apple, Play, Monitor } from 'lucide-react';

interface Props {
  size?: 'sm' | 'lg';
}

/** App Store / Google Play / Windows buttons. Links are placeholders (#). */
export default function DownloadButtons({ size = 'sm' }: Props) {
  const t = useTranslations('hero');

  const pad = size === 'lg' ? 'px-6 py-4' : 'px-5 py-3';
  const store = [
    { Icon: Apple, top: t('downloadOn'), label: t('appStore'), href: '#' },
    { Icon: Play, top: t('getItOn'), label: t('googlePlay'), href: '#' },
    { Icon: Monitor, top: t('getFor'), label: t('windows'), href: '#' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {store.map(({ Icon, top, label, href }) => (
        <a
          key={label}
          href={href}
          className={`group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 ${pad} text-left transition hover:border-aurora-primary/60 hover:bg-white/10`}
        >
          <Icon className="h-6 w-6 text-slate-200 transition group-hover:text-aurora-primary" />
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] text-slate-400">{top}</span>
            <span className="text-sm font-semibold text-slate-100">{label}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
