import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, LucideIcon, Target, Compass, Building2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';

export interface PillarStat {
  value: string;
  label: string;
}

export interface PillarFocus {
  title: string;
  text: string;
}

export interface PillarProgram {
  title: string;
  text: string;
  href?: string;
}

export interface PillarPageProps {
  code: string;
  number: string;
  title: string;
  tagline: string;
  heroImage: string;
  intro: string;
  gradient: string;
  accent: string; // text color class e.g. text-sky-700
  chipBg: string; // e.g. bg-sky-50
  border: string; // e.g. border-sky-200
  icon: LucideIcon;
  mission: string;
  approach: string;
  stats: PillarStat[];
  focusAreas: PillarFocus[];
  programs: PillarProgram[];
  legalBasis?: string[];
}

const PillarPage: React.FC<PillarPageProps> = ({
  code, number, title, tagline, heroImage, intro, gradient, accent, chipBg, border,
  icon: Icon, mission, approach, stats, focusAreas, programs, legalBasis,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <PageHero
          eyebrow={`Strategic Pillar ${number} · ${code}`}
          title={title}
          subtitle={tagline}
          backgroundImage={heroImage}
          breadcrumbs={[
            { label: 'About', href: '/about' },
            { label: 'Strategic Pillars', href: '/about' },
            { label: title },
          ]}
        />

        {/* Stat strip */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="container-custom py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className={`text-3xl md:text-4xl font-serif ${accent}`} style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                  {s.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Intro + sidebar */}
        <section className="py-16 lg:py-20">
          <div className="container-custom grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-kano-accent" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-primary">Overview</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight mb-6" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                {tagline}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">{intro}</p>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <div className={`p-6 rounded-2xl border ${border} ${chipBg}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className={`w-4 h-4 ${accent}`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${accent}`}>Mission</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{mission}</p>
                </div>
                <div className={`p-6 rounded-2xl border ${border} ${chipBg}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Compass className={`w-4 h-4 ${accent}`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${accent}`}>Approach</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{approach}</p>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className={`rounded-2xl overflow-hidden border ${border} shadow-sm`}>
                <div className={`bg-gradient-to-br ${gradient} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                      <Icon className="w-7 h-7" strokeWidth={1.75} />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-white/70">Pillar</div>
                      <div className="text-3xl font-serif" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>{number}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/80 mb-1">Reference Code</div>
                  <div className="text-2xl font-bold">{code}</div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Lead Agency</span>
                  </div>
                  <p className="text-sm text-slate-700">Kano State Ministry of Water Resources, Environment & Climate Change</p>
                  {legalBasis && legalBasis.length > 0 && (
                    <>
                      <div className="mt-5 pt-5 border-t border-dashed border-slate-200">
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Legal Basis</div>
                        <ul className="text-xs text-slate-600 space-y-1.5">
                          {legalBasis.map((l) => (
                            <li key={l} className="flex gap-2"><span className={accent}>§</span>{l}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Focus areas */}
        <section className="bg-slate-50 py-16 lg:py-20 border-y border-slate-200">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10 border-b border-slate-200 pb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-slate-900" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                  Strategic focus areas
                </h3>
                <p className="text-slate-500 mt-2">Operational priorities under this pillar.</p>
              </div>
              <span className="hidden md:block text-xs font-bold uppercase tracking-[0.25em] text-slate-400">{code} · Focus</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusAreas.map((f, i) => (
                <article key={f.title} className={`bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all ${border}`}>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-sm font-mono font-bold mb-4`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{f.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-16 lg:py-20">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10 border-b border-slate-200 pb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-slate-900" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                  Programmes & initiatives
                </h3>
                <p className="text-slate-500 mt-2">Active work streams delivering this mandate.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {programs.map((p) => {
                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h4 className="font-bold text-lg text-slate-900 leading-snug">{p.title}</h4>
                      {p.href && <ArrowRight className={`w-5 h-5 ${accent} flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform`} />}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{p.text}</p>
                    <div className="pt-4 border-t border-dashed border-slate-200 flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${accent}`} />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Delivered under {code}</span>
                    </div>
                  </>
                );
                return p.href ? (
                  <Link key={p.title} to={p.href} className={`group block bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all ${border}`}>
                    {inner}
                  </Link>
                ) : (
                  <article key={p.title} className="bg-white rounded-xl border border-slate-200 p-6">
                    {inner}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`bg-gradient-to-br ${gradient} text-white`}>
          <div className="container-custom py-16 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-white/80 mb-3">Engage with {code}</div>
              <h3 className="text-2xl md:text-3xl font-serif leading-tight" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                Partner, report or request services under this pillar.
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                Contact the Ministry <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/report-issue" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-5 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Report an Issue
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PillarPage;
