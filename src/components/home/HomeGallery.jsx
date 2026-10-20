'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Camera, ArrowRight, X } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeGallery({ gallery = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const displayItems = gallery.slice(0, 6);

  return (
    <section className="py-20 bg-[#F5F8F3] border-b border-[#DCE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Visual Archive"
          badgeColor="gold"
          title="Field Operations & Conservation In Action"
          subtitle="Explore equipment installations, ranger night patrols, and high-level forestry consultations."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 cursor-pointer shadow-sm border border-[#DCE5DD] bg-slate-200"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142D20]/90 via-[#142D20]/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-poppins font-bold text-[#173B26]">
                {item.category}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="text-base font-bold font-montserrat leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-white/80 font-lato mt-1 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/gallery" className="btn-secondary">
            <Camera className="w-4 h-4" />
            <span>Explore Full Photographic Gallery</span>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="p-6 bg-[#142D20] text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F2BE36] font-poppins">
                {selectedImage.category}
              </span>
              <h3 className="text-xl font-bold font-montserrat mt-1">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-[#E4EEE6]/80 font-lato mt-2">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
