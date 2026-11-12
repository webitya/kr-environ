import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import { PhoneCall, Building2, ShieldCheck, Trees, Zap, Factory } from 'lucide-react';
import { getClients } from '@/lib/db';
import ClientsGrid from '@/components/clients/ClientsGrid';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Our Clients & Institutional Associations | KR Environ Solutions",
  description: "Explore the government departments, power transmission utilities, infrastructure EPC leaders, and industrial enterprises partnered with KR Environ Solutions."
};

const clientSectors = [
  {
    title: 'Power & Transmission Utilities',
    description: 'CEA & Supreme Court compliant Bird Flight Diverters, PTCC clearances, and wildlife corridor clearances.',
    icon: Zap
  },
  {
    title: 'State Forest & Wildlife Departments',
    description: 'Non-lethal ANIDERS deterrents, tactical ranger patrol gear, and humane rescue systems deployed across forest divisions.',
    icon: Trees
  },
  {
    title: 'Infrastructure & EPC Contractors',
    description: 'Statutory Forest Clearances (FC), Environmental Clearances (EC), GIS drone surveys, and chain-link fencing.',
    icon: Building2
  },
  {
    title: 'Industrial & Mining Enterprises',
    description: 'EIA/EMP documentation, ambient air and water quality monitoring, and long-term statutory compliance.',
    icon: Factory
  }
];

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F3]/40">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* Full-Width Compact Clients Hero Header */}
        <section className="bg-gradient-to-b from-[#F5F8F3] via-white to-[#F5F8F3]/30 pt-6 pb-2 sm:pt-8 sm:pb-3">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="max-w-3xl space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Our Clients &amp; Institutional Trust
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed max-w-2xl">
                Trusted by leading power transmission EPCs, state forest departments, and infrastructure organizations across India for statutory clearances and conservation engineering.
              </p>
            </div>
          </div>
        </section>

        {/* Full-Width Clients Showcase & Sectors */}
        <section className="pt-2 pb-8 sm:pt-3 sm:pb-12">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
            <ClientsGrid initialClients={clients} />

            {/* Key Sectors Served */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#216B35]" />
                <h2 className="text-base sm:text-lg font-bold font-manrope text-[#173B26]">
                  Key Sectors We Serve
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {clientSectors.map((sector) => {
                  const Icon = sector.icon;
                  return (
                    <div
                      key={sector.title}
                      className="bg-white rounded-2xl border border-[#DCE5DD] p-4 sm:p-5 shadow-xs space-y-2"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center justify-center text-[#216B35]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold font-manrope text-[#173B26]">
                        {sector.title}
                      </h3>
                      <p className="text-xs text-[#4B5563] font-manrope leading-relaxed">
                        {sector.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Client Engagement Callout */}
            <div className="bg-gradient-to-r from-white via-[#F5F8F3] to-white rounded-2xl p-5 sm:p-8 border border-[#DCE5DD] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl text-left space-y-1.5">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#216B35]" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#216B35] font-manrope">
                    Statutory Compliance &amp; Turnkey Supply
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold font-manrope text-[#173B26]">
                  Looking for Reliable Environmental Clearance or Wildlife Hardware Execution?
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                  Connect with our Ranchi headquarters to discuss regulatory approvals, transmission line bird diverters, GIS surveys, and field deployments tailored to your schedule.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/contact-us?subject=Client Consultation"
                  className="btn-primary font-manrope"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Request Consultation</span>
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

