import { NextResponse } from 'next/server';
import { getVideos, upsertVideo, deleteVideo } from '@/lib/db';

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
    return NextResponse.json({ success: true, video: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Video ID is required' }, { status: 400 });
    }

    await deleteVideo(id);
    return NextResponse.json({ success: true, message: 'Video deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
