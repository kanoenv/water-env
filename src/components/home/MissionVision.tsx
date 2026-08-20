import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, FileText, Shield, ThermometerSnowflake, Recycle, Target, Globe, Waves, ArrowRight } from 'lucide-react';

const pillars = [
  { icon: Droplets, title: 'Water Supply & Sanitation', text: 'Reliable potable water and sanitation for urban and rural communities across all 44 LGAs.', gradient: 'from-sky-500 to-cyan-600', tint: 'bg-sky-50', accent: 'text-sky-700', border: 'hover:border-sky-300', code: 'WSS', href: '/pillars/water-supply-sanitation' },
  { icon: Waves, title: 'Integrated Water Resources', text: 'Protect rivers, dams, watersheds and groundwater through basin-wide planning and quality monitoring.', gradient: 'from-blue-600 to-indigo-700', tint: 'bg-blue-50', accent: 'text-blue-700', border: 'hover:border-blue-300', code: 'IWR', href: '/pillars/integrated-water-resources' },
  { icon: FileText, title: 'Policy & Governance', text: 'Coordinate water, environment and climate policy aligned with national strategy and global commitments.', gradient: 'from-slate-700 to-slate-900', tint: 'bg-slate-50', accent: 'text-slate-800', border: 'hover:border-slate-400', code: 'PGV', href: '/pillars/policy-governance' },
  { icon: ThermometerSnowflake, title: 'Climate Action', text: 'Flood, drought and desertification mitigation under the Kano Climate Action Plan.', gradient: 'from-amber-500 to-orange-600', tint: 'bg-amber-50', accent: 'text-amber-700', border: 'hover:border-amber-300', code: 'CLA', href: '/pillars/climate-action' },
  { icon: Shield, title: 'Pollution Control', text: 'Regulate emissions and effluents with modern monitoring laboratories and enforcement of standards.', gradient: 'from-rose-600 to-red-700', tint: 'bg-rose-50', accent: 'text-rose-700', border: 'hover:border-rose-300', code: 'POL', href: '/pillars/pollution-control' },
  { icon: Recycle, title: 'Waste & Circular Economy', text: 'Solid waste management, composting and recycling programs for a clean, healthy Kano.', gradient: 'from-emerald-600 to-green-700', tint: 'bg-emerald-50', accent: 'text-emerald-700', border: 'hover:border-emerald-300', code: 'WCE', href: '/pillars/waste-circular-economy' },
];

const MissionVision = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-kano-accent" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-primary">Our Foundation</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 leading-tight" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              A mandate rooted in <span className="text-kano-primary italic">stewardship</span>.
            </h2>
            <div className="flex gap-2 mt-6">
              <span className="h-1.5 w-16 bg-kano-primary rounded-full" />
              <span className="h-1.5 w-6 bg-kano-accent rounded-full" />
            </div>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 border-l-4 border-kano-primary p-8 rounded-r-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-kano-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-kano-primary">Our Mission</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Deliver safe, sustainable and equitable water supply; protect surface and groundwater; manage pollution; advance climate adaptation; and safeguard ecosystems and public health through evidence-based policy and inclusive partnerships.
              </p>
            </div>
            <div className="bg-slate-50 border-l-4 border-kano-accent p-8 rounded-r-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-amber-700" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Our Vision</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                A water-secure, clean and climate-resilient Kano where every citizen enjoys reliable access to potable water, a healthy environment and sustainable livelihoods — a benchmark for West Africa.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between mb-10 border-b border-slate-200 pb-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif text-slate-900" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                Six strategic pillars
              </h3>
              <p className="text-slate-500 mt-2">The integrated framework driving our work across the state.</p>
            </div>
            <span className="hidden md:block text-xs font-bold uppercase tracking-[0.25em] text-slate-400">01 — 06</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              const num = String(i + 1).padStart(2, '0');
              return (
                <Link
                  to={p.href}
                  key={p.title}
                  className={`group relative bg-white border border-slate-200 rounded-xl overflow-hidden ${p.border} hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all duration-300 block`}
                >
                  {/* Top accent bar */}
                  <div className={`h-1 bg-gradient-to-r ${p.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                  {/* Colored corner wash */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${p.tint} rounded-bl-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative p-7">
                    {/* Header row: icon + pillar code */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
                          <Icon className="w-6 h-6" strokeWidth={1.75} />
                        </div>
                        <span className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[9px] font-mono font-bold ${p.accent} shadow-sm`}>
                          {p.code}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Pillar</div>
                        <div className="text-2xl font-serif text-slate-900 leading-none mt-0.5" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>{num}</div>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className={`font-bold text-lg text-slate-900 mb-2 leading-snug group-hover:${p.accent} transition-colors`}>
                      {p.title}
                    </h4>

                    {/* Divider */}
                    <div className={`w-10 h-px bg-slate-200 group-hover:w-16 transition-all duration-500 mb-3`} />

                    {/* Body */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{p.text}</p>

                    {/* Footer meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${p.gradient} animate-pulse`} />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Explore pillar</span>
                      </div>
                      <ArrowRight className={`w-4 h-4 ${p.accent} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
