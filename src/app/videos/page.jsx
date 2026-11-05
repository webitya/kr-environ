import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import { getVideos } from '@/lib/db';
import VideosClient from '@/components/videos/VideosClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Field Demonstrations & Media Coverage | KR Environ Solutions",
  description: "Watch field demonstrations of our non-lethal wildlife conflict deterrents, ranger safety batons, and technology overviews."
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F3]/40">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* Videos Hero */}
        <section className="bg-gradient-to-b from-[#F5F8F3] via-white to-[#F5F8F3]/30 pt-6 pb-2 sm:pt-8 sm:pb-3">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Field Demonstrations &amp; Media Coverage
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed max-w-2xl mt-1.5">
                Official video recordings, field tests, technology demonstrations, and operational overviews of our non-lethal wildlife protection equipment.
              </p>
            </div>
          </Container>
        </section>

        {/* Video Grid Section */}
        <section className="pt-2 pb-10 sm:pt-3 sm:pb-14">
          <Container>
            <VideosClient initialVideos={videos} />
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
