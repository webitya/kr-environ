'use client';

import { useState, useMemo } from 'react';
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Clock,
  IndianRupee,
  Calendar,
  Search,
  CheckCircle2,
  X,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function CareersClient({ initialCareers = [] }) {
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [applyingCareer, setApplyingCareer] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ status: '', message: '' });

  const [form, setForm] = useState({
    applicantName: '',
    email: '',
    phone: '',
    collegeOrUniversity: '',
    qualification: '',
    passingYear: '',
    city: '',
    experienceSummary: '',
    coverNote: ''
  });

  const types = useMemo(() => {
    const present = Array.from(new Set(initialCareers.map((c) => c.employmentType).filter(Boolean)));
    return ['All', ...present];
  }, [initialCareers]);

  const filteredCareers = useMemo(() => {
    return initialCareers.filter((item) => {
      const matchesType = selectedType === 'All' || item.employmentType === selectedType;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.department?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q) ||
        item.qualification?.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [initialCareers, selectedType, searchQuery]);

  const openApplyModal = (career) => {
    setApplyingCareer(career);
    setSubmitState({ status: '', message: '' });
    setForm({
      applicantName: '',
      email: '',
      phone: '',
      collegeOrUniversity: '',
      qualification: '',
      passingYear: '',
      city: '',
      experienceSummary: '',
      coverNote: ''
    });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!applyingCareer) return;

    setSubmitting(true);
    setSubmitState({ status: '', message: '' });

    try {
      const res = await fetch('/api/career-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerId: applyingCareer.id || applyingCareer._id || '',
          careerTitle: applyingCareer.title,
          department: applyingCareer.department || '',
          ...form
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitState({
        status: 'success',
        message: `Application submitted for ${applyingCareer.title}. Our recruitment team will review your profile.`
      });
    } catch (err) {
      setSubmitState({
        status: 'error',
        message: err.message || 'Unable to submit right now. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter & Search Bar (only shown when openings exist) */}
      {initialCareers.length > 0 && (
        <div className="bg-white rounded-md border border-[#DCE5DD] p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {types.map((t) => {
              const active = selectedType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold font-manrope transition-colors ${
                    active
                      ? 'bg-[#216B35] text-white'
                      : 'bg-[#F5F8F3] text-[#4B5563] hover:text-[#173B26] border border-[#DCE5DD]'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#68756D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search role, city or qualification..."
              className="w-full pl-9 pr-3 py-1.5 rounded border border-[#DCE5DD] bg-[#F5F8F3]/60 focus:bg-white focus:border-[#216B35] focus:outline-none text-xs font-manrope text-[#173B26]"
            />
          </div>
        </div>
      )}

      {/* Openings Grid / Empty State */}
      {initialCareers.length === 0 ? (
        <div className="bg-white rounded-md border border-[#DCE5DD] p-8 sm:p-10 text-center space-y-3">
          <div className="w-11 h-11 rounded bg-[#F5F8F3] border border-[#DCE5DD] text-[#216B35] flex items-center justify-center mx-auto">
            <Briefcase className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#173B26] font-manrope">
            No Open Positions Right Now
          </h2>
          <p className="text-xs sm:text-sm text-[#68756D] font-manrope max-w-md mx-auto leading-relaxed">
            Students and environmental professionals can still submit their profile for upcoming internships and field roles.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() =>
                openApplyModal({
                  id: 'general',
                  title: 'General / Internship Application',
                  department: 'Environmental & Forestry',
                  employmentType: 'Internship',
                  location: 'Ranchi / Lucknow'
                })
              }
              className="btn-primary text-xs px-4 py-2 rounded inline-flex items-center gap-1.5 font-manrope"
            >
              <span>Submit General Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : filteredCareers.length === 0 ? (
        <div className="bg-white rounded-md border border-[#DCE5DD] p-8 text-center text-xs text-[#68756D] font-manrope">
          No positions match your search or filter. Try clearing the filter to view all {initialCareers.length} openings.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCareers.map((job) => {
            const id = job.id || job._id;
            return (
              <div
                key={id}
                className="bg-white rounded-md border border-[#DCE5DD] hover:border-[#216B35]/60 p-5 flex flex-col justify-between gap-4 transition-colors shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#216B35] bg-[#F5F8F3] px-2 py-0.5 rounded border border-[#DCE5DD] font-manrope">
                        {job.department || 'Environmental & Forestry'}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-[#173B26] font-manrope leading-snug">
                        {job.title}
                      </h2>
                    </div>

                    <span className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded bg-[#173B26] text-white font-manrope">
                      {job.employmentType || 'Full-Time'}
                    </span>
                  </div>

                  {/* Metadata Badges */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#4B5563] font-manrope pt-1 border-t border-[#DCE5DD]/60">
                    {job.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#216B35] shrink-0" />
                        <span>{job.location}</span>
                      </span>
                    )}
                    {job.experience && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#216B35] shrink-0" />
                        <span>{job.experience}</span>
                      </span>
                    )}
                    {job.stipendOrSalary && (
                      <span className="inline-flex items-center gap-1.5">
                        <IndianRupee className="w-3.5 h-3.5 text-[#216B35] shrink-0" />
                        <span>{job.stipendOrSalary}</span>
                      </span>
                    )}
                    {job.deadline && (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#216B35] shrink-0" />
                        <span>Apply by: {job.deadline}</span>
                      </span>
                    )}
                  </div>

                  {job.qualification && (
                    <div className="flex items-start gap-2 text-xs text-[#173B26] bg-[#F5F8F3] px-3 py-2 rounded border border-[#DCE5DD] font-manrope">
                      <GraduationCap className="w-4 h-4 text-[#216B35] shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold">Qualification:</strong> {job.qualification}
                      </span>
                    </div>
                  )}

                  {job.summary && (
                    <p className="text-xs sm:text-[13px] text-[#4B5563] font-manrope leading-relaxed">
                      {job.summary}
                    </p>
                  )}

                  {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
                    <ul className="space-y-1 text-xs text-[#4B5563] font-manrope">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-sm bg-[#216B35] mt-1.5 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-3 border-t border-[#DCE5DD]/60 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => openApplyModal(job)}
                    className="btn-primary text-xs px-4 py-2 rounded inline-flex items-center gap-1.5 font-manrope"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Application Modal */}
      {applyingCareer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-md max-w-xl w-full p-4 sm:p-5 shadow-xl border border-[#DCE5DD] my-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 pb-3 mb-4 border-b border-[#DCE5DD]">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#216B35] font-manrope">
                  {applyingCareer.employmentType || 'Position'} {applyingCareer.location ? `• ${applyingCareer.location}` : ''}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#173B26] font-manrope leading-snug">
                  Apply: {applyingCareer.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setApplyingCareer(null)}
                className="p-1 rounded text-[#68756D] hover:text-[#173B26] hover:bg-[#F5F8F3]"
                aria-label="Close application form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitState.status === 'success' ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-11 h-11 rounded bg-emerald-50 border border-emerald-200 text-[#216B35] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#173B26] font-manrope">
                  Application Received
                </h4>
                <p className="text-xs sm:text-sm text-[#4B5563] font-manrope max-w-md mx-auto">
                  {submitState.message}
                </p>
                <button
                  type="button"
                  onClick={() => setApplyingCareer(null)}
                  className="btn-primary text-xs px-5 py-2 rounded font-manrope mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-3 text-xs font-manrope">
                {submitState.status === 'error' && (
                  <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitState.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#173B26] mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.applicantName}
                      onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full p-2 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#173B26] mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full p-2 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#173B26] mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98XXXXXXXX"
                      className="w-full p-2 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#173B26] mb-1">
                      Current City
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="e.g. Ranchi / Lucknow"
                      className="w-full p-2 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-[#173B26] mb-1">
                      College / University
                    </label>
                    <input
                      type="text"
                      value={form.collegeOrUniversity}
                      onChange={(e) => setForm({ ...form, collegeOrUniversity: e.target.value })}
                      placeholder="e.g. Ranchi University / FRI Dehradun"
                      className="w-full p-2 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#173B26] mb-1">
                      Passing Year
                    </label>
                    <input
                      type="text"
                      value={form.passingYear}
                      onChange={(e) => setForm({ ...form, passingYear: e.target.value })}
                      placeholder="e.g. 2026"
                      className="w-full p-2 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#173B26] mb-1">
                      Degree / Qualification
                    </label>
                    <input
                      type="text"
                      value={form.qualification}
                      onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                      placeholder="e.g. M.Sc Environmental Science"
                      className="w-full p-2 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#173B26] mb-1">
                      Experience / Skills
                    </label>
                    <input
                      type="text"
                      value={form.experienceSummary}
                      onChange={(e) => setForm({ ...form, experienceSummary: e.target.value })}
                      placeholder="e.g. Fresher / QGIS, EIA, Field Survey"
                      className="w-full p-2 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#173B26] mb-1">
                    Brief Statement / Why You Are Interested
                  </label>
                  <textarea
                    rows={3}
                    value={form.coverNote}
                    onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                    placeholder="Share your academic background, fieldwork interest, or availability..."
                    className="w-full p-2 rounded border border-[#DCE5DD] focus:border-[#216B35] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#DCE5DD]">
                  <button
                    type="button"
                    onClick={() => setApplyingCareer(null)}
                    className="px-3.5 py-2 rounded border border-[#DCE5DD] text-[#4B5563] hover:bg-[#F5F8F3]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary px-5 py-2 rounded font-semibold disabled:opacity-60"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

