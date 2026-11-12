'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  ArrowRight,
  UserCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react';

const OPERATIONAL_STATES = [
  'Jharkhand',
  'Bihar',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Chhattisgarh',
  'Odisha'
];

const DEFAULT_SLIDES = [
  {
    id: 'default-1',
    title: 'Sarika Gupta in consultation at D.F.O. Ranchi Desk',
    imageUrl: '/img1.jpeg'
  }
];

export default function HomeAbout({ images = [] }) {
  const slides = images && images.length > 0 ? images : DEFAULT_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeIndex = currentIndex >= slides.length ? 0 : currentIndex;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-slide carousel when multiple images exist
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused, goNext]);

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

          {/* 2. Right-Side Auto-Slide Image Carousel: 2nd in Mobile, Spanning Right Column in Desktop */}
          <div className="order-2 lg:order-2 lg:col-span-5 lg:row-span-2 flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-md lg:max-w-none aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Slide Track */}
              <div
                className="flex w-full h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${safeIndex * 100}%)` }}
              >
                {slides.map((slide, idx) => (
                  <div key={slide.id || slide._id || idx} className="w-full h-full shrink-0 relative">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title || 'KR Environ Solutions Field Highlight'}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>

              {/* Left & Right Corner-Center Navigation Controls */}
              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous image"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-[#216B35] text-white backdrop-blur-xs border border-white/25 flex items-center justify-center transition-colors shadow-md cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next image"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-[#216B35] text-white backdrop-blur-xs border border-white/25 flex items-center justify-center transition-colors shadow-md cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Bottom Dots Indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/35 backdrop-blur-xs px-2.5 py-1 rounded-full">
                    {slides.map((slide, idx) => (
                      <button
                        key={slide.id || slide._id || idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx === safeIndex
                            ? 'w-5 bg-white'
                            : 'w-1.5 bg-white/55 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 3. Left Text Content: 3rd in Mobile, Bottom-Left in Desktop */}
          <div className="order-3 lg:order-3 lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            <p className="text-sm sm:text-base text-[#4B5563] font-manrope leading-relaxed">
              Headed by proprietor <strong>Sarika Gupta</strong> in Ranchi, Jharkhand, <strong>KR Environ Solutions</strong> spearheads certified non-lethal wildlife conflict management, statutory environmental clearances, and frontline ranger safety solutions across India.
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
                <span className="text-[#173B26] font-medium text-xs sm:text-sm">Pan-India Field Operations</span>
              </div>
            </div>

            {/* Active Operational States */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#DCE5DD] shadow-2xs space-y-2.5 font-manrope">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#216B35] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#173B26]">
                  Our Active Operational States
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {OPERATIONAL_STATES.map((state) => (
                  <span
                    key={state}
                    className="inline-flex items-center px-2.5 py-1 rounded bg-[#F5F8F3] border border-[#DCE5DD] text-xs font-medium text-[#173B26]"
                  >
                    {state}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-1">
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
