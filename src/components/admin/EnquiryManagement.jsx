'use client';

import { useState, useMemo } from 'react';
import { 
  Phone, 
  Trash2, 
  Search,
  Check
} from 'lucide-react';

function WhatsAppIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      className={className} 
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.588.704 5.016 1.932 7.108L2 30l7.104-1.872A13.93 13.93 0 0 0 16.002 30C23.722 30 30 23.722 30 16.002 30 8.28 23.722 2 16.002 2zm0 25.592a11.53 11.53 0 0 1-5.885-1.604l-.422-.25-4.372 1.152 1.17-4.262-.275-.436A11.536 11.536 0 0 1 4.408 16c0-6.4 5.202-11.602 11.6-11.602 6.4 0 11.602 5.202 11.602 11.6s-5.202 11.594-11.608 11.594zm6.368-8.682c-.348-.174-2.064-1.02-2.384-1.136-.32-.116-.552-.174-.784.174s-.9 1.136-1.104 1.368c-.204.232-.408.262-.756.088-.348-.174-1.472-.544-2.804-1.732-1.036-.924-1.736-2.068-1.94-2.416-.204-.348-.022-.536.152-.71.156-.156.348-.408.522-.612.174-.204.232-.348.348-.58.116-.232.058-.436-.03-.61-.088-.174-.784-1.89-1.076-2.588-.284-.68-.572-.588-.784-.6l-.67-.012c-.232 0-.61.088-.93.436-.32.348-1.22 1.194-1.22 2.912s1.25 3.378 1.424 3.61c.174.232 2.46 3.756 5.96 5.268.832.36 1.482.576 1.99.738.838.266 1.6.228 2.204.138.674-.1 2.064-.844 2.354-1.66.29-.816.29-1.516.204-1.66-.086-.146-.318-.232-.666-.406z"/>
    </svg>
  );
}

