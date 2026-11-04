import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import HomeHero from '@/components/home/HomeHero';
import HomeClients from '@/components/home/HomeClients';
import HomeAbout from '@/components/home/HomeAbout';
import HomeWhyChooseUs from '@/components/home/HomeWhyChooseUs';
import HomeBlog from '@/components/home/HomeBlog';
import HomeContact from '@/components/home/HomeContact';

import { getBlogs, getClients } from '@/lib/db';

export default async function HomePage() {
  const [blogs, clients] = await Promise.all([
    getBlogs(),
    getClients()
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HomeHero />

        {/* 2. Infinite Moving Client Logos Section */}
        <HomeClients clients={clients} />

        {/* 3. Company Introduction */}
        <HomeAbout />

        {/* 4. Why Choose Us / Verified Differentiators */}
        <HomeWhyChooseUs />

        {/* 5. Knowledge & Conservation Blog */}
        <HomeBlog blogs={blogs} />

        {/* 7. Contact & Enquiry Entry Point */}
        <HomeContact />
      </main>

      <SiteFooter />
    </div>
  );
}
