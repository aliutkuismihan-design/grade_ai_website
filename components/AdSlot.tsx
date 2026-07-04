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
  const dims = variant === 'leaderboard' ? '728 × 90' : variant === 'box' ? '300 × 250' : '300 × 120';

  return (
    <div className={`mx-auto w-full ${maxW} ${className}`}>
      <p className="mb-1 text-center text-[10px] font-medium uppercase tracking-widest text-slate-700">
        {label}
      </p>
      <div
        className={`grid ${height} place-items-center rounded-lg border border-dashed border-white/5 bg-white/[0.01] text-xs text-slate-700 transition hover:border-white/10 hover:bg-white/[0.03]`}
      >
        {/* Replace with real ad unit */}
        <span>{dims}</span>
      </div>
    </div>
  );
}
