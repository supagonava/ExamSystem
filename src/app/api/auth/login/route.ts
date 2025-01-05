import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as jose from 'jose';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email || '' },
          { username: username || '' },
        ],
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret-key');
    const token = await new jose.SignJWT({ id: user.id, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .sign(secret);

    const response = NextResponse.json({ token, role: user.role });
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8 // 8 hours in seconds
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

