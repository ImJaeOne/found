import { createClient } from '@/services/server';

// 작성중인 파일
export async function GET() {
  const serverSupabase = await createClient();
  const { data, error } = await serverSupabase.from('user_categories').select();

  return Response.json(data);
}
