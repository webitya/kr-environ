import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import Link from 'next/link';
import { MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { getProjects } from '@/lib/db';

export const metadata = {
  title: "Field Projects & Conservation Deployments | KR Environ Solutions",
  description: "Explore on-ground wildlife conflict mitigation deployments including 70 ANIDERS along the Bihar-Nepal border and 200 Smart Sticks in Ladakh."
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Projects Hero */}
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white py-10 sm:py-14 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35] mb-2">
                On-Ground Impact
              </p>
              <h1 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-[#173B26] tracking-tight">
                Conservation Deployments & Field Projects
              </h1>
              <p className="mt-2.5 text-base text-[#4B5563] font-lato leading-relaxed">
                Documenting real-world deployments across tiger reserves, border agricultural zones, and high-altitude habitats across India.
              </p>
            </div>
          </Container>
        </section>

        {/* Projects Grid */}
        <section className="py-12 lg:py-14 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <div
                  key={project.id || project.slug}
                  className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/50 transition-all card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={project.featuredImage || '/img4.jpeg'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35] mb-1.5">
                        {project.category || 'Field Deployment'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#68756D] font-poppins mb-1.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#216B35]" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#216B35]" />
                          {project.date}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold font-montserrat text-[#173B26] hover:text-[#216B35] transition-colors leading-snug">
                        <Link href={`/projects/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h2>

                      <p className="mt-2 text-xs sm:text-sm text-[#4B5563] font-lato line-clamp-3 leading-relaxed">
                        {project.overview}
                      </p>

                      {project.results && (
                        <div className="mt-3 p-2.5 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] text-xs font-poppins text-[#173B26] flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#216B35] shrink-0 mt-0.5" />
                          <span>{project.results}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-1">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold font-poppins text-[#216B35] hover:text-[#174D28] transition-colors"
                    >
                      <span>Read Deployment Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
