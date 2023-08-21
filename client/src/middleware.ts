import jwtDecode from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  let isJwtValid = false;
  try {
    isJwtValid = !!(await jwtDecode(req.cookies.get('auth')?.value || ''));
  } catch (e) {}

  const authRoutes = ['/auth/signIn', '/auth/signUp'];

  if (authRoutes.includes(req.nextUrl.pathname)) {
    if (isJwtValid) {
      const newRoute = req.nextUrl.clone();
      newRoute.pathname = '/todos';
      return NextResponse.redirect(newRoute);
    }
  } else {
    if (!isJwtValid) {
      const newRoute = req.nextUrl.clone();
      newRoute.pathname = '/auth/signIn';
      return NextResponse.redirect(newRoute);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: '/((?!.*\\.).*)' };
