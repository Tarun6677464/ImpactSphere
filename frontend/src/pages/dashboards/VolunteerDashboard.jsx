import { HeartHandshake, PawPrint, GraduationCap } from 'lucide-react';
import DashboardHero from '../../components/dashboard/DashboardHero';
import MetricCard from '../../components/dashboard/MetricCard';

const HERO = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1600&q=80';

export default function VolunteerDashboard({ data }) {
  return (
    <div className="space-y-5">
      <DashboardHero
        title="Volunteer Impact Dashboard"
        subtitle="See where your efforts create the strongest community outcomes."
        imageUrl={HERO}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard title="Donations Overview" value={data.totalDonations} helper="Total donations raised" />
        <MetricCard title="Active Programs" value={data.activePrograms} helper="Programs currently delivering impact" />
        <MetricCard title="Scholarships Available" value={data.scholarshipsAvailable} helper="Open opportunities" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center gap-2"><HeartHandshake size={16} /><h2 className="text-lg font-semibold">Volunteer Activity Feed</h2></div>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {data.activityFeed?.length ? data.activityFeed.map((a, i) => (
              <li key={`${a}-${i}`} className="rounded-xl border border-slate-100 p-2 dark:border-slate-800">{a}</li>
            )) : <li className="text-slate-500">No recent activity yet.</li>}
          </ul>
        </section>

        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">NGO Impact Highlight</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{data.impactHighlight}</p>
          <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p className="inline-flex items-center gap-2"><PawPrint size={14} /> Animal welfare acceleration</p>
            <p className="inline-flex items-center gap-2"><GraduationCap size={14} /> Education access expansion</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
