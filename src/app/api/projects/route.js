import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProjects, upsertProject, deleteProject } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({ success: true, projects });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Project title is required' }, { status: 400 });
    }

    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const saved = await upsertProject(body);
    try {
      revalidatePath('/projects');
      revalidatePath('/admin');
      revalidatePath('/');
    } catch (e) {}
    return NextResponse.json({ success: true, project: saved });
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
      return NextResponse.json({ success: false, error: 'Project ID or title is required' }, { status: 400 });
    }

    await deleteProject(id, title);
    try {
      revalidatePath('/projects');
      revalidatePath('/admin');
      revalidatePath('/');
    } catch (e) {}
    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
