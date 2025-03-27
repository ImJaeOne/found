'use client';

import { TABLE_NAME } from '@/constants/constants';
import { supabase } from '@/services/supabaseClient';
import { fetchExistingUser } from '@/services/usersServices';
import { useEffect } from 'react';
import { useAuthStore } from './AuthProvider';

const AuthListner = () => {
  const setLogin = useAuthStore((state) => state.setLogin);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const authProvider = session.user?.app_metadata.provider;
          const userId = session.user?.id;
          const existingUser = await fetchExistingUser(userId);

          // 소셜로그인(구글,카카오)일 경우에만 적용
          if (authProvider === 'google' || authProvider === 'kakao') {
            if (!existingUser) {
              const nickname =
                session.user.user_metadata.name ||
                `Founie${Math.floor(Math.random() * 10000)}`;
              const profile =
                session.user.user_metadata.avatar_url ||
                `/images/found_default_profile0${Math.floor(Math.random() * 6)}.png`;

              const { error: socialUserUpdateError } = await supabase
                .from(TABLE_NAME.USER)
                .upsert(
                  { user_id: userId, nickname, profile },
                  { onConflict: 'user_id' },
                );

              if (socialUserUpdateError) throw socialUserUpdateError;
            }

            const socialUser = await fetchExistingUser(userId);
            setLogin(socialUser);
          }
        }
      },
    );

    return () => authListener?.subscription?.unsubscribe();
  }, [setLogin]);

  return null;
};

export default AuthListner;
