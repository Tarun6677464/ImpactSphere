import { motion } from 'framer-motion';
import {
  Building2,
  GraduationCap,
  HandHeart,
  LayoutDashboard,
  LogOut,
  PawPrint,
  PiggyBank
} from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ThemeToggle from '../components/ui/ThemeToggle';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'CORPORATE', 'VOLUNTEER'] },
  { to: '/donations', label: 'Donations', icon: PiggyBank, roles: ['ADMIN', 'CORPORATE', 'VOLUNTEER'] },
  { to: '/corporate-funding', label: 'Corporate Funding', icon: Building2, roles: ['ADMIN', 'CORPORATE', 'VOLUNTEER'] },
  { to: '/animal-welfare', label: 'Animal Welfare', icon: PawPrint, roles: ['ADMIN', 'VOLUNTEER'] },
  { to: '/scholarships', label: 'Scholarships', icon: GraduationCap, roles: ['ADMIN', 'VOLUNTEER'] }
];

const roleTone = {
  ADMIN: 'bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300',
  CORPORATE: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300',
  VOLUNTEER: 'bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300'
};

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const filteredNav = navItems.filter((item) => item.roles.includes(user?.role));

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="inline-flex items-center gap-3">
            <span className="rounded-xl bg-slate-900 p-2 text-white shadow-sm dark:bg-white dark:text-slate-900"><HandHeart size={16} /></span>
            <div>
              <p className="text-lg font-semibold">Impact Sphere</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Empowering NGOs. Connecting Communities. Driving Impact.</p>
            </div>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <ThemeToggle />
            <span className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:block ${roleTone[user?.role] || 'bg-slate-100 text-slate-700'}`}>
              {user?.role || 'USER'}
            </span>
            <span className="hidden text-slate-600 dark:text-slate-300 md:block">{user?.fullName}</span>
            <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 lg:grid-cols-[250px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/85">
          <ul className="space-y-1">
            {filteredNav.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    <Icon size={16} />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </aside>

        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/85"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
