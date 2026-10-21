import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeServices({ services = [] }) {
  // If no services passed, use empty or slice first 6
  const displayServices = services.slice(0, 6);

  return (
    <section className="py-12 lg:py-14 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <SectionHeading
          title="Field-Tested Wildlife Safety & Deterrent Hardware"
          subtitle="Non-lethal sensor systems, electronic capture launchers, and tactical forest ranger equipment engineered for zero harm."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayServices.map((service) => (
            <div
              key={service.id || service.slug}
              className="group bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden card-hover flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.featuredImage || '/img4.jpeg'}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35] mb-1.5">
                    {service.category || 'Wildlife Tech'}
                  </p>

                  <h3 className="text-base sm:text-lg font-bold font-montserrat text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug">
                    <Link href={`/services/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#4B5563] font-lato line-clamp-3 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Highlights/Specs preview */}
                  {service.specs && service.specs.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#DCE5DD]/60 flex flex-wrap gap-x-3 gap-y-1">
                      {service.specs.slice(0, 2).map((sp, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium text-[#173B26]"
                        >
                          &bull; {sp.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Link at Bottom */}
              <div className="px-5 pb-5 pt-1">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold font-poppins text-[#216B35] hover:text-[#174D28] group/link transition-colors"
                >
                  <span>Explore Technical Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTAs */}
        <div className="mt-8 text-center">
          <Link href="/services" className="btn-secondary">
            <span>View Complete Product & Service Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
