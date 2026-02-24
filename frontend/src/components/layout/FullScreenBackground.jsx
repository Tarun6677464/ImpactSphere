import { cn } from '../../lib/utils';

export default function FullScreenBackground({ backgroundClass, overlayClass, children, className }) {
  return (
    <section className={cn('relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat', backgroundClass)}>
      <div className={cn('absolute inset-0 bg-gradient-to-b from-black/70 to-black/60', overlayClass)} aria-hidden="true" />
      <div className={cn('relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6', className)}>
        {children}
      </div>
    </section>
  );
}
