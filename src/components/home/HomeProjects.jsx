import Link from 'next/link';
import { MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeProjects({ projects = [] }) {
  const displayProjects = projects.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Impactful Deployments"
          badgeColor="green"
          title="Field-Proven Across Sensitive Ecological Corridors"
          subtitle="Real-world case studies detailing dramatic reductions in human-wildlife encounters across India."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <div
              key={project.id || project.slug}
              className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/50 transition-all card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.featuredImage || '/img4.jpeg'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-poppins font-bold text-[#216B35] uppercase tracking-wider">
                    {project.category || 'Field Project'}
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

                  <h3 className="text-xl font-bold font-montserrat text-[#173B26] hover:text-[#216B35] transition-colors leading-snug">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-sm text-[#4B5563] font-lato leading-relaxed line-clamp-3">
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
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects" className="btn-secondary">
            <span>View All Deployment Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
