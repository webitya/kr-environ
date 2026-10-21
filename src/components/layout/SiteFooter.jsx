'use client';

import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Leaf, 
  Tv 
} from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-[#142D20] text-[#E4EEE6] border-t border-[#216B35]/40 pt-10 pb-8 font-opensans">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Top Feature Grid: Credibility Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#216B35] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white font-manrope">NTCA Award Winner</h4>
              <p className="text-[11px] text-[#E4EEE6]/70 mt-0.5 font-lato">National Budding Innovator 2018</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#216B35] flex items-center justify-center shrink-0">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white font-manrope">Shark Tank India S2</h4>
              <p className="text-[11px] text-[#E4EEE6]/70 mt-0.5 font-lato">Nationally featured wildlife tech</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#216B35] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white font-manrope">1,400+ Deployments</h4>
              <p className="text-[11px] text-[#E4EEE6]/70 mt-0.5 font-lato">21+ state forest depts & reserves</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#216B35] flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white font-manrope">100% Non-Lethal</h4>
              <p className="text-[11px] text-[#E4EEE6]/70 mt-0.5 font-lato">Certified safe mitigation</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 py-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="KR Environ Solutions Logo"
                className="w-14 h-14 rounded-xl object-contain bg-white p-1 shadow-sm"
              />
              <div>
                <span className="font-semibold text-xl tracking-tight text-white block">
                  KR Environ Solutions
                </span>
                <span className="text-[11px] tracking-wider text-emerald-400 font-semibold block">
                  Proprietor: S. Gupta (Environmentalist)
                </span>
                <span className="text-[10px] text-[#E4EEE6]/70 uppercase tracking-widest">
                  Sustainable. Responsible. Reliable.
                </span>
              </div>
            </div>
            <p className="text-sm text-[#E4EEE6]/80 leading-relaxed max-w-sm">
              Your Trusted Environmental Partner. Specializing in Forest & Environmental Clearance (EC/FC), Wildlife Clearance, EIA/EMP, Ambient Monitoring, Drone Surveys, and non-lethal Human-Wildlife Conflict mitigation across India.
            </p>
            <p className="text-xs text-[#E4EEE6]/80 pt-1">
              Wildlife Tech Partner: <strong className="text-white font-medium">Kyari Innovations Pvt. Ltd.</strong>
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-base font-bold text-white !text-white tracking-wide mb-4" style={{ color: '#FFFFFF' }}>
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-emerald-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">Our Key Services</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-emerald-400 transition-colors">Key Projects</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-emerald-400 transition-colors">Field Gallery</Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-emerald-400 transition-colors">Video Showcase</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">Conservation Blog</Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-emerald-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Core Hardware & Solutions */}
          <div>
            <h3 className="text-base font-bold text-white !text-white tracking-wide mb-4" style={{ color: '#FFFFFF' }}>
              Core Capabilities
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/aniders-animal-intrusion-detection-system" className="hover:text-emerald-400 transition-colors">
                  ANIDERS Smart Sentinel
                </Link>
              </li>
              <li>
                <Link href="/services/re-pulse-mat-deterrent" className="hover:text-emerald-400 transition-colors">
                  Re-Pulse Shock Mat
                </Link>
              </li>
              <li>
                <Link href="/services/kynet-net-gun" className="hover:text-emerald-400 transition-colors">
                  KyNet Wildlife Net Gun
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  EC & Forest Clearance (FC)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Drone Survey & Geo-Tagging
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Air & Noise Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Government Liaison */}
          <div>
            <h3 className="text-base font-bold text-white !text-white tracking-wide mb-4" style={{ color: '#FFFFFF' }}>
              Offices & Contact
            </h3>
            <ul className="space-y-3 text-xs text-[#E4EEE6]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Regd. Address:</strong>
                  <span>806, Hariom Nand Tower, Argora-Kathal More Road, Ranchi, Jharkhand</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Branch Office (B.O.):</strong>
                  <span>H. No.4, Mansarovar Colony, Bhola Nagar, Kathal More, Ranchi</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 8317054180, 9155796749</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Landline: 0651-4051577</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>kr.environ.2026@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 mt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E4EEE6]/60">
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
