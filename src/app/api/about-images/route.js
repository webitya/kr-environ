import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAboutImages, upsertAboutImage, deleteAboutImage } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const images = await getAboutImages();
    return NextResponse.json({ success: true, images });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.imageUrl || !body.imageUrl.trim()) {
      return NextResponse.json({ success: false, error: 'Image URL is required' }, { status: 400 });
    }

    const saved = await upsertAboutImage({
      ...body,
      imageUrl: body.imageUrl.trim(),
      title: (body.title || '').trim()
    });

    try {
      revalidatePath('/');
    } catch (e) {}

    return NextResponse.json({ success: true, image: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Image ID is required' }, { status: 400 });
    }

    await deleteAboutImage(id);
    try {
      revalidatePath('/');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

