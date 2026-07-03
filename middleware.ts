import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// Redirects `/` → `/en` and manages locale prefixes for every request.
export default createMiddleware(routing);

export const config = {
  // Match all paths except API routes, Next internals, and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
