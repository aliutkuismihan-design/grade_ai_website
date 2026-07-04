import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CurriculumHub, { type CurriculumData } from '@/components/CurriculumHub';
import yks from '@/data/curriculum/yks.json';
import alevel from '@/data/curriculum/alevel.json';
import delf from '@/data/curriculum/delf.json';
import cambridge from '@/data/curriculum/cambridge.json';
import eos from '@/data/curriculum/eos.json';

export const metadata: Metadata = {
  title: 'Curriculum Hub — GradeAI',
  description:
    'Free topic summaries across YKS, A-Level, DELF, Cambridge IGCSE and MEB exam systems. Study smarter with GradeAI.',
};

const systems = [yks, alevel, delf, cambridge, eos] as unknown as CurriculumData[];

export default function CurriculumPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <CurriculumHub systems={systems} />
      </main>
      <Footer />
    </>
  );
}
