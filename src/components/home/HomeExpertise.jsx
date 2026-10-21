import { 
  Map, 
  Trees, 
  RadioTower, 
  GraduationCap, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import Link from 'next/link';
import SectionHeading from '../common/SectionHeading';

const expertiseList = [
  {
    icon: Map,
    title: 'HWC Corridor Mapping & Vulnerability GIS',
    desc: 'Analyzing historical elephant migration corridors and carnivore spillover zones to deploy sensors at optimal interception vertices.'
  },
  {
    icon: Trees,
    title: 'Wasteland Rehabilitation & Afforestation Strategy',
    desc: 'Liaising with state Wasteland Development Boards to design sustainable ecological buffers between degraded lands and forest ecosystems.'
  },
  {
    icon: RadioTower,
    title: 'Bio-Acoustic Repellent Grid Tuning',
    desc: 'Configuring randomized frequency cycles and ultrasonic sound emissions calibrated specifically to regional megafauna profiles.'
  },
  {
    icon: GraduationCap,
    title: 'Tactical Ranger Workshops & Live Fire Drills',
    desc: 'Hands-on net gun deployment drills, safe handling protocols, and fast-reload certification for state quick-response teams (QRTs).'
  }
];

export default function HomeExpertise() {
  return (
    <section className="py-12 lg:py-14 bg-[#F5F8F3] border-b border-[#DCE5DD]">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <SectionHeading
          title="Environmental Engineering & Wildlife Field Expertise"
          subtitle="Beyond hardware supply, KR Environ delivers scientific assessments, GIS-guided field surveys, and institutional policy alignment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {expertiseList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4.5 sm:p-5 rounded-2xl border border-[#DCE5DD] shadow-xs flex flex-col justify-between hover:border-[#216B35]/40 transition-all card-hover"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#216B35]/10 text-[#216B35] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-manrope text-[#173B26]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#4B5563] font-lato leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DCE5DD]/60 flex items-center gap-1.5 text-xs font-semibold text-[#216B35]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#216B35]" />
                  <span>State Certified Support</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Callout Banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE5DD] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold text-[#216B35] uppercase tracking-wider font-poppins">
              Government & Institutional Consultations
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-montserrat text-[#173B26]">
              Planning an HWC Mitigation Project in your Forest Division?
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] font-lato">
              Sarika Gupta and our engineering team conduct ground audits and submit turnkey pilot proposals.
            </p>
          </div>
          <Link href="/contact-us" className="btn-secondary shrink-0">
            <span>Schedule Technical Briefing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
