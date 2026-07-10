'use client';

import { useEffect, useRef } from 'react';

/**
 * Higgsfield AI aurora video pinned behind the whole page. Instead of playing,
 * the video is scrubbed: page scroll progress maps to video time (eased with a
 * lerp so it drifts smoothly after the scroll stops). Falls back to the static
 * poster frame under `prefers-reduced-motion`.
 */
export default function ScrollVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let target = 0; // scroll progress 0..1
    let current = 0; // eased progress actually applied to the video
    let duration = 0;
    let raf = 0;

    const onMeta = () => {
      duration = v.duration;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const tick = () => {
      if (duration && Math.abs(target - current) > 0.0005) {
        current += (target - current) * 0.08;
        v.currentTime = current * (duration - 0.05);
      }
      raf = requestAnimationFrame(tick);
    };

    v.pause(); // scrubbed, never played
    if (v.readyState >= 1) onMeta();
    else v.addEventListener('loadedmetadata', onMeta);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener('loadedmetadata', onMeta);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/media/aurora-loop.mp4"
        poster="/media/aurora-loop.webp"
        muted
        playsInline
        preload="auto"
      />
      {/* keep the page readable: dim the video toward the theme background */}
      <div className="absolute inset-0 bg-aurora-bg/60" />
    </div>
  );
}
