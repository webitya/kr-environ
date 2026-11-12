import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import { PhoneCall, ArrowRight } from 'lucide-react';
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

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* Full-Width Services Hero Header */}
        <section className="bg-gradient-to-b from-[#F5F8F3] via-white to-[#F5F8F3]/30 pt-6 pb-2 sm:pt-8 sm:pb-3">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="max-w-3xl space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Our Services &amp; Technical Solutions
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed max-w-2xl">
                Comprehensive statutory environmental clearances (EC/FC/CTE/CTO), precision GIS drone mapping, and humane wildlife conflict mitigation solutions tailored for forest divisions and infrastructure projects.
              </p>
            </div>
          </div>
        </section>

        {/* Full-Width Interactive 4-Cards Grid Section */}
        <section className="pt-2 pb-8 sm:pt-3 sm:pb-12">
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
