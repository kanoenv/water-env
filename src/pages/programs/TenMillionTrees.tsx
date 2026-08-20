import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TreePine, Target, ArrowRight, Calendar, Users, Sprout, Leaf,
  ShieldCheck, ClipboardList, Building2, Smartphone, LineChart, MapPin,
} from 'lucide-react';

const heroNursery = { url: '/hero/ministry-nursery-rows.jpg' };
const heroField = { url: '/hero/ministry-field-visit.jpg' };
const heroMango = { url: '/hero/ministry-mango.jpg' };
const heroSeedlings = { url: '/hero/ministry-seedling-beds.jpg' };
const heroPlanting = { url: '/hero/ministry-commissioner-planting.jpg' };
const heroGreening = { url: '/hero/hero-greening.jpg' };

const steps = [
  { title: 'Register', desc: 'Complete the official organisation application with your planting capacity and target sites.' },
  { title: 'Review & Approval', desc: 'Ministry reviewers verify eligibility and issue an approval decision within 14 working days.' },
  { title: 'Seedling Allocation', desc: 'Approved organisations collect seedlings against an official batch-coded collection slip.' },
  { title: 'Plant & Track', desc: 'Every planting is logged in the digital tracker — GPS coordinates, species, quantity and photographs.' },
  { title: 'Survival Audit', desc: 'Quarterly survival verification by ministry monitors, with certificates of recognition issued.' },
];

const gallery = [
  { src: heroNursery.url, caption: 'State nursery rows' },
  { src: heroSeedlings.url, caption: 'Seedling beds' },
  { src: heroPlanting.url, caption: 'Community planting' },
  { src: heroField.url, caption: 'Ministry field monitoring' },
  { src: heroMango.url, caption: 'Fruit-bearing species' },
  { src: heroGreening.url, caption: 'Urban greening' },
];

const portals = [
  {
    icon: Building2,
    title: 'Organisation Portal',
    desc: 'Approved organisations manage seedling allocations, enrol planters and log plantings.',
    to: '/org/login',
    cta: 'Organisation sign-in',
  },
  {
    icon: Smartphone,
    title: 'Field Planter App',
    desc: 'Registered planters sign in with phone number and PIN to submit GPS-tagged records.',
    to: '/planter',
    cta: 'Planter sign-in',
  },
  {
    icon: LineChart,
    title: 'Public Live Tracker',
    desc: 'Open data on registrations, approvals and verified trees planted across the state.',
    to: '/monitoring/tree-planting',
    cta: 'View live tracker',
  },
];

const commitments = [
  { icon: Leaf, title: 'Zone-matched species', desc: 'Indigenous and fruit-bearing species selected for each ecological zone of the state.' },
  { icon: Sprout, title: 'Free seedlings', desc: 'No-cost allocation to approved schools, NGOs, faith groups, corporates and associations.' },
  { icon: MapPin, title: 'Digital verification', desc: 'GPS coordinates, batch codes and field photographs recorded for every planting.' },
  { icon: ShieldCheck, title: 'Independent audit', desc: 'Quarterly survival audits conducted by ministry monitoring officers.' },
];

