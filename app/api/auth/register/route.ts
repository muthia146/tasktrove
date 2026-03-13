import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}