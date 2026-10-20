'use client';

import { useState, useEffect } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Container from '@/components/common/Container';
import { Play, X, Tv, Filter } from 'lucide-react';

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch('/api/videos');
        if (res.ok) {
          const data = await res.json();
          if (data.videos && data.videos.length > 0) {
            setVideos(data.videos);
          }
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    }
    loadVideos();
  }, []);

  const defaultVideos = [
    {
      id: 'vid-1',
      title: 'ANIDERS | Patented Animal Intrusion Detection & Repellent System',
      category: 'Product Demonstration',
      thumbnail: '/img4.jpeg',
      embedUrl: 'https://www.youtube.com/embed/sKlBSzb0TUA',
      description: 'National technology showcase detailing how patented ANIDERS bio-acoustic scarecrows deter elephants and wild animals with zero injury.'
    },
    {
      id: 'vid-2',
      title: 'ANIDERS Nocturnal Deterrence & Animal Repellent Field Test',
      category: 'Field Operations',
      thumbnail: '/img2.jpeg',
      embedUrl: 'https://www.youtube.com/embed/LyMRKxHR184',
      description: 'Infrared night footage showing wildlife turning back upon sensor trigger at agricultural perimeters.'
    },
    {
      id: 'vid-3',
      title: 'Wildlife Intrusion Detection & Field Training Demonstration',
      category: 'Training & Rescue',
      thumbnail: '/img1.jpeg',
      embedUrl: 'https://www.youtube.com/embed/I41i0_dbCpw',
      description: 'Demonstration of field deployment, solar power management, and human-wildlife mitigation tactical protocols.'
    },
    {
      id: 'vid-4',
      title: 'Tactical Forest Ranger Safety & Deterrent Equipment Review',
      category: 'Ranger Safety',
      thumbnail: '/img3.jpeg',
      embedUrl: 'https://www.youtube.com/embed/sKlBSzb0TUA',
      description: 'Frontline beat guard and ranger demonstration of multi-mode lighting, panic sirens, and tactical safety features.'
    }
  ];

  const categories = ['All', 'Product Demonstration', 'Field Operations', 'Training & Rescue', 'Ranger Safety'];

  const displayList = videos.length > 0 ? videos : defaultVideos;

  const filteredVideos = activeCategory === 'All'
    ? displayList
    : displayList.filter((v) => v.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Videos Hero */}
        <section className="bg-gradient-to-b from-[#EFF7FA] to-white py-16 sm:py-24 border-b border-[#DCE5DD]">
          <Container>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins uppercase tracking-wider bg-[#087EA4]/10 text-[#087EA4] border border-[#087EA4]/20 mb-4 font-semibold">
                Video Library
              </span>
              <h1 className="text-4xl sm:text-5xl font-montserrat font-extrabold text-[#173B26] tracking-tight">
                Field Demonstrations & Media Coverage
              </h1>
              <p className="mt-4 text-lg text-[#4B5563] font-lato leading-relaxed">
                Watch how our non-lethal wildlife technologies operate in real field conditions, from night-vision trail recordings to national media coverage.
              </p>
            </div>
          </Container>
        </section>

        {/* Video Grid */}
        <section className="py-16 bg-white">
          <Container>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#DCE5DD]">
              <span className="text-xs font-bold text-[#68756D] uppercase tracking-wider mr-2 font-poppins flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter by:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-poppins font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#087EA4] text-white font-semibold shadow-xs'
                      : 'bg-[#EFF7FA] text-[#4B5563] hover:bg-[#DCE5DD]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#087EA4]/50 transition-all card-hover flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => setActiveVideo(video)}
                      className="relative h-56 w-full overflow-hidden bg-slate-900 cursor-pointer group"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/25 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-[#087EA4] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#06617F] transition-all">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-poppins font-medium text-white">
                        {video.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold font-montserrat text-[#173B26] leading-snug">
                        {video.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#4B5563] font-lato line-clamp-3">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold font-poppins text-[#087EA4] hover:text-[#06617F] transition-colors"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Watch Full Video</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 bg-[#142D20] text-white">
              <span className="text-xs font-bold text-[#F2BE36] uppercase tracking-wider font-poppins">
                {activeVideo.category}
              </span>
              <h3 className="text-xl font-bold font-montserrat mt-1">
                {activeVideo.title}
              </h3>
              <p className="text-sm text-[#E4EEE6]/80 font-lato mt-2">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
