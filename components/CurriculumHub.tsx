'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  BookOpen,
  BookMarked,
  Landmark,
  Globe,
  Brain,
  Languages,
  TrendingUp,
  Code,
  Car,
  ChevronDown,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import AdSlot from './AdSlot';

export interface Topic {
  title: string;
  summary: string;
}
export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  topics: Topic[];
}
export interface CurriculumData {
  examSystem: string;
  locale: string;
  subjects: Subject[];
}

const ICONS: Record<string, LucideIcon> = {
  calculator: Calculator,
  atom: Atom,
  flask: FlaskConical,
  dna: Dna,
  book: BookOpen,
  'book-marked': BookMarked,
  landmark: Landmark,
  globe: Globe,
  brain: Brain,
  languages: Languages,
  'trending-up': TrendingUp,
  code: Code,
  car: Car,
};

export default function CurriculumHub({ systems }: { systems: CurriculumData[] }) {
  const t = useTranslations('curriculum');
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black text-white sm:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        <p className="mt-3 text-sm text-slate-500">{t('intro')}</p>
      </div>

      <div className="mt-10">
        <AdSlot label={t('advertisement')} variant="leaderboard" />
      </div>

      {/* Exam-system tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {systems.map((sys, i) => (
          <button
            key={sys.examSystem}
            onClick={() => setActive(i)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              i === active
                ? 'border-aurora-primary/60 bg-aurora-primary/15 text-white'
                : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white'
            }`}
          >
            {sys.examSystem}
          </button>
        ))}
      </div>

      {/* All systems in the DOM (SEO); non-active ones hidden */}
      {systems.map((sys, i) => (
        <div key={sys.examSystem} hidden={i !== active} className="mt-10">
          <p className="mb-6 text-center text-sm text-slate-500">
            {sys.subjects.length} {t('subjects')}
          </p>

          <div className="flex flex-col gap-4">
            {sys.subjects.map((subject, si) => (
              <div key={subject.id}>
                <SubjectCard subject={subject} topicsLabel={t('topics')} />
                {/* inline ad after every 3rd subject */}
                {(si + 1) % 3 === 0 && si + 1 < sys.subjects.length && (
                  <div className="my-6">
                    <AdSlot label={t('advertisement')} variant="inline" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="mt-14 text-center">
        <a
          href="/#download"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-aurora-primary to-aurora-secondary px-7 py-4 font-semibold text-white shadow-glow transition hover:opacity-95"
        >
          {t('cta')} <ArrowRight className="h-5 w-5" />
        </a>
      </div>

      <div className="mt-14">
        <AdSlot label={t('advertisement')} variant="leaderboard" />
      </div>
    </section>
  );
}

function SubjectCard({ subject, topicsLabel }: { subject: Subject; topicsLabel: string }) {
  const Icon = ICONS[subject.icon] ?? BookOpen;

  return (
    <details className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition open:border-aurora-primary/30 open:bg-white/[0.05]">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-white/5">
          <Icon className="h-5 w-5 text-aurora-secondary" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-white">{subject.name}</span>
          <span className="block text-sm text-slate-400">{subject.description}</span>
        </span>
        <span className="hidden flex-none text-xs text-slate-500 sm:block">
          {subject.topics.length} {topicsLabel}
        </span>
        <ChevronDown className="h-5 w-5 flex-none text-slate-400 transition group-open:rotate-180" />
      </summary>

      <ul className="grid gap-3 border-t border-white/5 p-5 sm:grid-cols-2">
        {subject.topics.map((topic) => (
          <li key={topic.title} className="rounded-lg border border-white/5 bg-black/20 p-3">
            <p className="text-sm font-semibold text-white">{topic.title}</p>
            <p className="mt-1 text-sm text-slate-400">{topic.summary}</p>
          </li>
        ))}
      </ul>
    </details>
  );
}
