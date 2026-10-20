import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeBlog({ blogs = [] }) {
  const displayBlogs = blogs.slice(0, 3);

  return (
    <section className="py-20 bg-[#F5F8F3] border-b border-[#DCE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Knowledge & Insights"
          badgeColor="green"
          title="Field Research & Conservation Technology Insights"
          subtitle="Explore in-depth analyses on human-wildlife mitigation, frontline ranger safety, and ecological policy."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayBlogs.map((blog) => (
            <article
              key={blog.id || blog.slug}
              className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/40 transition-all card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={blog.featuredImage || '/img4.jpeg'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-poppins font-bold text-[#216B35] uppercase tracking-wider">
                    {blog.category}
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

                  <h3 className="text-xl font-bold font-montserrat text-[#173B26] hover:text-[#216B35] transition-colors leading-snug">
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

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
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog" className="btn-secondary">
            <span>Explore All Blog Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
