import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { getCertificates } from '@/lib/db';
import CertificatesClient from '@/components/certificates/CertificatesClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Our Certifications & Accreditations | KR Environ Solutions",
  description: "Explore ISO 9001:2015, ISO 14001:2015, MSME Udyam, Startup India, and statutory forest clearance credentials of KR Environ Solutions."
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F3]/40">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* Full-Width Compact Certificates Hero Header */}
        <section className="bg-gradient-to-b from-[#F5F8F3] via-white to-[#F5F8F3]/30 pt-6 pb-2 sm:pt-8 sm:pb-3">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="max-w-3xl space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Our Certifications &amp; Accreditations
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed max-w-2xl">
                Statutory regulatory compliance, ISO quality &amp; environmental management benchmarks, Government of India MSME registrations, and national innovation citations.
              </p>
            </div>
          </div>
        </section>

        {/* Full-Width Interactive Certificates Grid Section */}
        <section className="pt-2 pb-8 sm:pt-3 sm:pb-12">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <CertificatesClient certificates={certificates} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

