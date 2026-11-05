import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCertificates, upsertCertificate, deleteCertificate } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const certificates = await getCertificates();
    return NextResponse.json({ success: true, certificates });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: 'Certificate title is required' },
        { status: 400 }
      );
    }

    const saved = await upsertCertificate(body);
    try {
      revalidatePath('/certificates');
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, certificate: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');
    let title = searchParams.get('title') || '';

    if (!id || id === 'undefined' || id === 'null') {
      try {
        const body = await req.json();
        id = body?.id || body?._id;
        title = body?.title || title;
      } catch (e) {}
    }

    if (!id && !title) {
      return NextResponse.json({ success: false, error: 'Certificate ID or title is required' }, { status: 400 });
    }

    await deleteCertificate(id, title);
    try {
      revalidatePath('/certificates');
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
