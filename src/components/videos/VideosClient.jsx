'use client';

import { useState, useEffect } from 'react';
import { Play, X, Tv } from 'lucide-react';

export default function VideosClient({ initialVideos = [] }) {
  const [videos, setVideos] = useState(initialVideos);
  const [activeVideo, setActiveVideo] = useState(null);

  // Sync with API on mount to ensure real-time updates from admin panel
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch('/api/videos', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.videos)) {
            setVideos(data.videos);
          }
        }
      } catch (err) {
        console.error('Error fetching videos from admin API:', err);
      }
    }
    loadVideos();
  }, []);

  return (
    <div className="w-full">
      {/* Empty State when no videos exist in database/admin panel */}
      {videos.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#DCE5DD] shadow-xs space-y-3">
          <Tv className="w-12 h-12 text-[#68756D] mx-auto opacity-40" />
          <h4 className="text-base font-bold text-[#173B26] font-manrope">No Videos Found</h4>
          <p className="text-xs text-[#68756D] max-w-sm mx-auto font-manrope">
            No video demonstrations have been added yet. Videos created in the Admin Management Portal will appear here automatically.
          </p>
        </div>
      ) : (
        /* Videos Grid - Only Real Database Videos */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video) => (
            <div
              key={video._id || video.id}
              className="bg-white rounded-2xl border border-[#DCE5DD] overflow-hidden shadow-xs hover:border-[#216B35]/50 transition-all flex flex-col justify-between"
            >
                <div>
                  {/* Video Thumbnail with Play Button */}
                  <div
                    onClick={() => setActiveVideo(video)}
                    className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer group"
                  >
                    <img
                      src={video.thumbnail || '/img4.jpeg'}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/25 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#216B35] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#174D28] transition-all">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {video.category && (
                      <p className="text-xs uppercase tracking-wider font-semibold text-[#216B35] mb-1 font-manrope">
                        {video.category}
                      </p>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-[#173B26] font-manrope leading-snug">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] font-manrope line-clamp-3">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 pb-5 pt-2">
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#216B35] hover:text-[#174D28] font-manrope transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Full Video</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
      )}

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
              aria-label="Close video"
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
              {activeVideo.category && (
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-manrope">
                  {activeVideo.category}
                </span>
              )}
              <h3 className="text-xl font-bold font-manrope mt-1">
                {activeVideo.title}
              </h3>
              {activeVideo.description && (
                <p className="text-sm text-[#E4EEE6]/80 font-manrope mt-2">
                  {activeVideo.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

