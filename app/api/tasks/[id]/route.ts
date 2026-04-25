import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

// 1. Fungsi DELETE
export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params; // Destructuring langsung
    
    // Ambil user_id dari header (yang diset oleh middleware kamu)
    const userId = req.headers.get('x-user-id'); 

    if (!id) {
      return NextResponse.json({ error: "ID tidak ditemukan" }, { status: 400 });
    }

    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', id)
      .eq('user_id', userId); // Pastikan hanya hapus milik sendiri!

    if (error) throw error;

    return NextResponse.json({ message: "Data berhasil dihapus" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 2. Fungsi PATCH
export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, link } = body;
    
    const userId = req.headers.get('x-user-id');

    const { error } = await supabase
      .from('assignments')
      .update({ 
        status: status, 
        link: link || '' // Jika link kosong, jangan biarkan null
      })
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    return NextResponse.json({ message: "Data berhasil diperbarui" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}