'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Award,
  FileText,
  ExternalLink
} from 'lucide-react';

export default function CertificateEditor({
  certificate,
  setCertificate,
  onSave,
  onCancel
}) {
  const isEditing = Boolean(certificate?.id || certificate?._id);

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
            <span>Back to Certificates</span>
          </button>
          <div className="h-5 w-px bg-[#DCE5DD] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#216B35]/10 text-[#216B35]">
              <Award className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm sm:text-base text-[#173B26] truncate max-w-xs sm:max-w-md">
              {isEditing ? `Edit: ${certificate.title || 'Untitled'}` : 'Add New Certificate PDF'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/certificates"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1 text-xs text-[#216B35] hover:text-[#174D28] font-semibold px-2.5 py-1.5 rounded-lg border border-[#216B35]/30 hover:bg-[#F5F8F3] transition-colors"
          >
            <span>View Certificates Page</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-1.5 rounded-lg border border-[#DCE5DD] hover:bg-[#F5F8F3] text-xs font-semibold text-[#4B5563] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="certificate-editor-form"
            className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Save Certificate'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
        <form id="certificate-editor-form" onSubmit={onSave} className="space-y-5">
          <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Certificate / PDF Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={certificate.title || ''}
                onChange={(e) => setCertificate({ ...certificate, title: e.target.value })}
                placeholder="e.g. ISO 9001:2015 Quality Management System Certification"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-sm font-semibold text-[#173B26] focus:border-[#216B35] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                PDF Link or Google Drive Share Link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                value={certificate.pdfUrl || ''}
                onChange={(e) => setCertificate({ ...certificate, pdfUrl: e.target.value })}
                placeholder="https://drive.google.com/file/d/1.../view?usp=sharing or direct .pdf link"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs font-mono focus:border-[#216B35] focus:outline-none"
              />
              <div className="text-xs text-[#4B5563] mt-2 bg-[#F5F8F3] p-3 rounded-lg border border-[#DCE5DD]/70 leading-relaxed">
                <span className="font-bold text-[#173B26]">Google Drive Tip:</span> Simply paste the Google Drive share link (e.g. from Google Drive &gt; Share &gt; Anyone with the link). On the certificates page, it will display as a square card with a PDF emblem, viewable directly inside the page without redirecting, and downloadable with 1 click.
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={certificate.displayOrder ?? 0}
                onChange={(e) => setCertificate({ ...certificate, displayOrder: parseInt(e.target.value) || 0 })}
                className="w-32 px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
              />
              <span className="text-[10px] text-[#68756D] ml-2">Lower numbers appear first</span>
            </div>

            {certificate.pdfUrl && (
              <div className="p-3 rounded-lg bg-[#F5F8F3] border border-[#DCE5DD] flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-xs text-[#173B26] font-mono truncate">
                    {certificate.pdfUrl}
                  </span>
                </div>
                <a
                  href={certificate.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#216B35] hover:underline flex items-center gap-1 shrink-0 ml-3"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
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
              <span>{isEditing ? 'Save Changes' : 'Add Certificate'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

