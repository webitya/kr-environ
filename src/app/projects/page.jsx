import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, FolderKanban } from 'lucide-react';
import { getProjects } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Field Projects & Conservation Deployments | KR Environ Solutions",
  description: "Explore on-ground wildlife conflict mitigation deployments including 70 ANIDERS along the Bihar-Nepal border and 200 Smart Sticks in Ladakh."
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        <div>
          {/* Projects Hero - Full Width, Compact Spacing, No HR Line */}
          <section className="bg-gradient-to-b from-[#F5F8F3] to-white pt-6 pb-2 sm:pt-8 sm:pb-3 w-full">
            <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
              <div className="max-w-3xl">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-manrope font-extrabold text-[#173B26] tracking-tight leading-tight">
                  Conservation Deployments &amp; Field Projects
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                  Documenting real-world deployments across tiger reserves, border agricultural zones, and high-altitude habitats across India.
                </p>
              </div>
            </div>
          </section>

          {/* Projects Grid - Full Width, 3 Cards Per Row, Clean Card Design */}
          <section className="pt-2 pb-12 sm:pt-3 sm:pb-16 bg-white w-full">
            <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
              {projects.length === 0 ? (
                <div className="p-12 text-center bg-[#F5F8F3]/50 rounded-2xl border border-[#DCE5DD] shadow-xs space-y-3 min-h-[40vh] flex flex-col items-center justify-center my-6">
                  <FolderKanban className="w-12 h-12 text-[#68756D] mx-auto opacity-40" />
                  <h4 className="text-base font-bold text-[#173B26] font-manrope">No Projects Currently Listed</h4>
                  <p className="text-xs text-[#68756D] font-manrope max-w-sm mx-auto">
                    Field projects and conservation deployment case studies can be managed from the admin portal.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <article
                      key={project.id || project.slug}
                      className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Clean Cover Image */}
                        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                          <img
                            src={project.featuredImage || '/img4.jpeg'}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        {/* Card Body */}
                        <div className="p-5 sm:p-6">
                          {/* Location & Date */}
                          <div className="flex items-center gap-4 text-xs text-[#68756D] font-manrope mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#216B35]" />
                              {project.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-[#216B35]" />
                              {project.date}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="text-base sm:text-lg font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug">
                            <Link href={`/projects/${project.slug}`}>
                              {project.title}
                            </Link>
                          </h2>

                          {/* Description */}
                          <p className="mt-2.5 text-xs sm:text-[13px] text-[#4B5563] font-manrope line-clamp-3 leading-relaxed">
                            {project.overview}
                          </p>

                          {project.results && (
                            <div className="mt-3.5 p-3 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] text-xs font-manrope text-[#173B26] flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#216B35] mt-1.5 shrink-0" />
                              <span className="leading-snug">{project.results}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Link */}
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold font-manrope text-[#216B35] hover:text-[#174D28] transition-colors"
                        >
                          <span>Read Deployment Details</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
