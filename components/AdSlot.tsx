'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  label: string;
  variant?: 'leaderboard' | 'inline' | 'box';
  className?: string;
  adClient?: string;
  adSlot?: string;
}

// AdSense yapılandırma — Railway env'den veya buradan alınır
const DEFAULT_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
const DEFAULT_SLOTS = {
  leaderboard: process.env.NEXT_PUBLIC_ADSENSE_LEADERBOARD || '',
  inline: process.env.NEXT_PUBLIC_ADSENSE_INLINE || '',
  box: process.env.NEXT_PUBLIC_ADSENSE_BOX || '',
};

function isConfigured(client: string) {
  return client && client.startsWith('ca-pub-') && client.length > 10;
}

export default function AdSlot({ label, variant = 'inline', className = '', adClient, adSlot }: Props) {
  const insRef = useRef<HTMLModElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const client = adClient || DEFAULT_CLIENT;
  const slot = adSlot || DEFAULT_SLOTS[variant];
  const configured = isConfigured(client) && slot;

  // AdSense script yüklendiğini dinle
  useEffect(() => {
    if (!configured) return;

    const checkScript = () => {
      const w = window as any;
      if (w.adsbygoogle) {
        setScriptLoaded(true);
        return true;
      }
      return false;
    };

    if (checkScript()) return;

    // Script henüz yüklenmediyse, 500ms interval ile bekle
    const interval = setInterval(() => {
      if (checkScript()) clearInterval(interval);
    }, 500);

    // 10 saniye timeout
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [configured]);

  // AdSense push — script yüklendikten sonra veya hemen
  useEffect(() => {
    if (!configured || !insRef.current) return;

    const w = window as any;
    if (!w.adsbygoogle) return;

    try {
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch (e) {
      console.error('AdSense push error:', e);
    }
  }, [configured, scriptLoaded]);

  // Yapılandırılmamışsa — yerel reklam placeholder'ı göster
  if (!configured) {
    const dims = variant === 'leaderboard' ? '728×90' : variant === 'box' ? '300×250' : '300×120';
    return (
      <div className={`mx-auto w-full ${variant === 'box' ? 'max-w-[300px]' : 'max-w-3xl'} ${className}`}>
        <p className="mb-1 text-center text-[10px] font-medium uppercase tracking-widest text-slate-700">
          {label}
        </p>
        <div className="grid place-items-center rounded-lg border border-dashed border-amber-500/30 bg-amber-500/[0.02] py-3">
          <div className="text-center">
            <p className="text-xs font-semibold text-amber-600/70">{dims}</p>
            <p className="mt-1 text-[10px] text-slate-600">
              AdSense ayarlanmadı — env: NEXT_PUBLIC_ADSENSE_CLIENT
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-auto w-full overflow-hidden ${variant === 'box' ? 'max-w-[300px]' : 'max-w-3xl'} ${className}`}>
      <p className="mb-1 text-center text-[10px] font-medium uppercase tracking-widest text-slate-700">
        {label}
      </p>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: variant === 'box' ? 250 : variant === 'leaderboard' ? 90 : 120,
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
