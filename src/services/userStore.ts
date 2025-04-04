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
  // setLogin: (userData: UserData) => Promise<void>;
  loginWithZustand: (
    userData: Omit<UserData, 'id' | 'is_finding'>,
  ) => Promise<void>;
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

        // 이메일 로그인시 사용하는 로직
        loginWithZustand: async (
          userData: Omit<UserData, 'id' | 'is_finding'>,
        ) => {
          const { id, nickname, is_finding } = (await fetchUserIdFinding(
            userData.sub,
          )) || { id: null, is_finding: false, nickname: null };

          set((state) => {
            state.user = {
              id,
              sub: userData.sub,
              nickname,
              profile: userData.profile,
              bio: userData.bio,
              address: userData.address,
              categories: userData.categories,
              is_finding,
            };

            state.isAuthenticated = true;
          });
        },

        // 소셜로그인시 사용하는 로직
        setLogin: async (userData: UserData) => {
          set((state) => {
            state.user = {
              id: userData?.id,
              sub: userData?.sub,
              nickname: userData?.nickname,
              profile: userData?.profile,
              bio: userData?.bio,
              address: userData?.address,
              categories: userData?.categories,
              is_finding: userData?.is_finding,
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
