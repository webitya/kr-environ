'use client';

import React from 'react';
import {
  ArrowLeft,
  Save,
  Users,
  Upload
} from 'lucide-react';

export default function TeamEditor({
  member,
  setMember,
  onSave,
  onCancel,
  onUploadImage,
  uploadingImage = false
}) {
  const isEditing = Boolean(member?.id || member?._id);

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
            <span>Back to Team</span>
          </button>
          <div className="h-5 w-px bg-[#DCE5DD] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#216B35]/10 text-[#216B35]">
              <Users className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm sm:text-base text-[#173B26] truncate max-w-xs sm:max-w-md">
              {isEditing ? `Edit: ${member.name || 'Untitled'}` : 'Add New Team Member'}
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
            form="team-editor-form"
            className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Save Member'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
        <form id="team-editor-form" onSubmit={onSave} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column (8 cols): Name, Role, Education, Bio, Highlights */}
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={member.name || ''}
                      onChange={(e) => setMember({ ...member, name: e.target.value })}
                      placeholder="e.g. Sarika Gupta"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-sm font-semibold text-[#173B26] focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                      Top Badge / Category Tag
                    </label>
                    <input
                      type="text"
                      value={member.designation || ''}
                      onChange={(e) => setMember({ ...member, designation: e.target.value })}
                      placeholder="e.g. PROPRIETOR & FOUNDER"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs font-medium focus:border-[#216B35] focus:outline-none uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                      Role / Subtitle
                    </label>
                    <input
                      type="text"
                      value={member.role || ''}
                      onChange={(e) => setMember({ ...member, role: e.target.value })}
                      placeholder="e.g. Lead Environmental Analyst"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={member.displayOrder ?? 0}
                      onChange={(e) => {
                        const parsed = parseInt(e.target.value, 10);
                        setMember({ ...member, displayOrder: Number.isNaN(parsed) ? 0 : parsed });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                      Education &amp; Qualifications
                    </label>
                    <input
                      type="text"
                      value={member.education || ''}
                      onChange={(e) => setMember({ ...member, education: e.target.value })}
                      placeholder="e.g. MSc Environmental Science, Lucknow University"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                      Experience
                    </label>
                    <input
                      type="text"
                      value={member.experience || ''}
                      onChange={(e) => setMember({ ...member, experience: e.target.value })}
                      placeholder="e.g. 15+ years experience as an Environmental Analyst"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Profile Summary / Bio
                  </label>
                  <textarea
                    rows={4}
                    value={member.bio || ''}
                    onChange={(e) => setMember({ ...member, bio: e.target.value })}
                    placeholder="Brief background and career impact..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs sm:text-sm text-[#4B5563] focus:border-[#216B35] focus:outline-none resize-y"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                    Highlights / Key Responsibilities (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={member.highlights || ''}
                    onChange={(e) => setMember({ ...member, highlights: e.target.value })}
                    placeholder="Directs Environmental Clearance (EC) workflows&#10;Leads high-precision GIS & Drone mapping surveys&#10;Coordinates with State Forest Departments..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs sm:text-sm text-[#4B5563] focus:border-[#216B35] focus:outline-none resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Profile Photo */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-3">
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider">
                  Profile Photo (Top Card Frame)
                </label>

                <div className="space-y-3">
                  <label className="w-full inline-flex items-center justify-center gap-2 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                    {uploadingImage ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</span>
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
                    value={member.photoUrl || ''}
                    onChange={(e) => setMember({ ...member, photoUrl: e.target.value })}
                    placeholder="Upload photo or paste Cloudinary image URL"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] font-mono text-xs focus:border-[#216B35] focus:outline-none"
                  />

                  {member.photoUrl ? (
                    <div className="rounded-xl overflow-hidden border border-[#DCE5DD] bg-[#F5F8F3] aspect-[4/3] w-full">
                      <img
                        src={member.photoUrl}
                        alt={member.name || 'Profile'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#DCE5DD] bg-[#F5F8F3] aspect-[4/3] w-full flex flex-col items-center justify-center text-[#68756D] text-xs">
                      <Users className="w-8 h-8 opacity-40 mb-1" />
                      <span>No photo uploaded</span>
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
              <span>{isEditing ? 'Save Changes' : 'Add Team Member'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

