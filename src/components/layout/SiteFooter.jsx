'use client';

import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Leaf, 
  Tv, 
  ArrowUpRight 
} from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-[#142D20] text-[#E4EEE6] border-t border-[#216B35]/40 pt-16 pb-12 font-opensans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Grid: Credibility Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-[#216B35] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#F2BE36]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-manrope">NTCA Award Winner</h4>
              <p className="text-xs text-[#E4EEE6]/70 mt-0.5 font-lato">National Budding Innovator 2018 (ANIDERS)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-[#087EA4] flex items-center justify-center shrink-0">
              <Tv className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-manrope">Shark Tank India S2</h4>
              <p className="text-xs text-[#E4EEE6]/70 mt-0.5 font-lato">Nationally featured wildlife conservation tech</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-[#216B35] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#F2BE36]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-manrope">1,400+ Deployments</h4>
              <p className="text-xs text-[#E4EEE6]/70 mt-0.5 font-lato">Across 21+ state forest depts & 12+ tiger reserves</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-[#087EA4] flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6 text-[#F2BE36]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-manrope">100% Non-Lethal</h4>
              <p className="text-xs text-[#E4EEE6]/70 mt-0.5 font-lato">Certified safe mitigation for humans & wildlife</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="KR Environ Solutions Logo"
                className="w-14 h-14 rounded-xl object-contain bg-white p-1 shadow-sm"
              />
              <div>
                <span className="font-montserrat font-extrabold text-xl tracking-tight text-white block">
                  KR ENVIRON SOLUTIONS
                </span>
                <span className="font-manrope text-[11px] tracking-wider text-[#F2BE36] font-semibold block">
                  Proprietor: S. Gupta (Environmentalist)
                </span>
                <span className="text-[10px] text-[#E4EEE6]/70 uppercase tracking-widest font-opensans">
                  Sustainable. Responsible. Reliable.
                </span>
              </div>
            </div>
            <p className="text-sm text-[#E4EEE6]/80 font-lato leading-relaxed max-w-sm">
              Your Trusted Environmental Partner. Specializing in Forest & Environmental Clearance (EC/FC), Wildlife Clearance, EIA/EMP, Ambient Monitoring, Drone Surveys, and non-lethal Human-Wildlife Conflict mitigation across India.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-xs border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#F2BE36] animate-pulse" />
                <span>Wildlife Tech Partner: <strong>Kyari Innovations Pvt. Ltd.</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white font-montserrat tracking-wide mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm font-poppins">
              <li>
                <Link href="/" className="hover:text-[#F2BE36] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#F2BE36] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#F2BE36] transition-colors">Our Key Services</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#F2BE36] transition-colors">Key Projects</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#F2BE36] transition-colors">Field Gallery</Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-[#F2BE36] transition-colors">Video Showcase</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#F2BE36] transition-colors">Conservation Blog</Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#F2BE36] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Core Hardware & Solutions */}
          <div>
            <h3 className="text-base font-bold text-white font-montserrat tracking-wide mb-4">
              Core Capabilities
            </h3>
            <ul className="space-y-2.5 text-sm font-poppins">
              <li>
                <Link href="/services/aniders-animal-intrusion-detection-system" className="hover:text-[#F2BE36] transition-colors">
                  ANIDERS Smart Sentinel
                </Link>
              </li>
              <li>
                <Link href="/services/re-pulse-mat-deterrent" className="hover:text-[#F2BE36] transition-colors">
                  Re-Pulse Shock Mat
                </Link>
              </li>
              <li>
                <Link href="/services/kynet-net-gun" className="hover:text-[#F2BE36] transition-colors">
                  KyNet Wildlife Net Gun
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#F2BE36] transition-colors">
                  EC & Forest Clearance (FC)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#F2BE36] transition-colors">
                  Drone Survey & Geo-Tagging
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#F2BE36] transition-colors">
                  Air & Noise Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Government Liaison */}
          <div>
            <h3 className="text-base font-bold text-white font-montserrat tracking-wide mb-4">
              Offices & Contact
            </h3>
            <ul className="space-y-3 text-xs font-opensans text-[#E4EEE6]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F2BE36] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-poppins">Regd. Address:</strong>
                  <span>806, Hariom Nand Tower, Argora-Kathal More Road, Ranchi, Jharkhand</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#087EA4] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-poppins">Branch Office (B.O.):</strong>
                  <span>H. No.4, Mansarovar Colony, Bhola Nagar, Kathal More, Ranchi</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F2BE36] shrink-0" />
                <span>+91 8317054180, 9155796749</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#087EA4] shrink-0" />
                <span>Landline: 0651-4051577</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F2BE36] shrink-0" />
                <span>kr.environ.2026@gmail.com</span>
              </li>
            </ul>

            <div className="mt-5">
              <Link 
                href="/admin-login" 
                className="inline-flex items-center gap-1.5 text-xs text-[#F2BE36] hover:text-white font-semibold transition-colors"
              >
                <span>Administrative Access</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E4EEE6]/60">
          <p>
            &copy; 2024 KR Environ Solutions (Proprietor: Sarika Gupta). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">Enquiry Desk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
