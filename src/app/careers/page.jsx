import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { getCareers } from '@/lib/db';
import CareersClient from '@/components/careers/CareersClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Careers & Internships | KR Environ Solutions',
  description: 'Explore active job openings, field roles, and environmental science internships at KR Environ Solutions.'
};

export default async function CareersPage() {
  const careers = await getCareers({ includeClosed: false });

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F3]/40">
      <SiteHeader />

      <main className="flex-1 w-full">
        {/* Compact Header */}
        <section className="bg-gradient-to-b from-[#F5F8F3] via-white to-[#F5F8F3]/30 pt-6 pb-4 sm:pt-8 sm:pb-5 border-b border-[#DCE5DD]/60">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="max-w-3xl space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Careers &amp; Student Internships
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                Apply for active environmental consulting, GIS drone mapping, and conservation field openings posted by KR Environ Solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Openings & Application Modal */}
        <section className="py-6 sm:py-8">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <CareersClient initialCareers={careers} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

