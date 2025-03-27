import { updateSession } from '@/services/middleware';
import { NextResponse, type NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  // 1. 세션 업데이트 (예: 쿠키, DB 등)
  const sessionResponse = await updateSession(request);

  // 2. 보호된 라우트 접근 제어
  const token = request.cookies.get(
    'sb-svhrfldwfalevlzspmjf-auth-token.0',
  )?.value;
  const protectedRoutes = ['/chatting', '/mypage'];

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 세션 응답을 따르되, NextResponse.next()도 가능
  return sessionResponse ?? NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/chatting/:path*',
    '/mypage/:path*',
    '/matelist*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
