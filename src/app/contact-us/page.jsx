import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import HomeContact from '@/components/home/HomeContact';
import { getServices, getProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Contact Us & Consultation Desk | KR Environ Solutions",
  description: "Connect with KR Environ Solutions for environmental & forest clearances, wildlife deterrence proposals, ranger safety gear, and forestry site surveys."
};

export default async function ContactUsPage() {
  const [services, products] = await Promise.all([
    getServices(),
    getProducts()
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        <h1 className="sr-only">Contact KR Environ Solutions</h1>
        <HomeContact showHeading={false} services={services} products={products} />
      </main>

      <SiteFooter />
    </div>
  );
}
