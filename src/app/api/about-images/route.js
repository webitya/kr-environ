import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAboutImages, upsertAboutImage, deleteAboutImage } from '@/lib/db';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

export async function GET() {
  try {
    const images = await getAboutImages();
    return NextResponse.json({ success: true, images }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: NO_STORE_HEADERS });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.imageUrl || !body.imageUrl.trim()) {
      return NextResponse.json({ success: false, error: 'Image URL is required' }, { status: 400 });
    }

    const parsedOrder = Number(body.displayOrder);
    const saved = await upsertAboutImage({
      ...(body.id ? { id: body.id } : {}),
      ...(body._id ? { _id: body._id } : {}),
      imageUrl: body.imageUrl.trim(),
      title: (body.title || '').toString().trim(),
      description: (body.description ?? body.text ?? body.paragraph ?? '').toString().trim(),
      displayOrder: Number.isFinite(parsedOrder) ? parsedOrder : 0
    });

    try {
      revalidatePath('/');
      revalidatePath('/about-us');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, image: saved }, { headers: NO_STORE_HEADERS });
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
      return NextResponse.json({ success: false, error: 'Image ID is required' }, { status: 400 });
    }

    await deleteAboutImage(id);
    try {
      revalidatePath('/');
      revalidatePath('/about-us');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Image deleted successfully' }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

