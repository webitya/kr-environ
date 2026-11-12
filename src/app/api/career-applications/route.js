import { NextResponse } from 'next/server';
import {
  getCareerApplications,
  createCareerApplication,
  updateCareerApplicationStatus,
  deleteCareerApplication
} from '@/lib/db';
import { sendCareerApplicationEmails } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const applications = await getCareerApplications();
    return NextResponse.json({ success: true, applications });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.applicantName?.trim() || !body.email?.trim() || !body.phone?.trim() || !body.careerTitle?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, phone number, and position are required.' },
        { status: 400 }
      );
    }

    const saved = await createCareerApplication({
      careerId: body.careerId || '',
      careerTitle: body.careerTitle.trim(),
      department: body.department || '',
      applicantName: body.applicantName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      collegeOrUniversity: body.collegeOrUniversity?.trim() || '',
      qualification: body.qualification?.trim() || '',
      passingYear: body.passingYear?.trim() || '',
      city: body.city?.trim() || '',
      experienceSummary: body.experienceSummary?.trim() || '',
      resumeUrl: body.resumeUrl?.trim() || '',
      coverNote: body.coverNote?.trim() || '',
      status: 'New'
    });

    let emailStatus = { adminSent: false, customerSent: false };
    try {
      emailStatus = await sendCareerApplicationEmails(saved);
    } catch (mailErr) {
      console.error('Career application email error:', mailErr.message);
    }

    return NextResponse.json({ success: true, application: saved, emailStatus }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    if (!body.id || !body.status) {
      return NextResponse.json({ success: false, error: 'Application ID and status are required' }, { status: 400 });
    }

    const updated = await updateCareerApplicationStatus(body.id, body.status);
    return NextResponse.json({ success: true, application: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Application ID is required' }, { status: 400 });
    }

    await deleteCareerApplication(id);
    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

