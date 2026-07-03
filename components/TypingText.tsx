'use client';

import { useEffect, useState } from 'react';

interface Props {
  text: string;
  /** ms per character */
  speed?: number;
  className?: string;
}

/**
 * Types [text] out character by character with a blinking cursor. A hidden copy
 * of the full string reserves the final box so the layout never reflows, and an
 * `sr-only` copy keeps it accessible. Respects `prefers-reduced-motion`.
 */
export default function TypingText({ text, speed = 70, className = '' }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setCount(text.length);
      return;
    }

    setCount(0);
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  const done = count >= text.length;

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Reserves the full box → no layout shift while typing */}
      <span className="invisible" aria-hidden="true">
        {text}
      </span>
      {/* Animated overlay */}
      <span className="absolute inset-0" aria-hidden="true">
        {text.slice(0, count)}
        <span className={`typing-cursor ${done ? 'typing-cursor--blink' : ''}`}>|</span>
      </span>
      {/* Accessible full text */}
      <span className="sr-only">{text}</span>
    </span>
  );
}
