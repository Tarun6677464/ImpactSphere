import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import useAuth from '../hooks/useAuth';
import { scholarshipService } from '../services';

export default function ScholarshipsPage() {
  const { user } = useAuth();
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [schForm, setSchForm] = useState({ name: '', description: '', budget: '' });
  const [appForm, setAppForm] = useState({ fullName: '', email: '', phone: '', statement: '', scholarshipId: '' });

  const load = async () => {
    try {
      const sch = await scholarshipService.list();
      setScholarships(sch);
      if (user?.role === 'ADMIN') {
        const apps = await scholarshipService.listApplications();
        setApplications(apps);
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load scholarship data');
    }
  };

  useEffect(() => { load(); }, []);

  const createScholarship = async (e) => {
    e.preventDefault();
    try {
      await scholarshipService.create({ ...schForm, budget: Number(schForm.budget) });
      setSchForm({ name: '', description: '', budget: '' });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create scholarship');
    }
  };

  const apply = async (e) => {
    e.preventDefault();
    try {
      await scholarshipService.apply({ ...appForm, scholarshipId: Number(appForm.scholarshipId) });
      setAppForm({ fullName: '', email: '', phone: '', statement: '', scholarshipId: '' });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to submit application');
    }
  };

  const review = async (id, status) => {
    try {
      await scholarshipService.reviewApplication(id, { status });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to review application');
    }
  };

  return (
    <section className="relative -m-5 min-h-[calc(100vh-10rem)] overflow-hidden bg-ngo-scholarship bg-cover bg-center bg-no-repeat p-5 sm:p-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60" aria-hidden="true" />
      <div className="relative z-10 space-y-5 text-white">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold">Education for Every Dream.</h1>
          <p className="max-w-3xl text-sm text-slate-100 sm:text-base">
            We support students through transparent scholarships, community-backed funding, and fair review processes that open pathways to long-term educational success.
          </p>
          <a href="#apply-now" className="inline-flex rounded-xl bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-400">
            Apply for Scholarship
          </a>
        </header>

        {user?.role === 'ADMIN' ? (
          <form className="grid gap-3 rounded-2xl border border-white/25 bg-white/10 p-5 shadow-2xl backdrop-blur-md md:grid-cols-2" onSubmit={createScholarship}>
            <Input label="Name" value={schForm.name} onChange={(e) => setSchForm({ ...schForm, name: e.target.value })} required labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
            <Input label="Budget" type="number" value={schForm.budget} onChange={(e) => setSchForm({ ...schForm, budget: e.target.value })} required labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
            <Input label="Description" value={schForm.description} onChange={(e) => setSchForm({ ...schForm, description: e.target.value })} required labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200 md:col-span-2" />
            <div className="md:col-span-2">
              <Button type="submit">Create Scholarship</Button>
            </div>
          </form>
        ) : null}

        <form id="apply-now" className="grid gap-3 rounded-2xl border border-white/25 bg-white/10 p-5 shadow-2xl backdrop-blur-md md:grid-cols-2" onSubmit={apply}>
          <Input label="Applicant Name" value={appForm.fullName} onChange={(e) => setAppForm({ ...appForm, fullName: e.target.value })} required labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
          <Input label="Email" type="email" value={appForm.email} onChange={(e) => setAppForm({ ...appForm, email: e.target.value })} required labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
          <Input label="Phone" value={appForm.phone} onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })} required labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
          <Input label="Statement" value={appForm.statement} onChange={(e) => setAppForm({ ...appForm, statement: e.target.value })} required labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
          <label className="text-sm font-medium text-white">
            Scholarship
            <select
              className="mt-1 w-full rounded-xl border border-white/35 bg-white/90 px-3 py-2 text-slate-900 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
              value={appForm.scholarshipId}
              onChange={(e) => setAppForm({ ...appForm, scholarshipId: e.target.value })}
              required
              aria-label="Scholarship"
            >
              <option value="">Select</option>
              {scholarships.map((scholarship) => <option key={scholarship.id} value={scholarship.id}>{scholarship.name}</option>)}
            </select>
          </label>
          <div className="md:col-span-2">
            <Button type="submit">Submit Application</Button>
          </div>
        </form>

        {error ? <p className="rounded-2xl border border-rose-200/70 bg-rose-950/40 p-3 text-sm text-rose-200">{error}</p> : null}

        <section className="rounded-2xl border border-white/25 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold">Scholarship List</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {scholarships.map((scholarship) => (
              <article key={scholarship.id} className="rounded-xl border border-white/25 bg-white/10 p-4">
                <p className="text-lg font-semibold">{scholarship.name}</p>
                <p className="mt-1 text-sm text-slate-100">{scholarship.description}</p>
                <p className="mt-3 text-sm">
                  Budget: <span className="font-semibold text-orange-300">${Number(scholarship.budget || 0).toLocaleString()}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        {user?.role === 'ADMIN' ? (
          <section className="rounded-2xl border border-white/25 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
            <h2 className="mb-4 text-xl font-semibold">Applications</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {applications.map((application) => (
                <article key={application.id} className="rounded-xl border border-white/25 bg-white/10 p-4">
                  <p className="text-lg font-semibold">{application.fullName}</p>
                  <p className="text-sm text-slate-100">{application.email}</p>
                  <p className="mt-2 text-sm text-slate-100">Scholarship: {application.scholarshipName}</p>
                  <p className="mt-2 text-sm">Status: <span className="font-semibold text-orange-300">{application.status}</span></p>
                  {application.status === 'SUBMITTED' || application.status === 'UNDER_REVIEW' ? (
                    <div className="mt-3 flex gap-2">
                      <Button type="button" variant="secondary" onClick={() => review(application.id, 'APPROVED')}>Approve</Button>
                      <Button type="button" variant="danger" onClick={() => review(application.id, 'REJECTED')}>Reject</Button>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
