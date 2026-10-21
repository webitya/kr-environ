'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, X, Tv, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeVideos({ videos = [] }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const displayVideos = videos.slice(0, 3);

  return (
    <section className="py-12 lg:py-14 bg-white border-b border-[#DCE5DD]">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <SectionHeading
          title="See Non-Lethal Wildlife Technology In Action"
          subtitle="Watch Shark Tank India features, nocturnal deterrence camera footage, and ranger weapon demonstrations."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/50 transition-all card-hover flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail with Play Button Overlay */}
                <div 
                  onClick={() => setActiveVideo(video)}
                  className="relative h-44 w-full overflow-hidden bg-slate-900 cursor-pointer group"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#216B35] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#174D28] transition-all">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35] mb-1">
                    {video.category}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-[#173B26] leading-snug">
                    {video.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5">
                <button
                  onClick={() => setActiveVideo(video)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#216B35] hover:text-[#174D28] transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Demonstration</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
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
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {activeVideo.category}
              </span>
              <h3 className="text-xl font-bold mt-1">
                {activeVideo.title}
              </h3>
              <p className="text-sm text-[#E4EEE6]/80 mt-2">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
