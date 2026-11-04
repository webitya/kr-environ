import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import { ShieldCheck, PhoneCall, CheckCircle2, ArrowRight } from 'lucide-react';
import { getServices } from '@/lib/db';
import ServicesGrid from '@/components/services/ServicesGrid';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Our Services & Solutions | KR Environ Solutions",
  description: "Explore non-lethal wildlife conflict deterrents, ANIDERS smart scarecrows, Re-Pulse mats, KyNet net guns, and ranger safety gear."
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F3]/40">
      <SiteHeader />

      <main className="flex-1">
        {/* Full-Width Services Hero Header */}
        <section className="bg-gradient-to-b from-[#F5F8F3] via-white to-[#F5F8F3]/30 py-8 sm:py-12 border-b border-[#DCE5DD]">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
              <div className="max-w-3xl space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                  Our Services &amp; Technical Solutions
                </h1>
                <p className="text-xs sm:text-sm text-[#4B5563] font-lato leading-relaxed max-w-2xl">
                  Engineered in partnership with <strong>Kyari Innovations</strong>, our non-lethal deterrent devices and ranger safety equipment deliver 91% conflict mitigation without harming wildlife or humans.
                </p>
              </div>

              {/* Fast Highlights Badges */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#DCE5DD] text-xs font-semibold text-[#173B26] shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#216B35]" />
                  <span>100% Non-Lethal</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#DCE5DD] text-xs font-semibold text-[#173B26] shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#216B35]" />
                  <span>21+ State Forest Depts</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Width Interactive 4-Cards Grid Section */}
        <section className="py-8 sm:py-12">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
            {/* Interactive Grid with Dynamic Filter and Search */}
            <ServicesGrid services={services} />

            {/* Custom Multi-Reserve RFP / Proposal Callout */}
            <div className="bg-gradient-to-r from-white via-[#F5F8F3] to-white rounded-2xl p-5 sm:p-8 border border-[#DCE5DD] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl text-left space-y-1.5">
                <h3 className="text-base sm:text-xl font-bold font-manrope text-[#173B26]">
                  Need a Customized Multi-Reserve Pilot Project or RFP Proposal?
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] font-lato leading-relaxed">
                  We prepare tailored HWC mitigation dossiers for state forest divisions, including boundary topology mapping, solar calculations, and live ranger training modules.
                </p>
              </div>
              <Link href="/contact-us" className="btn-primary shrink-0 text-xs sm:text-sm px-5 py-2.5">
                <PhoneCall className="w-4 h-4" />
                <span>Request Custom RFP / Proposal</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
