'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  PhoneCall, 
  ExternalLink,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Our Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Videos', href: '/videos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact-us' }
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body & html scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-200 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-[#DCE5DD]' 
          : 'bg-white py-2.5 sm:py-3 border-b border-[#DCE5DD]'
      }`}>
        <div className="w-full px-3 sm:px-4 md:px-5 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.jpeg"
              alt="KR Environ Solutions Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain bg-white border border-[#DCE5DD] p-0.5 shadow-sm group-hover:scale-105 transition-transform shrink-0"
            />
            <span className="font-semibold text-lg sm:text-xl tracking-tight text-[#173B26] group-hover:text-[#216B35] transition-colors">
              KR Environ Solutions
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5">
            {navItems.filter((item) => item.href !== '/contact-us').map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#216B35] font-semibold bg-[#F5F8F3]'
                      : 'text-[#4B5563] hover:text-[#216B35] hover:bg-[#F5F8F3]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact-us"
              className="btn-primary"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile menu toggle button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#173B26] hover:bg-[#F5F8F3] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
    </header>

    {/* Teleport Mobile Navigation Drawer to document.body to prevent backdrop-blur & sticky containing-block traps on scroll */}
    {mounted && typeof document !== 'undefined' && createPortal(
      <div className="lg:hidden">
        {/* Backdrop for Right-to-Left Drawer */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-black/60 z-[9998] transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden="true"
        />

        {/* Right-to-Left Mobile Navigation Drawer */}
        <aside
          className={`fixed inset-y-0 right-0 w-[85vw] max-w-xs sm:max-w-sm h-screen h-[100dvh] bg-white z-[9999] shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out border-l border-[#DCE5DD] ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
          }`}
          aria-label="Mobile Navigation"
        >
          {/* Drawer Header with Logo and Brand Name */}
          <div className="p-4 border-b border-[#DCE5DD] flex items-center justify-between bg-[#F5F8F3] shrink-0">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 group"
            >
              <img
                src="/logo.jpeg"
                alt="KR Environ Solutions Logo"
                className="w-10 h-10 rounded-xl object-contain bg-white border border-[#DCE5DD] p-0.5 shadow-xs shrink-0"
              />
              <span className="font-semibold text-base tracking-tight text-[#173B26]">
                KR Environ Solutions
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-[#173B26] hover:bg-[#DCE5DD]/60 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Nav Links */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#216B35] bg-[#F5F8F3]'
                      : 'text-[#173B26] hover:bg-[#F5F8F3]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-[#DCE5DD] bg-[#F5F8F3]/90 shrink-0">
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-center py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>
        </aside>
      </div>,
      document.body
    )}
  </>
);
}
