'use client';

import { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Download, 
  X, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

// Helper to convert any Google Drive or direct link to embed preview & direct download URLs
export function parsePdfLink(url = '') {
  if (!url) return { isGoogleDrive: false, viewUrl: '', downloadUrl: '' };

  const trimmed = url.trim();

  // Match Google Drive file ID
  const driveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
                     trimmed.match(/id=([a-zA-Z0-9_-]+)/) ||
                     trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    return {
      isGoogleDrive: true,
      fileId,
      // Official Google Drive embed viewer (no top chrome, clean in-page iframe preview)
      viewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      // Direct file attachment download (triggers immediate save without opening Google Drive page)
      downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`
    };
  }

  // Fallback for direct PDF or image URLs
  return {
    isGoogleDrive: false,
    viewUrl: trimmed,
    downloadUrl: trimmed
  };
}

export default function CertificatesClient({ certificates = [] }) {
  const [activePdfModal, setActivePdfModal] = useState(null);

  const handleDirectDownload = (cert) => {
    const link = cert.pdfUrl || cert.pdfLink || cert.imageUrl || '';
    const { downloadUrl } = parsePdfLink(link);
    if (!downloadUrl) return;

    // Trigger instant browser download without route change or redirecting the user
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${cert.title || 'Certificate'}.pdf`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full">
      {certificates.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#DCE5DD] shadow-xs space-y-3">
          <FileText className="w-12 h-12 text-[#68756D] mx-auto opacity-40" />
          <h4 className="text-base font-bold text-[#173B26]">No Certificates Found</h4>
          <p className="text-xs text-[#68756D] max-w-sm mx-auto">
            Certificates and statutory PDF documents can be added from the admin portal.
          </p>
        </div>
      ) : (
        /* Square-proportioned modern certificate cards grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {certificates.map((cert) => {
            const rawUrl = cert.pdfUrl || cert.pdfLink || cert.imageUrl || '';
            const { viewUrl } = parsePdfLink(rawUrl);

            return (
              <div
                key={cert.id || cert._id || cert.title}
                className="group bg-white rounded-2xl border border-[#DCE5DD] p-5 shadow-xs hover:shadow-lg hover:border-[#216B35]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center text-center aspect-square"
              >
                {/* Center Content: PDF Emblem & Document Title */}
                <div className="w-full flex-1 flex flex-col items-center justify-center space-y-3">
                  
                  {/* Distinctive PDF Emblem Icon */}
                  <div 
                    onClick={() => setActivePdfModal({ ...cert, viewUrl })}
                    className="cursor-pointer relative w-20 h-24 rounded-xl bg-gradient-to-br from-red-50 to-red-100/70 border border-red-200/80 shadow-xs flex flex-col items-center justify-between p-2 group-hover:scale-105 group-hover:shadow-md transition-all duration-300"
                  >
                    {/* Top Page Fold Simulation */}
                    <div className="w-full flex justify-between items-center pt-0.5">
                      <div className="w-3 h-0.5 bg-red-300 rounded-full" />
                      <div className="w-4 h-4 bg-red-200/70 rounded-tr-lg border-b border-l border-red-300/60" />
                    </div>

                    {/* Central PDF Icon */}
                    <FileText className="w-8 h-8 text-red-600" />

                    {/* Bold PDF Badge Pill */}
                    <span className="text-[10px] font-extrabold tracking-widest uppercase bg-red-600 text-white px-2 py-0.5 rounded shadow-xs">
                      PDF
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <div className="w-full px-1">
                    <h3 
                      onClick={() => setActivePdfModal({ ...cert, viewUrl })}
                      className="text-xs sm:text-sm font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug line-clamp-3 cursor-pointer"
                      title={cert.title}
                    >
                      {cert.title}
                    </h3>
                  </div>
                </div>

                {/* Bottom Actions: View PDF & Download PDF Buttons */}
                <div className="w-full pt-3 border-t border-[#DCE5DD]/60 grid grid-cols-2 gap-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => setActivePdfModal({ ...cert, viewUrl })}
                    className="w-full py-1.5 px-2 rounded-lg text-xs font-semibold text-[#173B26] bg-white border border-[#DCE5DD] hover:bg-[#F5F8F3] hover:border-[#216B35] transition-colors flex items-center justify-center gap-1 shadow-xs"
                    title="View PDF directly in page"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#216B35]" />
                    <span>View PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDirectDownload(cert)}
                    className="w-full py-1.5 px-2 rounded-lg text-xs font-semibold text-white bg-[#216B35] hover:bg-[#174D28] transition-colors flex items-center justify-center gap-1 shadow-xs"
                    title="Direct PDF download without redirect"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* In-Page PDF Viewer Modal (Zero Redirects, Zero Route Change) */}
      {activePdfModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setActivePdfModal(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-5xl h-[92vh] max-h-[95vh] border border-[#DCE5DD] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#F5F8F3] px-4 sm:px-6 py-3 border-b border-[#DCE5DD] flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="text-[10px] font-extrabold uppercase bg-red-600 text-white px-2 py-0.5 rounded shadow-xs shrink-0">
                  PDF
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#173B26] font-manrope truncate" title={activePdfModal.title}>
                  {activePdfModal.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Instant Download Button Inside Modal */}
                <button
                  type="button"
                  onClick={() => handleDirectDownload(activePdfModal)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#216B35] hover:bg-[#174D28] transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Direct Download</span>
                </button>

                {/* Close Modal Button */}
                <button
                  type="button"
                  onClick={() => setActivePdfModal(null)}
                  className="p-1.5 rounded-lg text-[#68756D] hover:text-[#173B26] hover:bg-white border border-transparent hover:border-[#DCE5DD] transition-colors"
                  title="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded PDF Iframe */}
            <div className="flex-1 w-full bg-slate-900 relative overflow-hidden">
              {activePdfModal.viewUrl ? (
                <iframe
                  src={activePdfModal.viewUrl}
                  title={activePdfModal.title}
                  className="w-full h-full border-0"
                  allow="autoplay"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white space-y-2">
                  <FileText className="w-12 h-12 text-slate-500 mx-auto" />
                  <p className="text-sm font-semibold">No direct PDF preview available for this document.</p>
                  <button
                    onClick={() => handleDirectDownload(activePdfModal)}
                    className="btn-primary text-xs mt-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File Directly</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
