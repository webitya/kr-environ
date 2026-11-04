'use client';

import { useState, useEffect } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { X } from 'lucide-react';

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          if (data.gallery && data.gallery.length > 0) {
            setItems(data.gallery);
          }
        }
      } catch (e) {
        console.error('Gallery fetch error:', e);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  // Default gallery items with authentic photos from public/
  const defaultItems = [
    {
      id: 'gal-1',
      title: 'Forest Headquarters Jharkhand (Van Bhawan, Doranda, Ranchi)',
      category: 'Field Presence',
      imageUrl: '/img4.jpeg',
      caption: 'S. Gupta at Forest Headquarters Jharkhand coordinating regional environmental and HWC initiatives.'
    },
    {
      id: 'gal-2',
      title: 'Consultation at D.F.O. Ranchi Desk',
      category: 'Government Partnership',
      imageUrl: '/img1.jpeg',
      caption: 'Presenting statutory environmental proposals and wildlife conflict dossiers to the Divisional Forest Officer, Ranchi.'
    },
    {
      id: 'gal-3',
      title: 'Meeting with PCCF & Chief Wildlife Warden',
      category: 'Government Partnership',
      imageUrl: '/img2.jpeg',
      caption: 'High-level briefing at the Principal Chief Conservator of Forests & Chief Wildlife Warden office at Van Bhawan, Ranchi.'
    },
    {
      id: 'gal-4',
      title: 'Forestry Clearance & Dossier Presentation',
      category: 'Government Partnership',
      imageUrl: '/img3.jpeg',
      caption: 'Reviewing statutory forest clearance and wildlife proposal dossiers with state authorities.'
    },
    {
      id: 'gal-5',
      title: 'Conservation Stewardship & Plantation Initiative',
      category: 'Field Operations',
      imageUrl: '/img5.jpeg',
      caption: 'Promoting tree plantation, geo-tagging, and conservation awareness with forest department officers.'
    },
    {
      id: 'gal-6',
      title: 'Official Company Visiting Card',
      category: 'Credentials',
      imageUrl: '/visitingcard.jpeg',
      caption: 'Official registered office at Hariom Nand Tower, branch office at Kathal More, and contact details.'
    },
    {
      id: 'gal-7',
      title: 'Key Services & Leadership Brochure',
      category: 'Credentials',
      imageUrl: '/details.jpeg',
      caption: 'Comprehensive statutory clearance, GIS drone survey, and monitoring capabilities.'
    }
  ];

  const displayList = items.length > 0 ? items : defaultItems;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SiteHeader />

      <main className="flex-1 w-full">
        {/* Gallery Hero - Minimal Compact Spacing, No HR line */}
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white pt-6 pb-2 sm:pt-8 sm:pb-3 w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-manrope font-extrabold text-[#173B26] tracking-tight leading-tight">
                Field Operations &amp; Equipment Gallery
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] font-manrope leading-relaxed">
                Photographic documentation of our field deployments, live wildlife rescues, equipment installations, and forestry training programs.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid - Full Width, 3 Images per Row, Clean High-Contrast Overlays */}
        <section className="pt-2 pb-12 sm:pt-3 sm:pb-16 bg-white w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            {/* 3 Images Per Row Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#DCE5DD] bg-slate-100"
                >
                  {/* Photo */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Seamless Bottom Overlay - Clean, Compact, Crystal-Clear White Text, No Badge */}
                  <div className="absolute inset-x-0 bottom-0 pt-10 pb-4 px-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col justify-end">
                    <h3 
                      className="text-sm sm:text-base font-bold font-manrope !text-white leading-snug line-clamp-1 drop-shadow-md"
                      style={{ color: '#ffffff' }}
                    >
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p 
                        className="text-xs !text-white/95 font-manrope mt-1 line-clamp-2 leading-relaxed"
                        style={{ color: '#f3f4f6' }}
                      >
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal - White BG with Glassmorphism Frosted Look, Slightly Compact */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/60 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#173B26] backdrop-blur-md shadow-md border border-[#DCE5DD] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Compact Image Container */}
            <div className="relative w-full max-h-[50vh] sm:max-h-[56vh] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-[#DCE5DD]/60">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full max-h-[50vh] sm:max-h-[56vh] object-contain"
              />
            </div>

            {/* Content Drawer: Clean White / Glassmorphic background with dark text (No Badge) */}
            <div className="p-5 sm:p-6 bg-white/95 backdrop-blur-md text-left">
              <h3 className="text-lg sm:text-xl font-bold font-manrope text-[#173B26] leading-snug">
                {selectedImage.title}
              </h3>
              {selectedImage.caption && (
                <p className="text-xs sm:text-sm text-[#4B5563] font-manrope mt-2 leading-relaxed">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
