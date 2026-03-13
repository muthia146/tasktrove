import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

async function getUserIdFromToken(req: Request) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1]!;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return payload.id as string;
}

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }); // Tambahan: Biar tugas terbaru ada di atas
    
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    const body = await req.json();
    
    const { data, error } = await supabase
      .from('assignments')
      .insert([{ 
        course_name: body.course_name, 
        task_desc: body.task_desc, 
        user_id: userId, 
        status: 'Pending',
        // PERBAIKAN: Ambil link dari body, jangan dikosongkan ('')
        link: body.link || '' 
      }])
      .select();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}