import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import HomeHero from '@/components/home/HomeHero';
import HomeAbout from '@/components/home/HomeAbout';
import HomeServices from '@/components/home/HomeServices';
import HomeWhyChooseUs from '@/components/home/HomeWhyChooseUs';
import HomeExpertise from '@/components/home/HomeExpertise';
import HomeProjects from '@/components/home/HomeProjects';
import HomeGallery from '@/components/home/HomeGallery';
import HomeVideos from '@/components/home/HomeVideos';
import HomeBlog from '@/components/home/HomeBlog';
import HomeCTA from '@/components/home/HomeCTA';
import HomeContact from '@/components/home/HomeContact';

import { getServices, getProjects, getGallery, getVideos, getBlogs } from '@/lib/db';

export default async function HomePage() {
  const [services, projects, gallery, videos, blogs] = await Promise.all([
    getServices(),
    getProjects(),
    getGallery(),
    getVideos(),
    getBlogs()
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HomeHero />

        {/* 2. Company Introduction */}
        <HomeAbout />

        {/* 3. Featured Services */}
        <HomeServices services={services} />

        {/* 4. Why Choose Us / Verified Differentiators */}
        <HomeWhyChooseUs />

        {/* 5. Environmental & Technical Expertise */}
        <HomeExpertise />

        {/* 6. Selected Field Projects */}
        <HomeProjects projects={projects} />

        {/* 7. Field Photo Gallery */}
        <HomeGallery gallery={gallery} />

        {/* 8. Field Videos & Demonstration */}
        <HomeVideos videos={videos} />

        {/* 9. Knowledge & Conservation Blog */}
        <HomeBlog blogs={blogs} />

        {/* 10. Consultation CTA */}
        <HomeCTA />

        {/* 11. Contact & Enquiry Entry Point */}
        <HomeContact />
      </main>

      <SiteFooter />
    </div>
  );
}
