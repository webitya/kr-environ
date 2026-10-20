import Link from 'next/link';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center py-24 bg-[#F5F8F3]">
        <Container className="text-center max-w-lg">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <h1 className="text-4xl font-extrabold font-montserrat text-[#173B26]">
            404 - Page Not Found
          </h1>
          <p className="mt-3 text-base text-[#4B5563] font-lato">
            The page, service slug, or article you are searching for does not exist or may have been updated.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/" className="btn-primary">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link href="/services" className="btn-secondary">
              <span>Explore Services</span>
            </Link>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
