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
    <section className="py-20 bg-[#EFF7FA] border-b border-[#DCE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Capabilities"
          badgeColor="blue"
          title="Environmental Engineering & Wildlife Field Expertise"
          subtitle="Beyond hardware supply, KR Environ delivers scientific assessments, GIS-guided field surveys, and institutional policy alignment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#DCE5DD] shadow-xs flex flex-col justify-between hover:border-[#087EA4]/40 transition-all card-hover"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#087EA4]/10 text-[#087EA4] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-manrope text-[#173B26]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#4B5563] font-lato leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE5DD]/60 flex items-center gap-1.5 text-xs font-semibold text-[#087EA4]">
                  <ShieldCheck className="w-4 h-4 text-[#216B35]" />
                  <span>State Certified Support</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Callout Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-white border border-[#DCE5DD] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold text-[#087EA4] uppercase tracking-wider font-poppins">
              Government & Institutional Consultations
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-montserrat text-[#173B26]">
              Planning an HWC Mitigation Project in your Forest Division?
            </h3>
            <p className="text-sm text-[#4B5563] font-lato">
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
