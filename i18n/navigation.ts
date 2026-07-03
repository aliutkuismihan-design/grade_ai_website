import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware navigation helpers. `usePathname` returns the path WITHOUT the
// locale prefix; `router.replace(pathname, { locale })` switches languages.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
