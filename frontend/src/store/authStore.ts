import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  user: object;
  role: 'obj' | 'subj' | null;
  accessToken: string | null;
  login: (user: object, token: string) => void;
  logout: () => void;
}

const authStore = create<AuthStore>()(
  persist(
    (set) => {
      return {
        user: {},
        role: null,
        accessToken: null,
        login: (user, token) => {},
        logout: () => {},
      };
    },
    {
      name: 'auth',
      partialize: (state) => ({
        user: state.user,
        role: state.role,
      }),
    },
  ),
);

export default authStore;
