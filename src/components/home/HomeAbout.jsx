import Link from 'next/link';
import { ShieldCheck, Award, ArrowRight, UserCheck, Building2 } from 'lucide-react';

export default function HomeAbout() {
  return (
    <section className="py-12 lg:py-16 bg-[#F5F8F3] border-b border-[#DCE5DD]">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & All Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
                Bridging Advanced Technology &amp; Forest Stewardship
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#4B5563] font-lato leading-relaxed">
              Headed by proprietor <strong>Sarika Gupta</strong> in Ranchi, Jharkhand, <strong>KR Environ Solutions</strong> spearheads certified non-lethal wildlife conflict management, statutory environmental clearances, and frontline ranger safety gear in strategic alliance with <strong>Kyari Innovations</strong>.
            </p>

            {/* Compact Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-poppins text-xs sm:text-sm">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#DCE5DD] flex items-center gap-2.5 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                <span className="text-[#173B26] font-medium text-xs sm:text-sm">100% Non-Harmful Deterrence</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#DCE5DD] flex items-center gap-2.5 shadow-2xs">
                <Building2 className="w-4 h-4 text-[#216B35] shrink-0" />
                <span className="text-[#173B26] font-medium text-xs sm:text-sm">Statutory Forest Clearances</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#DCE5DD] flex items-center gap-2.5 shadow-2xs">
                <UserCheck className="w-4 h-4 text-[#216B35] shrink-0" />
                <span className="text-[#173B26] font-medium text-xs sm:text-sm">Certified Frontline Ranger Gear</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#DCE5DD] flex items-center gap-2.5 shadow-2xs">
                <Award className="w-4 h-4 text-[#216B35] shrink-0" />
                <span className="text-[#173B26] font-medium text-xs sm:text-sm">Field-Proven (21+ States)</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/about-us" className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm px-5 py-2.5">
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: ONLY Square Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
              <img
                src="/img4.jpeg"
                alt="KR Environ Solutions - Van Bhawan Forest Headquarters"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