export default function EnquiryManagement({
  enquiries = [],
  onDeleteEnquiry,
  onUpdateEnquiry
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'contacted' | 'junk'
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [savedSuccessId, setSavedSuccessId] = useState(null);

  // Status counts
  const counts = useMemo(() => {
    const res = { all: enquiries.length, pending: 0, contacted: 0, junk: 0 };
    enquiries.forEach((item) => {
      const st = item.status === 'contacted' ? 'contacted' : (item.status === 'junk' ? 'junk' : 'pending');
      res[st]++;
    });
    return res;
  }, [enquiries]);

  // Filtered inquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const st = item.status === 'contacted' ? 'contacted' : (item.status === 'junk' ? 'junk' : 'pending');
      if (activeFilter !== 'all' && st !== activeFilter) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.organization && item.organization.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.service && item.service.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q))
      );
    });
  }, [enquiries, activeFilter, searchQuery]);

  // Clean phone number for WhatsApp
  const getWhatsAppLink = (phoneStr, nameStr, serviceStr) => {
    if (!phoneStr) return '#';
    const digits = phoneStr.replace(/[^0-9]/g, '');
    const targetDigits = digits.length === 10 ? `91${digits}` : digits;
    const msg = encodeURIComponent(
      `Hello ${nameStr || 'Sir/Madam'}, greeting from KR Environ Solutions regarding your inquiry for ${serviceStr || 'our services'}.`
    );
    return `https://wa.me/${targetDigits}?text=${msg}`;
  };

  // Change status
  const handleStatusChange = async (enquiryId, newStatus) => {
    if (!enquiryId) return;
    setUpdatingId(enquiryId);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: enquiryId, status: newStatus })
      });
      if (res.ok) {
        if (onUpdateEnquiry) {
          onUpdateEnquiry(enquiryId, { status: newStatus });
        }
        setSavedSuccessId(enquiryId);
        setTimeout(() => setSavedSuccessId(null), 1500);
      }
    } catch (err) {
      console.error('Failed to update enquiry status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-3 w-full">
      {/* Simple Filter & Search Bar */}
      <div className="bg-white rounded-lg border border-[#DCE5DD] p-2 sm:p-2.5 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#173B26] text-white font-semibold'
                : 'bg-[#F8FAF8] text-[#4B5563] hover:bg-[#EEF3ED] border border-[#DCE5DD]'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeFilter === 'pending'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-[#F8FAF8] text-[#4B5563] hover:bg-amber-50 hover:text-amber-800 border border-[#DCE5DD]'
            }`}
          >
            Pending ({counts.pending})
          </button>
          <button
            onClick={() => setActiveFilter('contacted')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeFilter === 'contacted'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-[#F8FAF8] text-[#4B5563] hover:bg-blue-50 hover:text-blue-800 border border-[#DCE5DD]'
            }`}
          >
            Contacted ({counts.contacted})
          </button>
          <button
            onClick={() => setActiveFilter('junk')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeFilter === 'junk'
                ? 'bg-red-600 text-white font-semibold'
                : 'bg-[#F8FAF8] text-[#4B5563] hover:bg-red-50 hover:text-red-800 border border-[#DCE5DD]'
            }`}
          >
            Junk Lead ({counts.junk})
          </button>
        </div>

        {/* Simple Search */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-[#68756D] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full pl-8 pr-3 py-1 rounded border border-[#DCE5DD] text-xs focus:border-[#216B35] focus:outline-none bg-[#F8FAF8]"
          />
        </div>
      </div>

      {/* Inquiries Cards */}
      {filteredEnquiries.length === 0 ? (
        <div className="bg-white rounded-lg border border-[#DCE5DD] p-8 text-center text-xs text-[#68756D]">
          No inquiries found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredEnquiries.map((enq) => {
            const id = enq._id || enq.id;
            const currentStatus = enq.status === 'contacted' ? 'contacted' : (enq.status === 'junk' ? 'junk' : 'pending');
            const isSaved = savedSuccessId === id;

            return (
              <div
                key={id}
                className="bg-white rounded-lg border border-[#DCE5DD] p-3.5 shadow-xs hover:border-[#CBD8CC] transition-all flex flex-col justify-between space-y-2.5"
              >
                {/* Top: Name, Org, Date, Trash */}
                <div>
                  <div className="flex items-start justify-between gap-2 pb-1.5 border-b border-[#F0F4F0]">
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-[#173B26]">
                        {enq.name}
                      </span>
                      {enq.organization && (
                        <span className="text-xs text-[#68756D] ml-1.5">
                          ({enq.organization})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-[#68756D]">
                        {enq.date || enq.createdAt ? new Date(enq.date || enq.createdAt).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : ''}
                      </span>
                      <button
                        onClick={() => onDeleteEnquiry(id, enq.name)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="pt-2 text-xs text-[#374151] space-y-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
                      <span>
                        <strong>Phone:</strong>{' '}
                        <a href={`tel:${enq.phone}`} className="text-[#216B35] hover:underline font-mono">
                          {enq.phone}
                        </a>
                      </span>
                      <span>
                        <strong>Email:</strong>{' '}
                        <a href={`mailto:${enq.email}`} className="text-[#216B35] hover:underline font-mono">
                          {enq.email}
                        </a>
                      </span>
                    </div>

                    <div className="pt-0.5">
                      <strong>Service:</strong>{' '}
                      <span className="text-[#173B26] font-medium">{enq.service || 'General Inquiry'}</span>
                    </div>

                    {/* Customer Message */}
                    {enq.message && (
                      <div className="mt-1.5 p-2 rounded bg-[#F8FAF8] border border-[#E8EEE8] text-xs text-[#4B5563] leading-relaxed">
                        {enq.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom: Checkbox Status Selector & Quick Actions */}
                <div className="pt-2 border-t border-[#F0F4F0] flex flex-wrap items-center justify-between gap-2">
                  {/* Status Checkbox / Radios */}
                  <div className="flex items-center gap-3 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="radio"
                        name={`status-${id}`}
                        checked={currentStatus === 'pending'}
                        disabled={updatingId === id}
                        onChange={() => handleStatusChange(id, 'pending')}
                        className="w-3.5 h-3.5 accent-amber-600 cursor-pointer"
                      />
                      <span className={currentStatus === 'pending' ? 'text-amber-800 font-bold' : 'text-[#4B5563]'}>
                        Pending
                      </span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="radio"
                        name={`status-${id}`}
                        checked={currentStatus === 'contacted'}
                        disabled={updatingId === id}
                        onChange={() => handleStatusChange(id, 'contacted')}
                        className="w-3.5 h-3.5 accent-[#216B35] cursor-pointer"
                      />
                      <span className={currentStatus === 'contacted' ? 'text-blue-800 font-bold' : 'text-[#4B5563]'}>
                        Contacted
                      </span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="radio"
                        name={`status-${id}`}
                        checked={currentStatus === 'junk'}
                        disabled={updatingId === id}
                        onChange={() => handleStatusChange(id, 'junk')}
                        className="w-3.5 h-3.5 accent-red-600 cursor-pointer"
                      />
                      <span className={currentStatus === 'junk' ? 'text-red-700 font-bold' : 'text-[#4B5563]'}>
                        Junk Lead
                      </span>
                    </label>

                    {isSaved && (
                      <span className="text-[10px] text-emerald-700 flex items-center gap-0.5 font-semibold">
                        <Check className="w-3 h-3" /> Saved
                      </span>
                    )}
                  </div>

                  {/* Quick WhatsApp & Call Buttons */}
                  <div className="flex items-center gap-1.5">
                    <a
                      href={getWhatsAppLink(enq.phone, enq.name, enq.service)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs font-semibold shadow-xs transition-colors"
                      title="Chat on WhatsApp"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-white shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${enq.phone}`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F8FAF8] text-[#173B26] hover:bg-[#EEF3ED] border border-[#DCE5DD] text-xs font-medium transition-colors"
                      title="Call directly"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#216B35]" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
