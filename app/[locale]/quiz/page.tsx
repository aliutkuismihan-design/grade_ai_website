import { Suspense } from 'react';
import QuizGame from '@/components/QuizGame';

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-aurora-bg">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-aurora-primary border-t-transparent" />
        <p className="text-sm text-slate-400">Test yükleniyor…</p>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<Loading />}>
      <QuizGame />
    </Suspense>
  );
}