const TenMillionTrees = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${heroNursery.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-emerald-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-950/40" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FFC107 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <div className="relative container-custom max-w-6xl px-4 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">
              <span className="h-px w-8 bg-amber-300" /> 2026 Flagship Campaign
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              10 Million Trees<br />Planting Campaign
            </h1>
            <div className="mt-6 h-px w-24 bg-amber-400/70" />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-emerald-50/85 sm:text-lg">
              A coordinated, transparent and community-led drive to plant ten million trees across Kano State
              in 2026 — the first phase of the State's twenty million trees vision by 2030.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 w-full bg-amber-400 px-7 font-semibold text-emerald-950 hover:bg-amber-300 sm:w-auto">
                <Link to="/programs/ten-million-trees/apply">Apply for seedlings <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 w-full border-white/50 bg-transparent px-7 text-white hover:bg-white hover:text-emerald-950 sm:w-auto">
                <Link to="/monitoring/tree-planting">View live tracker</Link>
              </Button>
            </div>

            <p className="mt-6 max-w-2xl text-xs text-emerald-100/60 sm:text-sm">
              Already approved? Organisations and field planters sign in through the campaign portals below.
            </p>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="border-b border-emerald-100 bg-emerald-950">
        <div className="container-custom grid grid-cols-1 divide-y divide-white/10 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { icon: Target, value: '10,000,000', label: 'Seedling target for 2026' },
            { icon: Users, value: '1,200+', label: 'Registered organisations' },
            { icon: Sprout, value: '90%+', label: 'Survival rate commitment' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4 px-2 py-8 sm:px-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <s.icon className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white sm:text-3xl">{s.value}</div>
                <div className="mt-0.5 text-xs uppercase tracking-wider text-emerald-200/70">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16 sm:py-24">
        <div className="container-custom grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">Why it matters</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              Rebuilding Kano's green cover
            </h2>
            <div className="mt-4 h-px w-16 bg-amber-400" />
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Decades of desertification, urban expansion and biomass demand have stripped Kano of its tree cover.
              This campaign is the largest coordinated reforestation effort the State has ever launched — and the
              first delivered end-to-end on a public digital verification system.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {commitments.map((c) => (
                <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-md">
                  <c.icon className="h-5 w-5 text-emerald-700" />
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 grid grid-cols-2 gap-3 sm:gap-4 lg:order-2">
            <img src={heroSeedlings.url} alt="Seedling beds prepared at the state nursery" className="aspect-square w-full rounded-xl object-cover shadow-lg" loading="lazy" />
            <img src={heroPlanting.url} alt="Commissioner planting a tree at a community event" className="mt-8 aspect-square w-full rounded-xl object-cover shadow-lg" loading="lazy" />
            <img src={heroMango.url} alt="Mango seedlings ready for distribution" className="aspect-square w-full rounded-xl object-cover shadow-lg" loading="lazy" />
            <img src={heroField.url} alt="Ministry field monitoring visit" className="mt-8 aspect-square w-full rounded-xl object-cover shadow-lg" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Portals */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="container-custom max-w-6xl px-4">
          <div className="mb-10 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">Campaign portals</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              Secure access for every participant
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {portals.map((p) => (
              <div key={p.title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-xl">
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-900">
                  <p.icon className="h-6 w-6 text-amber-300" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                <Link to={p.to} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:gap-2.5 transition-all">
                  {p.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-24">
        <div className="container-custom max-w-5xl px-4">
          <div className="mb-12 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">Official process</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              From application to audit
            </h2>
          </div>

          <ol className="relative space-y-4 border-l border-emerald-200 pl-6 sm:pl-10">
            {steps.map((s, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[2.1rem] top-5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white ring-4 ring-white sm:-left-[3.35rem] sm:h-9 sm:w-9 sm:text-sm">
                  {i + 1}
                </span>
                <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-md sm:p-6">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-emerald-700" />
                    <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{s.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="container-custom max-w-6xl px-4">
          <div className="mb-10 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">From the field</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              The campaign in pictures
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
              Documented images from state nurseries, schools and planting sites across Kano State.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {gallery.map((g, i) => (
              <figure key={i} className="group relative overflow-hidden rounded-xl shadow-md">
                <img src={g.src} alt={g.caption} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/90 to-transparent p-3 text-xs font-medium text-white sm:text-sm">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-emerald-950 py-16 text-white sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FFC107 1px, transparent 0)', backgroundSize: '26px 26px' }}
        />
        <div className="container-custom relative max-w-3xl px-4 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <Calendar className="h-7 w-7 text-amber-300" />
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
            Applications are open
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-emerald-100/80">
            Join the schools, NGOs, faith groups, corporates and community associations already enrolled in the campaign.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 w-full bg-amber-400 px-8 font-semibold text-emerald-950 hover:bg-amber-300 sm:w-auto">
              <Link to="/programs/ten-million-trees/apply">Start your application</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 w-full border-white/50 bg-transparent px-8 text-white hover:bg-white hover:text-emerald-950 sm:w-auto">
              <Link to="/org/login">Approved organisation sign-in</Link>
            </Button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-xs text-emerald-200/60">
            <TreePine className="h-3.5 w-3.5" /> Kano State Ministry of Water Resources, Environment and Climate Change
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default TenMillionTrees;
