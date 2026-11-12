import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import GalleryClient from '@/components/gallery/GalleryClient';
import { getGallery } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Field Operations & Equipment Gallery | KR Environ Solutions',
  description:
    'Photographic documentation of our field deployments, wildlife conflict mitigation, forestry consultations, and environmental monitoring operations.'
};

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* Gallery Hero - Minimal Compact Spacing, No HR line */}
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white pt-6 pb-2 sm:pt-8 sm:pb-3 w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-manrope font-extrabold text-[#173B26] tracking-tight leading-tight">
                Field Operations &amp; Equipment Gallery
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                Photographic documentation of our field deployments, live wildlife rescues, equipment installations, and forestry training programs.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid - Full Width, 3 Images per Row, Clean High-Contrast Overlays */}
        <section className="pt-2 pb-12 sm:pt-3 sm:pb-16 bg-white w-full flex-1">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <GalleryClient items={gallery} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
