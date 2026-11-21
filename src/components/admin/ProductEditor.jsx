'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Package,
  Upload,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';

export default function ProductEditor({
  product,
  setProduct,
  onSave,
  onCancel,
  onUploadImage,
  uploadingImage = false,
  onAddSpec,
  onRemoveSpec,
  onSpecChange
}) {
  const isEditing = Boolean(product?.id || product?._id);

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
            <span>Back to Products</span>
          </button>
          <div className="h-5 w-px bg-[#DCE5DD] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#216B35]/10 text-[#216B35]">
              <Package className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm sm:text-base text-[#173B26] truncate max-w-xs sm:max-w-md">
              {isEditing ? `Edit: ${product.title || 'Untitled'}` : 'Add New Product & Hardware'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {isEditing && product.slug && (
            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-xs text-[#216B35] hover:text-[#174D28] font-semibold px-2.5 py-1.5 rounded-lg border border-[#216B35]/30 hover:bg-[#F5F8F3] transition-colors"
            >
              <span>View Live</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-1.5 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs font-semibold text-[#4B5563] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-editor-form"
            className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Save Product'}</span>
          </button>
        </div>
      </div>

      {/* Main Full-Width Form Workspace */}
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
        <form id="product-editor-form" onSubmit={onSave} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column (8 cols): Title, Model, Slug, Descriptions, Specs */}
            <div className="lg:col-span-8 space-y-5">
              {/* Basic Info Card */}
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                      Product Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={product.title || ''}
                      onChange={(e) => setProduct({ ...product, title: e.target.value })}
                      placeholder="e.g. Dynamic Solar-Powered LED Bird Flight Diverter, ANIDERS..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none text-sm font-semibold text-[#173B26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                      Model Code
                    </label>
                    <input
                      type="text"
                      value={product.modelCode || ''}
                      onChange={(e) => setProduct({ ...product, modelCode: e.target.value })}
                      placeholder="e.g. KR-BFD-SLED-100"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none text-sm font-mono text-[#173B26]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider">
                      URL Slug
                    </label>
                    <span className="text-[11px] text-[#68756D]">
                      Optional, auto-generated from title if blank
                    </span>
                  </div>
                  <div className="flex items-center rounded-lg border border-[#DCE5DD] bg-[#F5F8F3] px-3 py-2 focus-within:border-[#216B35] focus-within:bg-white transition-colors">
                    <span className="text-xs text-[#68756D] font-mono select-none">/products/</span>
                    <input
                      type="text"
                      value={product.slug || ''}
                      onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                      placeholder="dynamic-solar-led-bird-flight-diverter"
                      className="w-full bg-transparent text-xs font-mono text-[#173B26] focus:outline-none ml-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Short Description
                  </label>
                  <textarea
                    rows={3}
                    value={product.shortDescription || ''}
                    onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })}
                    placeholder="Concise technical overview of this product..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none text-xs sm:text-sm text-[#4B5563]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    In-Depth Overview &amp; Field Context
                  </label>
                  <textarea
                    rows={6}
                    value={product.content || ''}
                    onChange={(e) => setProduct({ ...product, content: e.target.value })}
                    placeholder="Comprehensive technical breakdown, deployment methodology, field notes, and operational use-cases..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none text-xs sm:text-sm text-[#4B5563] resize-y"
                  />
                </div>
              </div>

              {/* Technical Specifications Key-Value Builder */}
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE5DD]">
                  <div>
                    <h4 className="text-xs font-bold text-[#173B26] uppercase tracking-wider">
                      Technical Specifications
                    </h4>
                    <p className="text-[11px] text-[#68756D]">
                      Add key parameters like visibility range, solar charging, battery, trigger modes
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onAddSpec}
                    className="text-xs text-[#216B35] hover:text-[#174D28] font-semibold inline-flex items-center gap-1.5 bg-[#F5F8F3] hover:bg-[#EAEFE8] border border-[#DCE5DD] px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Spec Row</span>
                  </button>
                </div>

                <div className="space-y-2.5 pt-1">
                  {(product.specs || []).length === 0 ? (
                    <p className="text-xs text-[#68756D] italic py-2">
                      No specs added yet. Click &quot;Add Spec Row&quot; above to add parameters.
                    </p>
                  ) : (
                    (product.specs || []).map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={spec.label || ''}
                          onChange={(e) => onSpecChange(idx, 'label', e.target.value)}
                          placeholder="Label (e.g. Solar Panel / Battery)"
                          className="w-1/2 px-3 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                        />
                        <input
                          type="text"
                          value={spec.value || ''}
                          onChange={(e) => onSpecChange(idx, 'value', e.target.value)}
                          placeholder="Value (e.g. 12V LiFePO4 / 5000mAh)"
                          className="w-1/2 px-3 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveSpec(idx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove specification"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Featured Image, Category, Pricing, Status */}
            <div className="lg:col-span-4 space-y-5">
              {/* Image Upload Card */}
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-3">
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider">
                  Featured Product Image
                </label>

                <div className="space-y-3">
                  <label className="w-full inline-flex items-center justify-center gap-2 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                    {uploadingImage ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Upload Image (JPG, PNG, WebP)'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      className="hidden"
                      onChange={onUploadImage}
                    />
                  </label>

                  <input
                    type="text"
                    value={product.featuredImage || ''}
                    onChange={(e) => setProduct({ ...product, featuredImage: e.target.value })}
                    placeholder="or paste direct image URL..."
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                  />

                  {product.featuredImage && (
                    <div className="rounded-xl border border-[#DCE5DD] bg-[#F5F8F3] p-2 overflow-hidden">
                      <div className="aspect-video w-full rounded-lg bg-white overflow-hidden flex items-center justify-center border border-[#DCE5DD]">
                        <img
                          src={product.featuredImage}
                          alt="Product Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[10px] text-[#68756D] font-mono truncate block mt-1.5 px-1">
                        {product.featuredImage}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Classification & Metadata Card */}
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={product.category || 'Bird Diverters & Avian Protection'}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DCE5DD] text-xs bg-white focus:border-[#216B35] focus:outline-none"
                  >
                    <option value="Bird Diverters & Avian Protection">Bird Diverters &amp; Avian Protection</option>
                    <option value="Wildlife Deterrence & Smart Sensors">Wildlife Deterrence &amp; Smart Sensors</option>
                    <option value="Frontline Ranger Gear">Frontline Ranger Gear</option>
                    <option value="Humane Capture & Rescue">Humane Capture &amp; Rescue</option>
                    <option value="Perimeter Security & Ground Deterrents">Perimeter Security &amp; Ground Deterrents</option>
                    <option value="Wildlife Monitoring & AI Sentinels">Wildlife Monitoring &amp; AI Sentinels</option>
                    <option value="Eco & Smart Green Solutions">Eco &amp; Smart Green Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Pricing / Framework
                  </label>
                  <input
                    type="text"
                    value={product.price || ''}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    placeholder="e.g. GeM Listed / Bulk Utility Tender Supply"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={product.status || 'published'}
                    onChange={(e) => setProduct({ ...product, status: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DCE5DD] text-xs bg-white focus:border-[#216B35] focus:outline-none"
                  >
                    <option value="published">Published (Visible on site)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
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
              <span>{isEditing ? 'Save Changes' : 'Add Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

