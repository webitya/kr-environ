import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  Building2, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap,
  Trees,
  FileCheck,
  Compass
} from 'lucide-react';

export const metadata = {
  title: "About Us | KR Environ Solutions & Forest Leadership",
  description: "Learn about KR Environ Solutions, proprietor S. Gupta, our expert panel (Dr. Raj Kumar, Dr. Satya Prakash), and our strategic wildlife tech alliance with Kyari Innovations."
};

const leaders = [
  {
    name: "S. Gupta",
    role: "Proprietor | Environmentalist & Analyst",
    qualifications: "MSc (Environmental Science) (Lucknow University) • MSc (Geoinformatics)",
    experience: "15+ years experience as an Environmental Analyst",
    bio: "Visionary leader driving comprehensive Environmental Clearance (EC/FC), GIS drone mapping, and state-level Human-Wildlife Conflict mitigation across Jharkhand and India.",
    designation: "Proprietor"
  },
  {
    name: "Dr. Raj Kumar",
    role: "Environmentalist & Forest Clearance Expert",
    qualifications: "Doctorate (Forest Research Institute - FRI, Dehradun)",
    experience: "10+ years experience in Environmental Clearance",
    bio: "Specialist in statutory Forest Clearance proposals, regulatory liaison, site-specific management plans, and compensatory afforestation land assessments.",
    designation: "Forest Clearance Expert"
  },
  {
    name: "Dr. Satya Prakash",
    role: "Wildlife Conservationist & Biodiversity Expert",
    qualifications: "Doctorate / Renowned Wildlife & Biodiversity Authority",
    experience: "25+ years experience in Wildlife Management",
    bio: "Pioneering authority in biodiversity assessment (flora, fauna, avifauna, butterflies), ecological corridor heatmapping, and safe wildlife capture strategies.",
    designation: "Wildlife Management"
  }
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* About Hero */}
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white py-10 sm:py-14 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35] mb-2">
                Sustainable &bull; Responsible &bull; Reliable
              </p>
              <h1 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-[#173B26] tracking-tight">
                Your Trusted Environmental & Forest Consultancy Partner
              </h1>
              <p className="mt-3 text-base text-[#4B5563] font-lato leading-relaxed">
                We combine field expertise, scientific approach, and modern technology to deliver environmental solutions that are efficient, reliable, and fully compliant with state and central regulatory frameworks.
              </p>
            </div>
          </Container>
        </section>

        {/* Company Introduction & Official Photographs */}
        <section className="py-12 lg:py-14 bg-white border-b border-[#DCE5DD]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-[#216B35] uppercase tracking-wider font-poppins">
                  Official Mandate & Capabilities
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#173B26]">
                  Bridging Environmental Clearance, GIS Technology & Wildlife Safety
                </h2>

                <div className="space-y-3 text-sm sm:text-base text-[#4B5563] font-lato leading-relaxed">
                  <p>
                    <strong>KR Environ Solutions</strong> (headed by proprietor <strong>S. Gupta</strong>) operates out of Ranchi, Jharkhand, offering turnkey environmental services including Environmental Clearance (EC), Environmental Impact Assessment (EIA), Forest Clearance (FC), Consent to Establish (CTE) & Operate (CTO), Tree Enumeration & Translocation, and ESG Drone Surveys.
                  </p>
                  <p>
                    In strategic partnership with <strong>Kyari Innovations Pvt. Ltd.</strong> (winner of NTCA's National Budding Innovator Award and featured on Shark Tank India S2), we also deliver India’s leading non-lethal wildlife protection hardware, including ANIDERS bio-acoustic scarecrows, Re-Pulse shock mats, and KyNet net capture launchers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-poppins text-xs">
                  <div className="p-3 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                    <span className="text-[#173B26] font-medium">EC / FC / CTE / CTO Statutory Compliance</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F5F8F3] border border-[#DCE5DD] flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#216B35] shrink-0" />
                    <span className="text-[#173B26] font-medium">Drone Survey, KML & GIS Mapping</span>
                  </div>
                </div>
              </div>

              {/* Photos Gallery Collage */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                  <img
                    src="/img4.jpeg"
                    alt="S. Gupta at Forest Headquarters Jharkhand"
                    className="w-full h-72 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142D20]/90 via-[#142D20]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase font-poppins">
                      Field Presence
                    </span>
                    <h3 className="text-base font-bold font-montserrat">
                      Forest Headquarters Jharkhand (Van Bhawan, Doranda, Ranchi)
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden border border-[#DCE5DD] shadow-xs">
                    <img
                      src="/img1.jpeg"
                      alt="Consultation with DFO Ranchi"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-[#DCE5DD] shadow-xs">
                    <img
                      src="/img2.jpeg"
                      alt="Meeting with PCCF & Chief Wildlife Warden"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Expert Leadership Panel from Official Brochure */}
        <section className="py-12 lg:py-14 bg-[#F5F8F3] border-b border-[#DCE5DD]">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs font-bold text-[#216B35] uppercase tracking-wider font-poppins">
                Our Advisory & Executive Board
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#173B26] mt-1.5">
                Expert Leadership Team
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#4B5563] font-lato">
                Decades of combined scientific scholarship, regulatory clearances, and field biodiversity management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {leaders.map((leader, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#DCE5DD] shadow-xs hover:border-[#216B35]/50 transition-all card-hover flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#216B35] mb-1.5">
                      {leader.designation}
                    </p>
                    <h3 className="text-xl font-bold font-montserrat text-[#173B26]">
                      {leader.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#216B35] font-poppins mt-0.5">
                      {leader.role}
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#DCE5DD]/60 space-y-1.5 text-xs font-opensans text-[#4B5563]">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-[#216B35] shrink-0 mt-0.5" />
                        <span><strong>Education:</strong> {leader.qualifications}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-[#216B35] shrink-0 mt-0.5" />
                        <span><strong>Track Record:</strong> {leader.experience}</span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-[#4B5563] font-lato leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Brochure & Visiting Card Showcase */}
        <section className="py-12 lg:py-14 bg-white border-b border-[#DCE5DD]">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-xs font-bold text-[#216B35] uppercase tracking-wider font-poppins">
                Credentials & Documents
              </span>
              <h2 className="text-2xl font-bold font-montserrat text-[#173B26] mt-1">
                Official Company Visiting Card & Overview
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="rounded-2xl overflow-hidden border border-[#DCE5DD] shadow-lg">
                <img
                  src="/visitingcard.jpeg"
                  alt="KR Environ Solutions Official Visiting Card"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#DCE5DD] shadow-lg">
                <img
                  src="/details.jpeg"
                  alt="KR Environ Solutions Company Capabilities Brochure"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Full CTA */}
        <section className="py-12 lg:py-14 bg-[#142D20] text-white text-center">
          <Container>
            <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-white max-w-2xl mx-auto leading-tight">
              Partner with Us for Reliable & Compliant Environmental Solutions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#E4EEE6]/80 font-lato max-w-xl mx-auto">
              Schedule an in-person briefing or request ground surveys at our Ranchi offices.
            </p>
            <div className="mt-5 flex justify-center gap-4">
              <Link href="/contact-us" className="btn-accent">
                <span>Contact Our Ranchi Office</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
