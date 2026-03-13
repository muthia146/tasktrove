import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

// GET: Mengambil semua tugas (READ)
export async function GET() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// POST: Menambah tugas baru (CREATE)
export async function POST(request: Request) {
  const { title, category, user_id } = await request.json();
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, category, user_id }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: "Berhasil!", data });
}