import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  // Lindungi semua route API tasks
  if (request.nextUrl.pathname.startsWith('/api/tasks')) {
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ message: 'Missing Token' }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      // Jika token expired atau secret salah
      return NextResponse.json({ message: 'Invalid or Expired Token' }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/tasks/:path*',
};