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
        <section className="bg-gradient-to-b from-[#EFF7FA] to-white py-16 sm:py-24 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins uppercase tracking-wider bg-[#087EA4]/10 text-[#087EA4] border border-[#087EA4]/20 mb-4 font-semibold">
                On-Ground Impact
              </span>
              <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-[#173B26] tracking-tight">
                Conservation Deployments & Field Projects
              </h1>
              <p className="mt-4 text-lg text-[#4B5563] font-lato leading-relaxed">
                Documenting real-world deployments across tiger reserves, border agricultural zones, and high-altitude habitats across India.
              </p>
            </div>
          </Container>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id || project.slug}
                  className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/50 transition-all card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      <img
                        src={project.featuredImage || '/img4.jpeg'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-poppins font-bold text-[#216B35] uppercase tracking-wider shadow-xs">
                        {project.category || 'Field Deployment'}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-[#68756D] font-poppins mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#087EA4]" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#F2BE36]" />
                          {project.date}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold font-montserrat text-[#173B26] hover:text-[#216B35] transition-colors leading-snug">
                        <Link href={`/projects/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h2>

                      <p className="mt-3 text-sm text-[#4B5563] font-lato line-clamp-3 leading-relaxed">
                        {project.overview}
                      </p>

                      {project.results && (
                        <div className="mt-4 p-3 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] text-xs font-poppins text-[#173B26] flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#216B35] shrink-0 mt-0.5" />
                          <span>{project.results}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold font-poppins text-[#216B35] hover:text-[#174D28] transition-colors"
                    >
                      <span>Read Deployment Details</span>
                      <ArrowRight className="w-4 h-4" />
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
