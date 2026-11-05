import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getVideos, upsertVideo, deleteVideo } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const videos = await getVideos();
    return NextResponse.json({ success: true, videos });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title || !body.embedUrl) {
      return NextResponse.json({ success: false, error: 'Title and Video Embed URL are required' }, { status: 400 });
    }

    const saved = await upsertVideo(body);
    try {
      revalidatePath('/videos');
      revalidatePath('/admin');
      revalidatePath('/');
    } catch (e) {}

    return NextResponse.json({ success: true, video: saved });
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
      return NextResponse.json({ success: false, error: 'Video ID or title is required' }, { status: 400 });
    }

    await deleteVideo(id, title);
    try {
      revalidatePath('/videos');
      revalidatePath('/admin');
      revalidatePath('/');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Video deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
