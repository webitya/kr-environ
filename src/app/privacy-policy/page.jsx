import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';

export const metadata = {
  title: "Privacy Policy | KR Environ Solutions",
  description: "Official Privacy Policy of KR Environ Solutions regarding user data and client inquiries."
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 py-16 bg-white">
        <Container className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold font-montserrat text-[#173B26] mb-6">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#68756D] font-mono mb-8">
            Last Updated: March 2024 &bull; Version 1.0
          </p>

          <div className="prose max-w-none text-[#4B5563] font-lato text-base leading-relaxed space-y-6">
            <p>
              KR Environ Solutions (“we”, “our”, or “us”), headed by proprietor Sarika Gupta, is committed to safeguarding the privacy and confidentiality of individuals, government agencies, and institutional partners who access our web portal and services.
            </p>

            <h2 className="text-xl font-bold font-montserrat text-[#173B26]">
              1. Information Collection
            </h2>
            <p>
              We collect information provided directly through our consultation and inquiry forms, including full name, department/organization, email address, telephone contact, and technical requirements.
            </p>

            <h2 className="text-xl font-bold font-montserrat text-[#173B26]">
              2. Use of Information
            </h2>
            <p>
              Information gathered is solely utilized to process project inquiries, prepare technical proposals, conduct ground site audits, and communicate official equipment updates. We never sell, lease, or monetize client or departmental contact details.
            </p>

            <h2 className="text-xl font-bold font-montserrat text-[#173B26]">
              3. Data Security
            </h2>
            <p>
              Administrative access is secured with authenticated credentials and encrypted protocols to prevent unauthorized access or disclosure of sensitive forest division inquiries.
            </p>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
