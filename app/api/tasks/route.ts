import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Fungsi bantuan agar kode bersih
async function getUserIdFromRequest(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return null;
  
  const token = authHeader.split(' ')[1];
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
  const { payload } = await jwtVerify(token, secret);
  return payload.id as string;
}

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabase
      .from('assignments') // Nama tabel di Supabase
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { course_name, task_desc } = body;
    const link = body.link || ''; 

    const { data, error } = await supabase
      .from('assignments')
      .insert([
        {
          course_name,
          task_desc,
          link,
          user_id: userId,
          status: 'Pending'
        }
      ])
      .select();

    if (error) throw error;
    return NextResponse.json({ message: "Tugas berhasil dibuat", data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}