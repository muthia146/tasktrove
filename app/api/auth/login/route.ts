import { SignJWT } from 'jose';
import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Biarkan Supabase mengecek email & password asli
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      return NextResponse.json({ message: "Email atau Password salah!" }, { status: 401 });
    }

    // Buat JWT pakai ID asli dari user yang baru login
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ id: data.user.id, email: data.user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);

    return NextResponse.json({ success: true, token });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}