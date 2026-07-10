import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
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
const InteractiveDemo = dynamic(() => import('@/components/InteractiveDemo'), { ssr: false });
const GradeLevels = dynamic(() => import('@/components/GradeLevels'), { ssr: false });
const CurriculumHub = dynamic(() => import('@/components/CurriculumHub'), { ssr: false });

const systems = [yks, alevel, delf, cambridge, eos] as unknown as CurriculumData[];

export default function Home({ params: { locale } }: { params: { locale: string } }) {
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
