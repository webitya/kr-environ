import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Calendar, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/db';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return { title: 'Project Not Found | KR Environ Solutions' };
  }

  return {
    title: `${project.title} | KR Environ Solutions Deployments`,
    description: project.overview,
    openGraph: {
      title: project.title,
      description: project.overview,
      images: [project.featuredImage]
    }
  };
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-[#EFF7FA] to-white py-12 sm:py-16 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-4xl mx-auto space-y-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-semibold font-poppins text-[#087EA4] hover:text-[#06617F] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Field Deployments</span>
              </Link>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-semibold bg-[#216B35]/10 text-[#216B35] border border-[#216B35]/20">
                {project.category || 'Field Deployment'}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-extrabold text-[#173B26] leading-tight">
                {project.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#68756D] font-poppins pt-2 border-t border-[#DCE5DD]/60">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#087EA4]" />
                  <span>{project.location}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#F2BE36]" />
                  <span>Deployment: {project.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#216B35]" />
                  <span>Client / Beneficiary: {project.client}</span>
                </span>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              {project.featuredImage && (
                <div className="rounded-2xl overflow-hidden shadow-lg border border-[#DCE5DD] bg-slate-100 max-h-[460px]">
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Results Highlight Banner */}
              {project.results && (
                <div className="p-6 rounded-2xl bg-[#F5F8F3] border border-[#216B35]/30 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#216B35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-bold text-[#173B26] block font-montserrat uppercase tracking-wider">
                      Empirical Field Outcome
                    </strong>
                    <p className="text-base text-[#216B35] font-manrope font-semibold mt-1">
                      {project.results}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4 text-base sm:text-lg text-[#4B5563] font-lato leading-relaxed">
                <h3 className="text-2xl font-bold font-montserrat text-[#173B26]">
                  Deployment Overview & Scope
                </h3>
                <p>{project.overview}</p>
                <p>
                  KR Environ Solutions oversaw site reconnaissance, community liaison, sensor coordinate calibration, and ranger hands-on workshops to ensure continuous all-weather reliability across the target division.
                </p>
              </div>

              <div className="pt-8 border-t border-[#DCE5DD] text-center">
                <Link href="/contact-us" className="btn-primary">
                  <span>Enquire About Similar Project in Your Area</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
