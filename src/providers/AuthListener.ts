'use client';

import { TABLE_NAME } from '@/constants/constants';
import { useAuthStore } from '@/providers/AuthProvider';
import { supabase } from '@/services/supabaseClient';
import { useEffect } from 'react';

const AuthListner = () => {
  const setLogin = useAuthStore((state) => state.setLogin);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // 데이터 가져오기 : id, 닉네임, 프로필 이미지
          const userId = session.user.id;
          const nickname =
            session.user.user_metadata.name ||
            `Founie${Math.floor(Math.random() * 10000)}`;
          const profile =
            session.user.user_metadata.avatar_url ||
            `/images/found_default_profile0${Math.floor(Math.random() * 6)}.png`;

          // supabase => public.users에 추가
          const { error: updateError } = await supabase
            .from(TABLE_NAME.USER)
            .upsert(
              [
                {
                  user_id: userId,
                  nickname,
                  profile,
                },
              ],
              { onConflict: 'user_id' },
            );

          if (updateError) {
            console.error('소셜 로그인 정보 update 오류', updateError);
          }

          // Zustand 상태 업데이트
          const socialUser = {
            sub: userId,
            nickname,
            profile,
            bio: '',
            address: '',
            categories: [],
          };

          setLogin(socialUser);

          // ✅ DB에도 업데이트
          await supabase.from('users').upsert([
            {
              user_id: session.user.id,
              nickname: session.user.user_metadata?.name || '익명',
            },
          ]);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return null;
};

export default AuthListner;
