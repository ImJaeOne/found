import { supabase } from './supabaseClient';

//-----구글 로그인 로직-----
export const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('구글 로그인 error : ', error);
    return;
  }
};

//-----카카오 로그인 로직-----
export const kakaoLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('카카오 로그인 error : ', error);
    return;
  }

  if (data) {
    console.log(data);
  }
};
