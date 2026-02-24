import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { analyticsApi } from '../lib/api';
import { getApiErrorMessage } from '../lib/errors';
import useAuth from '../hooks/useAuth';
import Skeleton from '../components/ui/Skeleton';
import AdminDashboard from './dashboards/AdminDashboard';
import CorporateDashboard from './dashboards/CorporateDashboard';
import VolunteerDashboard from './dashboards/VolunteerDashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError('');
        let response;
        if (user?.role === 'ADMIN') response = await analyticsApi.admin();
        if (user?.role === 'CORPORATE') response = await analyticsApi.corporate();
        if (user?.role === 'VOLUNTEER') response = await analyticsApi.volunteer();
        setData(response);
      } catch (e) {
        const message = getApiErrorMessage(e, 'Unable to load dashboard data');
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [user?.role]);

  const Dashboard = useMemo(() => {
    if (!user?.role) return null;
    if (user.role === 'ADMIN') return AdminDashboard;
    if (user.role === 'CORPORATE') return CorporateDashboard;
    return VolunteerDashboard;
  }, [user?.role]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-56" />
        <div className="grid gap-4 md:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28" />)}</div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">{error}</p>;
  }

  if (!Dashboard || !data) return null;

  return <Dashboard data={data} onCreateProposal={() => navigate('/corporate-funding')} />;
}
