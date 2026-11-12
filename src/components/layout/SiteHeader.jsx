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
  ArrowRight
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Our Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Partners', href: '/partners' },
  { name: 'Certificates', href: '/certificates' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
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

  // Close mobile drawer on route change automatically
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // Compute context-aware Contact Us URL so clicking Contact Us from a Service or Product page auto-selects it
  const getContactHref = () => {
    if (!pathname) return '/contact-us';
    if (pathname.startsWith('/services/')) {
      const slug = pathname.slice('/services/'.length).split('/')[0];
      if (slug) return `/contact-us?serviceSlug=${encodeURIComponent(slug)}`;
    }
    if (pathname.startsWith('/products/')) {
      const slug = pathname.slice('/products/'.length).split('/')[0];
      if (slug) return `/contact-us?productSlug=${encodeURIComponent(slug)}`;
    }
    return '/contact-us';
  };

  const contactHref = getContactHref();

  // Robust touch-safe link click handler preventing dropped events in mobile browsers
  const handleDrawerLinkClick = (href) => {
    if (href === pathname) {
      setMobileMenuOpen(false);
      return;
    }
    // Defer drawer close slightly so Next.js client-side navigation starts reliably
    setTimeout(() => {
      setMobileMenuOpen(false);
    }, 120);
  };

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
            <Link href="/" prefetch={true} className="flex items-center gap-2.5 group touch-manipulation">
              <img
                src="/logo.jpeg"
                alt="KR Environ Solutions Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain bg-white border border-[#DCE5DD] p-0.5 shadow-sm group-hover:scale-105 transition-transform shrink-0"
              />
              <span className="font-semibold text-lg sm:text-xl tracking-tight text-[#173B26] group-hover:text-[#216B35] transition-colors font-manrope">
                KR Environ Solutions
              </span>
            </Link>

            {/* Desktop Nav Links (Prefetched for Instant Zero-Lag Page Transitions) */}
            <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 2xl:space-x-1.5">
              {navItems.filter((item) => item.href !== '/contact-us').map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={true}
                    className={`px-1.5 xl:px-2 2xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-medium font-manrope transition-colors whitespace-nowrap touch-manipulation ${
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

            {/* Desktop Action Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={contactHref}
                prefetch={true}
                className="btn-primary touch-manipulation font-manrope"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button (Enlarged 44px Touch Target with Zero 300ms Delay) */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-[#173B26] hover:bg-[#F5F8F3] active:bg-[#DCE5DD]/60 flex items-center justify-center focus:outline-none touch-manipulation transition-all select-none active:scale-95"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.2]" /> : <Menu className="w-6 h-6 stroke-[2.2]" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Teleport Mobile Drawer to document.body to escape header sticky/stacking contexts */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`fixed inset-0 bg-black/60 z-[99998] transition-opacity duration-300 touch-manipulation ${
              mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
            }`}
            aria-hidden="true"
          />

          {/* Right-to-Left Mobile Navigation Drawer */}
          <aside
            className={`fixed top-0 bottom-0 right-0 w-[85vw] max-w-xs sm:max-w-sm h-[100dvh] max-h-[100dvh] bg-white z-[99999] shadow-2xl flex flex-col justify-between border-l border-[#DCE5DD] will-change-transform transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? 'translate-x-0 pointer-events-auto visible' : 'translate-x-full pointer-events-none invisible'
            }`}
            style={{
              height: '100dvh',
              maxHeight: '100dvh'
            }}
            aria-label="Mobile Navigation"
          >
            {/* 1. Drawer Header (Fixed at top) */}
            <div className="p-4 border-b border-[#DCE5DD] flex items-center justify-between bg-[#F5F8F3] shrink-0">
              <Link
                href="/"
                prefetch={true}
                onClick={() => handleDrawerLinkClick('/')}
                className="flex items-center gap-2.5 group touch-manipulation"
              >
                <img
                  src="/logo.jpeg"
                  alt="KR Environ Solutions Logo"
                  className="w-10 h-10 rounded-xl object-contain bg-white border border-[#DCE5DD] p-0.5 shadow-xs shrink-0"
                />
                <span className="font-semibold text-base tracking-tight text-[#173B26] font-manrope">
                  KR Environ Solutions
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[40px] min-h-[40px] p-2 rounded-lg text-[#173B26] hover:bg-[#DCE5DD]/60 active:bg-[#DCE5DD] flex items-center justify-center transition-colors touch-manipulation select-none active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Drawer Scrollable Nav Links (min-h-0 guarantees flex shrinkage, preventing offscreen push) */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-1">
              {navItems.filter((item) => item.href !== '/contact-us').map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={true}
                    onClick={() => handleDrawerLinkClick(item.href)}
                    className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold font-manrope transition-all touch-manipulation select-none active:scale-[0.98] ${
                      isActive
                        ? 'text-[#216B35] bg-[#F5F8F3] font-bold'
                        : 'text-[#173B26] hover:bg-[#F5F8F3] active:bg-[#EAF2EC]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* 3. Drawer Footer Actions (Always visible at bottom with 40px+ clearance) */}
            <div 
              className="p-4 pt-3.5 pb-8 sm:pb-10 border-t border-[#DCE5DD] bg-[#F5F8F3] shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]"
              style={{
                paddingBottom: 'max(2.5rem, calc(env(safe-area-inset-bottom, 0px) + 2rem))'
              }}
            >
              <Link
                href={contactHref}
                prefetch={true}
                onClick={() => handleDrawerLinkClick('/contact-us')}
                className="btn-primary w-full text-center py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm rounded-xl font-manrope touch-manipulation select-none active:scale-[0.98]"
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

