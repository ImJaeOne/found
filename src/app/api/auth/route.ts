import { createClient } from '@/services/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const serverSupabase = await createClient();
  const body = await request.json();

  const { data, error } = await serverSupabase.auth.signInWithPassword(body);

  return NextResponse.json({ data, error });
}
