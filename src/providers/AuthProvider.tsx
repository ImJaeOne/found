'use client';

import { createAuthStore, AuthStore } from '@/services/userStore';
import { ReactNode, useRef } from 'react';
import { createContext, useContext } from 'react';
import { StoreApi, useStore } from 'zustand';

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null);

// Provider
export const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
  // Zustand 스토어를 생성
  const storeRef = useRef<AuthStoreApi>();
  if (storeRef.current === null) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current!}>
      {children}
    </AuthStoreContext.Provider>
  );
};

// AuthStore를 호출하는 커스텀 훅
export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(
      'Provider 사용 오류! : AuthStoreProvider 내부에서 사용해야합니다.',
    );
  }

  return useStore(authStoreContext, selector);
};
