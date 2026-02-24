import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, FolderSearch } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import Button from '../components/Button';
import Input from '../components/Input';
import Skeleton from '../components/ui/Skeleton';
import useAuth from '../hooks/useAuth';
import { corporateApi } from '../lib/api';
import { getApiErrorMessage } from '../lib/errors';

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description is too short'),
  requestedAmount: z.coerce.number().positive('Amount must be greater than zero')
});

const proposalImage =
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80';

export default function CorporateFundingPage() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('');
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => user?.role === 'CORPORATE', [user?.role]);
  const canReview = useMemo(() => user?.role === 'ADMIN', [user?.role]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '', requestedAmount: '' }
  });

  const load = async () => {
    try {
      setLoading(true);
      setForbidden(false);
      setError('');
      const result = await corporateApi.listProposals(statusFilter ? { status: statusFilter } : {});
      setProposals(result);
    } catch (e) {
      if (e?.response?.status === 403) {
        setForbidden(true);
        return;
      }
      setError(getApiErrorMessage(e, 'Failed to fetch proposals'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter]);

  const submit = async (values) => {
    try {
      await corporateApi.createProposal(values);
      toast.success('Proposal submitted successfully');
      reset({ title: '', description: '', requestedAmount: '' });
      await load();
    } catch (e) {
      toast.error(getApiErrorMessage(e, 'Failed to submit proposal'));
    }
  };

  const review = async (id, status) => {
    try {
      await corporateApi.reviewProposal(id, { status });
      toast.success(`Proposal ${status.toLowerCase()}`);
      await load();
    } catch (e) {
      toast.error(getApiErrorMessage(e, 'Review failed'));
    }
  };

  if (forbidden) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
        <div className="flex items-center gap-2 text-lg font-semibold"><AlertTriangle size={18} /> Access restricted</div>
        <p className="mt-2 text-sm">You do not have permission to access this section. Contact an administrator if this is unexpected.</p>
      </div>
    );
  }

  return (
    <section className="relative -m-5 min-h-[calc(100vh-10rem)] overflow-hidden bg-ngo-corporate bg-cover bg-center bg-no-repeat p-5 sm:p-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60" aria-hidden="true" />
      <div className="relative z-10 space-y-5 text-white">
        <div>
          <h1 className="text-3xl font-semibold">Empowering Change Through Corporate Partnerships.</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-100 sm:text-base">
            Impact Sphere aligns CSR investments with verified community programs, providing transparent proposal reviews, clear status updates, and accountable social outcomes.
          </p>
        </div>

        {canSubmit ? (
          <form className="grid gap-3 rounded-2xl border border-white/25 bg-white/10 p-5 shadow-2xl backdrop-blur-md md:grid-cols-2" onSubmit={handleSubmit(submit)}>
            <Input label="Title" {...register('title')} error={errors.title?.message} labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
            <Input label="Requested Amount" type="number" step="0.01" {...register('requestedAmount')} error={errors.requestedAmount?.message} labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
            <Input label="Description" {...register('description')} error={errors.description?.message} labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200 md:col-span-2" />
            <div className="md:col-span-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
              </Button>
            </div>
          </form>
        ) : null}

        <div className="flex items-center gap-3">
          <label htmlFor="status-filter" className="text-sm font-medium">Status Filter</label>
          <select
            id="status-filter"
            className="rounded-xl border border-white/35 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Status filter"
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {error ? <p className="rounded-2xl border border-rose-200/70 bg-rose-950/40 p-3 text-sm text-rose-200">{error}</p> : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl bg-white/20" />)
          ) : proposals.length ? (
            proposals.map((proposal) => (
              <article key={proposal.id} className="overflow-hidden rounded-2xl border border-white/25 bg-white/10 shadow-2xl backdrop-blur-md">
                <img src={proposalImage} alt="Corporate social impact collaboration" className="h-36 w-full object-cover" loading="lazy" />
                <div className="space-y-3 p-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{proposal.corporateName || 'Corporate Partner'}</p>
                    <p className="text-sm text-slate-100">{proposal.title}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-100">Amount</span>
                    <span className="font-semibold text-orange-300">${Number(proposal.requestedAmount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-100">Status</span>
                    <span className="rounded-full border border-white/25 px-2 py-1 text-xs font-semibold">{proposal.status}</span>
                  </div>
                  {canReview && proposal.status === 'PENDING' ? (
                    <div className="flex gap-2">
                      <Button type="button" variant="secondary" onClick={() => review(proposal.id, 'APPROVED')}>Approve</Button>
                      <Button type="button" variant="danger" onClick={() => review(proposal.id, 'REJECTED')}>Reject</Button>
                    </div>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-white/25 bg-white/10 p-8 text-center text-slate-100 shadow-2xl backdrop-blur-md">
              <FolderSearch size={20} className="mx-auto mb-2" />
              <p>No proposals found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
