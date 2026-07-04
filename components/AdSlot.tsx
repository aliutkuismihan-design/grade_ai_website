interface Props {
  label: string;
  variant?: 'leaderboard' | 'inline' | 'box';
  className?: string;
}

/**
 * Placeholder ad unit. Drop a real AdSense/ad-network `<ins>` (or iframe) inside
 * the inner box when monetizing. Sized per common IAB slots.
 */
export default function AdSlot({ label, variant = 'inline', className = '' }: Props) {
  const height =
    variant === 'leaderboard' ? 'h-[90px]' : variant === 'box' ? 'h-[250px]' : 'h-[120px]';
  const maxW = variant === 'box' ? 'max-w-[300px]' : 'max-w-3xl';

  return (
    <div className={`mx-auto w-full ${maxW} ${className}`}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-slate-600">
        {label}
      </p>
      <div
        className={`grid ${height} place-items-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-xs text-slate-600`}
      >
        {/* Replace with real ad unit */}
        728 × 90 · 300 × 250
      </div>
    </div>
  );
}
