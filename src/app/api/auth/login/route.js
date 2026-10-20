import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const expectedUser = process.env.ADMIN_USERNAME;
    const expectedPass = process.env.ADMIN_PASSWORD;

    if (!expectedUser || !expectedPass) {
      return NextResponse.json(
        { success: false, error: 'Authentication configuration error. Please ensure credentials are set in environment variables.' },
        { status: 500 }
      );
    }

    if (username === expectedUser && password === expectedPass) {
      const cookieStore = await cookies();
      const sessionToken = process.env.ADMIN_SESSION_SECRET || 'verified_secure_session';
      cookieStore.set('kr_admin_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: { username: expectedUser, role: 'admin' }
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password.' },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || 'Login failed' },
      { status: 500 }
    );
  }
}
