import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';

export const metadata = {
  title: "Terms & Conditions | KR Environ Solutions",
  description: "Terms and conditions of use for KR Environ Solutions website and technical solutions."
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] py-10 sm:py-12 bg-white">
        <Container>
          <h1 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#173B26] mb-2">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#68756D] font-mono mb-4">
            Last Updated: March 2024 &bull; Version 1.0
          </p>

          <div className="prose max-w-none text-[#4B5563] font-lato text-sm sm:text-base leading-relaxed space-y-4">
            <h2 className="text-xl font-bold font-montserrat text-[#173B26]">
              1. General Disclaimer
            </h2>
            <p>
              The materials, specifications, and wildlife mitigation details published on this website are based on field documentation and technical standards maintained by KR Environ Solutions. Field efficacy may vary based on local terrain, wildlife habituation history, and proper adherence to deployment guidelines.
            </p>

            <h2 className="text-xl font-bold font-montserrat text-[#173B26]">
              2. Intellectual Property & Proprietary Assets
            </h2>
            <p>
              All technical documentation, project methodologies, and product specifications featured on this website remain the property of KR Environ Solutions and their respective rights holders.
            </p>

            <h2 className="text-xl font-bold font-montserrat text-[#173B26]">
              3. Procurement & Commercial Terms
            </h2>
            <p>
              Formal equipment supply, warranty coverage, site installation, and ranger training are executed under official departmental purchase orders or bilateral commercial agreements.
            </p>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
