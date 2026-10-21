'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  ChevronDown, 
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
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { title: 'ANIDERS Smart Scarecrow', desc: 'Solar-powered bio-acoustic wildlife repellent', href: '/services/aniders-animal-intrusion-detection-system' },
      { title: 'Re-Pulse Mat', desc: 'Safe electroshock perimeter defense barrier', href: '/services/re-pulse-mat-deterrent' },
      { title: 'KyNet Net Gun', desc: 'Handheld humane animal capture launcher', href: '/services/kynet-net-gun' },
      { title: 'Smart Stick Forester', desc: 'Tactical ranger safety baton with siren & light', href: '/services/smart-stick-guardian-forester' },
      { title: 'Tactical Stun Batons', desc: 'Close-range emergency defense sticks', href: '/services/stun-baton-stun-stick' },
      { title: 'Field Surveys & Training', desc: 'On-site installation and ranger workshops', href: '/services/site-surveys-installation-training' },
    ]
  },
  { name: 'Projects', href: '/projects' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Videos', href: '/videos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact-us' }
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Auto-expand mobile services if currently browsing services
  useEffect(() => {
    if (pathname && pathname.startsWith('/services')) {
      setMobileServicesOpen(true);
    }
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
      {/* Top Banner with Partnership & Helpline */}
      <div className="hidden md:block bg-[#173B26] text-[#E4EEE6] text-xs py-2 px-4 border-b border-[#216B35]/40">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-white/90">
              Partnered with <strong className="text-white">Kyari Innovations</strong> | Serving 21+ State Forest Depts
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="tel:+918317054180" 
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>+91 8317054180 / 0651-4051577</span>
            </a>
            <a 
              href="mailto:kr.environ.2026@gmail.com" 
              className="hidden sm:inline-flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>kr.environ.2026@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-200 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-[#DCE5DD]' 
          : 'bg-white py-2.5 sm:py-3 border-b border-[#DCE5DD]'
      }`}>
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 flex items-center justify-between">
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

              if (item.dropdown) {
                return (
                  <div 
                    key={item.name} 
                    className="relative group"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-[#216B35] font-semibold bg-[#F5F8F3]'
                          : 'text-[#4B5563] hover:text-[#216B35] hover:bg-[#F5F8F3]'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="w-3.5 h-3.5 text-[#216B35] group-hover:rotate-180 transition-transform duration-200" />
                    </Link>

                    {/* Services Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-[#DCE5DD] p-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                        <div className="px-3 py-1.5 border-b border-[#DCE5DD]/60 mb-1">
                          <span className="text-[11px] font-bold text-[#216B35] uppercase tracking-wider">
                            Conservation Tech & Services
                          </span>
                        </div>
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block p-2 rounded-lg hover:bg-[#F5F8F3] transition-colors group/sub"
                          >
                            <div className="text-xs sm:text-sm font-semibold text-[#173B26] group-hover/sub:text-[#216B35]">
                              {subItem.title}
                            </div>
                            <div className="text-[11px] text-[#68756D] line-clamp-1">
                              {subItem.desc}
                            </div>
                          </Link>
                        ))}
                        <div className="pt-2 mt-1 border-t border-[#DCE5DD]/60">
                          <Link 
                            href="/services" 
                            className="block text-center text-xs font-semibold text-[#216B35] hover:text-[#174D28] py-1"
                          >
                            View All Solutions &rarr;
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

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

              if (item.dropdown) {
                return (
                  <div key={item.name} className="space-y-0.5">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? 'text-[#216B35] bg-[#F5F8F3]'
                          : 'text-[#173B26] hover:bg-[#F5F8F3]'
                      }`}
                      aria-expanded={mobileServicesOpen}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileServicesOpen ? 'rotate-180 text-[#216B35]' : 'text-[#68756D]'
                        }`}
                      />
                    </button>

                    {/* Collapsible Services List - Clean, normal font, no dots, no card effect */}
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        mobileServicesOpen
                          ? 'max-h-[600px] opacity-100'
                          : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="pl-4 py-1 space-y-0.5">
                        {item.dropdown.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`block px-3 py-2 rounded-lg text-sm font-normal transition-colors ${
                                isSubActive
                                  ? 'text-[#216B35] font-medium bg-[#F5F8F3]'
                                  : 'text-[#4B5563] hover:text-[#216B35] hover:bg-[#F5F8F3]'
                              }`}
                            >
                              {sub.title}
                            </Link>
                          );
                        })}
                        <Link
                          href="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg text-sm font-medium text-[#216B35] hover:bg-[#F5F8F3] transition-colors"
                        >
                          View All Solutions &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

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
          <div className="p-4 border-t border-[#DCE5DD] bg-[#F5F8F3]/90 space-y-3 shrink-0">
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-center py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
            <div className="text-[11px] text-[#68756D] text-center space-y-0.5 pt-1">
              <p className="font-semibold text-[#173B26]">KR Environ Solutions &bull; Ranchi</p>
              <p>+91 8317054180 | kr.environ.2026@gmail.com</p>
            </div>
          </div>
        </aside>
      </div>,
      document.body
    )}
  </>
);
}
