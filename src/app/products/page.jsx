import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import { PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';
import { getProducts } from '@/lib/db';
import ProductsClient from '@/components/products/ProductsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Our Products & Conservation Hardware | KR Environ Solutions",
  description: "Explore our lineup of non-lethal wildlife conflict deterrents, ANIDERS smart sentinels, Smart Stick Forester batons, KyNet net guns, and Bird Flight Diverters."
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F3]/40">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* Full-Width Compact Products Hero Header */}
        <section className="bg-gradient-to-b from-[#F5F8F3] via-white to-[#F5F8F3]/30 pt-6 pb-2 sm:pt-8 sm:pb-3">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="max-w-3xl space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Our Products &amp; Conservation Hardware
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed max-w-3xl">
                Statutory CEA &amp; Supreme Court compliant Bird Flight Diverters &amp; Deflectors for transmission lines, Kyari bio-acoustic wildlife deterrents, frontline ranger patrol batons, humane rescue net guns, and Kyari patented self-watering smart eco-planters.
              </p>
            </div>
          </div>
        </section>

        {/* Full-Width Interactive Products Grid Section */}
        <section className="pt-2 pb-8 sm:pt-3 sm:pb-12">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
            <ProductsClient products={products} />

            {/* Institutional Tender / Bulk Supply Callout */}
            <div className="bg-gradient-to-r from-white via-[#F5F8F3] to-white rounded-2xl p-5 sm:p-8 border border-[#DCE5DD] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl text-left space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#216B35]" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#216B35]">
                    GeM Registered &amp; State Forest Framework
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold font-manrope text-[#173B26]">
                  Looking for Bulk Supply or Division-Level Pilot Deployments?
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                  We supply turnkey packages including on-site mounting, solar calibration, frontline staff training, and continuous warranty support for state forest circles and infrastructure projects.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/contact-us?subject=Bulk Hardware Procurement"
                  className="btn-primary"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Request Hardware Quotation</span>
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

