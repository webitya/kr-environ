import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeServices({ services = [] }) {
  // If no services passed, use empty or slice first 6
  const displayServices = services.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product & Technical Solutions"
          badgeColor="blue"
          title="Field-Tested Wildlife Safety & Deterrent Hardware"
          subtitle="Non-lethal sensor systems, electronic capture launchers, and tactical forest ranger equipment engineered for zero harm."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <div
              key={service.id || service.slug}
              className="group bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden card-hover flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Image Container with Tag */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.featuredImage || '/img4.jpeg'}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/30 text-[11px] font-poppins font-bold text-[#087EA4] uppercase tracking-wider">
                    {service.category || 'Wildlife Tech'}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-montserrat text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug">
                    <Link href={`/services/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-sm text-[#4B5563] font-lato line-clamp-3 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Highlights/Specs preview */}
                  {service.specs && service.specs.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#DCE5DD]/60 flex flex-wrap gap-2">
                      {service.specs.slice(0, 2).map((sp, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] font-medium font-poppins text-[#173B26] bg-[#F5F8F3] px-2 py-0.5 rounded border border-[#DCE5DD]"
                        >
                          <Zap className="w-3 h-3 text-[#F2BE36]" />
                          {sp.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Link at Bottom */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold font-poppins text-[#087EA4] hover:text-[#06617F] group/link transition-colors"
                >
                  <span>Explore Technical Specifications</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTAs */}
        <div className="mt-12 text-center">
          <Link href="/services" className="btn-secondary">
            <span>View Complete Product & Service Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
