import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag, Share2, PhoneCall, BookOpen } from 'lucide-react';
import { getBlogBySlug, getBlogs } from '@/lib/db';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return { title: 'Article Not Found | KR Environ Solutions' };
  }

  return {
    title: blog.metaTitle || `${blog.title} | KR Environ Solutions Blog`,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.focusKeywords ? blog.focusKeywords.split(',').map((k) => k.trim()) : undefined,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [blog.featuredImage || '/img4.jpeg']
    }
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await getBlogs();
  const relatedArticles = allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org Automatic JSON-LD Structured Data */}
      {blog.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: blog.schemaMarkup }}
        />
      )}

      <SiteHeader />

      <main className="flex-1">
        {/* Article Header */}
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white py-8 sm:py-12 border-b border-[#DCE5DD]">
          <Container>
            <div className="w-full space-y-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold font-poppins text-[#216B35] hover:text-[#174D28] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Knowledge Articles</span>
              </Link>

              <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35]">
                {blog.category || 'Wildlife Technology'}
              </p>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-extrabold text-[#173B26] leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#68756D] font-poppins pt-2 border-t border-[#DCE5DD]/60">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#216B35]" />
                  <span>By <strong>{blog.author}</strong></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#216B35]" />
                  <span>Published on {blog.date}</span>
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Image & Body */}
        <section className="py-8 sm:py-10 bg-white">
          <Container>
            <div className="w-full space-y-6">
              {blog.featuredImage && (
                <div className="rounded-2xl overflow-hidden shadow-lg border border-[#DCE5DD] bg-slate-100 max-h-[360px]">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Excerpt Lead */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F8F3] border-l-4 border-[#216B35] text-sm sm:text-base text-[#173B26] font-lato italic font-medium leading-relaxed">
                "{blog.excerpt}"
              </div>

              {/* Main Content Body */}
              <div className="prose max-w-none text-[#4B5563] text-sm sm:text-base leading-relaxed space-y-3">
                {blog.content ? (
                  blog.content.includes('<') && blog.content.includes('>') ? (
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} className="space-y-3" />
                  ) : (
                    blog.content.split('\n\n').map((paragraph, idx) => {
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
                          <ul key={idx} className="list-disc pl-5 space-y-1.5 my-3">
                            {items.map((it, i) => (
                              <li key={i}>{it.replace('- ', '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={idx}>{paragraph}</p>;
                    })
                  )
                ) : (
                  <p>Read the complete study and field documentation at our liaison office.</p>
                )}
              </div>

              {/* Author Attribution Card */}
              <div className="p-8 rounded-2xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-start gap-4 mt-12">
                <div className="w-12 h-12 rounded-xl bg-[#216B35] text-white flex items-center justify-center shrink-0 font-bold font-montserrat">
                  SG
                </div>
                <div>
                  <h4 className="text-base font-bold font-montserrat text-[#173B26]">
                    About KR Environ Solutions
                  </h4>
                  <p className="text-xs text-[#68756D] font-lato mt-1 leading-relaxed">
                    Under the leadership of proprietor Sarika Gupta, KR Environ Solutions bridges cutting-edge wildlife research, government policies, and on-ground deployment of Kyari Innovations technologies across India.
                  </p>
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-16 pt-12 border-t border-[#DCE5DD]">
                  <h3 className="text-2xl font-bold font-montserrat text-[#173B26] mb-6">
                    More Research & Field Notes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((rel) => (
                      <div
                        key={rel.id || rel.slug}
                        className="bg-white p-6 rounded-2xl border border-[#DCE5DD] hover:border-[#216B35] transition-all card-hover flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[11px] font-bold text-[#216B35] uppercase tracking-wider font-poppins block mb-2">
                            {rel.category}
                          </span>
                          <h4 className="text-base font-bold font-montserrat text-[#173B26] hover:text-[#216B35]">
                            <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                          </h4>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#DCE5DD]/60">
                          <Link
                            href={`/blog/${rel.slug}`}
                            className="text-xs font-semibold text-[#216B35] hover:underline"
                          >
                            Read Article &rarr;
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
