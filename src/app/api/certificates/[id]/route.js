import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { upsertCertificate, deleteCertificate } from '@/lib/db';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await upsertCertificate({ ...body, id });

    try {
      revalidatePath('/certificates');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, certificate: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await deleteCertificate(id);

    try {
      revalidatePath('/certificates');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

