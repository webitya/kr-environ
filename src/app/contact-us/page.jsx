import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
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
        {/* Contact Hero */}
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white py-16 sm:py-20 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins uppercase tracking-wider bg-[#216B35]/10 text-[#216B35] border border-[#216B35]/20 mb-4 font-semibold">
                Government & Public Liaison
              </span>
              <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-[#173B26] tracking-tight">
                Official Consultation & Contact Desk
              </h1>
              <p className="mt-4 text-lg text-[#4B5563] font-lato leading-relaxed">
                Connect directly with our technical team in Ranchi for departmental procurement, site assessments, or urgent HWC mitigation requirements.
              </p>
            </div>
          </Container>
        </section>

        {/* Embedded Contact Form & Office Cards */}
        <HomeContact />
      </main>

      <SiteFooter />
    </div>
  );
}
