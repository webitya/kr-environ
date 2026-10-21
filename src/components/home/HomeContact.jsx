'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeContact({ showHeading = true }) {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    service: 'ANIDERS (Smart Scarecrow)',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to submit enquiry');

      setStatus({ loading: false, success: true, error: null });
      setFormData({
        name: '',
        organization: '',
        email: '',
        phone: '',
        service: 'ANIDERS (Smart Scarecrow)',
        message: ''
      });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Something went wrong' });
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        {showHeading && (
          <SectionHeading
            title="Connect with Our Conservation Technology Specialists"
            subtitle="Reach out for on-site field surveys, equipment demonstrations, or departmental procurement enquiries."
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contact Cards & Liaison Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F5F8F3] p-5 sm:p-6 rounded-2xl border border-[#DCE5DD]">
              <h2 className="text-lg sm:text-xl font-bold text-[#173B26]">
                Registered & Branch Offices
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Connect with our team for Environmental & Forest Clearances, GIS Drone Surveys, and Wildlife Deterrent installations.
              </p>

              <div className="mt-6 space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#216B35]/10 text-[#216B35] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#173B26] block text-xs uppercase tracking-wide">Registered Office:</strong>
                    <span className="text-[#4B5563]">
                      806, Hariom Nand Tower, Argora-Kathal More Road, Ranchi, Jharkhand
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#216B35]/10 text-[#216B35] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#173B26] block text-xs uppercase tracking-wide">Branch Office (B.O.):</strong>
                    <span className="text-[#4B5563]">
                      H. No.4, Mansarovar Colony, Bhola Nagar, In Front of Dayal Petrol Pump, Kathal More, Ranchi
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#216B35]/10 text-[#216B35] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#173B26] block text-xs uppercase tracking-wide">Contact Numbers:</strong>
                    <span className="text-[#4B5563] block font-medium">+91 8317054180, +91 9155796749</span>
                    <span className="text-[#68756D] text-xs">Landline: 0651-4051577</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#216B35]/10 text-[#216B35] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#173B26] block text-xs uppercase tracking-wide">Official Email:</strong>
                    <span className="text-[#4B5563] font-medium">kr.environ.2026@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Credential Note from brochure */}
            <div className="p-4 sm:p-5 rounded-2xl border border-[#DCE5DD] bg-white shadow-xs">
              <span className="text-xs font-bold text-[#216B35] uppercase tracking-wider">
                Expert Leadership
              </span>
              <h4 className="text-base font-bold text-[#173B26] mt-1">
                S. Gupta, Proprietor & Environmentalist
              </h4>
              <p className="text-xs text-[#68756D] mt-0.5 leading-relaxed">
                MSc (Environmental Science, Lucknow Univ) &bull; MSc (Geoinformatics) &bull; 15+ years experience as an Environmental Analyst.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-[#DCE5DD] shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-[#173B26] mb-1.5">
              Request an Equipment Demonstration or Site Audit
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mb-4">
              Fill in your details below and our technical liaison will respond within 24 hours.
            </p>

            {status.success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-sm font-poppins">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your enquiry has been recorded. Our team will contact you shortly.</span>
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-3 text-sm font-poppins">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-poppins text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#173B26] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5DD] focus:outline-none focus:ring-2 focus:ring-[#216B35] font-lato text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173B26] mb-1">
                    Department / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. DFO Ranchi / Agri Cooperative"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5DD] focus:outline-none focus:ring-2 focus:ring-[#216B35] font-lato text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#173B26] mb-1">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.gov.in"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5DD] focus:outline-none focus:ring-2 focus:ring-[#216B35] font-lato text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173B26] mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5DD] focus:outline-none focus:ring-2 focus:ring-[#216B35] font-lato text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#173B26] mb-1">
                  Primary Technology / Service Requirement
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5DD] focus:outline-none focus:ring-2 focus:ring-[#216B35] font-lato text-sm bg-white"
                >
                  <option value="ANIDERS (Smart Scarecrow)">ANIDERS (Bio-Acoustic Smart Scarecrow)</option>
                  <option value="Re-Pulse Mat (Shock Deterrent)">Re-Pulse Mat (Non-injurious Electric Mat)</option>
                  <option value="KyNet Net Gun (Animal Capture)">KyNet Net Gun (Handheld Wildlife Launcher)</option>
                  <option value="Smart Stick Guardian (Forester)">Smart Stick Guardian / Forester Baton</option>
                  <option value="Tactical Stun Batons">Tactical Stun Batons (2ft / 4ft)</option>
                  <option value="Site Survey & Ranger Training">Site Survey & Ranger Training Workshop</option>
                  <option value="Wasteland Development Consulting">Wasteland Development & Afforestation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#173B26] mb-1">
                  Project Details / Division Needs
                </label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your corridor vulnerability, terrain conditions, or number of units needed..."
                  className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5DD] focus:outline-none focus:ring-2 focus:ring-[#216B35] font-lato text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="btn-primary w-full sm:w-auto"
              >
                <Send className="w-4 h-4" />
                <span>{status.loading ? 'Submitting Enquiry...' : 'Submit Official Enquiry'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
