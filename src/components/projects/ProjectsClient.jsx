'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, FolderKanban } from 'lucide-react';

export default function ProjectsClient({ initialProjects = [] }) {
  const [projects, setProjects] = useState(initialProjects);

  // Sync with API on mount to ensure real-time synchronization with admin portal
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.projects)) {
            setProjects(data.projects);
          }
        }
      } catch (err) {
        console.error('Error fetching projects from admin API:', err);
      }
    }
    loadProjects();
  }, []);

  if (projects.length === 0) {
    return (
      <div className="p-12 text-center bg-[#F5F8F3]/50 rounded-2xl border border-[#DCE5DD] shadow-xs space-y-3 min-h-[40vh] flex flex-col items-center justify-center my-6">
        <FolderKanban className="w-12 h-12 text-[#68756D] mx-auto opacity-40" />
        <h4 className="text-base font-bold text-[#173B26] font-manrope">No Projects Currently Listed</h4>
        <p className="text-xs text-[#68756D] font-manrope max-w-sm mx-auto">
          Field projects and conservation deployment case studies can be managed from the admin portal.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <article
          key={project.id || project._id || project.slug}
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
              {(project.location || project.date) && (
                <div className="flex items-center gap-4 text-xs text-[#68756D] font-manrope mb-2">
                  {project.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#216B35]" />
                      {project.location}
                    </span>
                  )}
                  {project.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#216B35]" />
                      {project.date}
                    </span>
                  )}
                </div>
              )}

              {/* Title */}
              <h2 className="text-base sm:text-lg font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug">
                <Link href={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              </h2>

              {/* Description */}
              {project.overview && (
                <p className="mt-2.5 text-xs sm:text-[13px] text-[#4B5563] font-manrope line-clamp-3 leading-relaxed">
                  {project.overview}
                </p>
              )}

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
  );
}

