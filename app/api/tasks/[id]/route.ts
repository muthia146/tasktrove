import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Wajib di Next.js 15
    const body = await req.json();
    const { status } = body;

    const { data, error } = await supabase
      .from('assignments')
      .update({ status: status })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json({ message: "Status diperbarui", data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Tambahkan DELETE juga biar CRUD kamu lengkap 100%
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { error } = await supabase.from('assignments').delete().eq('id', id);
    
    if (error) throw error;
    return NextResponse.json({ message: "Tugas dihapus" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}