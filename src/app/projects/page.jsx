import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { getProjects } from '@/lib/db';
import ProjectsClient from '@/components/projects/ProjectsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Field Projects & Conservation Deployments | KR Environ Solutions",
  description: "Explore on-ground wildlife conflict mitigation deployments, boundary defense installations, and ranger equipment projects."
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        <div>
          {/* Projects Hero */}
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

          {/* Interactive Projects Grid */}
          <section className="pt-2 pb-12 sm:pt-3 sm:pb-16 bg-white w-full">
            <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
              <ProjectsClient initialProjects={projects} />
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
