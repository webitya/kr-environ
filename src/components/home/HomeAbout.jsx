import Link from 'next/link';
import { ShieldCheck, Award, ArrowRight, UserCheck, Building2 } from 'lucide-react';

export default function HomeAbout() {
  return (
    <section className="py-8 lg:py-10 bg-[#F5F8F3] border-b border-[#DCE5DD] w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-5 sm:gap-y-6 lg:gap-y-5 lg:gap-x-12 xl:gap-x-16 items-start lg:grid-rows-[auto_1fr]">
          
          {/* 1. Title: 1st in Mobile, Top-Left in Desktop */}
          <div className="order-1 lg:order-1 lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
              Bridging Advanced Technology &amp; Forest Stewardship
            </h2>
          </div>

          {/* 2. Image: 2nd in Mobile, Spanning Right Column in Desktop */}
          <div className="order-2 lg:order-2 lg:col-span-5 lg:row-span-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
              <img
                src="/img1.jpeg"
                alt="Sarika Gupta in consultation at D.F.O. Ranchi Desk"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* 3. Left Text Content: 3rd in Mobile, Bottom-Left in Desktop */}
          <div className="order-3 lg:order-3 lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            <p className="text-sm sm:text-base text-[#4B5563] font-manrope leading-relaxed">
              Headed by proprietor <strong>Sarika Gupta</strong> in Ranchi, Jharkhand, <strong>KR Environ Solutions</strong> spearheads certified non-lethal wildlife conflict management, statutory environmental clearances, and frontline ranger safety gear in strategic alliance with <strong>Kyari Innovations</strong>.
            </p>

            {/* Compact Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-manrope text-xs sm:text-sm">
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
              <Link href="/about-us" className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm px-5 py-2.5 font-manrope">
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
