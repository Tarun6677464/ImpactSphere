import { motion } from 'framer-motion';

export default function DashboardHero({ title, subtitle, imageUrl }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800"
    >
      <img
        src={imageUrl}
        alt="NGO impact background"
        loading="lazy"
        className="h-56 w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/45 to-transparent" />
      <div className="absolute inset-0 p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-200">ImpactSphere</p>
        <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-100">{subtitle}</p>
      </div>
    </motion.section>
  );
}
