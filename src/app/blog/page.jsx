import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getBlogs } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Our Blogs | KR Environ Solutions",
  description: "Read in-depth field research, human-wildlife conflict analyses, ranger tactical equipment reviews, and NTCA award innovation breakdowns."
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* Full-Width Blogs Section (No HR line, compact top & bottom spacing) */}
        <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            {/* Header: Minimal spacing, no hr line */}
            <div className="mb-6 sm:mb-8 text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Our Blogs
              </h1>
            </div>

            {/* Full-Width Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <article
                  key={blog.id || blog.slug}
                  className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                      <img
                        src={blog.featuredImage || '/img4.jpeg'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6">
                      <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35] mb-2 font-manrope">
                        {blog.category || 'Conservation Tech'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#68756D] font-manrope mb-2.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#216B35]" />
                          {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-[#216B35]" />
                          {blog.author}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug">
                        <Link href={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h2>

                      <p className="mt-2.5 text-xs sm:text-[13px] text-[#4B5563] font-manrope line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-1">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold font-manrope text-[#216B35] hover:text-[#174D28] transition-colors"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
