import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('kr_admin_token');
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('kr_admin_token');
  return response;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('kr_admin_token');
    const expectedToken = (process.env.ADMIN_SESSION_SECRET || 'verified_secure_session').trim();

    if (token && token.value === expectedToken) {
      return NextResponse.json({
        authenticated: true,
        user: { username: process.env.ADMIN_USERNAME || 'Authorized Admin', role: 'admin' }
      });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 401 });
  }
}
