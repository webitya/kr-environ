import { NextResponse } from 'next/server';
import { createEnquiry, getEnquiries, deleteEnquiry } from '@/lib/db';
import { sendEnquiryEmails } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const enquiries = await getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and phone are required fields.' },
        { status: 400 }
      );
    }

    const saved = await createEnquiry(body);
    let emailStatus = { adminSent: false, customerSent: false };
    try {
      emailStatus = await sendEnquiryEmails({
        ...body,
        ...saved
      });
    } catch (mailErr) {
      console.error('Enquiry email error:', mailErr.message);
    }

    return NextResponse.json({ success: true, enquiry: saved, emailStatus }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Enquiry ID is required' }, { status: 400 });
    }
    await deleteEnquiry(id);
    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
