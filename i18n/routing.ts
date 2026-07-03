import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'tr', 'es'],
  defaultLocale: 'en',
  // 'always' → every path is prefixed with the locale (/en, /fr, /tr, /es).
  localePrefix: 'always',
});
