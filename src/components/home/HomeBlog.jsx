import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeBlog({ blogs = [] }) {
  const displayBlogs = blogs.slice(0, 3);

  return (
    <section className="py-12 lg:py-14 bg-[#F5F8F3] border-b border-[#DCE5DD]">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <SectionHeading
          title="Field Research & Conservation Technology Insights"
          subtitle="Explore in-depth analyses on human-wildlife mitigation, frontline ranger safety, and ecological policy."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayBlogs.map((blog) => (
            <article
              key={blog.id || blog.slug}
              className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/40 transition-all card-hover flex flex-col justify-between"
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
                    {blog.category}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#68756D] font-poppins mb-1.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#216B35]" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#216B35]" />
                      {blog.author}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-montserrat text-[#173B26] hover:text-[#216B35] transition-colors leading-snug">
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#4B5563] font-lato line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-1">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold font-poppins text-[#216B35] hover:text-[#174D28] transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="btn-secondary">
            <span>Explore All Blog Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
