'use client';

import { useState, useEffect } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import { Camera, X, Filter } from 'lucide-react';

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
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

  const categories = ['All', 'Field Presence', 'Government Partnership', 'Field Operations', 'Credentials'];

  const displayList = items.length > 0 ? items : defaultItems;

  const filteredItems = activeCategory === 'All'
    ? displayList
    : displayList.filter((it) => it.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Gallery Hero */}
        <section className="bg-gradient-to-b from-[#F5F8F3] to-white py-10 sm:py-14 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#173B26] mb-2">
                Photo Archive
              </p>
              <h1 className="text-3xl sm:text-4xl font-montserrat font-extrabold text-[#173B26] tracking-tight">
                Field Operations & Equipment Gallery
              </h1>
              <p className="mt-2.5 text-base text-[#4B5563] font-lato leading-relaxed">
                Photographic documentation of our field deployments, live wildlife rescues, equipment installations, and forestry training programs.
              </p>
            </div>
          </Container>
        </section>

        {/* Gallery Content */}
        <section className="py-10 sm:py-12 bg-white">
          <Container>
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6 pb-3 border-b border-[#DCE5DD]">
              <span className="text-xs font-bold text-[#68756D] uppercase tracking-wider mr-2 font-poppins flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter by:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1 rounded-lg text-xs font-poppins font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#216B35] text-white font-semibold shadow-xs'
                      : 'bg-[#F5F8F3] text-[#4B5563] hover:bg-[#DCE5DD]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="group relative rounded-2xl overflow-hidden aspect-4/3 cursor-pointer shadow-xs border border-[#DCE5DD] bg-slate-200"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142D20]/90 via-[#142D20]/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                      {item.category}
                    </div>
                    <h3 className="text-base font-bold leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

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
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {selectedImage.category}
              </span>
              <h3 className="text-xl font-bold mt-1">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-[#E4EEE6]/80 mt-2">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
