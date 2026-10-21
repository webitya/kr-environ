import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import HomeContact from '@/components/home/HomeContact';

export const metadata = {
  title: "Contact Us & Consultation Desk | KR Environ Solutions",
  description: "Connect with KR Environ Solutions for wildlife deterrence proposals, ranger safety baton orders, and forestry site surveys at Van Bhawan, Doranda, Ranchi."
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        <h1 className="sr-only">Contact KR Environ Solutions</h1>
        <HomeContact showHeading={false} />
      </main>

      <SiteFooter />
    </div>
  );
}
