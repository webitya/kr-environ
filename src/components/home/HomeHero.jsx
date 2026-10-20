'use client';

import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sun, 
  Award, 
  Activity, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F8F3] via-white to-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#216B35]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#087EA4]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Brand Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Urgency / Milestone Pill using Climate / Poppins */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE5DD] shadow-xs text-xs font-poppins">
              <span className="w-2 h-2 rounded-full bg-[#216B35] animate-ping" />
              <span className="font-semibold text-[#216B35]">SUSTAINABLE &bull; RESPONSIBLE &bull; RELIABLE</span>
              <span className="text-[#68756D] hidden sm:inline">&bull;</span>
              <span className="text-[#4B5563] hidden sm:inline">Your Trusted Environmental Partner</span>
            </div>

            {/* H1 Heading using Montserrat */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-extrabold text-[#173B26] leading-[1.12] tracking-tight">
              Pioneering Non-Lethal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#216B35] via-[#1b572b] to-[#087EA4]">
                Human-Wildlife Conflict
              </span> Solutions in India
            </h1>

            {/* Paragraph Text using Lato */}
            <p className="text-lg sm:text-xl text-[#4B5563] font-lato leading-relaxed max-w-2xl">
              KR Environ Solutions brings India’s premier wildlife technology—partnered with <strong>Kyari Innovations</strong>—to protect human lives, secure agrarian harvests, and safeguard endangered wildlife across 21+ state forest departments.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/contact-us" className="btn-primary text-base">
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-secondary text-base">
                <span>Explore Technical Solutions</span>
              </Link>
            </div>

            {/* Quick trust badges */}
            <div className="pt-6 border-t border-[#DCE5DD]/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-poppins text-[#4B5563]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#216B35]" />
                <span>100% Non-Harmful & Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#F2BE36]" />
                <span>Solar-Powered 24/7 Resilience</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-[#087EA4]" />
                <span>NTCA Award Winner (2018)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase Card & Live Metrics */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/img2.jpeg"
                  alt="KR Environ Consultation at Van Bhawan Ranchi"
                  className="w-full h-[430px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142D20]/90 via-[#142D20]/25 to-transparent" />

                {/* Overlaid Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-md">
                  <span className="text-[11px] font-bold font-poppins text-[#216B35] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F2BE36]" />
                    Featured on Shark Tank India S2
                  </span>
                </div>

                {/* Overlaid Product Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-manrope uppercase tracking-wider text-[#F2BE36] font-bold">
                        State Forest Department Collaboration
                      </span>
                      <h3 className="text-xl font-bold font-montserrat text-white mt-0.5">
                        Van Bhawan, Doranda, Ranchi
                      </h3>
                      <p className="text-xs text-white/80 font-lato mt-1">
                        Deployment of ANIDERS, Smart Sticks & EC/FC Environmental Clearance Solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Metric Card 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-[#DCE5DD] flex items-center gap-3.5 hidden sm:flex">
                <div className="w-12 h-12 rounded-lg bg-[#216B35]/10 flex items-center justify-center text-[#216B35]">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black font-manrope text-[#173B26] leading-none">
                    1,400+
                  </div>
                  <div className="text-xs font-poppins text-[#68756D] mt-1">
                    ANIDERS Units Deployed
                  </div>
                </div>
              </div>

              {/* Floating Metric Card 2 */}
              <div className="absolute -top-4 -right-4 bg-white p-3.5 rounded-xl shadow-xl border border-[#DCE5DD] flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-lg bg-[#087EA4]/10 flex items-center justify-center text-[#087EA4]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold font-manrope text-[#173B26] leading-none">
                    12+ Reserves
                  </div>
                  <div className="text-[11px] font-poppins text-[#68756D]">
                    Protected Tiger Corridors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Key Stats Bar */}
        <div className="mt-16 pt-10 border-t border-[#DCE5DD] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-white/70 border border-[#DCE5DD]">
            <div className="text-3xl sm:text-4xl font-extrabold font-manrope text-[#216B35]">
              91%
            </div>
            <div className="text-xs sm:text-sm font-poppins text-[#68756D] mt-1">
              Crop-Raiding Deterrence Rate
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/70 border border-[#DCE5DD]">
            <div className="text-3xl sm:text-4xl font-extrabold font-manrope text-[#087EA4]">
              60%
            </div>
            <div className="text-xs sm:text-sm font-poppins text-[#68756D] mt-1">
              Average Farmer Crop Yield Boost
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/70 border border-[#DCE5DD]">
            <div className="text-3xl sm:text-4xl font-extrabold font-manrope text-[#173B26]">
              21+
            </div>
            <div className="text-xs sm:text-sm font-poppins text-[#68756D] mt-1">
              State Forest Departments Served
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/70 border border-[#DCE5DD]">
            <div className="text-3xl sm:text-4xl font-extrabold font-manrope text-[#F2BE36]">
              4,000+
            </div>
            <div className="text-xs sm:text-sm font-poppins text-[#173B26] font-semibold mt-1">
              Field Safety Devices Installed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
