import React from 'react';
import { TreePine, FileText, AlertTriangle, BarChart3, Droplets, ArrowUpRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickActions = [
  {
    number: '01',
    title: 'Report an Environmental Issue',
    description: 'Illegal dumping, pollution, water wastage or environmental hazards — routed directly to our rapid response team across all 44 LGAs.',
    icon: AlertTriangle,
    href: '/report-issue',
    tag: 'Priority Response',
    meta: 'Avg. response · 24 hrs',
    ref: 'MOECC / RPT-001',
    tagStyle: 'critical',
  },
  {
    number: '02',
    title: '10 Million Trees Campaign',
    description: 'Apply for free seedlings, receive planting training, and track your contribution through our transparent digital ledger.',
    icon: TreePine,
    href: '/programs/ten-million-trees',
    tag: 'Active Programme',
    meta: 'Cycle · 2026',
    ref: 'MOECC / PRG-010M',
    tagStyle: 'active',
  },
  {
    number: '03',
    title: 'Air Quality Index',
    description: 'Live PM2.5, PM10 and AQI readings across Kano metropolis, benchmarked to WHO Air Quality Guidelines with health advisories.',
    icon: Droplets,
    href: '/monitoring/air-quality',
    tag: 'Live Data',
    meta: 'Updated hourly',
    ref: 'MOECC / AQI-KAN',
    tagStyle: 'live',
  },
  {
    number: '04',
    title: 'Environmental Monitoring',
    description: 'Erosion mapping, tree-planting tracker and water quality dashboards maintained by our field and GIS teams.',
    icon: BarChart3,
    href: '/monitoring',
    tag: 'Public Dashboards',
    meta: 'Open data',
    ref: 'MOECC / MON-004',
    tagStyle: 'info',
  },
  {
    number: '05',
    title: 'Get Involved',
    description: 'Volunteer, join the Climate Actor Registry, or partner with the Ministry on accredited public–private initiatives.',
    icon: Shield,
    href: '/get-involved',
    tag: 'Partnership',
    meta: 'Citizens & organisations',
    ref: 'MOECC / PPP-005',
    tagStyle: 'accent',
  },
  {
    number: '06',
    title: 'Laws & Resources',
    description: 'Environmental legislation, policy frameworks, gazettes and official ministry publications — free public download.',
    icon: FileText,
    href: '/resources',
    tag: 'Policy Library',
    meta: 'PDF · Public record',
    ref: 'MOECC / LEX-006',
    tagStyle: 'neutral',
  },
];

const tagStyles: Record<string, { wrap: string; dot: string; label: string; iconGrad: string; iconShadow: string; topBar: string; hoverBorder: string; hoverTitle: string; accessText: string; corner: string }> = {
  critical: {
    wrap: 'bg-red-50 border-red-200 text-red-800',
    dot: 'bg-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.15)] animate-pulse',
    label: 'text-red-800',
    iconGrad: 'from-red-600 to-rose-700',
    iconShadow: 'shadow-red-600/25',
    topBar: 'from-red-600 via-red-500 to-amber-500',
    hoverBorder: 'hover:border-red-300',
    hoverTitle: 'group-hover:text-red-700',
    accessText: 'text-red-700',
    corner: 'bg-amber-400',
  },
  active: {
    wrap: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    dot: 'bg-emerald-600 shadow-[0_0_0_3px_rgba(5,150,105,0.15)]',
    label: 'text-emerald-800',
    iconGrad: 'from-kano-primary to-kano-secondary',
    iconShadow: 'shadow-kano-primary/25',
    topBar: 'from-kano-primary via-emerald-500 to-kano-accent',
    hoverBorder: 'hover:border-kano-primary/40',
    hoverTitle: 'group-hover:text-kano-primary',
    accessText: 'text-kano-primary',
    corner: 'bg-kano-accent',
  },
  live: {
    wrap: 'bg-sky-50 border-sky-200 text-sky-800',
    dot: 'bg-sky-600 shadow-[0_0_0_3px_rgba(2,132,199,0.15)] animate-pulse',
    label: 'text-sky-800',
    iconGrad: 'from-sky-600 to-cyan-600',
    iconShadow: 'shadow-sky-600/25',
    topBar: 'from-sky-600 via-cyan-500 to-teal-400',
    hoverBorder: 'hover:border-sky-300',
    hoverTitle: 'group-hover:text-sky-700',
    accessText: 'text-sky-700',
    corner: 'bg-cyan-400',
  },
  info: {
    wrap: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    dot: 'bg-indigo-600 shadow-[0_0_0_3px_rgba(79,70,229,0.15)]',
    label: 'text-indigo-800',
    iconGrad: 'from-indigo-600 to-violet-700',
    iconShadow: 'shadow-indigo-600/25',
    topBar: 'from-indigo-600 via-violet-500 to-fuchsia-400',
    hoverBorder: 'hover:border-indigo-300',
    hoverTitle: 'group-hover:text-indigo-700',
    accessText: 'text-indigo-700',
    corner: 'bg-violet-400',
  },
  accent: {
    wrap: 'bg-amber-50 border-amber-200 text-amber-900',
    dot: 'bg-amber-600 shadow-[0_0_0_3px_rgba(217,119,6,0.15)]',
    label: 'text-amber-900',
    iconGrad: 'from-amber-500 to-orange-600',
    iconShadow: 'shadow-amber-600/25',
    topBar: 'from-amber-500 via-orange-500 to-red-400',
    hoverBorder: 'hover:border-amber-300',
    hoverTitle: 'group-hover:text-amber-700',
    accessText: 'text-amber-700',
    corner: 'bg-orange-400',
  },
  neutral: {
    wrap: 'bg-slate-100 border-slate-300 text-slate-800',
    dot: 'bg-slate-700 shadow-[0_0_0_3px_rgba(51,65,85,0.15)]',
    label: 'text-slate-800',
    iconGrad: 'from-slate-700 to-slate-900',
    iconShadow: 'shadow-slate-700/25',
    topBar: 'from-slate-700 via-slate-600 to-kano-accent',
    hoverBorder: 'hover:border-slate-400',
    hoverTitle: 'group-hover:text-slate-900',
    accessText: 'text-slate-800',
    corner: 'bg-kano-accent',
  },
};

const QuickLinks = () => {
  return (
    <section className="py-20 lg:py-28 bg-white relative border-y border-slate-200">
      {/* Subtle blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-custom relative">
        {/* Header — official document style */}
        <div className="mb-14">
          {/* Top meta row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 border-b border-slate-900/10">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 text-[10.5px] font-mono font-semibold tracking-[0.2em] uppercase text-slate-700">
                <span className="w-1.5 h-1.5 bg-kano-primary" />
                Section 01
              </span>
              <span className="hidden sm:inline text-[10.5px] font-mono tracking-[0.2em] uppercase text-slate-400">
                / Citizen Services Directory
              </span>
            </div>
            <span className="text-[10.5px] font-mono tracking-[0.2em] uppercase text-slate-400">
              Ref · MOECC-KS / 2026
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-kano-primary/5 border border-kano-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-kano-primary animate-pulse" />
                <span className="text-[10.5px] font-mono font-semibold tracking-[0.18em] uppercase text-kano-primary">
                  Public Access · Live Services
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl lg:text-[3.15rem] font-serif text-slate-900 leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Merriweather', Georgia, serif" }}
              >
                Every Ministry service,
                <br className="hidden sm:block" />
                <span className="text-kano-primary italic">one trusted gateway.</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <div className="relative pl-5 border-l-2 border-kano-primary/30">
                <p className="text-slate-700 text-[15px] leading-[1.75] font-light">
                  From <span className="font-semibold text-slate-900">real-time environmental data</span> to <span className="font-semibold text-slate-900">citizen reporting</span> and <span className="font-semibold text-slate-900">programme applications</span> — the Ministry's digital front door for the people of Kano State.
                </p>
                <div className="mt-4 flex items-center gap-4 text-[10.5px] font-mono tracking-[0.15em] uppercase text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    Verified
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    Free to use
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card grid — dossier layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((a) => {
            const Icon = a.icon;
            const t = tagStyles[a.tagStyle] ?? tagStyles.neutral;
            return (
              <Link
                key={a.title}
                to={a.href}
                className={`group relative bg-white border border-slate-200 rounded-xl overflow-hidden ${t.hoverBorder} hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 flex flex-col`}
              >
                {/* Top accent bar */}
                <div className={`h-1 bg-gradient-to-r ${t.topBar} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                <div className="p-7 flex flex-col flex-grow">
                  {/* Header row: icon + service code */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${t.iconGrad} flex items-center justify-center text-white shadow-lg ${t.iconShadow} group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" strokeWidth={1.75} />
                      </div>
                      <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${t.corner} border-2 border-white`} />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Service</div>
                      <div className="text-2xl font-serif text-slate-900 leading-none mt-0.5" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>{a.number}</div>
                    </div>
                  </div>

                  {/* Status tag */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase border px-2.5 py-1 rounded-sm ${t.wrap}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                      <span className={t.label}>{a.tag}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-lg text-slate-900 mb-2 leading-snug ${t.hoverTitle} transition-colors`}>
                    {a.title}
                  </h3>

                  {/* Divider */}
                  <div className={`w-10 h-px bg-slate-200 group-hover:w-16 transition-all duration-500 mb-3`} />

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                    {a.description}
                  </p>

                  {/* Footer meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{a.meta}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.18em] uppercase ${t.accessText}`}>
                      Access
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>


        {/* Footer — official standards strip */}
        <div className="mt-10 pt-6 border-t border-slate-900/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px]">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono tracking-[0.15em] uppercase">All systems operational</span>
          </div>
          <div className="font-mono tracking-[0.18em] uppercase text-slate-400 md:text-center">
            ISO 14001 · WHO AQG · SDG 6 · 11 · 13 · 15
          </div>
          <Link
            to="/resources"
            className="inline-flex items-center justify-start md:justify-end gap-1.5 font-semibold tracking-[0.18em] uppercase text-kano-primary hover:gap-2.5 transition-all text-[10.5px]"
          >
            Full service directory <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
