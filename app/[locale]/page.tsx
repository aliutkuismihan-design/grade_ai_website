import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import ScrollVideoBackground from '@/components/ScrollVideoBackground';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Security from '@/components/Security';
import HowItWorks from '@/components/HowItWorks';
import Languages from '@/components/Languages';
import Pricing from '@/components/Pricing';
import Download from '@/components/Download';
import Footer from '@/components/Footer';
import type { CurriculumData } from '@/components/CurriculumHub';
import yks from '@/data/curriculum/yks.json';
import alevel from '@/data/curriculum/alevel.json';
import delf from '@/data/curriculum/delf.json';
import cambridge from '@/data/curriculum/cambridge.json';
import eos from '@/data/curriculum/eos.json';

// Lazy-load heavy sections for better mobile performance
import { InteractiveDemo, GradeLevels, CurriculumHub } from '@/components/LazySections';

const systems = [yks, alevel, delf, cambridge, eos] as unknown as CurriculumData[];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ScrollVideoBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Security />
        <CurriculumHub systems={systems} />
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
