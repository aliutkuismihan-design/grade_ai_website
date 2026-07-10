'use client';

import dynamic from 'next/dynamic';

// `ssr: false` is only allowed in Client Components (Next 16), so the
// lazy-loaded heavy sections are re-exported from this client boundary.
export const InteractiveDemo = dynamic(() => import('@/components/InteractiveDemo'), {
  ssr: false,
});
export const GradeLevels = dynamic(() => import('@/components/GradeLevels'), { ssr: false });
export const CurriculumHub = dynamic(() => import('@/components/CurriculumHub'), { ssr: false });
