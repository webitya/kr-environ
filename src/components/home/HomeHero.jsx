'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F8F3] via-white to-white pt-8 pb-12 lg:pt-12 lg:pb-16">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#216B35]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#216B35]/5 blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Headlines & Brand Narrative */}
          <div className="lg:col-span-7 space-y-4 text-left">
            {/* Clean Tagline */}
            <p className="text-xs uppercase tracking-wider text-[#216B35] font-semibold">
              Sustainable &bull; Responsible &bull; Reliable &bull; Your Trusted Environmental Partner
            </p>

            {/* H1 Heading using Montserrat */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-montserrat font-extrabold text-[#173B26] leading-[1.15] tracking-tight">
              Pioneering Non-Lethal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#216B35] via-[#1b572b] to-[#173B26]">
                Human-Wildlife Conflict
              </span> Solutions in India
            </h1>

            {/* Paragraph Text using Lato */}
            <p className="text-base sm:text-lg text-[#4B5563] font-lato leading-relaxed max-w-2xl">
              KR Environ Solutions brings India’s premier wildlife technology—partnered with <strong>Kyari Innovations</strong>—to protect human lives, secure agrarian harvests, and safeguard endangered wildlife across 21+ state forest departments.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full">
              <Link href="/contact-us" className="btn-primary w-full sm:w-auto text-center justify-center">
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-secondary w-full sm:w-auto text-center justify-center">
                <span>Explore Technical Solutions</span>
              </Link>
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
                  className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142D20]/90 via-[#142D20]/25 to-transparent" />

                {/* Overlaid Product Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-manrope uppercase tracking-wider text-emerald-400 font-bold">
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
            </div>
          </div>
        </div>

        {/* Global Key Stats Bar */}
        <div className="mt-10 pt-6 border-t border-[#DCE5DD] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 rounded-xl bg-white/70 border border-[#DCE5DD]">
            <div className="text-2xl sm:text-3xl font-extrabold font-manrope text-[#216B35]">
              91%
            </div>
            <div className="text-xs sm:text-sm font-poppins text-[#68756D] mt-0.5">
              Crop-Raiding Deterrence Rate
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/70 border border-[#DCE5DD]">
            <div className="text-2xl sm:text-3xl font-extrabold font-manrope text-[#216B35]">
              60%
            </div>
            <div className="text-xs sm:text-sm font-poppins text-[#68756D] mt-0.5">
              Average Farmer Crop Yield Boost
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/70 border border-[#DCE5DD]">
            <div className="text-2xl sm:text-3xl font-extrabold font-manrope text-[#173B26]">
              21+
            </div>
            <div className="text-xs sm:text-sm font-poppins text-[#68756D] mt-0.5">
              State Forest Departments Served
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/70 border border-[#DCE5DD]">
            <div className="text-2xl sm:text-3xl font-extrabold font-manrope text-[#216B35]">
              4,000+
            </div>
            <div className="text-xs sm:text-sm font-poppins text-[#173B26] font-semibold mt-0.5">
              Field Safety Devices Installed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
