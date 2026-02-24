import { cn } from '../../lib/utils';

export default function GlassCard({ children, className }) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-white/25 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md',
        className
      )}
    >
      {children}
    </div>
  );
}
