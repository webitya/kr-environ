'use client';

import { useState, useEffect } from 'react';
import { User } from 'lucide-react';

function getInitials(name = '') {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

export default function AboutTeamSection({ initialMembers = [] }) {
  const [syncedMembers, setSyncedMembers] = useState(null);
  const members = syncedMembers ?? (Array.isArray(initialMembers) ? initialMembers : []);

  // Sync latest team members from MongoDB on mount (bypasses Next.js client Router Cache)
  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function syncTeam() {
      try {
        const res = await fetch('/api/team', {
          cache: 'no-store',
          signal: controller.signal
        });
        if (!res.ok) return;
        const data = await res.json();
        if (active && data?.success && Array.isArray(data.members)) {
          setSyncedMembers(data.members);
        }
      } catch (err) {
        if (err?.name !== 'AbortError') {
          console.error('Failed to sync team members:', err);
        }
      }
    }

    syncTeam();
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  if (!members || members.length === 0) {
    return null;
  }

  return (
    <section className="py-10 sm:py-14 bg-white w-full border-t border-[#DCE5DD]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
            Scientific Leadership &amp; Regulatory Advisory Panel
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5B675E] font-manrope leading-relaxed">
            Decades of combined academic scholarship, FRI Dehradun forestry expertise, and frontline wildlife management.
          </p>
        </div>

        {/* Clean Minimal-Icon Team Grid (scales seamlessly as more members are added) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((leader, idx) => {
            const initials = getInitials(leader.name);
            const highlights = Array.isArray(leader.highlights) ? leader.highlights.filter(Boolean) : [];

            return (
              <article
                key={leader.id || leader._id || idx}
                className="bg-white rounded-2xl border border-[#DCE5DD] shadow-xs hover:border-[#216B35]/60 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Top Rectangular Profile Image */}
                <div className="w-full aspect-[4/3] bg-[#F5F8F3] border-b border-[#DCE5DD] overflow-hidden relative shrink-0">
                  {leader.photoUrl ? (
                    <img
                      src={leader.photoUrl}
                      alt={leader.name || 'Team Member'}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F8F3] text-[#216B35]">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-[#DCE5DD] flex items-center justify-center shadow-2xs">
                        {initials ? (
                          <span className="text-xl font-extrabold font-manrope text-[#173B26]">{initials}</span>
                        ) : (
                          <User className="w-7 h-7 text-[#216B35]" />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Clean Card Body (minimal icons, structured typography) */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  {leader.designation && (
                    <div>
                      <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#216B35] bg-[#F5F8F3] px-2.5 py-1 rounded-md border border-[#DCE5DD] font-manrope">
                        {leader.designation}
                      </span>
                    </div>
                  )}

                  <h3 className={`text-lg sm:text-xl font-bold font-manrope text-[#173B26] ${leader.designation ? 'mt-3' : ''}`}>
                    {leader.name}
                  </h3>

                  {leader.role && (
                    <p className="text-xs sm:text-[13px] font-semibold text-[#216B35] font-manrope mt-0.5">
                      {leader.role}
                    </p>
                  )}

                  {(leader.qualifications || leader.experience) && (
                    <div className="mt-4 pt-3 border-t border-[#DCE5DD]/70 space-y-1.5 text-xs font-manrope text-[#4B5563]">
                      {leader.qualifications && (
                        <p className="leading-relaxed">
                          <span className="font-semibold text-[#173B26]">Education:</span> {leader.qualifications}
                        </p>
                      )}
                      {leader.experience && (
                        <p className="leading-relaxed">
                          <span className="font-semibold text-[#173B26]">Experience:</span> {leader.experience}
                        </p>
                      )}
                    </div>
                  )}

                  {leader.bio && (
                    <p className="mt-3.5 text-xs sm:text-[13px] text-[#4B5563] font-manrope leading-relaxed whitespace-pre-line">
                      {leader.bio}
                    </p>
                  )}

                  {highlights.length > 0 && (
                    <ul className="mt-4 pt-3 border-t border-[#DCE5DD]/70 space-y-1.5 text-xs font-manrope text-[#4B5563]">
                      {highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#216B35] mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

