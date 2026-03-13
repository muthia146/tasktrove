import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (email === "muthiaar@gmail.com" && password === "123456") {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    // Membuat Token JWT
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h') // Token hangus dalam 2 jam
      .sign(secret);

    return NextResponse.json({ 
      success: true, 
      message: "Login Berhasil!", 
      token 
    });
  }

  return NextResponse.json(
    { success: false, message: "Email atau Password salah!" },
    { status: 401 }
  );
}