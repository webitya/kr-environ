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
    <section className="py-12 lg:py-16 bg-[#F5F8F3] border-b border-[#DCE5DD]">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        {/* Section Heading: Clean "Why Choose Us" */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173B26] font-manrope tracking-tight leading-tight">
            Why Choose Us
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] font-lato leading-relaxed">
            Combining breakthrough indigenous research with relentless on-the-ground support across India&apos;s most challenging terrains.
          </p>
          <div className="mt-3.5 flex justify-center">
            <div className="h-0.5 w-14 bg-gradient-to-r from-[#216B35] to-[#174D28] rounded-full" />
          </div>
        </div>

        {/* Feature Cards Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white p-5 sm:p-6 rounded-2xl border border-[#DCE5DD] shadow-xs hover:shadow-xl hover:border-[#216B35]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Header: Icon & Stat Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#216B35]/10 text-[#216B35] flex items-center justify-center group-hover:bg-[#216B35] group-hover:text-white transition-all duration-300 shadow-2xs shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold font-mono text-[#216B35] bg-[#F5F8F3] group-hover:bg-[#216B35]/10 px-2.5 py-1 rounded-full border border-[#216B35]/20 transition-colors">
                      {item.stat}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold font-manrope text-[#173B26] group-hover:text-[#216B35] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-[#4B5563] font-lato leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Subtle Hover Animated Bottom Line Indicator */}
                <div className="w-full h-1 bg-[#DCE5DD]/40 rounded-full mt-5 overflow-hidden">
                  <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-[#216B35] to-[#174D28] transition-all duration-500 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Credibility Key Stats Banner */}
        <div className="mt-10 sm:mt-12 bg-white rounded-2xl border border-[#DCE5DD] p-5 sm:p-6 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-[#DCE5DD]">
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#173B26] font-manrope">91%</div>
            <div className="text-xs text-[#68756D] font-medium mt-0.5">Verified Conflict Deterrence</div>
          </div>
          <div className="p-2 pt-4 md:pt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#216B35] font-manrope">4,000+</div>
            <div className="text-xs text-[#68756D] font-medium mt-0.5">Active Field Deployments</div>
          </div>
          <div className="p-2 pt-4 md:pt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#173B26] font-manrope">21+</div>
            <div className="text-xs text-[#68756D] font-medium mt-0.5">State Forest Partnerships</div>
          </div>
          <div className="p-2 pt-4 md:pt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#216B35] font-manrope">100%</div>
            <div className="text-xs text-[#68756D] font-medium mt-0.5">Safe &amp; Non-Lethal Tech</div>
          </div>
        </div>
      </div>
    </section>
  );
}
