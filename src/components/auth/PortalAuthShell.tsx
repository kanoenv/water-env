import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';

interface PortalAuthShellProps {
  eyebrow: string;
  headline: string;
  intro: string;
  highlights: string[];
  badge?: string;
  children: React.ReactNode;
}

const SEAL = '/kano-ministry-seal.png';

const PortalAuthShell = ({ eyebrow, headline, intro, highlights, badge = '10 Million Trees Campaign · 2026', children }: PortalAuthShellProps) => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Institutional panel */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12 text-emerald-50 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #FFC107 1px, transparent 0)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="pointer-events-none absolute -top-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-amber-400/20 blur-3xl" />

        <header className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
            <img src={SEAL} alt="Ministry seal" className="h-10 w-10 object-contain" />
          </div>
          <div className="text-sm leading-tight">
            <div className="font-semibold tracking-wide">Kano State Government</div>
            <div className="text-emerald-200/80 text-xs">
              Ministry of Water Resources, Environment &amp; Climate Change
            </div>
          </div>
        </header>

        <div className="relative z-10 max-w-md space-y-6">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
            <span className="h-px w-8 bg-amber-300" /> {eyebrow}
          </span>
          <h1 className="font-serif text-4xl xl:text-5xl font-bold leading-tight">{headline}</h1>
          <p className="text-emerald-100/80 text-base leading-relaxed">{intro}</p>
          <ul className="space-y-3 pt-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-emerald-50/90">
                <ShieldCheck className="h-4 w-4 shrink-0 text-amber-300" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <footer className="relative z-10 text-xs text-emerald-200/60">
          {badge} · © {new Date().getFullYear()} Kano State Ministry of Water Resources, Environment and Climate Change.
        </footer>
      </aside>

      {/* Form column */}
      <section className="flex flex-col bg-white">
        <div className="flex items-center justify-between px-6 py-6 sm:px-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Back to public site
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" /> Secured connection
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-14 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-900">
                <img src={SEAL} alt="Ministry seal" className="h-9 w-9 object-contain" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{eyebrow}</div>
                <div className="text-xs text-slate-500">Ministry of Water Resources, Environment &amp; Climate Change</div>
              </div>
            </div>
            {children}
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4 text-center text-[11px] text-slate-400 sm:px-10">
          Access is monitored and all administrative actions are audit-logged.
        </div>
      </section>
    </div>
  </div>
);

export default PortalAuthShell;
