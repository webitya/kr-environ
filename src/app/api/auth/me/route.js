import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('kr_admin_token');
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}

export async function GET() {
  const cookieStore = await cookies();
  const expectedToken = process.env.ADMIN_SESSION_SECRET || 'verified_secure_session';

  if (token && token.value === expectedToken) {
    return NextResponse.json({
      authenticated: true,
      user: { username: process.env.ADMIN_USERNAME || 'Authorized Admin', role: 'admin' }
    });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
