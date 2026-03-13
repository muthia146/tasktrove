import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

// Tambahkan async di sini
export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // Gunakan Promise di sini
) {
  try {
    // WAJIB: Await params-nya dulu
    const resolvedParams = await params;
    const idTugas = resolvedParams.id;

    if (!idTugas) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', idTugas);

    if (error) throw error;

    return NextResponse.json({ message: "Berhasil dihapus" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Lakukan hal yang sama untuk PATCH
export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { status, link } = await req.json();
    
    const { error } = await supabase
      .from('assignments')
      .update({ status, link })
      .eq('id', resolvedParams.id);

    if (error) throw error;
    return NextResponse.json({ message: "Berhasil diupdate" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}