import { AuthInputs, UserData, UserMetaData } from '@/types/users';
import { supabase } from './supabaseClient';
import { AuthError, Session, User } from '@supabase/supabase-js';
import { QUERY_KEY } from '@/constants/constants';
import { toast } from '@/hooks/useToast';

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
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('로그아웃 에러 : ', error);
    //사용자 알람
    toast({
      variant: 'destructive',
      description: '로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요!',
    });
  }
};

//-----채팅 상대방 정보 가져오는 로직-----
export const fetchChatPartner = async (
  chatId: number,
  userId: number,
): Promise<UserData> => {
  // 채팅방 정보 가져오기
  const { data, error } = await supabase
    .from('chat_rooms')
    .select('user1_id, user2_id')
    .eq('id', chatId)
    .single();

  if (error) throw new Error(error.message);

  // 상대방 ID 찾기
  const otherUserId = data.user1_id === userId ? data.user2_id : data.user1_id;

  // 상대방 정보 가져오기
  const { data: otherUser, error: userError } = await supabase
    .from('users')
    .select('*, user_categories(category)')
    .eq('id', otherUserId)
    .single();

  if (userError) throw new Error(userError.message);

  const categories = otherUser.user_categories.map(
    (item: { category: string }) => item.category,
  );

  const otherUserInfo = {
    ...otherUser,
    categories,
  };

  return otherUserInfo;
};
