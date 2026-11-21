'use client';

import React from 'react';
import {
  ArrowLeft,
  Save,
  Tv,
  Upload
} from 'lucide-react';

export default function VideoEditor({
  video,
  setVideo,
  onSave,
  onCancel,
  onUploadImage,
  uploadingImage = false
}) {
  const isEditing = Boolean(video?.id || video?._id);

  return (
    <div className="w-full">
      {/* Top Sticky Header */}
      <div className="bg-white border-b border-[#DCE5DD] px-4 py-3 sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 bg-[#F5F8F3] hover:bg-[#EAEFE8] text-[#173B26] px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#DCE5DD] shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Videos</span>
          </button>
          <div className="h-5 w-px bg-[#DCE5DD] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#216B35]/10 text-[#216B35]">
              <Tv className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm sm:text-base text-[#173B26] truncate max-w-xs sm:max-w-md">
              {isEditing ? `Edit: ${video.title || 'Untitled'}` : 'Add Demonstration Video'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-1.5 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs font-semibold text-[#4B5563] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="video-editor-form"
            className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Save Video'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
        <form id="video-editor-form" onSubmit={onSave} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column (7 cols): Title, YouTube URL, Category, Description */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Video Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={video.title || ''}
                    onChange={(e) => setVideo({ ...video, title: e.target.value })}
                    placeholder="e.g. ANIDERS | Animal Intrusion Detection and Repellent System"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-sm font-semibold text-[#173B26] focus:border-[#216B35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    YouTube Video or Embed URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={video.embedUrl || ''}
                    onChange={(e) => {
                      let val = e.target.value;
                      const match = val.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]{11})/);
                      if (match && match[1]) {
                        val = `https://www.youtube.com/embed/${match[1]}`;
                        if (!video.thumbnail) {
                          setVideo(prev => ({
                            ...prev,
                            embedUrl: val,
                            thumbnail: `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
                          }));
                          return;
                        }
                      }
                      setVideo(prev => ({ ...prev, embedUrl: val }));
                    }}
                    placeholder="https://www.youtube.com/watch?v=sKlBSzb0TUA (auto-embeds)"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                  />
                  <span className="text-[11px] text-[#68756D] mt-1 block">
                    Paste any YouTube link: watch, youtu.be, shorts, or embed URL (auto-normalizes).
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={video.category || ''}
                    onChange={(e) => setVideo({ ...video, category: e.target.value })}
                    placeholder="e.g. Wildlife Deterrence Demonstration"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Description / Technical Details
                  </label>
                  <textarea
                    rows={4}
                    value={video.description || ''}
                    onChange={(e) => setVideo({ ...video, description: e.target.value })}
                    placeholder="Detailed explanation of the video demonstration, field operation, or patented hardware showcase..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs sm:text-sm text-[#4B5563] focus:border-[#216B35] focus:outline-none resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={video.displayOrder ?? 0}
                      onChange={(e) => setVideo({ ...video, displayOrder: parseInt(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#173B26]">
                      <input
                        type="checkbox"
                        checked={Boolean(video.showOnHome)}
                        onChange={(e) => setVideo({ ...video, showOnHome: e.target.checked })}
                        className="w-4 h-4 rounded border-[#DCE5DD] text-[#216B35] focus:ring-[#216B35]"
                      />
                      <span>Feature on Homepage Video Section</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Live Preview & Thumbnail */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-3">
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider">
                  Live Video Preview
                </label>

                {video.embedUrl && video.embedUrl.includes('embed') ? (
                  <div className="rounded-xl overflow-hidden border border-[#DCE5DD] aspect-video w-full bg-black">
                    <iframe
                      src={video.embedUrl}
                      title="Video Preview"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-[#DCE5DD] bg-[#F5F8F3] aspect-video w-full flex flex-col items-center justify-center text-[#68756D] text-xs">
                    <Tv className="w-8 h-8 opacity-40 mb-1" />
                    <span>Enter a valid YouTube URL to preview</span>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-3">
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider">
                  Thumbnail Image
                </label>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-2 bg-[#216B35] hover:bg-[#174D28] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                      {uploadingImage ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Custom Thumbnail'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={onUploadImage}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    value={video.thumbnail || ''}
                    onChange={(e) => setVideo({ ...video, thumbnail: e.target.value })}
                    placeholder="/img4.jpeg or Cloudinary URL (auto-generated from YouTube if blank)"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DCE5DD]">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs font-semibold text-[#4B5563] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-lg shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save Changes' : 'Add Video'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

