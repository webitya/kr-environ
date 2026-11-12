import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPartners, upsertPartner, deletePartner } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const partners = await getPartners();
    return NextResponse.json({ success: true, partners });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name || !body.logoUrl) {
      return NextResponse.json(
        { success: false, error: 'Partner name and logo image URL are required' },
        { status: 400 }
      );
    }

    const saved = await upsertPartner(body);
    try {
      revalidatePath('/partners');
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, partner: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Partner ID is required' }, { status: 400 });
    }

    await deletePartner(id);
    try {
      revalidatePath('/partners');
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Partner deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

