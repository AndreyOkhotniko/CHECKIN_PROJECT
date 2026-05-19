import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { UserType } from '@/types/UserType';

interface AuthStore {
  user: UserType | null;
  //role: 'obj' | 'subj' | null;
  accessToken: string | null;
  login: (user: UserType, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => {
        return {
          user: null,
          //role: null,
          accessToken: null,
          login: (candidate, token) => {
            set(() => ({ user: candidate, accessToken: token }));
          },
          logout: () => {
            set(() => ({ user: null, accessToken: null }));
          },
        };
      },
      {
        name: 'auth',
        partialize: (state) => ({
          user: state.user,
          //role: state.role,
        }),
      },
    ),
    { name: 'AuthStore' },
  ),
);

export default useAuthStore;
