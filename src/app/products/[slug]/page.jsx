import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Package, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  PhoneCall, 
  Download, 
  Building2, 
  FileCheck2, 
  Wrench, 
  Layers, 
  ExternalLink,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Details | KR Environ Solutions',
      description: 'Explore our comprehensive range of wildlife conflict mitigation and conservation hardware.'
    };
  }

  return {
    title: `${product.title} | KR Environ Solutions`,
    description: product.shortDescription || `${product.title} specifications and procurement details.`
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug && (p.category === product.category || p.category))
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello KR Environ Solutions, I would like to enquire about technical specifications and procurement for: ${product.title} (${product.modelCode || ''}).`
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F3]/40 font-manrope">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] pb-16">
        {/* Breadcrumb Header */}
        <section className="bg-white border-b border-[#DCE5DD] py-3">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#68756D]">
              <Link href="/" className="hover:text-[#216B35] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-[#216B35] transition-colors">Our Products</Link>
              <span>/</span>
              <span className="text-[#216B35] font-medium">{product.category}</span>
              <span>/</span>
              <span className="text-[#173B26] font-semibold truncate max-w-[280px] sm:max-w-md">{product.title}</span>
            </div>
          </div>
        </section>

        {/* Product In-Depth Overview Section */}
        <section className="pt-6 sm:pt-8">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
              
              {/* LEFT COLUMN: Visuals, Trust Badges, and Quick Action Box (5 Cols) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Product Image Stage (16:9 / 1920x1080 ratio) */}
                <div className="relative rounded-2xl overflow-hidden bg-white border border-[#DCE5DD] shadow-sm group">
                  <div className="aspect-video w-full overflow-hidden bg-slate-50 flex items-center justify-center">
                    <img
                      src={product.featuredImage || '/details.jpeg'}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Trust & Verification Badges */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white p-3 rounded-xl border border-[#DCE5DD] flex items-center gap-2.5 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F8F3] border border-[#DCE5DD] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-[#216B35]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#173B26] block">Non-Lethal Tech</span>
                      <span className="text-[10px] text-[#68756D]">100% Wildlife Safe</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#DCE5DD] flex items-center gap-2.5 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F8F3] border border-[#DCE5DD] flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-4 h-4 text-[#216B35]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#173B26] block">GeM Registered</span>
                      <span className="text-[10px] text-[#68756D]">Govt Procurement</span>
                    </div>
                  </div>
                </div>

                {/* Instant RFQ & Direct Contact Box */}
                <div className="bg-gradient-to-br from-white via-[#F5F8F3] to-white rounded-2xl p-5 border border-[#DCE5DD] shadow-sm space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#216B35]">
                      Procurement &amp; Quotes
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {product.price || 'Official Forest Rate'}
                    </span>
                  </div>

                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    Available for institutional tenders, forest circles, power transmission developers, and agricultural cooperatives.
                  </p>

                  <div className="space-y-2 pt-1">
                    <a
                      href={`https://wa.me/918317054180?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>Direct WhatsApp Enquiry</span>
                    </a>

                    <Link
                      href={`/contact-us?subject=RFP Quote Request: ${encodeURIComponent(product.title)}`}
                      className="btn-primary w-full text-center py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Request Formal Quotation / RFP</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Title, Model, Overview, Specs & Features (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#216B35] bg-[#F5F8F3] px-2.5 py-0.5 rounded-full border border-[#DCE5DD]">
                      {product.category}
                    </span>
                    {product.modelCode && (
                      <span className="text-[11px] font-mono text-[#173B26] bg-white px-2 py-0.5 rounded border border-[#DCE5DD]">
                        CODE: {product.modelCode}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B26] leading-tight">
                    {product.title}
                  </h1>

                  <p className="mt-3 text-sm text-[#4B5563] leading-relaxed font-normal">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Key Features Bullet Grid */}
                {product.features && product.features.length > 0 && (
                  <div className="bg-white rounded-2xl p-5 border border-[#DCE5DD] shadow-xs space-y-3">
                    <h3 className="text-sm font-bold text-[#173B26] uppercase tracking-wider flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-[#216B35]" />
                      <span>Key Engineering Features</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {product.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#26382D]">
                          <CheckCircle2 className="w-4 h-4 text-[#216B35] mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* In-Depth Technical Specifications Table */}
                {product.specs && product.specs.length > 0 && (
                  <div className="bg-white rounded-2xl border border-[#DCE5DD] shadow-xs overflow-hidden">
                    <div className="bg-[#F5F8F3] px-5 py-3 border-b border-[#DCE5DD] flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#173B26] uppercase tracking-wider flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#216B35]" />
                        <span>Technical Specifications</span>
                      </h3>
                      <span className="text-[11px] text-[#68756D] font-mono">
                        {product.specs.length} Verified Parameters
                      </span>
                    </div>

                    <div className="divide-y divide-[#DCE5DD]">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-3 p-3 sm:px-5 text-xs gap-1 sm:gap-4 hover:bg-[#F5F8F3]/40 transition-colors">
                          <span className="font-semibold text-[#173B26]">{spec.label}</span>
                          <span className="sm:col-span-2 text-[#4B5563] font-normal leading-relaxed">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* In-Depth Narrative Content / Field Overview */}
                {product.content && (
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#DCE5DD] shadow-xs space-y-3">
                    <h3 className="text-sm font-bold text-[#173B26] uppercase tracking-wider">
                      Operational Context &amp; Field Efficacy
                    </h3>
                    <div className="text-xs sm:text-sm text-[#4B5563] leading-relaxed space-y-3">
                      <p>{product.content}</p>
                    </div>
                  </div>
                )}

                {/* Applications & Deployment Scenarios */}
                {product.applications && product.applications.length > 0 && (
                  <div className="bg-[#F5F8F3] rounded-2xl p-5 border border-[#DCE5DD] space-y-2.5">
                    <h4 className="text-xs font-bold text-[#173B26] uppercase tracking-wider">
                      Recommended Field Applications &amp; Deployment Areas
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#4B5563]">
                      {product.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#216B35] mt-1.5 shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Regulatory / Compliance Notice */}
                {product.compliance && (
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 text-xs text-[#173B26] flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-[#216B35] mt-0.5 shrink-0" />
                    <div>
                      <strong className="font-semibold">Regulatory &amp; Environmental Compliance: </strong>
                      <span className="text-[#4B5563]">{product.compliance}</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <section className="pt-12 sm:pt-16">
            <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-6">
              <div className="flex items-center justify-between border-b border-[#DCE5DD] pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#173B26]">
                    Related Technologies &amp; Solutions
                  </h2>
                  <p className="text-xs text-[#68756D]">
                    Complementary conservation hardware and environmental engineering products.
                  </p>
                </div>
                <Link
                  href="/products"
                  className="text-xs font-bold text-[#216B35] hover:text-[#174D28] flex items-center gap-1"
                >
                  <span>View All Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/products/${rel.slug}`}
                    className="group bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:shadow-md hover:border-[#216B35]/50 transition-all p-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-50">
                        <img
                          src={rel.featuredImage || '/details.jpeg'}
                          alt={rel.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#216B35] uppercase tracking-wider block">
                        {rel.category}
                      </span>
                      <h3 className="text-sm font-bold text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
                        {rel.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#DCE5DD]/50 flex items-center justify-between text-xs font-semibold text-[#216B35]">
                      <span>Technical Specs &amp; RFQ</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
