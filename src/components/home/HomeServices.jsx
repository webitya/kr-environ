import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeServices({ services = [] }) {
  // Exactly 4 services in 1 row on desktop
  const displayServices = services.slice(0, 4);

  if (displayServices.length === 0) return null;

  return (
    <section className="py-8 sm:py-10 bg-[#F5F8F3]/50 border-b border-[#DCE5DD] w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header - Compact UI/UX */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-2 border-b border-[#DCE5DD]/60">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#173B26] font-manrope tracking-tight">
              Statutory Services &amp; Technical Solutions
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] font-manrope max-w-2xl mt-1 leading-relaxed">
              Statutory Forest Clearances (FC), Environmental Clearances (EC), GIS Drone Topography Mapping, and Human-Wildlife Conflict mitigation.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#216B35] hover:text-[#174D28] bg-white hover:bg-[#F5F8F3] border border-[#DCE5DD] hover:border-[#216B35] px-3.5 py-1.5 rounded-lg font-manrope transition-all shadow-xs shrink-0 self-start sm:self-auto"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 1 Row of 4 Compact Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayServices.map((service) => {
            const serviceHref = service.slug ? `/services/${service.slug}` : `/services`;
            return (
              <div
                key={service.id || service._id || service.slug}
                className="group bg-white rounded-xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:shadow-md hover:border-[#216B35]/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Compact Service Image (16:9 / 1920x1080 ratio) */}
                  <Link href={serviceHref} className="block relative aspect-video w-full overflow-hidden bg-slate-100 cursor-pointer">
                    <img
                      src={service.featuredImage || '/img4.jpeg'}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </Link>

                  {/* Compact Content */}
                  <div className="p-4 space-y-2">
                    <Link href={serviceHref} className="block group-hover:text-[#216B35] transition-colors">
                      <h3 className="text-sm sm:text-base font-bold font-manrope text-[#173B26] line-clamp-1 leading-snug">
                        {service.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#4B5563] font-manrope line-clamp-2 leading-relaxed">
                      {service.shortDescription || 'Turnkey statutory environmental clearances and advanced wildlife conservation engineering.'}
                    </p>

                    {/* Quick Specs Snippet */}
                    {service.specs && service.specs.length > 0 && (
                      <div className="pt-2 border-t border-[#DCE5DD]/60 space-y-1">
                        {service.specs.slice(0, 2).map((sp, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#4B5563] truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#216B35] shrink-0" />
                            <span className="truncate">
                              <strong className="text-[#173B26] font-medium">{sp.label}:</strong> {sp.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Compact Footer Action */}
                <div className="p-3.5 pt-2.5 border-t border-[#DCE5DD]/60 bg-[#F5F8F3]/40 flex items-center justify-end">
                  <Link
                    href={serviceHref}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#216B35] hover:text-[#174D28] font-manrope group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Explore Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
