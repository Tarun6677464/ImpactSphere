import { Link } from 'react-router-dom';
import LoginFormCard from '../components/auth/LoginFormCard';
import FullScreenBackground from '../components/layout/FullScreenBackground';

export default function VolunteerLoginPage() {
  return (
    <FullScreenBackground backgroundClass="bg-ngo-volunteer">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="text-center text-white">
          <p className="text-4xl font-bold tracking-wide text-white sm:text-5xl">Impact Sphere</p>
          <p className="mt-2 text-sm font-medium text-orange-300 sm:text-base">Be the Change. Join the Movement.</p>
        </div>

        <LoginFormCard
          title="Volunteer Login"
          subtitle="Coordinate outreach, support beneficiaries, and track meaningful impact."
          roleGuard={(profile) => profile?.role === 'VOLUNTEER'}
          roleGuardMessage="This portal is for volunteer accounts only."
          showRegisterLink={false}
        />

        <Link to="/login" className="text-sm font-medium text-orange-300 underline transition hover:text-orange-200">
          Back to general login
        </Link>
      </div>
    </FullScreenBackground>
  );
}
