import Script from 'next/script';

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';

export default function AdSenseScript() {
  // Yapılandırılmamışsa script yükleme
  if (!ADSENSE_CLIENT || !ADSENSE_CLIENT.startsWith('ca-pub-')) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
      id="adsense-script"
    />
  );
}
