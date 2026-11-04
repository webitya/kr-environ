import { 
  ShieldAlert, 
  SunMedium, 
  Award, 
  TrendingUp, 
  Radio, 
  CheckCircle2,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    stat: '91% Efficacy',
    title: '91% Field-Proven Deterrence',
    desc: 'Empirically proven to deter large mammals (elephants, wild boars, leopards, deer) and recover up to 60% of crop yield for fringe farmers.'
  },
  {
    icon: CheckCircle2,
    stat: 'Zero Lethality',
    title: 'Strictly Non-Harmful Engineering',
    desc: 'Zero lethal electricity or physical injury. Employs light, bio-acoustic sound, and mild tactile conditioning to condition animals away.'
  },
  {
    icon: SunMedium,
    stat: 'Off-Grid 24/7',
    title: 'Solar-Powered 24/7 Autonomy',
    desc: 'Equipped with rugged LiFePO4 batteries and solar harvesters engineered for dense jungle canopies, extreme monsoons, and high elevations.'
  },
  {
    icon: Award,
    stat: 'National Award',
    title: 'NTCA National Award Winner',
    desc: 'Kyari Innovations won the prestigious National Budding Innovator Award (2018) from the National Tiger Conservation Authority for ANIDERS.'
  },
  {
    icon: Radio,
    stat: 'GSM Cloud Telemetry',
    title: 'GSM Real-Time Cloud Alerts',
    desc: 'Higher-end sensor sentinel units instantly transmit SMS and telephone warnings to forest guard beats the moment an animal approaches.'
  },
  {
    icon: ShieldAlert,
    stat: '21+ States',
    title: 'Trusted by 21+ State Forest Depts',
    desc: 'Over 4,000 units actively safeguarding frontline rangers, tea estates, rail corridors, and fringe communities across India.'
  }
];

export default function HomeWhyChooseUs() {
  return (
    <section className="py-8 lg:py-10 bg-[#F5F8F3] border-b border-[#DCE5DD] w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Heading: Clean "Why Choose Us" (compact spacing, no hr line) */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
            Why Choose Us
          </h2>
        </div>

        {/* Feature Cards Grid - Edge-to-Edge Full Width (3 Columns on Large screens, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white p-6 sm:p-7 rounded-2xl border border-[#DCE5DD] shadow-xs hover:shadow-xl hover:border-[#216B35]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Header: Icon & Stat Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#216B35]/10 text-[#216B35] flex items-center justify-center group-hover:bg-[#216B35] group-hover:text-white transition-all duration-300 shadow-2xs shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold font-manrope text-[#216B35] bg-[#F5F8F3] group-hover:bg-[#216B35]/10 px-3 py-1 rounded-full border border-[#216B35]/20 transition-colors">
                      {item.stat}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-[13px] text-[#4B5563] font-manrope leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Subtle Hover Animated Bottom Line Indicator */}
                <div className="w-full h-1 bg-[#DCE5DD]/40 rounded-full mt-6 overflow-hidden">
                  <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-[#216B35] to-[#174D28] transition-all duration-500 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Credibility Key Stats Banner - Edge-to-Edge Full Width */}
        <div className="mt-10 sm:mt-12 bg-white rounded-2xl border border-[#DCE5DD] p-6 sm:p-8 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#DCE5DD]">
          <div className="p-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope">91%</div>
            <div className="text-xs sm:text-sm text-[#68756D] font-manrope font-medium mt-1">Verified Conflict Deterrence</div>
          </div>
          <div className="p-2 pt-4 md:pt-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#216B35] font-manrope">4,000+</div>
            <div className="text-xs sm:text-sm text-[#68756D] font-manrope font-medium mt-1">Active Field Deployments</div>
          </div>
          <div className="p-2 pt-4 md:pt-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B26] font-manrope">21+</div>
            <div className="text-xs sm:text-sm text-[#68756D] font-manrope font-medium mt-1">State Forest Partnerships</div>
          </div>
          <div className="p-2 pt-4 md:pt-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#216B35] font-manrope">100%</div>
            <div className="text-xs sm:text-sm text-[#68756D] font-manrope font-medium mt-1">Safe &amp; Non-Lethal Tech</div>
          </div>
        </div>
      </div>
    </section>
  );
}
