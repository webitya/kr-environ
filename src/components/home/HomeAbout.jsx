import Link from 'next/link';
import { ShieldCheck, Award, ArrowRight, UserCheck, Building2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeAbout() {
  return (
    <section className="py-12 lg:py-14 bg-[#F5F8F3] border-y border-[#DCE5DD]">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <SectionHeading
          title="Bridging Advanced Technology & Forest Stewardship"
          subtitle="KR Environ Solutions is a premier Jharkhand-based environmental enterprise dedicated to eliminating lethal human-wildlife conflict."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Visual Collage with Partnership Card */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/img4.jpeg"
                alt="Sarika Gupta at Forest Headquarters Jharkhand"
                className="w-full h-72 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142D20]/90 via-[#142D20]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase font-poppins font-bold text-emerald-400 tracking-wider">
                  Operational Presence
                </span>
                <h4 className="text-base sm:text-lg font-montserrat font-bold text-white">
                  Forest Headquarters Jharkhand (Van Bhawan, Doranda, Ranchi)
                </h4>
                <p className="text-xs text-white/80 font-lato mt-0.5">
                  Liaising with State Forest & Wildlife Departments, SEIAA, and Wasteland Boards.
                </p>
              </div>
            </div>

            {/* Photo 2: Meeting with DFO Ranchi */}
            <div className="bg-white p-4 rounded-2xl border border-[#DCE5DD] shadow-sm flex items-center gap-4">
              <img
                src="/img1.jpeg"
                alt="Consultation with DFO Ranchi"
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#DCE5DD]"
              />
              <div>
                <span className="text-[11px] font-bold text-[#216B35] uppercase tracking-wider font-poppins">
                  Official Forest Liaison
                </span>
                <h4 className="text-sm sm:text-base font-bold text-[#173B26] font-manrope mt-0.5">
                  Consultation at D.F.O. Ranchi
                </h4>
                <p className="text-xs text-[#4B5563] font-lato mt-0.5">
                  Presenting environmental dossiers and non-lethal wildlife conflict solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="space-y-4 text-left">
            <div className="space-y-3 text-sm sm:text-base text-[#4B5563] font-lato leading-relaxed">
              <p>
                Headed by proprietor <strong>Sarika Gupta</strong>, <strong>KR Environ Solutions</strong> spearheads the on-ground adoption of smart ecological technologies that protect agricultural perimeters and forest beats without causing injury to wildlife.
              </p>
              <p>
                From deploying over 1,400 smart bio-acoustic scarecrows (ANIDERS) to equipping frontline foot patrollers with tactical Smart Sticks, we turn complex conservation challenges into harmonious coexistence.
              </p>
            </div>

            {/* Key Differentiator Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-poppins text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-white border border-[#DCE5DD] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                <span className="text-[#173B26] font-medium">100% Non-Harmful Deterrence</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#DCE5DD] flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                <span className="text-[#173B26] font-medium">Certified Ranger Training</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#DCE5DD] flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#216B35] shrink-0" />
                <span className="text-[#173B26] font-medium">Government Agency Liaison</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#DCE5DD] flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#216B35] shrink-0" />
                <span className="text-[#173B26] font-medium">Field-Proven Nationwide</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/about-us" className="btn-primary">
                <span>Learn More About Our Mission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
