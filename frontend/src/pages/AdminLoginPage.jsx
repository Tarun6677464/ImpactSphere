import { Link } from 'react-router-dom';
import LoginFormCard from '../components/auth/LoginFormCard';
import FullScreenBackground from '../components/layout/FullScreenBackground';

export default function AdminLoginPage() {
  return (
    <FullScreenBackground backgroundClass="bg-ngo-admin">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="text-center text-white">
          <p className="text-4xl font-bold tracking-wide sm:text-5xl">Impact Sphere</p>
          <p className="mt-2 text-sm text-slate-100 sm:text-base">Admin Command Access</p>
        </div>

        <LoginFormCard
          title="Admin Login"
          subtitle="Manage NGO operations, funding approvals, and platform governance."
          roleGuard={(profile) => profile?.role === 'ADMIN'}
          roleGuardMessage="This portal is for admin accounts only."
          showRegisterLink={false}
        />

        <Link to="/login" className="text-sm font-medium text-orange-300 underline transition hover:text-orange-200">
          Back to general login
        </Link>
      </div>
    </FullScreenBackground>
  );
}
