import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const expectedUser = (process.env.ADMIN_USERNAME || '').trim();
    const expectedPass = (process.env.ADMIN_PASSWORD || '').trim();

    if (!expectedUser || !expectedPass) {
      return NextResponse.json(
        { success: false, error: 'Authentication configuration error. Please ensure credentials are set in environment variables.' },
        { status: 500 }
      );
    }

    const inputUser = (username || '').trim();
    const inputPass = (password || '').trim();

    if (inputUser.toLowerCase() === expectedUser.toLowerCase() && inputPass === expectedPass) {
      const sessionToken = (process.env.ADMIN_SESSION_SECRET || 'verified_secure_session').trim();
      const cookieStore = await cookies();
      
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      };

      cookieStore.set('kr_admin_token', sessionToken, cookieOptions);

      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: { username: expectedUser, role: 'admin' }
      });

      response.cookies.set('kr_admin_token', sessionToken, cookieOptions);

      return response;
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
