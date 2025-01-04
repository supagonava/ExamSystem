import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret-key');
      const role = decoded.role;

      if (req.nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      if (req.nextUrl.pathname.startsWith('/candidate') && role !== 'CANDIDATE') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/candidate/:path*'],
}