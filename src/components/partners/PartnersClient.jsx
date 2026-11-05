'use client';

import Link from 'next/link';
import { 
  Building2, 
  ExternalLink, 
  Handshake, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

export default function PartnersClient({ partners = [] }) {
  return (
    <div className="w-full">
      {/* Partners Grid: 3 columns on large desktop, 2 on tablet, 1 on mobile */}
      {partners.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#DCE5DD] shadow-xs">
          <Handshake className="w-10 h-10 text-[#68756D] mx-auto mb-2 opacity-50" />
          <h4 className="text-base font-bold text-[#173B26]">No Partners Found</h4>
          <p className="text-xs text-[#68756D] mt-1">Partners can be added via the admin portal.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id || partner._id || partner.name}
              className="group bg-white rounded-2xl border border-[#DCE5DD] p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-[#216B35]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Logo */}
                <div className="w-16 h-16 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] p-2 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-[#216B35]/40 transition-colors">
                  <img
                    src={partner.logoUrl || '/logo.jpeg'}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Partner Name & Collaboration Scope */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug">
                    {partner.name}
                  </h3>

                  {partner.collaborationType && (
                    <p className="text-xs font-semibold text-[#173B26]/80 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#216B35] shrink-0" />
                      <span>{partner.collaborationType}</span>
                    </p>
                  )}

                  <p className="text-xs text-[#4B5563] font-manrope leading-relaxed line-clamp-4 pt-1">
                    {partner.description || 'Active institutional collaboration supporting sustainable environmental compliance and wildlife protection.'}
                  </p>
                </div>
              </div>

              {/* Bottom Action / Link */}
              <div className="pt-4 mt-4 border-t border-[#DCE5DD]/60 flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#68756D]">
                  Verified Partner
                </span>

                {partner.websiteUrl ? (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#216B35] hover:text-[#174D28] transition-colors"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    href="/contact-us?subject=Partnership Inquiry"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#216B35] hover:text-[#174D28] transition-colors"
                  >
                    <span>Collaborate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
