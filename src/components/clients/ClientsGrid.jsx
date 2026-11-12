'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ClientsGrid({ initialClients = [] }) {
  const [clients, setClients] = useState(initialClients);

  // Sync with admin API on mount so additions/updates reflect immediately
  useEffect(() => {
    let active = true;
    async function refreshClients() {
      try {
        const res = await fetch('/api/clients', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data.clients)) {
            setClients(data.clients);
          }
        }
      } catch (err) {
        console.error('Error refreshing clients:', err);
      }
    }
    refreshClients();
    return () => {
      active = false;
    };
  }, []);

  if (!clients || clients.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-[#DCE5DD] shadow-xs space-y-3">
        <Building2 className="w-10 h-10 text-[#68756D] mx-auto opacity-45" />
        <h2 className="text-base font-bold font-manrope text-[#173B26]">No Client Organizations Listed Yet</h2>
        <p className="text-xs text-[#68756D] font-manrope max-w-sm mx-auto">
          Client organizations added via the Admin Portal under Marquee Logos will automatically appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {clients.map((client) => {
          const websiteHref = client.websiteUrl?.trim();

          return (
            <div
              key={client.id || client._id || client.name}
              className="group bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#216B35]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Full-Color Logo Showcase */}
                <div className="h-32 sm:h-36 w-full bg-white border-b border-[#DCE5DD]/50 flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={client.logoUrl || '/logo.jpeg'}
                    alt={client.name || 'Client Logo'}
                    className="max-h-20 sm:max-h-24 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Client Details */}
                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm sm:text-base font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug line-clamp-2">
                    {client.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#4B5563] font-manrope">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#216B35] shrink-0" />
                    <span>Trusted Institutional Client</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 sm:px-5 py-3 border-t border-[#DCE5DD]/40 bg-[#F5F8F3]/35 flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#68756D] font-manrope">
                  Verified Association
                </span>

                {websiteHref ? (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#216B35] hover:text-[#174D28] font-manrope transition-colors"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    href="/contact-us?subject=Client Consultation"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#216B35] hover:text-[#174D28] font-manrope transition-colors"
                  >
                    <span>Work With Us</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

