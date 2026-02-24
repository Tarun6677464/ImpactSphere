import { authApi } from '../lib/api';
import { useAuthStore } from '../store/authStore';

export default function useAuth() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logoutStore = useAuthStore((s) => s.logout);

  const login = async (payload) => {
    const data = await authApi.login(payload);
    const profile = {
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role
    };
    setAuth(data.token, profile);
    return profile;
  };

  const register = async (payload) => {
    const data = await authApi.register(payload);
    const profile = {
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role
    };
    setAuth(data.token, profile);
    return profile;
  };

  return {
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout: logoutStore
  };
}
