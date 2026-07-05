'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Timer,
  BookOpen,
  ChevronRight,
  AlertCircle,
  Home,
} from 'lucide-react';
import Link from 'next/link';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizSubject {
  subjectId: string;
  subjectName: string;
  questions: QuizQuestion[];
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function prepareQuiz(questions: QuizQuestion[]): QuizQuestion[] {
  return shuffleArray(questions).map((q) => {
    const correctText = q.options[q.correct];
    const shuffledOptions = shuffleArray(q.options);
    const newCorrectIndex = shuffledOptions.indexOf(correctText);
    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex,
    };
  });
}

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subject') || '';
  const systemId = searchParams.get('system') || '';

  const [quizData, setQuizData] = useState<QuizSubject | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean; selected: number }[]>([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  // Timer
  useEffect(() => {
    if (finished || loading) return;
    const interval = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [finished, loading]);

  // Load quiz data
  useEffect(() => {
    if (!subjectId || !systemId) {
      setError('Sınav sistemi ve ders seçilmedi.');
      setLoading(false);
      return;
    }
    const systemMap: Record<string, string> = {
      YKS: 'yks',
      'A-Level': 'alevel',
      DELF: 'delf',
      'Cambridge IGCSE': 'cambridge',
      'MEB (EÖS)': 'eos',
    };
    const fileName = systemMap[systemId] || systemId.toLowerCase().replace(/\s+/g, '-');

    fetch(`/quiz/${fileName}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Quiz verisi bulunamadı');
        return res.json();
      })
      .then((data) => {
        const subject = data.subjects?.find((s: QuizSubject) => s.subjectId === subjectId);
        if (!subject) throw new Error('Bu ders için quiz henüz hazırlanmamış.');
        setQuizData(subject);
        const prepared = prepareQuiz(subject.questions);
        setQuestions(prepared);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [subjectId, systemId]);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + (selectedOption !== null ? 1 : 0)) / questions.length) * 100 : 0;

  const handleSelect = (optionIndex: number) => {
    if (selectedOption !== null || !currentQuestion) return;
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    const isCorrect = optionIndex === currentQuestion.correct;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, correct: isCorrect, selected: optionIndex },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const restart = useCallback(() => {
    if (!quizData) return;
    const prepared = prepareQuiz(quizData.questions);
    setQuestions(prepared);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
    setFinished(false);
    setTimeElapsed(0);
    setReviewMode(false);
  }, [quizData]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-aurora-bg">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-aurora-primary border-t-transparent" />
          <p className="text-sm text-slate-400">Test yükleniyor…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-aurora-bg px-5">
        <div className="max-w-md text-center">
          <AlertCircle className="mx-auto mb-3 h-10 w-10 text-aurora-accent" />
          <h2 className="text-xl font-bold text-white">Hata</h2>
          <p className="mt-2 text-sm text-slate-400">{error}</p>
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-aurora-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            <Home className="h-4 w-4" /> Ana Sayfa
          </Link>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    const getMessage = () => {
      if (percentage >= 90) return 'Mükemmel! 🏆';
      if (percentage >= 70) return 'Çok iyi! 👏';
      if (percentage >= 50) return 'İyi, geliştirebilirsin. 💪';
      return 'Tekrar dene, öğrenmek bir süreç! 📚';
    };

    if (reviewMode) {
      return (
        <div className="min-h-screen bg-aurora-bg px-5 py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gözden Geçir</h2>
              <button
                onClick={() => setReviewMode(false)}
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Sonuçlara Dön
              </button>
            </div>
            <div className="space-y-4">
              {questions.map((q, i) => {
                const ans = answers[i];
                const isCorrect = ans?.correct;
                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border p-5 ${
                      isCorrect ? 'border-emerald-400/20 bg-emerald-400/5' : 'border-red-400/20 bg-red-400/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-400" />
                      ) : (
                        <XCircle className="mt-0.5 h-5 w-5 flex-none text-red-400" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-white">
                          {i + 1}. {q.question}
                        </p>
                        <div className="mt-2 space-y-1">
                          {q.options.map((opt, oi) => (
                            <div
                              key={oi}
                              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                                oi === q.correct
                                  ? 'bg-emerald-400/10 text-emerald-300'
                                  : oi === ans?.selected && !isCorrect
                                  ? 'bg-red-400/10 text-red-300'
                                  : 'text-slate-400'
                              }`}
                            >
                              <span className="font-bold">{LETTERS[oi]}.</span> {opt}
                            </div>
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-slate-400">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-xl bg-aurora-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                <RotateCcw className="h-4 w-4" /> Tekrar Dene
              </button>
              <Link
                href="/#curriculum"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                <BookOpen className="h-4 w-4" /> Müfredata Dön
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-aurora-bg px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center"
        >
          <Trophy className="mx-auto mb-4 h-12 w-12 text-aurora-accent" />
          <h2 className="text-3xl font-black text-white">{getMessage()}</h2>
          <p className="mt-1 text-sm text-slate-400">
            {quizData?.subjectName} — {systemId}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
              <p className="text-2xl font-black text-emerald-400">{score}</p>
              <p className="text-xs text-slate-400">Doğru</p>
            </div>
            <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-4">
              <p className="text-2xl font-black text-red-400">{questions.length - score}</p>
              <p className="text-xs text-slate-400">Yanlış</p>
            </div>
            <div className="rounded-2xl border border-aurora-primary/20 bg-aurora-primary/5 p-4">
              <p className="text-2xl font-black text-aurora-primary">{percentage}%</p>
              <p className="text-xs text-slate-400">Başarı</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1 text-sm text-slate-400">
            <Timer className="h-4 w-4" />
            {formatTime(timeElapsed)}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={restart}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-aurora-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              <RotateCcw className="h-4 w-4" /> Tekrar Dene (Karıştır)
            </button>
            <button
              onClick={() => setReviewMode(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              <BookOpen className="h-4 w-4" /> Gözden Geçir
            </button>
            <Link
              href="/#curriculum"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              <Home className="h-4 w-4" /> Müfredata Dön
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aurora-bg px-5 py-24">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">{quizData?.subjectName}</h1>
            <p className="text-xs text-slate-400">{systemId}</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span className="rounded-lg border border-white/10 px-3 py-1.5">
              {score}/{currentIndex + (selectedOption !== null ? 1 : 0)} Doğru
            </span>
            <span className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5">
              <Timer className="h-3.5 w-3.5" />
              {formatTime(timeElapsed)}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-slate-400">
            <span>Soru {currentIndex + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-aurora-primary to-aurora-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-lg font-semibold leading-relaxed text-white">
                {currentQuestion.question}
              </p>

              <div className="mt-6 grid gap-3">
                {currentQuestion.options.map((option, index) => {
                  let state: 'default' | 'correct' | 'wrong' | 'selected' = 'default';
                  if (selectedOption !== null) {
                    if (index === currentQuestion.correct) state = 'correct';
                    else if (index === selectedOption) state = 'wrong';
                  } else if (selectedOption === index) {
                    state = 'selected';
                  }

                  const stateClasses = {
                    default: 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-aurora-primary/40 hover:bg-white/[0.05]',
                    correct: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
                    wrong: 'border-red-400/40 bg-red-400/10 text-red-300',
                    selected: 'border-aurora-primary/40 bg-aurora-primary/10 text-white',
                  };

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={selectedOption !== null}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition ${stateClasses[state]}`}
                    >
                      <span
                        className={`grid h-8 w-8 flex-none place-items-center rounded-lg text-xs font-bold ${
                          state === 'correct'
                            ? 'bg-emerald-400/20 text-emerald-300'
                            : state === 'wrong'
                            ? 'bg-red-400/20 text-red-300'
                            : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {state === 'correct' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : state === 'wrong' ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          LETTERS[index]
                        )}
                      </span>
                      <span className="flex-1">{option}</span>
                      {state === 'correct' && <CheckCircle2 className="h-5 w-5 flex-none text-emerald-400" />}
                      {state === 'wrong' && <XCircle className="h-5 w-5 flex-none text-red-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="rounded-xl border border-aurora-primary/20 bg-aurora-primary/5 p-4">
                      <p className="text-sm font-semibold text-aurora-primary">Açıklama</p>
                      <p className="mt-1 text-sm text-slate-300">{currentQuestion.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next button */}
              <AnimatePresence>
                {selectedOption !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex justify-end"
                  >
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-aurora-primary to-aurora-secondary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                    >
                      {currentIndex < questions.length - 1 ? (
                        <>
                          Sonraki Soru <ArrowRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Sonuçları Gör <Trophy className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom nav */}
        <div className="mt-6 flex items-center justify-between">
          <Link
            href="/#curriculum"
            className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Müfredata Dön
          </Link>
          <p className="text-xs text-slate-500">
            Her denemede sorular ve seçenekler otomatik karıştırılır
          </p>
        </div>
      </div>
    </div>
  );
}
