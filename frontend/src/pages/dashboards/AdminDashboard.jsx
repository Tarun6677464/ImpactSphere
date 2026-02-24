import { BarChart3, ClipboardCheck, HandCoins, PawPrint } from 'lucide-react';
import DashboardHero from '../../components/dashboard/DashboardHero';
import MetricCard from '../../components/dashboard/MetricCard';

const HERO = 'https://images.unsplash.com/photo-1469571486292-b53601010376?auto=format&fit=crop&w=1600&q=80';

export default function AdminDashboard({ data }) {
  const quickActions = [
    'Review corporate proposals',
    'Approve scholarship applications',
    'Monitor donation anomalies',
    'Publish monthly impact report'
  ];

  return (
    <div className="space-y-5">
      <DashboardHero
        title="Admin Command Center"
        subtitle="Empowering NGOs. Connecting Communities. Driving Impact."
        imageUrl={HERO}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Donations" value={data.totalDonations} helper="Across all supported programs" />
        <MetricCard title="Corporate Funding Approved" value={data.totalCorporateFundingApproved} helper="Approved proposal value" />
        <MetricCard title="Active Programs" value={data.activeAnimalPrograms} helper="Programs currently running" />
        <MetricCard title="Scholarship Applications" value={data.scholarshipApplicationCount} helper="Applications in system" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 size={16} />
            <h2 className="text-lg font-semibold">Monthly Analytics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-2 pr-3">Month</th>
                  <th className="py-2 pr-3">Donations</th>
                  <th className="py-2 pr-3">Corporate Approved</th>
                  <th className="py-2">Scholarships</th>
                </tr>
              </thead>
              <tbody>
                {data.monthlyStatistics?.map((row) => (
                  <tr key={row.month} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="py-2 pr-3">{row.month}</td>
                    <td className="py-2 pr-3">{row.totalDonations}</td>
                    <td className="py-2 pr-3">{row.approvedCorporateFunding}</td>
                    <td className="py-2">{row.scholarshipApplications}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {quickActions.map((a, i) => (
              <li key={a} className="flex items-start gap-2 rounded-xl border border-slate-100 p-2 dark:border-slate-800">
                {i % 2 === 0 ? <ClipboardCheck size={15} className="mt-0.5" /> : i % 3 === 0 ? <PawPrint size={15} className="mt-0.5" /> : <HandCoins size={15} className="mt-0.5" />}
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
