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
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white py-6 sm:py-8 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#173B26] tracking-tight">
                Conservation Technology & HWC Insights
              </h1>
            </div>
          </Container>
        </section>

        {/* Blog Grid */}
        <section className="py-8 sm:py-12 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {blogs.map((blog) => (
                <article
                  key={blog.id || blog.slug}
                  className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/50 transition-all card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={blog.featuredImage || '/img4.jpeg'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35] mb-1.5">
                        {blog.category || 'Conservation Tech'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#68756D] mb-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#216B35]" />
                          {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-[#216B35]" />
                          {blog.author}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-[#173B26] hover:text-[#216B35] transition-colors leading-snug">
                        <Link href={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h2>

                      <p className="mt-2 text-xs sm:text-sm text-[#4B5563] line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-1">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#216B35] hover:text-[#174D28] transition-colors"
                    >
                      <span>Read Full Research Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
