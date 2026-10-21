import { 
  ShieldAlert, 
  SunMedium, 
  Award, 
  TrendingUp, 
  Radio, 
  CheckCircle2 
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const features = [
  {
    icon: TrendingUp,
    color: 'text-[#216B35]',
    bg: 'bg-[#216B35]/10',
    title: '91% Field-Proven Deterrence',
    desc: 'Empirically proven to deter large mammals (elephants, wild boars, leopards, deer) and recover up to 60% of crop yield for fringe farmers.'
  },
  {
    icon: CheckCircle2,
    color: 'text-[#216B35]',
    bg: 'bg-[#216B35]/10',
    title: 'Strictly Non-Harmful Engineering',
    desc: 'Zero lethal electricity or physical injury. Employs light, bio-acoustic sound, and mild tactile conditioning to condition animals away.'
  },
  {
    icon: SunMedium,
    color: 'text-[#174D28]',
    bg: 'bg-[#174D28]/10',
    title: 'Solar-Powered 24/7 Autonomy',
    desc: 'Equipped with rugged LiFePO4 batteries and solar harvesters engineered for dense jungle canopies, extreme monsoons, and high elevations.'
  },
  {
    icon: Award,
    color: 'text-[#216B35]',
    bg: 'bg-[#216B35]/10',
    title: 'NTCA National Award Winner',
    desc: 'Kyari Innovations won the prestigious National Budding Innovator Award (2018) from the National Tiger Conservation Authority for ANIDERS.'
  },
  {
    icon: Radio,
    color: 'text-[#216B35]',
    bg: 'bg-[#216B35]/10',
    title: 'GSM Real-Time Cloud Alerts',
    desc: 'Higher-end sensor sentinel units instantly transmit SMS and telephone warnings to forest guard beats the moment an animal approaches.'
  },
  {
    icon: ShieldAlert,
    color: 'text-[#173B26]',
    bg: 'bg-[#173B26]/10',
    title: 'Trusted by 21+ State Forest Depts',
    desc: 'Over 4,000 units actively safeguarding frontline rangers, tea estates, rail corridors, and fringe communities across India.'
  }
];

export default function HomeWhyChooseUs() {
  return (
    <section className="py-12 lg:py-14 bg-[#F5F8F3] border-b border-[#DCE5DD]">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <SectionHeading
          title="Why Forest Departments & Agri-Holdings Choose KR Environ"
          subtitle="Combining breakthrough indigenous research with relentless on-the-ground support across India's most challenging terrains."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DCE5DD] shadow-xs hover:border-[#216B35]/40 transition-all card-hover"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-manrope text-[#173B26]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] font-lato leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
