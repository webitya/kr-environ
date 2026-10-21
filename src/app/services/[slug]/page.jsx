import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  PhoneCall, 
  Share2, 
  Calendar,
  FileText 
} from 'lucide-react';
import { getServiceBySlug, getServices } from '@/lib/db';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return { title: 'Service Not Found | KR Environ Solutions' };
  }

  return {
    title: `${service.title} | KR Environ Solutions`,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      images: [service.featuredImage]
    }
  };
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const allServices = await getServices();
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb & Hero */}
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white py-8 sm:py-12 border-b border-[#DCE5DD]">
          <Container>
            <div className="mb-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold font-poppins text-[#216B35] hover:text-[#174D28] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Technical Solutions</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35]">
                  {service.category || 'Wildlife Technology'}
                </p>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-extrabold text-[#173B26] leading-tight">
                  {service.title}
                </h1>

                <p className="text-sm sm:text-base text-[#4B5563] font-lato leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Link href="/contact-us" className="btn-primary">
                    <PhoneCall className="w-4 h-4" />
                    <span>Request Technical Quote / Deployment</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                  <img
                    src={service.featuredImage || '/img4.jpeg'}
                    alt={service.title}
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Content & Specs Section */}
        <section className="py-10 sm:py-12 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Detailed Content */}
              <div className="lg:col-span-8 space-y-6">
                <div className="prose max-w-none text-[#4B5563] font-lato text-sm sm:text-base leading-relaxed space-y-3">
                  {service.content ? (
                    service.content.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={idx} className="text-xl font-bold font-montserrat text-[#173B26] pt-2">
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('- ')) {
                        const items = paragraph.split('\n').filter(Boolean);
                        return (
                          <ul key={idx} className="list-disc pl-5 space-y-1 my-2">
                            {items.map((it, i) => (
                              <li key={i}>{it.replace('- ', '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={idx}>{paragraph}</p>;
                    })
                  ) : (
                    <p>Detailed technical specifications and deployment instructions available upon inquiry.</p>
                  )}
                </div>

                {/* Key Technical Highlights Box */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#F5F8F3] border border-[#216B35]/20 space-y-3">
                  <h3 className="text-lg font-bold font-montserrat text-[#173B26] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#216B35]" />
                    Field Compliance & Non-Lethal Certification
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] font-lato">
                    All wildlife hardware deployed by KR Environ Solutions complies with ethical wildlife stewardship standards. The systems deter animals using bio-acoustic sound, visual strobes, or certified non-injurious micro-impulses that condition wildlife away from human settlements without physical trauma.
                  </p>
                </div>
              </div>

              {/* Sidebar: Technical Specs & Quick CTA */}
              <div className="lg:col-span-4 space-y-6">
                {service.specs && service.specs.length > 0 && (
                  <div className="bg-[#F5F8F3] p-6 rounded-2xl border border-[#DCE5DD]">
                    <h3 className="text-base font-bold font-montserrat text-[#173B26] mb-4 pb-2 border-b border-[#DCE5DD]">
                      Technical Specifications
                    </h3>
                    <div className="space-y-3 font-poppins">
                      {service.specs.map((sp, idx) => (
                        <div key={idx} className="text-xs">
                          <span className="text-[#68756D] block font-medium">{sp.label}</span>
                          <span className="text-[#173B26] font-bold text-sm">{sp.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Action Card */}
                <div className="bg-[#142D20] text-white p-6 rounded-2xl shadow-lg space-y-4">
                  <span className="text-xs font-bold font-poppins text-emerald-400 uppercase tracking-wider block">
                    Government Procurements
                  </span>
                  <h4 className="text-lg font-bold font-montserrat text-white leading-snug">
                    Schedule Ground Audit in Your Division
                  </h4>
                  <p className="text-xs text-[#E4EEE6]/80 font-lato leading-relaxed">
                    Connect directly with Sarika Gupta and our engineering team at Van Bhawan, Doranda, Ranchi.
                  </p>
                  <Link href="/contact-us" className="btn-accent w-full text-center text-xs">
                    Contact Forest Desk
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="mt-20 pt-12 border-t border-[#DCE5DD]">
                <h3 className="text-2xl font-bold font-montserrat text-[#173B26] mb-8">
                  Related Wildlife & Field Solutions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedServices.map((rel) => (
                    <div
                      key={rel.id || rel.slug}
                      className="bg-white p-6 rounded-2xl border border-[#DCE5DD] hover:border-[#216B35] transition-all card-hover flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-[#216B35] uppercase tracking-wider font-poppins block mb-2">
                          {rel.category}
                        </span>
                        <h4 className="text-lg font-bold font-montserrat text-[#173B26] hover:text-[#216B35]">
                          <Link href={`/services/${rel.slug}`}>{rel.title}</Link>
                        </h4>
                        <p className="mt-2 text-xs text-[#4B5563] font-lato line-clamp-2">
                          {rel.shortDescription}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#DCE5DD]/60">
                        <Link
                          href={`/services/${rel.slug}`}
                          className="text-xs font-semibold text-[#216B35] hover:underline"
                        >
                          View Details &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
