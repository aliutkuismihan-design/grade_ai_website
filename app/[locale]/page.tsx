import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Security from '@/components/Security';
import HowItWorks from '@/components/HowItWorks';
import Languages from '@/components/Languages';
import Pricing from '@/components/Pricing';
import Download from '@/components/Download';
import Footer from '@/components/Footer';

// Lazy-load heavy sections for better mobile performance
const InteractiveDemo = dynamic(() => import('@/components/InteractiveDemo'), { ssr: false });
const GradeLevels = dynamic(() => import('@/components/GradeLevels'), { ssr: false });

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Security />
        <HowItWorks />
        <InteractiveDemo />
        <GradeLevels />
        <Languages />
        <Pricing />
        <Download />
      </main>
      <Footer />
    </>
  );
}
