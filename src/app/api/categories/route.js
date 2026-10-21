import { NextResponse } from 'next/server';
import { getCategories, addCategory } from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || null;
    const categories = await getCategories(type);
    return NextResponse.json({ success: true, categories });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const name = (body.name || '').trim();
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    const saved = await addCategory(name, body.type || 'general');
    return NextResponse.json({ 
      success: true, 
      category: saved, 
      message: `Category "${saved.name}" saved successfully to database` 
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
