import React from 'react';
import permanentSecretaryPhoto from '@/assets/permanent-secretary.jpg.asset.json';
import commissionerPhoto from '@/assets/commissioner.jpg.asset.json';
import governorPhoto from '@/assets/kano-state-governor.jpg.asset.json';

const leaders = [
  {
    role: 'His Excellency, The Executive Governor',
    name: 'Engr. Abba Kabir Yusuf',
    photo: governorPhoto.url,
    quote:
      "My administration is committed to a Kano where every citizen has access to clean water, where our environment is protected for generations to come, and where climate change is not a threat but a challenge we meet with innovation, unity and action. This Ministry is the engine of that promise — and together, we will deliver it.",
    ring: 'ring-kano-accent/40',
    text: 'text-kano-accent',
  },
  {
    role: "Hon. Commissioner",
    name: 'Dr. Dahiru Muhammad Hashim',
    photo: commissionerPhoto.url,
    quote:
      "Since inauguration we have embarked on a 'Rescue Mission' to reverse decades of environmental neglect — from revitalising our Pollution Control Laboratory to launching community‑led clean‑up drives. Every initiative is driven by one goal: a healthier, greener Kano. I invite residents, businesses and partners to join hands with the Ministry.",
    ring: 'ring-kano-accent/40',
    text: 'text-kano-accent',
  },
  {
    role: 'Permanent Secretary',
    name: 'Engr ABDULRAZAK HARUNA (FNSE, FNICE)',
    photo: permanentSecretaryPhoto.url,
    quote:
      'As the administrative and technical head of the Ministry, my responsibility is to translate policy into execution — ensuring that every programme in water resources, environmental protection and climate action is delivered with discipline, transparency and measurable impact for the people of Kano State.',
    ring: 'ring-kano-primary/50',
    text: 'text-kano-primary',
  },
];


const Messages = () => {
  return (
    <section className="py-20 lg:py-28 bg-kano-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="container-custom relative">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-kano-accent" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-accent">Ministry Leadership</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
            Words from those <span className="text-kano-accent italic">leading the change</span>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {leaders.map((l, i) => (
            <article
              key={l.name}
              className={`group bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 hover:bg-white/[0.07] transition-colors ${i === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className={`flex items-start gap-6 mb-6 ${i === 0 ? 'lg:items-center' : ''}`}>
                <div className={`w-24 h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ${l.ring} ${i === 0 ? 'lg:w-36 lg:h-36' : ''}`}>
                  <img src={l.photo} alt={l.name} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${l.text}`}>{l.role}</span>
                  <h3 className="text-2xl font-serif text-white mt-1" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                    {l.name}
                  </h3>
                </div>
              </div>
              <p className="text-slate-200/85 leading-relaxed italic text-[15px] lg:text-base">
                “{l.quote}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Messages;
