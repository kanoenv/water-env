import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertTriangle, Phone, Mail, FileText, ArrowUpRight, Clock, Shield } from 'lucide-react';

const channels = [
  {
    number: '01',
    title: 'Emergency Hotline',
    description: '24/7 environmental emergency response. Reach our rapid-response team for pollution incidents, spillages, flooding hazards and other urgent environmental risks.',
    icon: Phone,
    href: 'https://wa.me/2348030719901',
    external: true,
    action: '+234 803 071 9901',
    tag: 'Critical Response',
    meta: 'Response · 24 hrs',
    ref: 'MOECC / EMG-001',
    theme: 'critical',
  },
  {
    number: '02',
    title: 'Email Reports',
    description: 'Send detailed environmental reports, photographic evidence and official correspondence to the Ministry for review, investigation and follow-up.',
    icon: Mail,
    href: 'mailto:complaints@environment.kn.gov.ng',
    external: true,
    action: 'complaints@environment.kn.gov.ng',
    tag: 'Official Correspondence',
    meta: 'Reply · 48–72 hrs',
    ref: 'MOECC / RPT-MAIL',
    theme: 'email',
  },
  {
    number: '03',
    title: 'Online Form',
    description: 'Submit structured reports with photos, location details and contact information through our secure digital reporting portal.',
    icon: FileText,
    href: '/report-issue',
    external: false,
    action: 'Fill Report Form',
    tag: 'Digital Submission',
    meta: 'Instant receipt',
    ref: 'MOECC / RPT-WEB',
    theme: 'form',
  },
];

const themeStyles: Record<string, { wrap: string; dot: string; iconGrad: string; iconShadow: string; topBar: string; hoverBorder: string; hoverTitle: string; btn: string; btnHover: string; corner: string; label: string }> = {
  critical: {
    wrap: 'bg-red-50 border-red-200 text-red-800',
    dot: 'bg-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.15)] animate-pulse',
    iconGrad: 'from-red-600 to-rose-700',
    iconShadow: 'shadow-red-600/25',
    topBar: 'from-red-600 via-red-500 to-amber-500',
    hoverBorder: 'hover:border-red-300',
    hoverTitle: 'group-hover:text-red-700',
    btn: 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
    btnHover: 'hover:shadow-red-500/25',
    corner: 'bg-amber-400',
    label: 'text-red-800',
  },
  email: {
    wrap: 'bg-blue-50 border-blue-200 text-blue-800',
    dot: 'bg-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.15)]',
    iconGrad: 'from-blue-600 to-cyan-600',
    iconShadow: 'shadow-blue-600/25',
    topBar: 'from-blue-600 via-cyan-500 to-teal-400',
    hoverBorder: 'hover:border-blue-300',
    hoverTitle: 'group-hover:text-blue-700',
    btn: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
    btnHover: 'hover:shadow-blue-500/25',
    corner: 'bg-cyan-400',
    label: 'text-blue-800',
  },
  form: {
    wrap: 'bg-purple-50 border-purple-200 text-purple-800',
    dot: 'bg-purple-600 shadow-[0_0_0_3px_rgba(147,51,234,0.15)]',
    iconGrad: 'from-purple-600 to-indigo-700',
    iconShadow: 'shadow-purple-600/25',
    topBar: 'from-purple-600 via-violet-500 to-fuchsia-400',
    hoverBorder: 'hover:border-purple-300',
    hoverTitle: 'group-hover:text-purple-700',
    btn: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
    btnHover: 'hover:shadow-purple-500/25',
    corner: 'bg-violet-400',
    label: 'text-purple-800',
  },
};

const ReportBanner = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-kano-primary/5 py-20 lg:py-28 border-t border-slate-200 relative overflow-hidden">
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
        <div className="max-w-6xl mx-auto">
          {/* Header — official document style */}
          <div className="text-center mb-16">
            {/* Top meta row */}
            <div className="flex flex-wrap items-center justify-center gap-3 pb-4 mb-8 border-b border-slate-900/10 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 text-[10.5px] font-mono font-semibold tracking-[0.2em] uppercase text-slate-700">
                <span className="w-1.5 h-1.5 bg-kano-primary" />
                Section 02
              </span>
              <span className="text-[10.5px] font-mono tracking-[0.2em] uppercase text-slate-400">
                / Citizen Reporting Channels
              </span>
            </div>

            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl mb-8 shadow-lg">
              <AlertTriangle className="h-9 w-9 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 mb-6 leading-tight" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              Report Environmental Issues
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              Help us protect Kano's environment by reporting illegal dumping, pollution, water contamination, or other environmental hazards in your community. Your contribution makes a difference.
            </p>
            <Link to="/report-issue">
              <Button
                size="lg"
                className="bg-gradient-to-r from-kano-primary to-kano-secondary hover:from-kano-primary/90 hover:to-kano-secondary/90 text-white px-12 py-6 text-lg font-semibold shadow-2xl hover:shadow-kano-primary/25 transition-all duration-500 transform hover:translate-y-[-2px] rounded-xl border border-kano-primary/20"
              >
                <AlertTriangle className="mr-3 h-6 w-6" />
                Report Environmental Issue
              </Button>
            </Link>
          </div>

          {/* Reporting Channels Grid — dossier cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map((c) => {
              const Icon = c.icon;
              const t = themeStyles[c.theme];
              const cardClassName = `group relative bg-white border border-slate-200 rounded-xl overflow-hidden ${t.hoverBorder} hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 flex flex-col`;
              const cardContent = (
                <>
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
                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Channel</div>
                        <div className="text-2xl font-serif text-slate-900 leading-none mt-0.5" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>{c.number}</div>
                      </div>
                    </div>

                    {/* Status tag */}
                    <div className="mb-4">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase border px-2.5 py-1 rounded-sm ${t.wrap}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                        <span className={t.label}>{c.tag}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-xl text-slate-900 mb-2 leading-snug ${t.hoverTitle} transition-colors`}>
                      {c.title}
                    </h3>

                    {/* Divider */}
                    <div className="w-10 h-px bg-slate-200 group-hover:w-16 transition-all duration-500 mb-3" />

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                      {c.description}
                    </p>

                    {/* Action button */}
                    <div className="mb-6">
                      <span className={`inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r ${t.btn} ${t.btnHover} text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg`}>
                        <Icon className="w-4 h-4" />
                        <span>{c.action}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      </span>
                    </div>

                    {/* Footer meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{c.meta}</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{c.ref}</span>
                    </div>
                  </div>
                </>
              );

              if (c.external) {
                return (
                  <a
                    key={c.title}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <Link key={c.title} to={c.href} className={cardClassName}>
                  {cardContent}
                </Link>
              );
            })}
          </div>

          {/* Enhanced Information Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-gradient-to-r from-slate-100 to-slate-50 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-slate-200/50 shadow-xl flex flex-col justify-center">
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                Your reports help us maintain a cleaner, healthier environment for all residents of Kano State. All reports are treated confidentially and responded to promptly by our expert team.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-kano-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-kano-primary" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Commitment</div>
                  <div className="text-sm font-semibold text-slate-900">Prompt & Confidential</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-kano-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-kano-primary" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Standard</div>
                  <div className="text-sm font-semibold text-slate-900">Verified Government Channel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportBanner;
