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
    // 1. Ambil user_id dari header (hasil dari middleware JWT kamu)
    const userId = req.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil data dari body request
    const body = await req.json();
    const { course_name, task_desc } = body;

    // 3. LOGIKA YANG KAMU TANYAKAN:
    // Jika body.link ada isinya, pakai isinya. Jika kosong/undefined, kasih string kosong ''
    const link = body.link || ''; 

    // 4. Masukkan ke database Supabase
    const { data, error } = await supabase
      .from('assignments')
      .insert([
        {
          course_name: course_name,
          task_desc: task_desc,
          link: link,          // Variabel link yang sudah aman
          user_id: userId,     // Menghubungkan tugas ke akun yang sedang login
          status: 'Pending'    // Status default untuk tugas baru
        }
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ 
      message: "Tugas berhasil dibuat", 
      data 
    }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}