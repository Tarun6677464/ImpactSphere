import { Building2, CheckCircle2, CircleEllipsis, XCircle } from 'lucide-react';
import Button from '../../components/Button';
import DashboardHero from '../../components/dashboard/DashboardHero';
import MetricCard from '../../components/dashboard/MetricCard';

const HERO = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80';

export default function CorporateDashboard({ data, onCreateProposal }) {
  return (
    <div className="space-y-5">
      <DashboardHero
        title="Corporate Partnership Hub"
        subtitle="Track funding proposals, approvals, and measurable social outcomes."
        imageUrl={HERO}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard title="Total Proposals" value={data.totalProposals} />
        <MetricCard title="Pending" value={data.pendingProposals} />
        <MetricCard title="Approved" value={data.approvedProposals} />
        <MetricCard title="Rejected" value={data.rejectedProposals} />
        <MetricCard title="Approved Funding" value={data.totalApprovedFunding} />
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="text-lg font-semibold">Submit New Proposal</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Launch new social impact funding plans.</p>
        </div>
        <Button onClick={onCreateProposal} className="gap-2"><Building2 size={16} /> New Proposal</Button>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">My Submitted Proposals</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Amount</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {data.myProposals?.length ? data.myProposals.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-2 pr-3">{p.title}</td>
                  <td className="py-2 pr-3">{p.requestedAmount}</td>
                  <td className="py-2 pr-3 inline-flex items-center gap-1">{p.status === 'APPROVED' ? <CheckCircle2 size={14} className="text-emerald-500" /> : p.status === 'REJECTED' ? <XCircle size={14} className="text-rose-500" /> : <CircleEllipsis size={14} className="text-amber-500" />}{p.status}</td>
                  <td className="py-2">{p.submittedAt?.slice(0, 10) || '-'}</td>
                </tr>
              )) : (
                <tr><td className="py-6 text-center text-slate-500" colSpan={4}>No proposals yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
