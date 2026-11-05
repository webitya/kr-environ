import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { upsertProduct, deleteProduct } from '@/lib/db';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await upsertProduct({ ...body, id });

    try {
      revalidatePath('/products');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, product: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await deleteProduct(id);

    try {
      revalidatePath('/products');
      revalidatePath('/admin');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

