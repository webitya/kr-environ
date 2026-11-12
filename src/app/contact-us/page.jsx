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

export default async function ContactUsPage({ searchParams }) {
  const resolvedParams = (await searchParams) || {};
  const [services, products] = await Promise.all([
    getServices(),
    getProducts()
  ]);

  const rawService = (resolvedParams.service || '').toString().trim();
  const rawServiceSlug = (resolvedParams.serviceSlug || '').toString().trim();
  const rawProduct = (resolvedParams.product || '').toString().trim();
  const rawProductSlug = (resolvedParams.productSlug || '').toString().trim();
  const rawSubject = (resolvedParams.subject || '').toString().trim();

  const findMatch = (list, targetTitle, targetSlug) => {
    if (!Array.isArray(list)) return null;
    if (targetSlug) {
      const s = targetSlug.toLowerCase();
      const bySlug = list.find((item) => (item.slug || '').toLowerCase() === s);
      if (bySlug) return bySlug;
    }
    if (targetTitle) {
      const t = targetTitle.toLowerCase();
      const byTitle = list.find((item) => (item.title || '').trim().toLowerCase() === t);
      if (byTitle) return byTitle;
    }
    return null;
  };

  let initialService = '';
  let initialSelectionType = '';
  let initialSubject = '';

  const matchedProduct =
    findMatch(products, rawProduct, rawProductSlug) ||
    (rawSubject.toLowerCase().startsWith('rfp quote request:')
      ? findMatch(products, rawSubject.slice('rfp quote request:'.length).trim(), '')
      : null) ||
    (rawSubject ? findMatch(products, rawSubject, '') : null);

  const matchedService =
    findMatch(services, rawService, rawServiceSlug) ||
    (rawSubject ? findMatch(services, rawSubject, '') : null);

  if (matchedProduct) {
    initialService = matchedProduct.title;
    initialSelectionType = 'product';
  } else if (matchedService) {
    initialService = matchedService.title;
    initialSelectionType = 'service';
  } else if (rawProduct) {
    initialService = rawProduct;
    initialSelectionType = 'product';
  } else if (rawService) {
    initialService = rawService;
    initialSelectionType = 'service';
  } else if (rawSubject) {
    initialService = 'General Technical Consultation / Other';
    initialSubject = rawSubject;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        <h1 className="sr-only">Contact KR Environ Solutions</h1>
        <HomeContact
          key={`${initialService}:${initialSubject}`}
          showHeading={false}
          services={services}
          products={products}
          initialService={initialService}
          initialSelectionType={initialSelectionType}
          initialSubject={initialSubject}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
