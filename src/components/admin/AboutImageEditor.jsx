'use client';

import React from 'react';
import {
  ArrowLeft,
  Save,
  ImageIcon,
  Upload
} from 'lucide-react';

export default function AboutImageEditor({
  slide,
  setSlide,
  onSave,
  onCancel,
  onUploadImage,
  uploadingImage = false
}) {
  const isEditing = Boolean(slide?.id || slide?._id);

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
            <span>Back to About Images</span>
          </button>
          <div className="h-5 w-px bg-[#DCE5DD] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#216B35]/10 text-[#216B35]">
              <ImageIcon className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm sm:text-base text-[#173B26] truncate max-w-xs sm:max-w-md">
              {isEditing ? `Edit: ${slide.title || 'Untitled'}` : 'Add New About Us Slide'}
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
            form="about-editor-form"
            className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Save Slide'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <form id="about-editor-form" onSubmit={onSave} className="space-y-5">
          <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Slide Heading / Caption
              </label>
              <input
                type="text"
                value={slide.title || ''}
                onChange={(e) => setSlide({ ...slide, title: e.target.value })}
                placeholder="e.g. Institutional Forestry Consultation"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-sm font-semibold text-[#173B26] focus:border-[#216B35] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Paragraph / Text (Displayed Below Image)
              </label>
              <textarea
                rows={5}
                value={slide.description || ''}
                onChange={(e) => setSlide({ ...slide, description: e.target.value })}
                placeholder="Enter a descriptive paragraph to display at the bottom of the right-side showcase image..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs sm:text-sm text-[#4B5563] focus:border-[#216B35] focus:outline-none resize-y leading-relaxed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider">
                  Slide Image <span className="text-red-500">*</span>
                </label>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#216B35] hover:bg-[#174D28] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors">
                  {uploadingImage ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
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
                required
                value={slide.imageUrl || ''}
                onChange={(e) => setSlide({ ...slide, imageUrl: e.target.value })}
                placeholder="Upload image or paste Cloudinary image URL"
                className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] font-mono text-xs focus:border-[#216B35] focus:outline-none"
              />

              {slide.imageUrl && (
                <div className="mt-3 rounded-xl overflow-hidden border border-[#DCE5DD] bg-[#F5F8F3] max-w-md aspect-video">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title || 'Slide Preview'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={slide.displayOrder ?? 0}
                onChange={(e) => setSlide({ ...slide, displayOrder: parseInt(e.target.value) || 0 })}
                className="w-32 px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
              />
              <span className="text-[10px] text-[#68756D] ml-2">Lower numbers appear first</span>
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
              <span>{isEditing ? 'Save Changes' : 'Add Slide'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

