'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUsername, setShowUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8F3] flex items-center justify-center p-4 font-poppins">
      {/* Sleek Vertical Login Card with Logo inside */}
      <div className="w-full max-w-[360px] bg-white py-8 px-6 sm:px-7 rounded-3xl shadow-xl border border-[#DCE5DD]">
        {/* Brand Logo inside the Card */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.jpeg"
            alt="KR Environ Solutions Logo"
            className="w-16 h-16 rounded-2xl object-contain bg-white border border-[#DCE5DD] p-1 shadow-sm"
          />
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input with Eye Visibility Toggle */}
          <div>
            <label className="block text-[11px] font-bold text-[#173B26] uppercase tracking-wider mb-1">
              Username
            </label>
            <div className="relative rounded-lg shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type={showUsername ? 'text' : 'password'}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-[#DCE5DD] focus:outline-none focus:ring-2 focus:ring-[#216B35] text-sm font-lato"
              />
              <button
                type="button"
                onClick={() => setShowUsername(!showUsername)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#216B35] transition-colors focus:outline-none"
                title={showUsername ? 'Hide username' : 'Show username'}
                aria-label={showUsername ? 'Hide username' : 'Show username'}
              >
                {showUsername ? (
                  <EyeOff className="w-4 h-4 text-gray-600" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Password Input with Eye Visibility Toggle */}
          <div>
            <label className="block text-[11px] font-bold text-[#173B26] uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative rounded-lg shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-[#DCE5DD] focus:outline-none focus:ring-2 focus:ring-[#216B35] text-sm font-lato"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#216B35] transition-colors focus:outline-none"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-600" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Actions: Sign In Button & Small Back to Homepage Button */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 text-sm font-semibold flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>

            <div className="text-center pt-1">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-1.5 text-xs text-[#087EA4] hover:text-[#06617F] font-semibold py-1.5 px-3 rounded-lg hover:bg-[#F5F8F3] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Homepage</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
