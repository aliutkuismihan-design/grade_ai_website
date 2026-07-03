import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Security from '@/components/Security';
import HowItWorks from '@/components/HowItWorks';
import InteractiveDemo from '@/components/InteractiveDemo';
import GradeLevels from '@/components/GradeLevels';
import Languages from '@/components/Languages';
import Pricing from '@/components/Pricing';
import Download from '@/components/Download';
import Footer from '@/components/Footer';

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
