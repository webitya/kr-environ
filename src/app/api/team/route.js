import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getTeamMembers, upsertTeamMember, deleteTeamMember } from '@/lib/db';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

function normalizeHighlights(raw) {
  if (Array.isArray(raw)) {
    return raw.map((item) => String(item || '').trim()).filter(Boolean);
  }
  if (typeof raw === 'string') {
    return raw
      .split(/\r?\n/)
      .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
      .filter(Boolean);
  }
  return [];
}

export async function GET() {
  try {
    const members = await getTeamMembers();
    return NextResponse.json({ success: true, members }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: NO_STORE_HEADERS });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ success: false, error: 'Team member name is required' }, { status: 400 });
    }

    const parsedOrder = Number(body.displayOrder);
    const saved = await upsertTeamMember({
      ...(body.id ? { id: body.id } : {}),
      ...(body._id ? { _id: body._id } : {}),
      name: body.name.trim(),
      designation: (body.designation || '').toString().trim(),
      role: (body.role || '').toString().trim(),
      photoUrl: (body.photoUrl || '').toString().trim(),
      qualifications: (body.qualifications || '').toString().trim(),
      experience: (body.experience || '').toString().trim(),
      bio: (body.bio || '').toString().trim(),
      highlights: normalizeHighlights(body.highlights),
      displayOrder: Number.isFinite(parsedOrder) ? parsedOrder : 0
    });

    try {
      revalidatePath('/about-us');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, member: saved }, { headers: NO_STORE_HEADERS });
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
      return NextResponse.json({ success: false, error: 'Team member ID is required' }, { status: 400 });
    }

    await deleteTeamMember(id);

    try {
      revalidatePath('/about-us');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Team member deleted successfully' }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

