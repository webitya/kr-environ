'use client';

import React from 'react';
import {
  ArrowLeft,
  Save,
  Briefcase
} from 'lucide-react';

export default function CareerEditor({
  career,
  setCareer,
  onSave,
  onCancel
}) {
  const isEditing = Boolean(career?.id || career?._id);

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
            <span>Back to Careers</span>
          </button>
          <div className="h-5 w-px bg-[#DCE5DD] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#216B35]/10 text-[#216B35]">
              <Briefcase className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm sm:text-base text-[#173B26] truncate max-w-xs sm:max-w-md">
              {isEditing ? `Edit: ${career.title || 'Untitled'}` : 'Post New Career / Internship Opening'}
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
            form="career-editor-form"
            className="inline-flex items-center gap-1.5 bg-[#216B35] hover:bg-[#174D28] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Save Opening'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
        <form id="career-editor-form" onSubmit={onSave} className="space-y-5">
          <div className="bg-white rounded-xl border border-[#DCE5DD] p-5 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Role / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={career.title || ''}
                  onChange={(e) => setCareer({ ...career, title: e.target.value })}
                  placeholder="e.g. GIS & Drone Mapping Intern"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-sm font-semibold text-[#173B26] focus:border-[#216B35] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Employment Type
                </label>
                <select
                  value={career.employmentType || 'Full-Time'}
                  onChange={(e) => setCareer({ ...career, employmentType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs bg-white focus:border-[#216B35] focus:outline-none"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <input
                  type="text"
                  value={career.department || ''}
                  onChange={(e) => setCareer({ ...career, department: e.target.value })}
                  placeholder="Environmental & GIS"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={career.location || ''}
                  onChange={(e) => setCareer({ ...career, location: e.target.value })}
                  placeholder="Ranchi / Lucknow"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Experience Level
                </label>
                <input
                  type="text"
                  value={career.experienceLevel || ''}
                  onChange={(e) => setCareer({ ...career, experienceLevel: e.target.value })}
                  placeholder="Freshers / 0-2 yrs"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Positions Available
                </label>
                <input
                  type="number"
                  min="1"
                  value={career.openingsCount ?? 1}
                  onChange={(e) => setCareer({ ...career, openingsCount: parseInt(e.target.value, 10) || 1 })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={career.deadline || ''}
                  onChange={(e) => setCareer({ ...career, deadline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select
                  value={career.status || 'Active'}
                  onChange={(e) => setCareer({ ...career, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs bg-white focus:border-[#216B35] focus:outline-none"
                >
                  <option value="Active">Active (Accepting Applications)</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Short Summary
              </label>
              <textarea
                rows={2}
                value={career.shortSummary || ''}
                onChange={(e) => setCareer({ ...career, shortSummary: e.target.value })}
                placeholder="Brief snapshot of the position shown in card previews..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs sm:text-sm text-[#4B5563] focus:border-[#216B35] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Key Responsibilities (One per line)
              </label>
              <textarea
                rows={4}
                value={career.responsibilities || ''}
                onChange={(e) => setCareer({ ...career, responsibilities: e.target.value })}
                placeholder="Conduct DGPS and drone topographical surveys&#10;Prepare KML and GIS shapefiles for forest clearances&#10;Liaise with forest division technical officers..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs sm:text-sm text-[#4B5563] focus:border-[#216B35] focus:outline-none resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B26] uppercase tracking-wider mb-1.5">
                Qualifications &amp; Requirements (One per line)
              </label>
              <textarea
                rows={4}
                value={career.requirements || ''}
                onChange={(e) => setCareer({ ...career, requirements: e.target.value })}
                placeholder="B.Tech/MSc in Forestry, Environmental Science or Geoinformatics&#10;Working knowledge of ArcGIS, QGIS or AutoCAD&#10;Willingness to travel for field surveys..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5DD] text-xs sm:text-sm text-[#4B5563] focus:border-[#216B35] focus:outline-none resize-y"
              />
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
              <span>{isEditing ? 'Save Changes' : 'Post Opening'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

