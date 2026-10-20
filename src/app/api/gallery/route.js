import { NextResponse } from 'next/server';
import { getGallery, upsertGallery, deleteGallery } from '@/lib/db';

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
    return NextResponse.json({ success: true, gallery: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Gallery item ID is required' }, { status: 400 });
    }

    await deleteGallery(id);
    return NextResponse.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
