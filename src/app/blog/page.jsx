import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getBlogs } from '@/lib/db';

export const metadata = {
  title: "Conservation & Wildlife Technology Insights | KR Environ Blog",
  description: "Read in-depth field research, human-wildlife conflict analyses, ranger tactical equipment reviews, and NTCA award innovation breakdowns."
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Blog Hero */}
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white py-16 sm:py-24 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins uppercase tracking-wider bg-[#216B35]/10 text-[#216B35] border border-[#216B35]/20 mb-4 font-semibold">
                Field Knowledge & Case Studies
              </span>
              <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-[#173B26] tracking-tight">
                Conservation Technology & HWC Insights
              </h1>
              <p className="mt-4 text-lg text-[#4B5563] font-lato leading-relaxed">
                Stay informed with research from the frontlines of Indian wildlife conservation, field test reports, and technological breakthroughs.
              </p>
            </div>
          </Container>
        </section>

        {/* Blog Grid */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article
                  key={blog.id || blog.slug}
                  className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/50 transition-all card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      <img
                        src={blog.featuredImage || '/img4.jpeg'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-poppins font-bold text-[#216B35] uppercase tracking-wider shadow-xs">
                        {blog.category || 'Conservation Tech'}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-[#68756D] font-poppins mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#087EA4]" />
                          {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-[#216B35]" />
                          {blog.author}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold font-montserrat text-[#173B26] hover:text-[#216B35] transition-colors leading-snug">
                        <Link href={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h2>

                      <p className="mt-3 text-sm text-[#4B5563] font-lato line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold font-poppins text-[#216B35] hover:text-[#174D28] transition-colors"
                    >
                      <span>Read Full Research Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
