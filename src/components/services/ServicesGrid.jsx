'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServicesGrid({ services = [] }) {
  if (!services || services.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-[#DCE5DD] shadow-xs">
        <h4 className="text-base font-bold text-[#173B26]">No Services Found</h4>
        <p className="text-xs text-[#68756D] mt-1">Please add services via the admin panel.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* =========================================================================
          FULL-WIDTH 4-CARDS-PER-ROW RESPONSIVE GRID (NO BADGES, NO SEARCH BAR)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5">
        {services.map((service) => (
          <Link
            key={service.id || service._id || service.slug}
            href={`/services/${service.slug}`}
            className="group bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#216B35]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Clean Cover Image Without Floating Badges */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.featuredImage || '/img4.jpeg'}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs text-[#4B5563] font-manrope line-clamp-3 leading-relaxed">
                  {service.shortDescription || 'State-approved environmental and wildlife technology solution.'}
                </p>
              </div>
            </div>

            {/* Card Footer Link */}
            <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-[#DCE5DD]/40 bg-[#F5F8F3]/30 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#216B35] group-hover:text-[#174D28] transition-colors">
                View Technical Specs
              </span>
              <div className="w-6 h-6 rounded-full bg-white border border-[#DCE5DD] flex items-center justify-center text-[#216B35] group-hover:bg-[#216B35] group-hover:text-white group-hover:border-[#216B35] transition-all">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
