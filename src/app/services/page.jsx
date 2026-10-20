import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, PhoneCall } from 'lucide-react';
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
        <section className="bg-gradient-to-b from-[#EFF7FA] to-white py-16 sm:py-24 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins uppercase tracking-wider bg-[#087EA4]/10 text-[#087EA4] border border-[#087EA4]/20 mb-4 font-semibold">
                Wildlife Conservation Engineering
              </span>
              <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-[#173B26] tracking-tight">
                Our Products & Technical Solutions
              </h1>
              <p className="mt-4 text-lg text-[#4B5563] font-lato leading-relaxed">
                Engineered in partnership with <strong>Kyari Innovations</strong>, our non-lethal deterrent devices and ranger safety equipment deliver 91% conflict mitigation without harming wildlife or humans.
              </p>
            </div>
          </Container>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id || service.slug}
                  className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/50 transition-all card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      <img
                        src={service.featuredImage || '/img4.jpeg'}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-poppins font-bold text-[#087EA4] uppercase tracking-wider shadow-xs">
                        {service.category || 'Wildlife Tech'}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold font-montserrat text-[#173B26] hover:text-[#216B35] transition-colors leading-snug">
                        <Link href={`/services/${service.slug}`}>
                          {service.title}
                        </Link>
                      </h3>

                      <p className="mt-3 text-sm text-[#4B5563] font-lato line-clamp-3 leading-relaxed">
                        {service.shortDescription}
                      </p>

                      {service.specs && (
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

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold font-poppins text-[#216B35] hover:text-[#174D28] transition-colors"
                    >
                      <span>Explore Technical Specifications</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Need Custom Proposal */}
            <div className="mt-16 bg-[#F5F8F3] rounded-2xl p-8 sm:p-12 border border-[#DCE5DD] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl text-left">
                <h3 className="text-2xl font-bold font-montserrat text-[#173B26]">
                  Need a Customized Multi-Reserve Pilot Project?
                </h3>
                <p className="mt-2 text-sm text-[#4B5563] font-lato leading-relaxed">
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
