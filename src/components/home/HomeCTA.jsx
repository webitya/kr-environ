import Link from 'next/link';
import { PhoneCall, FileText, ShieldCheck } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#173B26] via-[#216B35] to-[#142D20] text-white py-12 lg:py-14">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#216B35]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#216B35]/25 blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10 text-center">
        <p className="text-xs uppercase tracking-wider font-semibold text-emerald-300 mb-2.5">
          Transforming Human-Wildlife Coexistence Across India
        </p>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-montserrat tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Ready to Deploy Field-Proven Wildlife Technology in Your Division?
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#E4EEE6]/90 font-lato max-w-2xl mx-auto leading-relaxed">
          Whether you are a state forest officer, reserve warden, or agricultural cooperative leader, KR Environ Solutions provides turnkey surveys, equipment trials, and ranger capacity training.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact-us"
            className="btn-accent"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Request an Official Consultation</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border-1.5 border-white/40 text-white hover:bg-white/10 text-sm font-semibold font-poppins transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Download Solutions Catalog</span>
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#E4EEE6]/70 font-poppins">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
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
