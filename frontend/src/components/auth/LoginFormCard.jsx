import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import Button from '../Button';
import Input from '../Input';
import useAuth from '../../hooks/useAuth';
import { getApiErrorMessage } from '../../lib/errors';
import GlassCard from '../layout/GlassCard';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export default function LoginFormCard({
  title,
  subtitle,
  roleGuard,
  roleGuardMessage,
  helperText,
  showRegisterLink = true
}) {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  const onSubmit = async (values) => {
    try {
      const profile = await login(values);
      if (roleGuard && !roleGuard(profile)) {
        logout();
        throw new Error(roleGuardMessage || 'You do not have access to this login portal');
      }
      toast.success('Welcome back');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || getApiErrorMessage(error, 'Login failed'));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="w-full max-w-md">
      <GlassCard>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="mb-6 mt-2 text-sm text-slate-100">{subtitle}</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit" className="w-full" disabled={isSubmitting} aria-label="Login">
            {isSubmitting ? 'Signing in...' : 'Login'}
          </Button>
        </form>

        {helperText ? <p className="mt-4 text-sm text-slate-200">{helperText}</p> : null}

        {showRegisterLink ? (
          <p className="mt-4 text-sm text-slate-100">
            Need an account? <Link className="font-semibold text-orange-300 underline transition hover:text-orange-200" to="/register">Register</Link>
          </p>
        ) : null}
      </GlassCard>
    </motion.div>
  );
}
