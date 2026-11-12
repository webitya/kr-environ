import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAboutPagePhoto, saveAboutPagePhoto, deleteAboutPagePhoto } from '@/lib/db';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

export async function GET() {
  try {
    const photo = await getAboutPagePhoto();
    return NextResponse.json({ success: true, photo }, { headers: NO_STORE_HEADERS });
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

    const saved = await saveAboutPagePhoto({
      imageUrl: body.imageUrl.trim(),
      caption: (body.caption || '').toString().trim()
    });

    try {
      revalidatePath('/about-us');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, photo: saved }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await deleteAboutPagePhoto();

    try {
      revalidatePath('/about-us');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json(
      { success: true, photo: { imageUrl: '', caption: '', updatedAt: null } },
      { headers: NO_STORE_HEADERS }
    );
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

