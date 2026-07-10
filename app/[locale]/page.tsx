import { setRequestLocale } from 'next-intl/server';
import GradeAILanding from '@/components/GradeAILanding';

// New "Grade AI" landing — animated Higgs-field video background with the
// full marketing page layered over it. The previous homepage is preserved at
// /[locale]/classic.
export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <GradeAILanding />;
}
