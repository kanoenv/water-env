import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import {
  Briefcase, Users, Award, Globe, Shield, MapPin, BookOpen, ChevronRight,
  Settings, BarChart, Building2, FlaskConical, ArrowRight, Droplets, Leaf,
  Target, Compass, CheckCircle2,
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

import commissionerPhoto from '@/assets/commissioner.jpg.asset.json';
import permanentSecretaryPhoto from '@/assets/permanent-secretary.jpg.asset.json';
import governorPhoto from '@/assets/kano-state-governor.jpg.asset.json';
import aboutCover from '@/assets/about-cover.jpg.asset.json';
import dirTanimu from '@/assets/directors/sulaiman_tanimu.jpg.asset.json';
import dirInuwa from '@/assets/directors/eng_yusuf_m_inuwa.jpg.asset.json';
import dirYola from '@/assets/directors/mustapha_ibrahim_yola.jpg.asset.json';
import dirBashir from '@/assets/directors/Eng_bashir_sani_lawan.jpg.asset.json';

const directors = [
  { name: 'Suleiman Tanimu', title: 'Director, Administration & General Services', image: dirTanimu.url },
  { name: 'Engr. Yusuf M. Inuwa', title: 'Director, Water Supply', image: dirInuwa.url },
  { name: 'Mustapha Ibrahim Yola', title: 'Director, Hydrology & Hydrogeology Department', image: dirYola.url },
  { name: 'Engr. Bashir Sani Lawan, MNSE', title: 'Director, Dams & Reservoirs', image: dirBashir.url },
];

const SERIF = { fontFamily: "'Merriweather', Georgia, serif" } as const;

const leadership = [
  {
    name: 'His Excellency, Engr. Abba Kabir Yusuf',
    title: 'Executive Governor of Kano State',
    image: governorPhoto.url,
    tagline: 'Visionary Steward of Kano State',
    bio: 'Under the visionary leadership of His Excellency, Engr. Abba Kabir Yusuf, Kano State is witnessing a transformative era of water security, environmental restoration and climate resilience — a rescue mission that touches every household across the 44 Local Government Areas.',
  },
  {
    name: 'Dr. Dahiru Muhammad Hashim',
    title: 'Honorable Commissioner',
    image: commissionerPhoto.url,
    tagline: 'Chief Environmental Officer, Kano State',
    bio: 'Leading the Ministry with strategic innovation and an unwavering commitment to environmental excellence — from water security to climate resilience across all 44 LGAs.',
  },
  {
    name: 'Engr ABDULRAZAK HARUNA (FNSE, FNICE)',
    title: 'Permanent Secretary',
    image: permanentSecretaryPhoto.url,
    tagline: 'Chief Administrative & Technical Officer',
    bio: 'As the administrative and technical head of the Ministry, Engr. Haruna ensures that every policy in water resources, environmental protection and climate action is executed with discipline, transparency and measurable impact.',
  },
];


const departments = [
  { name: 'Administration & General Services', icon: <Settings className="h-6 w-6" />, description: 'Human resources, administrative coordination, and general support across the Ministry.' },
  { name: 'Climate Change', icon: <Globe className="h-6 w-6" />, description: 'Mitigation, adaptation, policy and international climate cooperation.' },
  { name: 'Pollution Control', icon: <Shield className="h-6 w-6" />, description: 'Environmental monitoring, EIA reviews and regulatory enforcement.' },
  { name: 'Environmental Sanitation', icon: <Building2 className="h-6 w-6" />, description: 'Waste management, sanitation, and urban cleanliness programmes.' },
  { name: 'Planning, Research & Statistics', icon: <BarChart className="h-6 w-6" />, description: 'Research, data, and strategic planning for evidence-based delivery.' },
  { name: 'Public Enlightenment', icon: <Users className="h-6 w-6" />, description: 'Awareness campaigns, environmental education and community engagement.' },
  { name: 'Engineering', icon: <Briefcase className="h-6 w-6" />, description: 'Project engineering, infrastructure delivery and facility management.' },
  { name: 'Special Duties', icon: <Award className="h-6 w-6" />, description: 'Emergency response and cross-departmental strategic initiatives.' },
];

const stats = [
  { value: '1967', label: 'Established' },
  { value: '44', label: 'LGAs Covered' },
  { value: '500+', label: 'Personnel' },
  { value: '10+', label: 'Global Partners' },
];

const values = [
  { icon: <Shield className="h-6 w-6" />, title: 'Integrity', text: 'Uncompromising ethics in every decision, contract and community engagement.' },
  { icon: <Target className="h-6 w-6" />, title: 'Accountability', text: 'Transparent reporting and measurable outcomes for every naira and mandate.' },
  { icon: <Leaf className="h-6 w-6" />, title: 'Sustainability', text: 'Long-horizon thinking — leaving Kano greener and safer for the next generation.' },
  { icon: <Users className="h-6 w-6" />, title: 'Community', text: 'Citizens, traditional institutions and youth at the centre of policy design.' },
  { icon: <Compass className="h-6 w-6" />, title: 'Innovation', text: 'Science, technology and data — from GPS tree tracking to lab-grade pollution monitoring.' },
  { icon: <Award className="h-6 w-6" />, title: 'Excellence', text: 'Global best practice, delivered locally with pride and professional discipline.' },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        <PageHero
          eyebrow="About the Ministry"
          title="Stewards of Kano's water, environment and climate future."
          subtitle="A government institution built on science, service and heritage — safeguarding land, air, water and communities across all 44 Local Government Areas."
          backgroundImage={aboutCover.url}
          breadcrumbs={[{ label: 'About' }]}
        />

        {/* ── Overview + Stats ─────────────────────────────────────── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-custom grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-kano-primary" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-primary">Who we are</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-kano-dark leading-tight mb-6" style={SERIF}>
                A ministry built for a <span className="text-kano-primary italic">changing climate</span>.
              </h2>
              <div className="space-y-5 text-gray-700 leading-relaxed text-[15px] lg:text-base">
                <p>
                  The <strong>Kano State Ministry of Water Resources, Environment and Climate Change</strong> is the lead
                  government institution safeguarding the state's natural heritage — its rivers, dams, forests, urban air
                  and rural landscapes.
                </p>
                <p>
                  Since 1967, our mandate has evolved from traditional environmental oversight into a modern, science-led
                  delivery arm — integrating water security, pollution control, waste management, climate adaptation and
                  green infrastructure under a single unified command.
                </p>
                <p>
                  Under the visionary leadership of the Executive Governor of Kano State, <strong>His Excellency, Engr. Abba Kabir Yusuf</strong>,
                  the Honorable Commissioner, <strong>Dr. Dahiru Muhammad Hashim</strong>,
                  and the administrative leadership of <strong>Engr. ABDULRAZAK HARUNA (FNSE, FNICE)</strong>, the Ministry is
                  executing a generational "Rescue Mission" — restoring dams, planting millions of trees, modernising sanitation
                  and building a climate-resilient Kano.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-kano-primary hover:bg-kano-primary/90 text-white rounded-lg">
                  <Link to="/contact">Contact the Ministry</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-lg border-kano-primary/30 text-kano-primary hover:bg-kano-primary/5">
                  <Link to="/agencies" className="flex items-center gap-2">
                    Our Agencies <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200/70">
                <AspectRatio ratio={4 / 3}>
                  <img
                    src="/lovable-uploads/8c00111d-1410-4210-93aa-5877bd4b6ee7.png"
                    alt="Ministry Headquarters, Kano"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
                <div className="bg-kano-dark text-white p-5">
                  <p className="text-sm font-semibold" style={SERIF}>Ministry Headquarters</p>
                  <p className="text-xs text-white/70 mt-1 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-kano-accent" />
                    Block 5, Audu Bako Secretariat, Kano
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {stats.map((s) => (
                  <div key={s.label} className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-white to-gray-50/50">
                    <div className="text-3xl font-bold text-kano-primary" style={SERIF}>{s.value}</div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 mt-1 font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission / Vision / Mandate ──────────────────────────── */}
        <section className="py-20 lg:py-24 bg-gradient-to-b from-gray-50/60 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-kano-accent" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-accent">Mandate</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-kano-dark leading-tight" style={SERIF}>
                Mission, vision and the <span className="text-kano-primary italic">promise</span> we keep.
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <article className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-kano-primary/10 text-kano-primary flex items-center justify-center mb-5">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-kano-dark mb-3" style={SERIF}>Our Mission</h3>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  Manage land, air and water pollution; conserve biodiversity; deliver clean water; develop alternative
                  energy; and control drought, erosion and flooding — through evidence-based policy and community partnership.
                </p>
              </article>

              <article className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-kano-accent/15 text-kano-accent flex items-center justify-center mb-5">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-kano-dark mb-3" style={SERIF}>Our Vision</h3>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  A clean, green and climate-resilient Kano — a model of healthy environmental development for Nigeria and
                  the African continent.
                </p>
              </article>

              <article className="bg-kano-dark text-white border border-kano-dark rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }} />
                <div className="w-12 h-12 rounded-xl bg-kano-accent/20 text-kano-accent flex items-center justify-center mb-5 relative">
                  <Droplets className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 relative" style={SERIF}>Our Promise</h3>
                <p className="text-white/80 leading-relaxed text-[15px] relative">
                  Every drop, every tree, every community — accounted for. Transparent data, open reporting, and public
                  service that citizens can see, measure and trust.
                </p>
              </article>
            </div>

            {/* Strategic objectives */}
            <div className="mt-14 grid md:grid-cols-3 gap-4">
              {[
                { t: 'Policy Excellence', d: 'Plan, coordinate and oversee cutting-edge environmental policy.' },
                { t: 'Environmental Quality', d: 'Secure ecosystems and human well-being through scientific monitoring.' },
                { t: 'Climate Protection', d: 'Prevent flooding, erosion, drought and desertification statewide.' },
              ].map((o) => (
                <div key={o.t} className="flex items-start gap-3 p-5 rounded-xl border border-gray-200 bg-white">
                  <CheckCircle2 className="h-5 w-5 text-kano-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{o.t}</h4>
                    <p className="text-sm text-gray-600 mt-1">{o.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ───────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-kano-primary" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-primary">Executive Leadership</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-kano-dark leading-tight" style={SERIF}>
                The people <span className="text-kano-primary italic">leading the mission</span>.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {leadership.map((l, i) => (
                <article key={l.name} className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${i === 0 ? 'md:col-span-2' : ''}`}>
                  <div className="relative">
                    <AspectRatio ratio={i === 0 ? 21 / 9 : 16 / 10}>
                      <img src={l.image} alt={l.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-kano-dark/85 via-kano-dark/20 to-transparent" />
                    <div className="absolute top-5 right-5">
                      <span className="bg-kano-accent text-kano-dark text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                        {l.title}
                      </span>
                    </div>
                    <div className="absolute bottom-5 left-6 right-6 text-white">
                      <h3 className="text-2xl font-bold" style={SERIF}>{l.name}</h3>
                      <p className="text-white/85 text-sm mt-0.5">{l.tagline}</p>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <p className="text-gray-700 leading-relaxed text-[15px]">{l.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Directors ────────────────────────────────────────────── */}
        <section className="py-20 lg:py-24 bg-gray-50/60">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-kano-accent" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-accent">Directorate</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-kano-dark leading-tight" style={SERIF}>
                Our <span className="text-kano-primary italic">directors</span>.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {directors.map((d) => (
                <article key={d.name} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                  <AspectRatio ratio={4 / 5}>
                    <img src={d.image} alt={d.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </AspectRatio>
                  <div className="p-5 border-t-2 border-kano-primary/20">
                    <h3 className="font-bold text-kano-dark text-[15px] leading-snug" style={SERIF}>{d.name}</h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{d.title}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>



        {/* ── Departments ──────────────────────────────────────────── */}
        <section className="py-20 lg:py-24 bg-gray-50/60">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-kano-accent" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-accent">Structure</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-kano-dark leading-tight" style={SERIF}>
                Eight departments. <span className="text-kano-primary italic">One mandate.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {departments.map((dep) => (
                <article key={dep.name} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-kano-primary/30 transition-all duration-300 group">
                  <div className="w-11 h-11 rounded-lg bg-kano-primary/10 text-kano-primary flex items-center justify-center mb-4 group-hover:bg-kano-primary group-hover:text-white transition-colors">
                    {dep.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-2">{dep.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{dep.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="rounded-lg border-kano-primary/30 text-kano-primary hover:bg-kano-primary/5">
                <Link to="/departments" className="flex items-center gap-2">
                  Explore all departments <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Lab callout */}
            <div className="mt-14 rounded-2xl overflow-hidden bg-kano-dark text-white grid md:grid-cols-5 shadow-xl">
              <div className="md:col-span-2 relative min-h-[220px] bg-gradient-to-br from-kano-primary to-kano-secondary flex items-center justify-center">
                <FlaskConical className="h-24 w-24 text-white/90" />
                <div className="absolute inset-0 opacity-[0.08]" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }} />
              </div>
              <div className="md:col-span-3 p-8 lg:p-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-kano-accent">Flagship Facility</span>
                <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={SERIF}>Pollution Control Laboratory</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  A state-of-the-art facility for water, air and soil analysis — delivering the scientific evidence behind
                  every enforcement action, EIA review and public health advisory.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {['Water Quality Testing', 'Air Pollution Monitoring', 'Soil & EIA Analysis', 'Industrial Emissions'].map((s) => (
                    <div key={s} className="flex items-center gap-2 text-white/90">
                      <ChevronRight className="h-4 w-4 text-kano-accent" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ─────────────────────────────────────────── */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-kano-primary" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-primary">Core Values</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-kano-dark leading-tight" style={SERIF}>
                The principles that <span className="text-kano-primary italic">guide our work</span>.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v) => (
                <div key={v.title} className="border border-gray-200 rounded-xl p-6 hover:border-kano-primary/30 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-kano-primary text-white flex items-center justify-center">
                      {v.icon}
                    </div>
                    <h3 className="font-bold text-gray-900" style={SERIF}>{v.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <section className="py-16 bg-gradient-to-r from-kano-primary to-kano-secondary text-white">
          <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold" style={SERIF}>
                Partner with the Ministry.
              </h3>
              <p className="text-white/85 mt-2 max-w-2xl">
                From tree-planting to water infrastructure and climate research — join the mission to build a greener Kano.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-kano-accent text-kano-dark hover:bg-kano-accent/90 font-bold rounded-lg">
                <Link to="/get-involved">Get Involved</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white/60 text-white hover:bg-white hover:text-kano-primary rounded-lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
