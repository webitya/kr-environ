import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { upsertPartner, deletePartner } from '@/lib/db';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await upsertPartner({ ...body, id });

    try {
      revalidatePath('/partners');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, partner: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await deletePartner(id);

    try {
      revalidatePath('/partners');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Partner deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

