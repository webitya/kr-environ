import Link from 'next/link';
import { PhoneCall, FileText, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#173B26] via-[#216B35] to-[#142D20] text-white py-20">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#F2BE36]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#087EA4]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-poppins text-[#F2BE36] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transforming Human-Wildlife Coexistence Across India</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Ready to Deploy Field-Proven Wildlife Technology in Your Division?
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#E4EEE6]/90 font-lato max-w-2xl mx-auto leading-relaxed">
          Whether you are a state forest officer, reserve warden, or agricultural cooperative leader, KR Environ Solutions provides turnkey surveys, equipment trials, and ranger capacity training.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact-us"
            className="btn-accent text-base"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Request an Official Consultation</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-1.5 border-white/40 text-white hover:bg-white/10 text-base font-semibold font-poppins transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Download Solutions Catalog</span>
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#E4EEE6]/70 font-poppins">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#F2BE36]" />
            Official Government Vendor Support
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">
            Direct Coordination with Van Bhawan, Ranchi
          </span>
        </div>
      </div>
    </section>
  );
}
