'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
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
  Music,
  Palette,
  Dumbbell,
  Monitor,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  FileText,
  Clock,
  Star,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';
import AdSlot from './AdSlot';

export interface Resource {
  name: string;
  url: string;
  type: 'pdf' | 'video' | 'article' | 'official' | 'book';
}
export interface Topic {
  title: string;
  summary: string;
  resources?: Resource[];
  difficulty?: 1 | 2 | 3 | 4 | 5;
  hours?: number;
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
  music: Music,
  palette: Palette,
  dumbbell: Dumbbell,
  monitor: Monitor,
};

const TYPE_LABEL: Record<Resource['type'], string> = {
  pdf: 'PDF',
  video: 'Video',
  article: 'Makale',
  official: 'Resmi',
  book: 'Kitap',
};

const TYPE_COLOR: Record<Resource['type'], string> = {
  pdf: 'text-red-400 border-red-400/20 bg-red-400/10',
  video: 'text-rose-400 border-rose-400/20 bg-rose-400/10',
  article: 'text-sky-400 border-sky-400/20 bg-sky-400/10',
  official: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10',
  book: 'text-amber-400 border-amber-400/20 bg-amber-400/10',
};

function DifficultyStars({ level }: { level?: number }) {
  if (!level) return null;
  return (
    <span className="inline-flex items-center gap-0.5" title={`Zorluk: ${level}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < level ? 'text-aurora-accent fill-aurora-accent' : 'text-slate-600'}`}
        />
      ))}
    </span>
  );
}

export default function CurriculumHub({ systems }: { systems: CurriculumData[] }) {
  const t = useTranslations('curriculum');
  const [active, setActive] = useState(0);

  return (
    <section id="curriculum" className="mx-auto max-w-5xl px-5 pb-24 pt-32">
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
                <SubjectCard
                  subject={subject}
                  examSystem={sys.examSystem}
                  topicsLabel={t('topics')}
                  resourcesLabel={t('resources')}
                  quizLabel={t('quiz') || 'Test Et'}
                />
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
        <Link
          href="/#download"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-aurora-primary to-aurora-secondary px-7 py-4 font-semibold text-white shadow-glow transition hover:opacity-95"
        >
          {t('cta')} <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="mt-14">
        <AdSlot label={t('advertisement')} variant="leaderboard" />
      </div>
    </section>
  );
}

function SubjectCard({
  subject,
  examSystem,
  topicsLabel,
  resourcesLabel,
  quizLabel,
}: {
  subject: Subject;
  examSystem: string;
  topicsLabel: string;
  resourcesLabel: string;
  quizLabel: string;
}) {
  const Icon = ICONS[subject.icon] ?? BookOpen;
  const [isOpen, setIsOpen] = useState(false);
  const totalHours = subject.topics.reduce((sum, t) => sum + (t.hours ?? 0), 0);
  const avgDifficulty = subject.topics.length
    ? Math.round(
        subject.topics.reduce((sum, t) => sum + (t.difficulty ?? 0), 0) / subject.topics.length,
      )
    : 0;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition ${
        isOpen ? 'border-aurora-primary/30 bg-white/[0.05]' : ''
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center gap-4 p-5 text-left"
      >
        <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-white/5">
          <Icon className="h-5 w-5 text-aurora-secondary" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-white">{subject.name}</span>
          <span className="block text-sm text-slate-400">{subject.description}</span>
          <span className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="hidden sm:inline">
              {subject.topics.length} {topicsLabel}
            </span>
            {avgDifficulty > 0 && (
              <span className="flex items-center gap-1">
                <DifficultyStars level={avgDifficulty} />
              </span>
            )}
            {totalHours > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                ~{totalHours} saat
              </span>
            )}
          </span>
        </span>
        <Link
          href={`/quiz?subject=${encodeURIComponent(subject.id)}&system=${encodeURIComponent(examSystem)}`}
          onClick={(e) => e.stopPropagation()}
          className="mr-2 hidden flex-none items-center gap-1.5 rounded-lg border border-aurora-primary/30 bg-aurora-primary/10 px-3 py-1.5 text-xs font-semibold text-aurora-primary transition hover:bg-aurora-primary/20 sm:inline-flex"
        >
          <ClipboardList className="h-3.5 w-3.5" />
          {quizLabel}
        </Link>
        <span className="hidden flex-none text-xs text-slate-500 sm:block">
          {subject.topics.length} {topicsLabel}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Mobile quiz button */}
      <div className="px-5 pb-3 sm:hidden">
        <Link
          href={`/quiz?subject=${encodeURIComponent(subject.id)}&system=${encodeURIComponent(examSystem)}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-aurora-primary/30 bg-aurora-primary/10 px-4 py-2 text-xs font-semibold text-aurora-primary transition hover:bg-aurora-primary/20"
        >
          <ClipboardList className="h-3.5 w-3.5" />
          {quizLabel}
        </Link>
      </div>

      {isOpen && (
        <div className="border-t border-white/5">
          <ul className="grid gap-4 p-5 sm:grid-cols-2">
            {subject.topics.map((topic) => (
              <li
                key={topic.title}
                className="rounded-xl border border-white/5 bg-black/20 p-4 transition hover:border-white/10 hover:bg-black/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{topic.title}</p>
                  <div className="flex flex-none items-center gap-1.5">
                    {topic.difficulty && <DifficultyStars level={topic.difficulty} />}
                    {topic.hours && (
                      <span className="flex items-center gap-0.5 text-[10px] text-slate-500">
                        <Clock className="h-3 w-3" />
                        {topic.hours}h
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{topic.summary}</p>

                {/* Resources / Documents */}
                {topic.resources && topic.resources.length > 0 && (
                  <div className="mt-3">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      {resourcesLabel}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.resources.map((res) => (
                        <a
                          key={res.name}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium transition hover:opacity-80 ${
                            TYPE_COLOR[res.type]
                          }`}
                        >
                          {res.type === 'pdf' && <FileText className="h-3 w-3" />}
                          {res.type === 'video' && <ExternalLink className="h-3 w-3" />}
                          {res.type === 'article' && <FileText className="h-3 w-3" />}
                          {res.type === 'official' && <ExternalLink className="h-3 w-3" />}
                          {res.type === 'book' && <BookOpen className="h-3 w-3" />}
                          {res.name}
                          <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
