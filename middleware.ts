import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  // Lindungi semua route API tasks
  if (request.nextUrl.pathname.startsWith('/api/tasks')) {
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/tasks/:path*',
};