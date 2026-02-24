import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import useAuth from '../hooks/useAuth';
import { animalService } from '../services';

export default function AnimalWelfarePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', description: '', fundingTarget: '', startDate: '', endDate: '' });
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState('');

  const canCreate = user?.role === 'ADMIN';
  const load = () => animalService.list().then(setPrograms).catch((e) => setError(e?.response?.data?.message || 'Failed to fetch programs'));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await animalService.create({ ...form, fundingTarget: Number(form.fundingTarget) });
      setForm({ name: '', description: '', fundingTarget: '', startDate: '', endDate: '' });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create program');
    }
  };

  return (
    <section className="relative -m-5 min-h-[calc(100vh-10rem)] overflow-hidden bg-ngo-animal bg-cover bg-center bg-no-repeat p-5 sm:p-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60" aria-hidden="true" />
      <div className="relative z-10 space-y-5 text-white">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold">Protecting Every Paw, Creating a Better Tomorrow.</h1>
          <p className="max-w-3xl text-sm text-slate-100 sm:text-base">
            Our NGO animal welfare mission rescues abandoned animals, supports shelter ecosystems, and funds veterinary care so every vulnerable life receives protection, treatment, and a safe path to recovery.
          </p>
        </header>

        {canCreate ? (
          <form className="grid gap-3 rounded-2xl border border-white/25 bg-white/10 p-5 shadow-2xl backdrop-blur-md md:grid-cols-2" onSubmit={submit}>
            <Input label="Program Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
            <Input label="Funding Target" type="number" value={form.fundingTarget} onChange={(e) => setForm({ ...form, fundingTarget: e.target.value })} required labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
            <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200 md:col-span-2" />
            <Input label="Start Date" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
            <Input label="End Date" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} labelClassName="text-white" className="border-white/35 bg-white/90 text-slate-900 focus:border-orange-300 focus:ring-orange-200" />
            <div className="md:col-span-2">
              <Button type="submit">Create Program</Button>
            </div>
          </form>
        ) : null}

        {error ? <p className="rounded-2xl border border-rose-200/70 bg-rose-950/40 p-3 text-sm text-rose-200">{error}</p> : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => {
            const collected = Number(program.collectedAmount || 0);
            const target = Number(program.fundingTarget || 1);
            const progress = Math.min(100, (collected / target) * 100);
            return (
              <article key={program.id} className="rounded-2xl border border-white/25 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
                <p className="text-lg font-semibold">{program.name}</p>
                <p className="mt-1 text-sm text-slate-100">{program.description}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="flex items-center justify-between">
                    <span className="text-slate-100">Target</span>
                    <span className="font-semibold text-orange-300">${target.toLocaleString()}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-100">Collected</span>
                    <span className="font-semibold">${collected.toLocaleString()}</span>
                  </p>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-slate-100">Progress</span>
                      <span className="font-semibold">{progress.toFixed(1)}%</span>
                    </div>
                    <progress className="h-2.5 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-white/20 [&::-webkit-progress-value]:bg-orange-400 [&::-moz-progress-bar]:bg-orange-400" max="100" value={progress} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
