'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, X, Tv, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeVideos({ videos = [] }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const displayVideos = videos.slice(0, 3);

  return (
    <section className="py-20 bg-white border-b border-[#DCE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Video Highlights"
          badgeColor="blue"
          title="See Non-Lethal Wildlife Technology In Action"
          subtitle="Watch Shark Tank India features, nocturnal deterrence camera footage, and ranger weapon demonstrations."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#087EA4]/50 transition-all card-hover flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail with Play Button Overlay */}
                <div 
                  onClick={() => setActiveVideo(video)}
                  className="relative h-52 w-full overflow-hidden bg-slate-900 cursor-pointer group"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[#087EA4] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#06617F] transition-all">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-poppins font-medium text-white">
                    {video.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold font-montserrat text-[#173B26] leading-snug">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563] font-lato line-clamp-2">
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
                  <span>Watch Demonstration</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/videos" className="btn-secondary">
            <Tv className="w-4 h-4" />
            <span>View All Video Demonstrations</span>
          </Link>
        </div>
      </div>

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
    </section>
  );
}
