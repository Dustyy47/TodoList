import jwtDecode from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { AuthTokenDecoded } from './types';

export async function middleware(req: NextRequest) {
  let isJwtValid = false;
  let decoded;
  try {
    decoded = await jwtDecode<AuthTokenDecoded>(
      req.cookies.get('auth')?.value || ''
    );
    isJwtValid = !!decoded.id;
  } catch (e) {}

  const authRoutes = ['/auth/signIn', '/auth/signUp'];

  if (!isJwtValid && !authRoutes.includes(req.nextUrl.pathname)) {
    const newRoute = req.nextUrl.clone();
    newRoute.pathname = `auth/signIn`;
    return NextResponse.redirect(newRoute);
  }

  return NextResponse.next();
}

export const config = { matcher: '/((?!.*\\.).*)' };
