'use client';

import React from 'react';
import {
  ArrowLeft,
  Save,
  Camera,
  Upload,
  Plus,
  X
} from 'lucide-react';

export default function GalleryEditor({
  gallery,
  setGallery,
  categories = [],
  showAddCategory = false,
  setShowAddCategory,
  newCategoryName = '',
  setNewCategoryName,
  savingCategory = false,
  onCreateCategory,
  onSave,
  onCancel,
  onUploadImage,
  uploadingImage = false
}) {
  const isEditing = Boolean(gallery?.id || gallery?._id);

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
            <span>Back to Gallery</span>
          </button>
          <div className="h-5 w-px bg-[#DCE5DD] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#216B35]/10 text-[#216B35]">
              <Camera className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm sm:text-base text-[#173B26] truncate max-w-xs sm:max-w-md">
              {isEditing ? `Edit: ${gallery.title || 'Untitled'}` : 'Add Gallery Photograph'}
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
            form="gallery-editor-form"
            className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Save Photo'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
        <form id="gallery-editor-form" onSubmit={onSave} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column (7 cols): Title, Category, Caption, Location */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Photo Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={gallery.title || ''}
                    onChange={(e) => setGallery({ ...gallery, title: e.target.value })}
                    placeholder="e.g. Forest Headquarters Jharkhand (Van Bhawan)"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-sm font-semibold text-[#173B26] focus:border-[#216B35] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAddCategory(!showAddCategory)}
                      className="text-xs text-[#216B35] hover:text-[#174D28] font-semibold inline-flex items-center gap-1 bg-[#F5F8F3] hover:bg-[#EAEFE8] border border-[#DCE5DD] px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Category</span>
                    </button>
                  </div>

                  <select
                    value={gallery.category || 'Field Presence'}
                    onChange={(e) => {
                      if (e.target.value === '__ADD_NEW__') {
                        setShowAddCategory(true);
                      } else {
                        setGallery({ ...gallery, category: e.target.value });
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs font-medium bg-white focus:outline-none focus:border-[#216B35]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    {gallery.category && !categories.includes(gallery.category) && (
                      <option value={gallery.category}>{gallery.category}</option>
                    )}
                    <option value="__ADD_NEW__" className="text-emerald-700 font-bold bg-emerald-50">
                      + Add Custom Category...
                    </option>
                  </select>

                  {showAddCategory && (
                    <div className="mt-2.5 p-3 bg-[#F5F8F3] rounded-lg border border-[#DCE5DD] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#173B26] flex items-center gap-1">
                          <Plus className="w-3.5 h-3.5 text-[#216B35]" />
                          <span>Create Custom Gallery Category</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => { setShowAddCategory(false); setNewCategoryName(''); }}
                          className="text-[#68756D] hover:text-[#173B26] p-1 rounded hover:bg-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          autoFocus
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              await onCreateCategory();
                            }
                          }}
                          placeholder="e.g. Field Deployments, Exhibitions..."
                          className="flex-1 px-3 py-1.5 text-xs bg-white rounded-lg border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                        />
                        <button
                          type="button"
                          disabled={savingCategory || !newCategoryName.trim()}
                          onClick={onCreateCategory}
                          className="px-3.5 py-1.5 bg-[#216B35] hover:bg-[#174D28] text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 inline-flex items-center gap-1 shrink-0"
                        >
                          {savingCategory ? (
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Caption / Description
                  </label>
                  <textarea
                    rows={4}
                    value={gallery.caption || ''}
                    onChange={(e) => setGallery({ ...gallery, caption: e.target.value })}
                    placeholder="Short description of this field photograph, equipment demonstration, or location..."
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
                      value={gallery.displayOrder ?? 0}
                      onChange={(e) => setGallery({ ...gallery, displayOrder: parseInt(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#173B26]">
                      <input
                        type="checkbox"
                        checked={Boolean(gallery.showOnHome)}
                        onChange={(e) => setGallery({ ...gallery, showOnHome: e.target.checked })}
                        className="w-4 h-4 rounded border-[#DCE5DD] text-[#216B35] focus:ring-[#216B35]"
                      />
                      <span>Feature on Homepage Gallery Carousel</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Image Upload & Preview */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-3">
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider">
                  Gallery Image <span className="text-red-500">*</span>
                </label>

                <div className="space-y-3">
                  <label className="w-full inline-flex items-center justify-center gap-2 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                    {uploadingImage ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={onUploadImage}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    required
                    value={gallery.imageUrl || ''}
                    onChange={(e) => setGallery({ ...gallery, imageUrl: e.target.value })}
                    placeholder="or paste direct image URL..."
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                  />

                  {gallery.imageUrl && (
                    <div className="rounded-xl overflow-hidden border border-[#DCE5DD] bg-[#F5F8F3] aspect-video w-full">
                      <img
                        src={gallery.imageUrl}
                        alt={gallery.title || 'Preview'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
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
              <span>{isEditing ? 'Save Changes' : 'Add Photo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

