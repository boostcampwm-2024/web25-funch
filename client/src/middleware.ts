import { COOKIE_USER_KEY } from '@libs/constants';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware({ nextUrl }: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIE_USER_KEY);
  const isLoggedin = !!accessToken;

  if (nextUrl.pathname.startsWith('/studio') && !isLoggedin) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
