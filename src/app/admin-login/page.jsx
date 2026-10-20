'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, User, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen bg-[#F5F8F3] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-poppins">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm text-[#087EA4] hover:text-[#06617F] font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to KR Environ Homepage</span>
        </Link>

        <img
          src="/logo.jpeg"
          alt="KR Environ Solutions Logo"
          className="w-20 h-20 rounded-2xl object-contain bg-white border border-[#DCE5DD] p-1.5 shadow-md mb-4 mx-auto"
        />

        <h2 className="text-3xl font-montserrat font-extrabold text-[#173B26]">
          Admin Portal Login
        </h2>
        <p className="mt-2 text-sm text-[#4B5563] font-lato">
          Authorized Management for KR Environ Solutions &bull; Kyari Wildlife Tech
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-[#DCE5DD]">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#173B26] uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#DCE5DD] focus:outline-none focus:ring-2 focus:ring-[#216B35] text-sm font-lato"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173B26] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#DCE5DD] focus:outline-none focus:ring-2 focus:ring-[#216B35] text-sm font-lato"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-base"
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </div>
          </form>

          {/* Secure Portal Security Notice */}
          <div className="mt-6 pt-6 border-t border-[#DCE5DD] text-center">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#68756D] bg-[#F5F8F3] px-3 py-1.5 rounded-lg border border-[#DCE5DD]">
              <Lock className="w-3.5 h-3.5 text-[#216B35]" />
              <span>Authorized personnel access only. Sessions are encrypted.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
