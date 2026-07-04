import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { type Locale } from '@/i18n/config';
import AdSenseScript from '@/components/AdSenseScript';
import '../globals.css';

export const metadata: Metadata = {
  title: 'GradeAI — Grade Smarter, Not Harder',
  description:
    'AI-powered exam grading for teachers. Scan handwritten exams, grade against your rubric in seconds, and export detailed reports.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://grade-ai.example.com'),
  openGraph: {
    title: 'GradeAI — Grade Smarter, Not Harder',
    description: 'AI-powered exam grading for teachers.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-aurora-bg text-slate-200 antialiased overflow-x-hidden">
        <AdSenseScript />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
