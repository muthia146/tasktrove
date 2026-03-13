import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

// PATCH: Update status selesai atau judul (UPDATE)
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { is_completed, title } = await request.json();
  const { data, error } = await supabase
    .from('tasks')
    .update({ is_completed, title })
    .eq('id', params.id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// DELETE: Menghapus tugas (DELETE)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: "Data dihapus!" });
}