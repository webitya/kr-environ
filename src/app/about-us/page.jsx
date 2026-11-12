import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AboutHeroPhoto from '@/components/about/AboutHeroPhoto';
import AboutTeamSection from '@/components/about/AboutTeamSection';
import { getAboutPagePhoto, getTeamMembers } from '@/lib/db';
import Link from 'next/link';
import { 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
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
  description: "Learn about KR Environ Solutions, proprietor Sarika Gupta, our doctoral expert panel (Dr. Raj Kumar, Dr. Satya Prakash), and our vision, mission & core values."
};

export default async function AboutUsPage() {
  const [aboutPhoto, teamMembers] = await Promise.all([
    getAboutPagePhoto(),
    getTeamMembers()
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SiteHeader />

      <main className="flex-1 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* =========================================================================
            1. WHO WE ARE: In-Depth Company Story (Left Content + Right Changeable Photo)
            ========================================================================= */}
        <section className="pt-8 pb-10 sm:pt-10 sm:pb-14 bg-white w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
              {/* Left Side Content */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                    Who We Are: Rooted in Jharkhand, Protecting Pan-India Ecosystems
                  </h1>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                  <p>
                    Founded and headed by proprietor <strong>Sarika Gupta</strong> (MSc Environmental Science, Lucknow University; MSc Geoinformatics), <strong>KR Environ Solutions</strong> operates out of Ranchi, Jharkhand. We serve as a trusted institutional bridge connecting government forest departments, industrial project proponents, and agricultural communities with certified environmental clearances and advanced wildlife conservation engineering.
                  </p>
                  <p>
                    Our core technical scope spans statutory <strong>Environmental Clearances (EC)</strong>, <strong>Forest Clearances (FC)</strong> under the Van Sanrakshan Evam Samvardhan Adhiniyam, <strong>Environmental Impact Assessments (EIA)</strong>, <strong>Consent to Establish (CTE)</strong>, <strong>Consent to Operate (CTO)</strong>, GIS Drone Topography Mapping, and GPS Tree Enumeration.
                  </p>
                </div>

                {/* 4 Feature Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-manrope text-xs">
                  <div className="p-3.5 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center gap-3 shadow-2xs">
                    <FileCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                    <span className="text-[#173B26] font-semibold">EC / FC / CTE / CTO Statutory Compliance</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center gap-3 shadow-2xs">
                    <Compass className="w-4 h-4 text-[#216B35] shrink-0" />
                    <span className="text-[#173B26] font-semibold">High-Precision Drone KML &amp; GIS Mapping</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center gap-3 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                    <span className="text-[#173B26] font-semibold">Certified Non-Lethal Wildlife Deterrents</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center gap-3 shadow-2xs">
                    <UserCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                    <span className="text-[#173B26] font-semibold">Tactical Equipment for Frontline Rangers</span>
                  </div>
                </div>
              </div>

              {/* Right Side Photo */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <AboutHeroPhoto initialPhoto={aboutPhoto} />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. VISION, MISSION & VALUES: 3-Column High-Impact Cards
            ========================================================================= */}
        <section className="py-10 sm:py-14 bg-[#F5F8F3] w-full border-t border-[#DCE5DD]">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            {/* Meaningful Section Heading */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Our Vision, Guiding Mission &amp; Core Values
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5B675E] font-manrope leading-relaxed">
                Pioneering non-invasive ecological engineering and audit-proof statutory compliance for a balanced natural world.
              </p>
            </div>

            {/* Vision, Mission & Values High-Impact 3-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              {/* Our Values Card (Placed directly after Our Mission on the right) */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE5DD] shadow-xs hover:border-[#216B35]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#216B35]/10 text-[#216B35] flex items-center justify-center mb-5">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-manrope text-[#173B26] mb-3">
                    Our Values
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#216B35] mt-2 shrink-0" />
                      <span><strong className="text-[#173B26]">Strictly Non-Lethal Engineering:</strong> Zero electrocution or harm via bio-acoustic deterrence.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#216B35] mt-2 shrink-0" />
                      <span><strong className="text-[#173B26]">Scientific &amp; GIS Rigor:</strong> Grounded in FRI protocols and precision drone mapping.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#216B35] mt-2 shrink-0" />
                      <span><strong className="text-[#173B26]">Regulatory Integrity:</strong> Audit-proof MoEFCC, SEIAA &amp; SPCB compliance.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#216B35] mt-2 shrink-0" />
                      <span><strong className="text-[#173B26]">Frontline Safety:</strong> Protecting farming communities and forest rangers.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-[#DCE5DD]/60 flex items-center gap-2 text-xs font-semibold text-[#216B35] font-manrope">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Integrity, Safety &amp; Ecological Respect</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            4. SCIENTIFIC LEADERSHIP & TEAM MEMBERS (Managed via Admin Panel)
            ========================================================================= */}
        <AboutTeamSection initialMembers={teamMembers} />

        {/* =========================================================================
            5. TRACK RECORD & IMPACT: Engineering Sustainable Coexistence & Stewardship
            ========================================================================= */}
        <section className="py-10 sm:py-14 bg-[#F5F8F3] w-full border-t border-[#DCE5DD]">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div className="max-w-4xl space-y-2.5">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Engineering Sustainable Coexistence &amp; Environmental Stewardship
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed max-w-3xl">
                KR Environ Solutions is an environmental enterprise based in Ranchi, Jharkhand. We bridge regulatory statutory forest clearances, GIS drone mapping, and field-tested non-lethal wildlife protection technology across India.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. INSTITUTIONAL CALL TO ACTION
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
