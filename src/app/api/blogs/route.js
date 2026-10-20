import { NextResponse } from 'next/server';
import { getBlogs, upsertBlog, deleteBlog } from '@/lib/db';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: 'Article title is required' },
        { status: 400 }
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.title);
    const blogData = {
      ...body,
      slug,
      date: body.date || new Date().toISOString().split('T')[0],
      author: body.author || 'Sarika Gupta, Proprietor',
      status: body.status || 'published',
      updatedAt: new Date().toISOString()
    };

    const saved = await upsertBlog(blogData);
    return NextResponse.json({ success: true, blog: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    await deleteBlog(id);
    return NextResponse.json({ success: true, message: 'Article deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
