'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomeGallery({ gallery = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Only show gallery images explicitly ticked for Homepage (max 4 in 1 row)
  const displayItems = (Array.isArray(gallery) ? gallery : [])
    .filter((item) => Boolean(item.showOnHome))
    .slice(0, 4);

  if (displayItems.length === 0) {
    return null;
  }

  const activeItem = selectedIndex !== null ? displayItems[selectedIndex] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayItems.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < displayItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-8 sm:py-10 bg-[#F5F8F3]/60 border-b border-[#DCE5DD] w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header - Compact, Refined UI/UX */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-2 border-b border-[#DCE5DD]/60">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#173B26] font-manrope tracking-tight">
              Survey Team at Work
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] font-manrope max-w-2xl mt-1 leading-relaxed">
              On-ground ecological surveys, forestry consultations, and environmental field operations across India.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#216B35] hover:text-[#174D28] bg-white hover:bg-[#F5F8F3] border border-[#DCE5DD] hover:border-[#216B35] px-3.5 py-1.5 rounded-lg font-manrope transition-all shadow-xs shrink-0 self-start sm:self-auto"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 1 Row x 4 Columns Grid (4 Selected Images Max) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {displayItems.map((item, idx) => (
            <div
              key={item.id || item._id || idx}
              onClick={() => setSelectedIndex(idx)}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-[#DCE5DD] bg-slate-100"
            >
              {/* Photo */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Seamless Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Compact Caption at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 text-white z-10">
                <h4 
                  className="text-xs sm:text-[13px] font-bold font-manrope text-white leading-snug line-clamp-1 group-hover:text-emerald-300 transition-colors drop-shadow-sm"
                  title={item.title}
                >
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-[10px] sm:text-[11px] text-white/80 font-manrope mt-0.5 line-clamp-1 leading-tight">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Best UI/UX Interactive Viewer) */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          onClick={() => setSelectedIndex(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-[#DCE5DD] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="bg-[#F5F8F3] px-4 py-2.5 border-b border-[#DCE5DD] flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-xs font-semibold text-[#68756D] font-manrope truncate">
                  {selectedIndex + 1} of {displayItems.length}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  href="/gallery"
                  className="text-[11px] font-bold text-[#216B35] hover:underline px-2 py-1 font-manrope hidden sm:inline"
                >
                  Open Gallery Page
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="p-1 rounded-lg text-[#68756D] hover:text-[#173B26] hover:bg-white border border-transparent hover:border-[#DCE5DD] transition-colors"
                  title="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image with Navigation Arrows */}
            <div className="relative bg-slate-950 flex items-center justify-center min-h-[300px] max-h-[65vh] overflow-hidden select-none">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full max-h-[65vh] object-contain"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all shadow-md hover:scale-105"
                title="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all shadow-md hover:scale-105"
                title="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Caption Details */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#DCE5DD]">
              <h3 className="text-sm sm:text-base font-bold text-[#173B26] font-manrope leading-snug">
                {activeItem.title}
              </h3>
              {activeItem.caption && (
                <p className="text-xs text-[#4B5563] font-manrope mt-1.5 leading-relaxed">
                  {activeItem.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
