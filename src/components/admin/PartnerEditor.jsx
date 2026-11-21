'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Handshake,
  Upload,
  ExternalLink
} from 'lucide-react';

export default function PartnerEditor({
  partner,
  setPartner,
  onSave,
  onCancel,
  onUploadImage,
  uploadingImage = false
}) {
  const isEditing = Boolean(partner?.id || partner?._id);

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
            <span>Back to Partners</span>
          </button>
          <div className="h-5 w-px bg-[#DCE5DD] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#216B35]/10 text-[#216B35]">
              <Handshake className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm sm:text-base text-[#173B26] truncate max-w-xs sm:max-w-md">
              {isEditing ? `Edit: ${partner.name || 'Untitled'}` : 'Add New Partner / Alliance'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {partner.websiteUrl && (
            <a
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-xs text-[#216B35] hover:text-[#174D28] font-semibold px-2.5 py-1.5 rounded-lg border border-[#216B35]/30 hover:bg-[#F5F8F3] transition-colors"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
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
            form="partner-editor-form"
            className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Save Partner'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
        <form id="partner-editor-form" onSubmit={onSave} className="space-y-5">
          <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Partner / Entity Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={partner.name || ''}
                onChange={(e) => setPartner({ ...partner, name: e.target.value })}
                placeholder="e.g. Yugantar Bharati, PRAKRITIS Technology, Naman Enterprises, Arcturus..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-sm font-semibold text-[#173B26] focus:border-[#216B35] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Collaboration Type / Alliance Scope (Optional)
              </label>
              <input
                type="text"
                value={partner.collaborationType || ''}
                onChange={(e) => setPartner({ ...partner, collaborationType: e.target.value })}
                placeholder="e.g. Co-Development & Supply, Statutory Lab Testing, Baseline Analysis..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Description / Scope of Alliance
              </label>
              <textarea
                rows={3}
                value={partner.description || ''}
                onChange={(e) => setPartner({ ...partner, description: e.target.value })}
                placeholder="Institutional description, technical joint venture scope, and operational synergy..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none leading-relaxed"
              />
            </div>

            {/* Logo Upload Card */}
            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Partner Logo
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                    {uploadingImage ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Logo File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      className="hidden"
                      onChange={onUploadImage}
                    />
                  </label>
                  <span className="text-[11px] text-[#68756D]">PNG, SVG, JPG (transparent recommended)</span>
                </div>

                <input
                  type="text"
                  value={partner.logoUrl || ''}
                  onChange={(e) => setPartner({ ...partner, logoUrl: e.target.value })}
                  placeholder="or paste direct logo image URL..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                />

                {partner.logoUrl && (
                  <div className="p-3 rounded-lg border border-[#DCE5DD] bg-[#F5F8F3] flex items-center gap-3">
                    <div className="w-20 h-14 rounded bg-white border border-[#DCE5DD] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                      <img
                        src={partner.logoUrl}
                        alt="Logo Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] uppercase font-bold text-[#216B35] block">Logo Preview</span>
                      <span className="text-[11px] text-[#68756D] font-mono truncate block">{partner.logoUrl}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Official Website URL <span className="text-[11px] font-normal text-[#68756D]">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={partner.websiteUrl || ''}
                  onChange={(e) => setPartner({ ...partner, websiteUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={partner.displayOrder ?? 0}
                  onChange={(e) => setPartner({ ...partner, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
                <span className="text-[10px] text-[#68756D] mt-1 block">Lower numbers appear first</span>
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
              <span>{isEditing ? 'Save Changes' : 'Add Partner'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

