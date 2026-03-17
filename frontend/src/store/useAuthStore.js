import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI, api } from '../api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: true,
      login: async (email, password) => {
        try {
          const response = await authAPI.login({ email, password });
          const { token, user } = response.data.data;
          localStorage.setItem('token', token);
          set({ user, token, loading: false });
          return { success: true };
        } catch (error) {
          return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
      },
      register: async (data) => {
        try {
          const response = await authAPI.register(data);
          const { token, user } = response.data.data;
          localStorage.setItem('token', token);
          set({ user, token, loading: false });
          return { success: true };
        } catch (error) {
          return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
      },
      fetchUser: async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            set({ loading: false });
            return;
          }
          const response = await authAPI.me();
          set({ user: response.data.data, token, loading: false });
        } catch (error) {
          localStorage.removeItem('token');
          set({ user: null, token: null, loading: false });
        }
      },
      logout: () => {
        authAPI.logout();
        api.defaults.headers.common['Authorization'] = null;
        set({ user: null, token: null, loading: false });
      },
      setToken: (token) => set({ token }),
    }),
    {
      name: 'freesiksha-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export default useAuthStore;

