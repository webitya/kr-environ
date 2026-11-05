import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import HomeHero from '@/components/home/HomeHero';
import HomeClients from '@/components/home/HomeClients';
import HomeAbout from '@/components/home/HomeAbout';
import HomeGallery from '@/components/home/HomeGallery';
import HomeProducts from '@/components/home/HomeProducts';
import HomeServices from '@/components/home/HomeServices';
import HomeWhyChooseUs from '@/components/home/HomeWhyChooseUs';
import HomeBlog from '@/components/home/HomeBlog';
import HomeContact from '@/components/home/HomeContact';

import { getBlogs, getClients, getGallery, getProducts, getServices } from '@/lib/db';

export default async function HomePage() {
  const [blogs, clients, gallery, products, services] = await Promise.all([
    getBlogs(),
    getClients(),
    getGallery(),
    getProducts(),
    getServices()
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)]">
        {/* 1. Hero Section */}
        <HomeHero />

        {/* 2. Infinite Moving Client Logos Section */}
        <HomeClients clients={clients} />

        {/* 3. Company Introduction */}
        <HomeAbout />

        {/* 4. Field Operations & Conservation Gallery (2 rows x 4 columns compact) */}
        <HomeGallery gallery={gallery} />

        {/* 5. Certified Conservation Products (4 products in 1 row, compact) */}
        <HomeProducts products={products} />

        {/* 6. Technical Services & Solutions (4 services in 1 row, compact) */}
        <HomeServices services={services} />

        {/* 7. Why Choose Us / Verified Differentiators */}
        <HomeWhyChooseUs />

        {/* 8. Knowledge & Conservation Blog */}
        <HomeBlog blogs={blogs} />

        {/* 9. Contact & Enquiry Entry Point */}
        <HomeContact />
      </main>

      <SiteFooter />
    </div>
  );
}
