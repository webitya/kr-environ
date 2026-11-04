import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap,
  FileCheck,
  Compass,
  Eye,
  Target,
  HeartHandshake,
  PhoneCall
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "About Us | KR Environ Solutions & Forest Leadership",
  description: "Learn about KR Environ Solutions, proprietor Sarika Gupta, our doctoral expert panel (Dr. Raj Kumar, Dr. Satya Prakash), our vision & mission, and strategic wildlife tech alliance with Kyari Innovations."
};

const leaders = [
  {
    name: "Sarika Gupta",
    role: "Proprietor | Lead Environmental Analyst",
    qualifications: "MSc (Environmental Science) (Lucknow University) • MSc (Geoinformatics)",
    experience: "15+ years experience as an Environmental Analyst",
    bio: "Pioneering environmental analyst and proprietor of KR Environ Solutions. Spearheads statutory Environmental Clearances (EC), Forest Clearances (FC), GIS drone topography mapping, and state-level Human-Wildlife Conflict mitigation across Jharkhand and 21+ states in India.",
    designation: "Proprietor & Founder"
  },
  {
    name: "Dr. Raj Kumar",
    role: "Senior Forest Clearance & Silviculture Expert",
    qualifications: "Doctorate (Forest Research Institute - FRI, Dehradun)",
    experience: "10+ years specialized experience in Forest Regulatory Clearances",
    bio: "Doctorate from India's premier forestry institution (FRI Dehradun). Specializes in statutory Forest Clearance dossiers, compensatory afforestation schemes, site-specific management plans, and institutional compliance frameworks.",
    designation: "Forest Clearance Expert"
  },
  {
    name: "Dr. Satya Prakash",
    role: "Chief Wildlife Conservationist & Biodiversity Authority",
    qualifications: "Doctorate / Eminent National Wildlife & Biodiversity Authority",
    experience: "25+ years authoritative experience in Wildlife Management",
    bio: "Renowned conservation biologist leading comprehensive biodiversity assessments across tiger reserves, elephant corridors, and fringe forests. Expert in humane non-lethal deterrent arrays and quick-response rescue protocols.",
    designation: "Wildlife Management Authority"
  }
];

const coreValues = [
  {
    icon: ShieldCheck,
    title: "Strictly Non-Lethal Engineering",
    desc: "100% committed to zero lethality. We eliminate dangerous wire snares, electrocutions, and poison in favor of smart bio-acoustic and sensory deterrence."
  },
  {
    icon: Compass,
    title: "Scientific & Geoinformatics Rigor",
    desc: "Every intervention is backed by empirical wildlife behavioral research, FRI Dehradun forestry protocols, and high-precision drone GIS terrain mapping."
  },
  {
    icon: FileCheck,
    title: "Statutory Regulatory Integrity",
    desc: "Uncompromising compliance across MoEFCC, SEIAA, SPCB, and Forest Department standards, delivering audit-proof EIA, EC, CTE, and CTO approvals."
  },
  {
    icon: HeartHandshake,
    title: "Frontline Community & Ranger Safety",
    desc: "Dedicated to protecting fringe farmers from catastrophic crop raiding while equipping forest foot patrollers with life-saving tactical safety gear."
  }
];

