import { AuthInputs, UserMetaData } from '@/types/users';
import { supabase } from './supabaseClient';
import { AuthError, Session, User } from '@supabase/supabase-js';
import { QUERY_KEY } from '@/constants/constants';

//-----로그인 로직-----
export const login = async (
  currentUser: Pick<AuthInputs, 'email' | 'password'>,
) => {
  const { data, error } = await supabase.auth.signInWithPassword(currentUser);

  return { data, error };
};

//-----회원가입 로직-----
interface SignupResponse {
  data:
    | { user: User | null; session: Session | null }
    | { user: null; session: null };
  error: AuthError | null;
}

export const signup = async (
  newUserData: UserMetaData,
): Promise<SignupResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp(newUserData);

    if (data) {
      const userId = data?.user?.id;
      const { address, bio, categories, nickname, profile } =
        data?.user?.user_metadata || {};

      //public.users에 데이터 삽입
      const { data: userData, error: userError } = await supabase
        .from(QUERY_KEY.USERS)
        .insert([{ address, bio, nickname, user_id: userId, profile }])
        .select('id');

      if (userError) {
        console.error('signup errors - public.users 오류 : ', userError);
      }
      //public.user_categories에 데이터 삽입
      const insertedUserId = userData?.[0]?.id;

      if (categories && categories.length > 0) {
        for (const category of categories) {
          const { error } = await supabase
            .from(QUERY_KEY.USER_CATEGORIES)
            .insert([{ user_id: insertedUserId, category }]);

          if (error) {
            console.error(
              'signup errors - public.user_categories 오류 : ',
              error,
            );
          }
        }
      }
    }

    return { data, error };
  } catch (error) {
    console.error('signup errors : ', error);
    return { data: { user: null, session: null }, error: null };
  }
};

//-----id(int8) 가져오는 로직-----
export const fetchUserIdFinding = async (sub: string) => {
  const { data, error } = await supabase
    .from(QUERY_KEY.USERS)
    .select('id, is_finding')
    .eq('user_id', sub)
    .single();

  if (error) {
    console.error('user id 로딩 중 오류 : ', error);
    return null;
  }

  return data;
};

//-----logout 로직-----
export const logout = async () => {
  await supabase.auth.signOut();
};
