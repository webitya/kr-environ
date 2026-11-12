import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProducts, upsertProduct, deleteProduct } from '@/lib/db';

export const dynamic = 'force-dynamic';

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
    const products = await getProducts();
    return NextResponse.json({ success: true, products });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: 'Product title is required' },
        { status: 400 }
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.title);
    const productData = {
      ...body,
      slug,
      status: body.status || 'published',
      updatedAt: new Date().toISOString()
    };

    const saved = await upsertProduct(productData);
    try {
      revalidatePath('/products');
      revalidatePath(`/products/${slug}`);
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {
      console.warn('Revalidate path warning:', e.message);
    }

    return NextResponse.json({ success: true, product: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const target = id || slug;

    if (!target) {
      return NextResponse.json({ success: false, error: 'Product ID or slug is required' }, { status: 400 });
    }

    await deleteProduct(target);
    try {
      revalidatePath('/products');
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {
      console.warn('Revalidate path warning:', e.message);
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

