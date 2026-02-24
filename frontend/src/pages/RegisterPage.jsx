import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import useAuth from '../hooks/useAuth';
import { getApiErrorMessage } from '../lib/errors';
import FullScreenBackground from '../components/layout/FullScreenBackground';
import GlassCard from '../components/layout/GlassCard';

const schema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['VOLUNTEER', 'CORPORATE', 'ADMIN'])
});

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema), defaultValues: { fullName: '', email: '', password: '', role: 'VOLUNTEER' } });

  const onSubmit = async (values) => {
    try {
      await registerUser(values);
      toast.success('Account created');
      navigate('/dashboard');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Registration failed'));
    }
  };

  return (
    <FullScreenBackground backgroundClass="bg-ngo-register">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="text-center text-white">
          <p className="text-4xl font-bold tracking-wide sm:text-5xl">Impact Sphere</p>
          <p className="mt-2 text-sm text-slate-100 sm:text-base">Create your account and drive community impact.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="w-full max-w-md">
          <GlassCard>
            <h1 className="mb-1 text-3xl font-semibold text-white">Register</h1>
            <p className="mb-6 text-sm text-slate-100">Join the platform as a volunteer, corporate partner, or admin.</p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Full Name"
                {...register('fullName')}
                error={errors.fullName?.message}
                labelClassName="text-white"
                className="border-white/35 bg-white/90 text-slate-900 placeholder:text-slate-500 focus:border-orange-300 focus:ring-orange-200"
              />
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                labelClassName="text-white"
                className="border-white/35 bg-white/90 text-slate-900 placeholder:text-slate-500 focus:border-orange-300 focus:ring-orange-200"
              />
              <Input
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                labelClassName="text-white"
                className="border-white/35 bg-white/90 text-slate-900 placeholder:text-slate-500 focus:border-orange-300 focus:ring-orange-200"
              />
              <label className="block text-sm font-medium text-white">
                Role
                <select
                  {...register('role')}
                  aria-label="Role"
                  className="mt-1 w-full rounded-xl border border-white/35 bg-white/90 px-3 py-2 text-slate-900 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
                >
                  <option value="VOLUNTEER">Volunteer</option>
                  <option value="CORPORATE">Corporate</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </label>
              <Button type="submit" className="w-full" disabled={isSubmitting} aria-label="Create account">
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <p className="mt-4 text-sm text-slate-100">
              Already have an account? <Link className="font-semibold text-orange-300 underline transition hover:text-orange-200" to="/login">Sign in</Link>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </FullScreenBackground>
  );
}
