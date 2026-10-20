'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  ChevronDown, 
  Menu, 
  X, 
  PhoneCall, 
  Leaf, 
  LockKeyhole,
  ExternalLink 
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
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Banner with Partnership & Helpline */}
      <div className="bg-[#173B26] text-[#E4EEE6] text-xs py-2 px-4 border-b border-[#216B35]/40 font-opensans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#216B35] text-white px-2 py-0.5 rounded text-[11px] font-semibold">
              <Leaf className="w-3 h-3 text-[#F2BE36]" />
              Official Wildlife Tech Partner
            </span>
            <span className="text-white/80">
              Partnered with <strong>Kyari Innovations</strong> | Serving 21+ State Forest Depts
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline text-white/80">
              📞 +91 8317054180 / 0651-4051577
            </span>
            <span className="hidden lg:inline text-white/80">
              ✉️ kr.environ.2026@gmail.com
            </span>
            <Link 
              href="/admin-login" 
              className="flex items-center gap-1 text-[#F2BE36] hover:underline transition-colors"
            >
              <LockKeyhole className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-200 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-[#DCE5DD]' 
          : 'bg-white py-4 border-b border-[#DCE5DD]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpeg"
              alt="KR Environ Solutions Logo"
              className="w-12 h-12 rounded-xl object-contain bg-white border border-[#DCE5DD] p-0.5 shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-montserrat font-extrabold text-xl sm:text-2xl tracking-tight text-[#173B26] group-hover:text-[#216B35] transition-colors leading-none">
                KR ENVIRON
              </span>
              <span className="font-manrope text-[10px] uppercase tracking-widest text-[#087EA4] font-bold mt-1">
                SOLUTIONS &bull; FOREST & WILDLIFE TECH
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
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
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-poppins font-medium transition-colors ${
                        isActive
                          ? 'text-[#216B35] font-semibold bg-[#F5F8F3]'
                          : 'text-[#4B5563] hover:text-[#216B35] hover:bg-[#F5F8F3]'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4 text-[#087EA4] group-hover:rotate-180 transition-transform duration-200" />
                    </Link>

                    {/* Services Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-[#DCE5DD] p-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                        <div className="px-3 py-1.5 border-b border-[#DCE5DD]/60 mb-1">
                          <span className="text-[11px] font-bold text-[#087EA4] uppercase tracking-wider font-poppins">
                            Conservation Tech & Services
                          </span>
                        </div>
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block p-2.5 rounded-lg hover:bg-[#F5F8F3] transition-colors group/sub"
                          >
                            <div className="text-sm font-semibold text-[#173B26] group-hover/sub:text-[#216B35] font-manrope">
                              {subItem.title}
                            </div>
                            <div className="text-xs text-[#68756D] line-clamp-1 font-lato">
                              {subItem.desc}
                            </div>
                          </Link>
                        ))}
                        <div className="pt-2 mt-1 border-t border-[#DCE5DD]/60">
                          <Link 
                            href="/services" 
                            className="block text-center text-xs font-semibold text-[#087EA4] hover:text-[#06617F] py-1"
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
                  className={`px-3 py-2 rounded-lg text-sm font-poppins font-medium transition-colors ${
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
              <span>Request Consultation</span>
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#DCE5DD] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-poppins font-medium ${
                    pathname === item.href
                      ? 'text-[#216B35] font-semibold bg-[#F5F8F3]'
                      : 'text-[#4B5563] hover:bg-[#F5F8F3]'
                  }`}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-6 space-y-1 mt-1 border-l-2 border-[#DCE5DD] ml-3">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-xs text-[#68756D] hover:text-[#216B35]"
                      >
                        &bull; {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-[#DCE5DD]">
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
