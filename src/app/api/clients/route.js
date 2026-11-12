import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getClients, upsertClient, deleteClient } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const clients = await getClients();
    return NextResponse.json({ success: true, clients });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name || !body.logoUrl) {
      return NextResponse.json({ success: false, error: 'Client name and Logo image are required' }, { status: 400 });
    }

    const saved = await upsertClient(body);
    try {
      revalidatePath('/clients');
      revalidatePath('/');
    } catch (e) {}
    return NextResponse.json({ success: true, client: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Client ID is required' }, { status: 400 });
    }

    await deleteClient(id);
    try {
      revalidatePath('/clients');
      revalidatePath('/');
    } catch (e) {}
    return NextResponse.json({ success: true, message: 'Client deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

