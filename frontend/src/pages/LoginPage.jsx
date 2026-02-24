import { Link } from 'react-router-dom';
import LoginFormCard from '../components/auth/LoginFormCard';
import FullScreenBackground from '../components/layout/FullScreenBackground';

export default function LoginPage() {
  return (
    <FullScreenBackground backgroundClass="bg-ngo-login">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="text-center text-white">
          <p className="text-4xl font-bold tracking-wide sm:text-5xl">Impact Sphere</p>
          <p className="mt-2 text-sm text-slate-100 sm:text-base">Be the Change. Join the Movement.</p>
        </div>

        <LoginFormCard
          title="Login"
          subtitle="Secure access for admins, volunteers, and corporate partners."
          helperText="Use role-specific portals for dedicated admin and volunteer sign-in experiences."
        />

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white">
          <Link to="/login/admin" className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 font-medium transition hover:bg-white/20">
            Admin Login
          </Link>
          <Link to="/login/volunteer" className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 font-medium transition hover:bg-white/20">
            Volunteer Login
          </Link>
        </div>
      </div>
    </FullScreenBackground>
  );
}
