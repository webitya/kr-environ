'use client';

import { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';

export default function AboutHeroPhoto({ initialPhoto = { imageUrl: '', caption: '' } }) {
  const [syncedPhoto, setSyncedPhoto] = useState(null);
  const photo = syncedPhoto ?? initialPhoto ?? { imageUrl: '', caption: '' };

  // Sync latest photo from MongoDB on mount (bypasses Next.js client Router Cache)
  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function syncPhoto() {
      try {
        const res = await fetch('/api/about-page-photo', {
          cache: 'no-store',
          signal: controller.signal
        });
        if (!res.ok) return;
        const data = await res.json();
        if (active && data?.success && data.photo) {
          setSyncedPhoto(data.photo);
        }
      } catch (err) {
        if (err?.name !== 'AbortError') {
          console.error('Failed to sync About Us page photo:', err);
        }
      }
    }

    syncPhoto();
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  if (!photo?.imageUrl) {
    return (
      <div className="w-full max-w-md lg:max-w-none aspect-[4/3] rounded-2xl sm:rounded-3xl border-2 border-dashed border-[#DCE5DD] bg-[#F5F8F3]/70 flex flex-col items-center justify-center p-6 text-center font-manrope shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-white border border-[#DCE5DD] flex items-center justify-center text-[#216B35] mb-3 shadow-2xs">
          <ImageIcon className="w-6 h-6" />
        </div>
        <p className="text-sm font-bold text-[#173B26]">About Us Feature Photo</p>
        <p className="text-xs text-[#68756D] mt-1 max-w-xs">
          Upload or update this photo from Admin Panel → About Page Photo.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-[#F5F8F3] bg-white flex flex-col">
      <div className="relative w-full aspect-[4/3] bg-[#F5F8F3] overflow-hidden">
        <img
          src={photo.imageUrl}
          alt={photo.caption || 'KR Environ Solutions — About Us'}
          className="w-full h-full object-cover object-center"
        />
      </div>
      {photo.caption && (
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-[#F5F8F3]/70 border-t border-[#DCE5DD] font-manrope">
          <p className="text-xs sm:text-sm font-medium text-[#173B26] leading-relaxed">
            {photo.caption}
          </p>
        </div>
      )}
    </div>
  );
}

