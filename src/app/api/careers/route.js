import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCareers, upsertCareer, deleteCareer } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const includeClosed = searchParams.get('all') === 'true';
    const careers = await getCareers({ includeClosed });
    return NextResponse.json({ success: true, careers });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ success: false, error: 'Position title is required' }, { status: 400 });
    }

    const responsibilities = Array.isArray(body.responsibilities)
      ? body.responsibilities.filter((r) => String(r).trim())
      : typeof body.responsibilities === 'string'
        ? body.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean)
        : [];

    const saved = await upsertCareer({
      ...body,
      responsibilities
    });

    try {
      revalidatePath('/careers');
    } catch (e) {}

    return NextResponse.json({ success: true, career: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Career ID is required' }, { status: 400 });
    }

    await deleteCareer(id);
    try {
      revalidatePath('/careers');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Career deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

