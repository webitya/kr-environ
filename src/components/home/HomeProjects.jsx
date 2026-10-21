import Link from 'next/link';
import { MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeProjects({ projects = [] }) {
  const displayProjects = projects.slice(0, 3);

  return (
    <section className="py-12 lg:py-14 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <SectionHeading
          title="Field-Proven Across Sensitive Ecological Corridors"
          subtitle="Real-world case studies detailing dramatic reductions in human-wildlife encounters across India."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayProjects.map((project) => (
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
                    {project.category || 'Field Project'}
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

                  <h3 className="text-base sm:text-lg font-bold font-montserrat text-[#173B26] hover:text-[#216B35] transition-colors leading-snug">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#4B5563] font-lato leading-relaxed line-clamp-3">
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
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/projects" className="btn-secondary">
            <span>View All Deployment Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
