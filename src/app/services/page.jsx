import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { getServices } from '@/lib/db';

export const metadata = {
  title: "Wildlife Technology & Field Services | KR Environ Solutions",
  description: "Explore non-lethal wildlife conflict deterrents, ANIDERS smart scarecrows, Re-Pulse mats, KyNet net guns, and ranger safety gear."
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Services Hero Header */}
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white py-10 sm:py-14 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35] mb-2">
                Wildlife Conservation Engineering
              </p>
              <h1 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-[#173B26] tracking-tight">
                Our Products & Technical Solutions
              </h1>
              <p className="mt-2.5 text-base text-[#4B5563] font-lato leading-relaxed">
                Engineered in partnership with <strong>Kyari Innovations</strong>, our non-lethal deterrent devices and ranger safety equipment deliver 91% conflict mitigation without harming wildlife or humans.
              </p>
            </div>
          </Container>
        </section>

        {/* Services Grid */}
        <section className="py-12 lg:py-14 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service) => (
                <div
                  key={service.id || service.slug}
                  className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/50 transition-all card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={service.featuredImage || '/img4.jpeg'}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35] mb-1.5">
                        {service.category || 'Wildlife Tech'}
                      </p>

                      <h3 className="text-base sm:text-lg font-bold font-montserrat text-[#173B26] hover:text-[#216B35] transition-colors leading-snug">
                        <Link href={`/services/${service.slug}`}>
                          {service.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#4B5563] font-lato line-clamp-3 leading-relaxed">
                        {service.shortDescription}
                      </p>

                      {service.specs && (
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

                  <div className="px-5 pb-5 pt-1">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold font-poppins text-[#216B35] hover:text-[#174D28] transition-colors"
                    >
                      <span>Explore Technical Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Need Custom Proposal */}
            <div className="mt-10 bg-[#F5F8F3] rounded-2xl p-5 sm:p-8 border border-[#DCE5DD] flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="max-w-2xl text-left">
                <h3 className="text-lg sm:text-xl font-bold font-montserrat text-[#173B26]">
                  Need a Customized Multi-Reserve Pilot Project?
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] font-lato leading-relaxed">
                  We prepare tailored HWC mitigation proposals for state forest divisions, including boundary topology mapping, solar calculations, and live ranger training modules.
                </p>
              </div>
              <Link href="/contact-us" className="btn-primary shrink-0">
                <PhoneCall className="w-4 h-4" />
                <span>Request Custom RFP / Proposal</span>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
