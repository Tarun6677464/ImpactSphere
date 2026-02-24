import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import Button from '../components/Button';
import Input from '../components/Input';
import { donationApi } from '../lib/api';
import { getApiErrorMessage } from '../lib/errors';

const schema = z.object({
  donorName: z.string().min(2, 'Donor name is required'),
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  donationType: z.string().min(2, 'Donation type is required'),
  programCategory: z.string().min(2, 'Program category is required'),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['RECEIVED', 'PROCESSING', 'COMPLETED', 'FAILED'])
});

export default function DonationsPage() {
  const [filter, setFilter] = useState({ status: '', category: '' });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      donorName: '',
      amount: '',
      donationType: 'CASH',
      programCategory: '',
      date: '',
      status: 'RECEIVED'
    }
  });

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await donationApi.list({
        page: 0,
        size: 20,
        status: filter.status || undefined,
        category: filter.category || undefined
      });
      setData(response.content || []);
    } catch (e) {
      setError(getApiErrorMessage(e, 'Failed to load donations'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (values) => {
    try {
      await donationApi.create(values);
      toast.success('Donation submitted');
      reset({ donorName: '', amount: '', donationType: 'CASH', programCategory: '', date: '', status: 'RECEIVED' });
      await load();
    } catch (e) {
      toast.error(getApiErrorMessage(e, 'Failed to create donation'));
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Donations</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Track donations with validation and filtering</p>
      </div>

      <form className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 dark:border-slate-800 dark:bg-slate-900" onSubmit={handleSubmit(submit)}>
        <Input label="Donor Name" {...register('donorName')} error={errors.donorName?.message} />
        <Input label="Amount" type="number" step="0.01" {...register('amount')} error={errors.amount?.message} />
        <Input label="Donation Type" {...register('donationType')} error={errors.donationType?.message} />
        <Input label="Program Category" {...register('programCategory')} error={errors.programCategory?.message} />
        <Input label="Date" type="date" {...register('date')} error={errors.date?.message} />
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Status
          <select {...register('status')} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
            <option value="RECEIVED">Received</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
          </select>
        </label>
        <div className="md:col-span-2">
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Donation'}</Button>
        </div>
      </form>

      <div className="grid gap-3 md:grid-cols-3">
        <Input label="Filter by Category" value={filter.category} onChange={(e) => setFilter((prev) => ({ ...prev, category: e.target.value }))} />
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Filter by Status
          <select className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" value={filter.status} onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))}>
            <option value="">All</option>
            <option value="RECEIVED">Received</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
          </select>
        </label>
        <div className="flex items-end"><Button type="button" variant="secondary" onClick={load}>Apply Filters</Button></div>
      </div>

      {error ? <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">{error}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center">No donations found</td></tr>
            ) : (
              data.map((d) => (
                <tr key={d.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-3">{d.donorName}</td>
                  <td className="px-4 py-3">{d.amount}</td>
                  <td className="px-4 py-3">{d.donationType}</td>
                  <td className="px-4 py-3">{d.programCategory}</td>
                  <td className="px-4 py-3">{d.date}</td>
                  <td className="px-4 py-3">{d.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