const allianceTech = [
  {
    title: "ANIDERS Smart Scarecrow",
    badge: "NTCA Award Winner",
    desc: "Solar-powered, AI-calibrated bio-acoustic animal intrusion detection and repellent sentinel. Empirically proven to achieve 91% conflict mitigation without harming wildlife.",
    stat: "91% Efficacy"
  },
  {
    title: "Re-Pulse Deterrent Shock Mat",
    badge: "Perimeter Defense",
    desc: "Floor-mounted passive electrical impulse barrier delivering a startling but harmless conditioning charge to halt elephants, tigers, and wild boars at boundary gates.",
    stat: "Zero Injury"
  },
  {
    title: "KyNet Handheld Net Launcher",
    badge: "Humane Rescue",
    desc: "Rapid-fire electronic capture net gun enabling wildlife rescue squads to safely immobilize leopards, deer, and monkeys without chemical tranquilization.",
    stat: "Sub-Second Launch"
  },
  {
    title: "Smart Stick Guardian & Forester",
    badge: "Ranger Protection",
    desc: "Telescopic patrol baton equipped with high-lumen tactical LED floodlights, piercing distress sirens, built-in USB power bank, and close-range defensive stun arcs.",
    stat: "24/7 Field Durability"
  }
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SiteHeader />

      <main className="flex-1 w-full">
        {/* =========================================================================
            1. HERO SECTION: Meaningful, Authoritative Headline & Impact Metrics
            ========================================================================= */}
        <section className="bg-gradient-to-b from-[#F5F8F3] via-white to-[#F5F8F3]/20 pt-8 pb-4 sm:pt-10 sm:pb-6 w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div className="max-w-4xl space-y-2.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Engineering Sustainable Coexistence &amp; Environmental Stewardship
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed max-w-3xl">
                KR Environ Solutions is an environmental enterprise based in Ranchi, Jharkhand. We bridge regulatory statutory forest clearances, GIS drone mapping, and National Award-winning non-lethal wildlife protection technology across India.
              </p>
            </div>

            {/* Credibility Quick Stats Strip */}
            <div className="mt-8 pt-6 border-t border-[#DCE5DD] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
              <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#DCE5DD] shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#173B26] font-manrope">15+ Years</div>
                <div className="text-xs text-[#68756D] font-manrope font-medium mt-1">Environmental Analytics Track Record</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#DCE5DD] shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#216B35] font-manrope">21+ States</div>
                <div className="text-xs text-[#68756D] font-manrope font-medium mt-1">State Forest Department Deployments</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#DCE5DD] shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#173B26] font-manrope">4,000+</div>
                <div className="text-xs text-[#68756D] font-manrope font-medium mt-1">Active Non-Lethal Hardware Units</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#DCE5DD] shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#216B35] font-manrope">100%</div>
                <div className="text-xs text-[#68756D] font-manrope font-medium mt-1">Non-Lethal &amp; Regulatory Compliant</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. WHO WE ARE: In-Depth Company Story & Dual-Photo Presentation
            ========================================================================= */}
        <section className="py-10 sm:py-14 bg-white w-full border-t border-[#DCE5DD]">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              
              {/* Left Column: Comprehensive Profile & Capabilities */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                    Who We Are: Rooted in Jharkhand, Protecting Pan-India Ecosystems
                  </h2>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                  <p>
                    Founded and headed by proprietor <strong>Sarika Gupta</strong> (MSc Environmental Science, Lucknow University; MSc Geoinformatics), <strong>KR Environ Solutions</strong> operates out of Ranchi, Jharkhand. We serve as a trusted institutional bridge connecting government forest departments, industrial project proponents, and agricultural communities with certified environmental clearances and advanced wildlife conservation engineering.
                  </p>
                  <p>
                    Our core technical scope spans statutory <strong>Environmental Clearances (EC)</strong>, <strong>Forest Clearances (FC)</strong> under the Van Sanrakshan Evam Samvardhan Adhiniyam, <strong>Environmental Impact Assessments (EIA)</strong>, <strong>Consent to Establish (CTE)</strong>, <strong>Consent to Operate (CTO)</strong>, GIS Drone Topography Mapping, and GPS Tree Enumeration.
                  </p>
                  <p>
                    Beyond statutory compliance, KR Environ Solutions maintains a national strategic hardware alliance with <strong>Kyari Innovations Pvt. Ltd.</strong> (winner of NTCA&apos;s National Budding Innovator Award and featured on Shark Tank India Season 2). Together, we deliver frontline non-lethal deterrent devices and ranger safety equipment tested across 21+ state forest divisions.
                  </p>
                </div>

                {/* 4 Feature Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-manrope text-xs">
                  <div className="p-3 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center gap-3 shadow-2xs">
                    <FileCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                    <span className="text-[#173B26] font-semibold">EC / FC / CTE / CTO Statutory Compliance</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center gap-3 shadow-2xs">
                    <Compass className="w-4 h-4 text-[#216B35] shrink-0" />
                    <span className="text-[#173B26] font-semibold">High-Precision Drone KML &amp; GIS Mapping</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center gap-3 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                    <span className="text-[#173B26] font-semibold">Certified Non-Lethal Wildlife Deterrents</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center gap-3 shadow-2xs">
                    <UserCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                    <span className="text-[#173B26] font-semibold">Tactical Equipment for Frontline Rangers</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Photographic Showcase (Faces Front & Center, No Overlay Text) */}
              <div className="lg:col-span-5 space-y-3.5">
                {/* Main Featured Photo with Clear Faces */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 group aspect-[4/3]">
                  <img
                    src="/img1.jpeg"
                    alt="Sarika Gupta in consultation at D.F.O. Ranchi Desk"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Supporting Dual Photos */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="relative rounded-xl overflow-hidden border-2 border-white shadow-md group aspect-[4/3] bg-slate-100">
                    <img
                      src="/img2.jpeg"
                      alt="Meeting with PCCF & Chief Wildlife Warden at Van Bhawan"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative rounded-xl overflow-hidden border-2 border-white shadow-md group aspect-[4/3] bg-slate-100">
                    <img
                      src="/img3.jpeg"
                      alt="Forestry Clearance & Proposal Review"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            3. VISION & MISSION SECTION: Clear, Meaningful, High-Impact Cards
            ========================================================================= */}
        <section className="py-10 sm:py-14 bg-[#F5F8F3] w-full border-t border-[#DCE5DD]">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            {/* Meaningful Section Heading */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Our Purpose, Vision &amp; Guiding Mission
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5B675E] font-manrope leading-relaxed">
                Pioneering non-invasive ecological engineering and audit-proof statutory compliance for a balanced natural world.
              </p>
            </div>

            {/* Vision & Mission High-Impact 2-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Vision Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE5DD] shadow-xs hover:border-[#216B35]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#216B35]/10 text-[#216B35] flex items-center justify-center mb-5">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-manrope text-[#173B26] mb-3">
                    Our Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                    To establish an India where infrastructure development, forest resource stewardship, and wild megafauna coexist sustainably without retaliatory killings, lethal electric wire fences, or irreversible biodiversity habitat fragmentation.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#DCE5DD]/60 flex items-center gap-2 text-xs font-semibold text-[#216B35] font-manrope">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Harmonious Coexistence Through Smart Ecology</span>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE5DD] shadow-xs hover:border-[#216B35]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#174D28]/10 text-[#174D28] flex items-center justify-center mb-5">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-manrope text-[#173B26] mb-3">
                    Our Mission
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                    To deliver certified statutory clearances, drone-driven topographical analysis, and deploy field-tested, solar-autonomous wildlife deterrent systems that safeguard agricultural harvests, protect frontline forest guards, and preserve endangered species.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#DCE5DD]/60 flex items-center gap-2 text-xs font-semibold text-[#174D28] font-manrope">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Empirically Proven Non-Lethal Solutions</span>
                </div>
              </div>
            </div>

            {/* Core Values: 4 Pillared Grid */}
            <div className="pt-6 border-t border-[#DCE5DD]">
              <h3 className="text-base sm:text-lg font-bold font-manrope text-[#173B26] mb-5 text-center">
                Our Core Operational Values
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {coreValues.map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-xl border border-[#DCE5DD] shadow-2xs hover:border-[#216B35]/40 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#216B35]/10 text-[#216B35] flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold font-manrope text-[#173B26] mb-1.5 leading-snug">
                        {val.title}
                      </h4>
                      <p className="text-xs text-[#4B5563] font-manrope leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            4. STRATEGIC ALLIANCE: Kyari Innovations Technology Showcase
            ========================================================================= */}
        <section className="py-10 sm:py-14 bg-white w-full border-t border-[#DCE5DD]">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            {/* Section Heading */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Strategic Technology Alliance: Kyari Innovations
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5B675E] font-manrope leading-relaxed">
                National Budding Innovator Award (NTCA) Winner &bull; Featured on Shark Tank India S2
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {allianceTech.map((tech, idx) => (
                <div
                  key={idx}
                  className="group bg-[#F5F8F3] rounded-2xl p-5 sm:p-6 border border-[#DCE5DD] shadow-xs hover:bg-white hover:border-[#216B35]/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] sm:text-[11px] font-bold font-manrope text-[#216B35] bg-white px-2.5 py-1 rounded-full border border-[#DCE5DD]">
                        {tech.badge}
                      </span>
                      <span className="text-[10px] font-bold font-mono text-[#173B26]">
                        {tech.stat}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug">
                      {tech.title}
                    </h3>

                    <p className="mt-2 text-xs text-[#4B5563] font-manrope leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#DCE5DD]/60 flex items-center justify-between text-xs font-semibold text-[#216B35] font-manrope">
                    <Link href="/services" className="inline-flex items-center gap-1 hover:underline">
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. SCIENTIFIC LEADERSHIP & REGULATORY PANEL
            ========================================================================= */}
        <section className="py-10 sm:py-14 bg-[#F5F8F3] w-full border-t border-[#DCE5DD]">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leaders.map((leader, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE5DD] shadow-xs hover:border-[#216B35]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#216B35] bg-[#F5F8F3] px-2.5 py-1 rounded-md border border-[#DCE5DD] font-manrope">
                      {leader.designation}
                    </span>

                    <h3 className="text-lg sm:text-xl font-bold font-manrope text-[#173B26] mt-3">
                      {leader.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#216B35] font-manrope mt-0.5">
                      {leader.role}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#DCE5DD]/60 space-y-2 text-xs font-manrope text-[#4B5563]">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-[#216B35] shrink-0 mt-0.5" />
                        <span><strong>Education:</strong> {leader.qualifications}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-[#216B35] shrink-0 mt-0.5" />
                        <span><strong>Experience:</strong> {leader.experience}</span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs sm:text-[13px] text-[#4B5563] font-manrope leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. INSTITUTIONAL CALL TO ACTION
            ========================================================================= */}
        <section className="py-12 sm:py-16 bg-[#173B26] text-white text-center w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-manrope text-white leading-tight">
              Ready to Pioneer Sustainable Environmental Infrastructure?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#E4EEE6]/90 font-manrope max-w-2xl mx-auto leading-relaxed">
              Connect with our Ranchi headquarters for turnkey forest clearances, wildlife mitigation Detailed Project Reports (DPRs), and ranger equipment field demonstrations.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3.5">
              <Link 
                href="/contact-us" 
                className="bg-[#216B35] hover:bg-[#174D28] text-white text-xs sm:text-sm font-semibold font-manrope px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Our Ranchi Office</span>
              </Link>
              <Link 
                href="/services" 
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold font-manrope px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <span>Explore Technical Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
