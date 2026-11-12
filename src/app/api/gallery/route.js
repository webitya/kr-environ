import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getGallery, upsertGallery, deleteGallery } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const gallery = await getGallery();
    return NextResponse.json({ success: true, gallery });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title || !body.imageUrl) {
      return NextResponse.json({ success: false, error: 'Title and Image URL are required' }, { status: 400 });
    }

    const saved = await upsertGallery(body);
    try {
      revalidatePath('/gallery');
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, gallery: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id || id === 'undefined' || id === 'null') {
      try {
        const body = await req.json();
        id = body?.id || body?._id;
      } catch (e) {}
    }

    if (!id || id === 'undefined' || id === 'null') {
      return NextResponse.json({ success: false, error: 'Gallery item ID is required' }, { status: 400 });
    }

    await deleteGallery(id);

    try {
      revalidatePath('/gallery');
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
