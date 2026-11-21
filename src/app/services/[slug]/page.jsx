import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2, 
  ShieldCheck, 
  PhoneCall, 
  Share2, 
  Calendar,
  FileText 
} from 'lucide-react';
import { getServiceBySlug, getServices } from '@/lib/db';

export const revalidate = 60; // 60s ISR with on-demand revalidation

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
  const whatsappMessage = encodeURIComponent(
    `Hello KR Environ Solutions, I would like to enquire about: ${service.title}.`
  );

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)]">
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
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-extrabold text-[#173B26] leading-tight">
                  {service.title}
                </h1>

                <p className="text-sm sm:text-base text-[#4B5563] font-lato leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href={`/contact-us?service=${encodeURIComponent(service.title)}&serviceSlug=${encodeURIComponent(service.slug || resolvedParams.slug)}`}
                    className="btn-primary"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Request Technical Quote / Deployment</span>
                  </Link>

                  <a
                    href={`https://wa.me/919155796749?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold font-poppins text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors shadow-md"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Direct WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                  <img
                    src={service.featuredImage || '/img4.jpeg'}
                    alt={service.title}
                    className="w-full h-full object-cover object-center"
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
                <div className="bg-[#142D20] text-white p-6 rounded-2xl shadow-lg space-y-3">
                  <h4 className="text-lg font-bold font-montserrat text-white leading-snug">
                    Schedule Ground Audit in Your Division
                  </h4>
                  <p className="text-xs text-[#E4EEE6]/80 font-lato leading-relaxed">
                    Connect directly with Sarika Gupta and our engineering team at Van Bhawan, Doranda, Ranchi.
                  </p>
                  <Link
                    href={`/contact-us?service=${encodeURIComponent(service.title)}&serviceSlug=${encodeURIComponent(service.slug || resolvedParams.slug)}`}
                    className="btn-accent w-full text-center text-xs"
                  >
                    Contact Forest Desk
                  </Link>
                  <a
                    href={`https://wa.me/919155796749?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Direct WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="mt-16 pt-10 border-t border-[#DCE5DD]">
                <h3 className="text-xl sm:text-2xl font-bold font-manrope text-[#173B26] mb-6">
                  Related Wildlife &amp; Field Solutions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.id || rel._id || rel.slug}
                      href={`/services/${rel.slug}`}
                      className="group bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden hover:border-[#216B35]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Featured Image (16:9 / 1920x1080 ratio) */}
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                          <img
                            src={rel.featuredImage || '/img4.jpeg'}
                            alt={rel.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        <div className="p-4 sm:p-5">
                          <h4 className="text-sm sm:text-base font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug line-clamp-2">
                            {rel.title}
                          </h4>
                          <p className="mt-2 text-xs text-[#4B5563] font-lato line-clamp-2 leading-relaxed">
                            {rel.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#DCE5DD]/60 flex items-center justify-between text-xs font-semibold text-[#216B35] group-hover:text-[#174D28]">
                        <span>View Details &amp; Specs</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
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
