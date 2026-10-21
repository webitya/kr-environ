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
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white py-8 sm:py-12 border-b border-[#DCE5DD]">
          <Container>
            <div className="w-full space-y-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold font-poppins text-[#216B35] hover:text-[#174D28] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Field Deployments</span>
              </Link>

              <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35]">
                {project.category || 'Field Deployment'}
              </p>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-extrabold text-[#173B26] leading-tight">
                {project.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#68756D] font-poppins pt-2 border-t border-[#DCE5DD]/60">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#216B35]" />
                  <span>{project.location}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#216B35]" />
                  <span>Deployment: {project.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#216B35]" />
                  <span>Client / Beneficiary: {project.client}</span>
                </span>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-8 sm:py-10 bg-white">
          <Container>
            <div className="w-full space-y-6">
              {project.featuredImage && (
                <div className="rounded-2xl overflow-hidden shadow-lg border border-[#DCE5DD] bg-slate-100 max-h-[360px]">
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Results Highlight Banner */}
              {project.results && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F8F3] border border-[#216B35]/30 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#216B35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-[#173B26] block font-montserrat uppercase tracking-wider">
                      Empirical Field Outcome
                    </strong>
                    <p className="text-sm sm:text-base text-[#216B35] font-manrope font-semibold mt-0.5">
                      {project.results}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3 text-sm sm:text-base text-[#4B5563] font-lato leading-relaxed">
                <h3 className="text-xl font-bold font-montserrat text-[#173B26]">
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
