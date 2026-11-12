import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import { PhoneCall, Handshake, ArrowRight } from 'lucide-react';
import { getPartners } from '@/lib/db';
import PartnersClient from '@/components/partners/PartnersClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Our Partners & Institutional Alliances | KR Environ Solutions",
  description: "Collaborations with accredited environmental laboratories, State Forest Departments, GIS survey specialists, and infrastructure utilities across India."
};

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F3]/40">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* Full-Width Compact Partners Hero Header */}
        <section className="bg-gradient-to-b from-[#F5F8F3] via-white to-[#F5F8F3]/30 pt-6 pb-2 sm:pt-8 sm:pb-3">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="max-w-3xl space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Our Partners &amp; Institutional Alliances
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed max-w-2xl">
                We collaborate in close synergy with accredited environmental analytical laboratories, advanced engineering technology firms, GIS survey partners, and infrastructure consultants.
              </p>
            </div>
          </div>
        </section>

        {/* Full-Width Interactive Partners Grid Section */}
        <section className="pt-2 pb-8 sm:pt-3 sm:pb-12">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
            <PartnersClient partners={partners} />

            {/* Strategic Alliance Callout */}
            <div className="bg-gradient-to-r from-white via-[#F5F8F3] to-white rounded-2xl p-5 sm:p-8 border border-[#DCE5DD] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl text-left space-y-1.5">
                <div className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-[#216B35]" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#216B35]">
                    Institutional Alliances &amp; MoUs
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold font-manrope text-[#173B26]">
                  Interested in an Institutional Partnership or Joint Field Pilot?
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                  We collaborate with conservation NGOs, research institutions, public sector undertakings, and state agencies for regional wildlife safety solutions and environmental clearance execution.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/contact-us?subject=Institutional Partnership"
                  className="btn-primary"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Partner With Us</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

