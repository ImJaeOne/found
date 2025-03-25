import { UserData } from '@/types/users';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { fetchUserIdFinding } from './usersServices';

export type AuthState = {
  isAuthenticated: boolean;
  user: UserData | null;
};

export type AuthActions = {
  setLogin: (userData: UserData) => Promise<void>;
  setLogout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()(
    persist(
      immer((set) => ({
        ...initState,

        // 로그인
        setLogin: async (userData: UserData) => {
          const { id, is_finding } = (await fetchUserIdFinding(
            userData.sub,
          )) || { id: null, is_finding: false };

          set((state) => {
            state.user = {
              id,
              sub: userData.sub,
              nickname: userData.nickname,
              profile: userData.profile,
              bio: userData.bio,
              categroies: userData.categories,
              isFinding: is_finding,
            };

            state.isAuthenticated = true;
          });
        },

        // 로그아웃
        setLogout: () => {
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
          });
        },
      })),
      {
        name: 'auth-storage',
      },
    ),
  );
};
