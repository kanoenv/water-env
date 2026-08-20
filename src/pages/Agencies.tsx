import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import { Button } from '@/components/ui/button';
import {
  Building2,
  TreeDeciduous,
  Shield,
  Leaf,
  Sprout,
  Droplets,
  Recycle,
  Wheat,
  Wind,
  MapPin,
  Globe,
  Factory,
  TreePine,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Users,
  Landmark,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const serif = { fontFamily: "'Merriweather', Georgia, serif" } as const;

const Agencies = () => {
  const stats = [
    { value: '9', label: 'Delivery Agencies', icon: <Landmark className="w-5 h-5" /> },
    { value: '44', label: 'LGAs Covered', icon: <MapPin className="w-5 h-5" /> },
    { value: '15M+', label: 'Citizens Served', icon: <Users className="w-5 h-5" /> },
    { value: '8', label: 'Strategic Sectors', icon: <Globe className="w-5 h-5" /> },
  ];

  const keySectors = [
    { title: 'Waste Management & Urban Cleanliness', icon: <Recycle className="w-6 h-6" />, tone: 'from-blue-500 to-blue-700' },
    { title: 'Sustainable Agriculture & Soil Health', icon: <Wheat className="w-6 h-6" />, tone: 'from-amber-500 to-amber-700' },
    { title: 'Water Resources, Erosion & Flood Control', icon: <Droplets className="w-6 h-6" />, tone: 'from-cyan-500 to-cyan-700' },
    { title: 'Sustainable & Renewable Energy', icon: <Wind className="w-6 h-6" />, tone: 'from-yellow-500 to-yellow-700' },
    { title: 'Urban Planning & Green Development', icon: <MapPin className="w-6 h-6" />, tone: 'from-purple-500 to-purple-700' },
    { title: 'Climate Resilience & Adaptation', icon: <Globe className="w-6 h-6" />, tone: 'from-emerald-500 to-emerald-700' },
    { title: 'Pollution Control & Monitoring', icon: <Factory className="w-6 h-6" />, tone: 'from-red-500 to-red-700' },
    { title: 'Afforestation & Biodiversity', icon: <TreePine className="w-6 h-6" />, tone: 'from-green-600 to-green-800' },
  ];

  const agencies = [
    {
      code: 'A-01',
      title: 'REMASAB',
      full: 'Refuse Management & Sanitation Board',
      description:
        'Statewide waste collection, street sanitation, and disposal management—keeping Kano clean through modern logistics and community engagement.',
      icon: <Building2 className="w-6 h-6" />,
      image: '/lovable-uploads/b2ec0667-1d0a-437a-9129-b3ccdd2291d4.png',
      link: '/agencies/remasab',
      mandate: 'Sanitation',
      accent: 'from-blue-600 to-blue-800',
    },
    {
      code: 'A-02',
      title: 'ACRESAL',
      full: 'Agro-Climatic Resilience in Semi-Arid Landscapes',
      description:
        'World Bank-supported programme building climate resilience through sustainable land management and watershed restoration.',
      icon: <TreeDeciduous className="w-6 h-6" />,
      image: '/lovable-uploads/93846bf9-aece-4716-ad44-62e1c7a6cb4b.png',
      link: 'https://kanoacresal.org',
      external: true,
      mandate: 'Climate Resilience',
      accent: 'from-emerald-600 to-emerald-800',
    },
    {
      code: 'A-03',
      title: 'WECCMA',
      full: 'Watershed, Erosion & Climate Change Management Agency',
      description:
        'Manages erosion risk, protects watersheds, and coordinates climate adaptation strategy across Kano State.',
      icon: <Shield className="w-6 h-6" />,
      image: '/lovable-uploads/b2ec0667-1d0a-437a-9129-b3ccdd2291d4.png',
      link: '/agencies/weccma',
      mandate: 'Erosion & Climate',
      accent: 'from-purple-600 to-purple-800',
    },
    {
      code: 'A-04',
      title: 'SKP',
      full: 'Sustainable Kano Project',
      description:
        'Multi-sectoral initiative advancing sustainable urban growth, conservation, and socio-economic resilience across the state.',
      icon: <Leaf className="w-6 h-6" />,
      image: '/lovable-uploads/d8ae522e-5423-4798-849c-d19bd4a9eed9.png',
      link: '/agencies/skp',
      mandate: 'Urban Sustainability',
      accent: 'from-teal-600 to-teal-800',
    },
    {
      code: 'A-05',
      title: 'KNAP',
      full: 'Kano State Afforestation Project',
      description:
        'Government-led reforestation of degraded lands—driving biodiversity recovery and climate mitigation through large-scale tree planting.',
      icon: <Sprout className="w-6 h-6" />,
      image: '/lovable-uploads/e2810cb9-3811-469c-bc94-431d9f82e1df.png',
      link: '/agencies/knap',
      mandate: 'Afforestation',
      accent: 'from-green-600 to-green-800',
    },
    {
      code: 'A-06',
      title: 'Pollution Control Laboratory',
      full: 'State Environmental Analysis Lab',
      description:
        'Flagship analytical lab monitoring air, water and soil quality with certified instruments and independent reporting.',
      icon: <Factory className="w-6 h-6" />,
      image: '/lovable-uploads/0a733cce-62b5-4251-a9fb-4d7d1fb9845a.png',
      link: '/agencies/pollution-lab',
      mandate: 'Monitoring',
      accent: 'from-red-600 to-red-800',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <PageHero
          eyebrow="Delivery Network"
          title="Agencies & Delivery Partners"
          subtitle="The specialised agencies, parastatals and programme units that deliver the Ministry's mandate across waste, water, climate and conservation."
          backgroundImage="/lovable-uploads/93846bf9-aece-4716-ad44-62e1c7a6cb4b.png"
          breadcrumbs={[{ label: 'Agencies' }]}
        />

        {/* Stats strip */}
        <section className="bg-white border-b border-gray-200">
          <div className="container-custom py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kano-primary to-kano-secondary text-white flex items-center justify-center shadow-md shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-kano-primary leading-none" style={serif}>
                      {s.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1 uppercase tracking-wider">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-kano-accent" />
                  <span className="text-kano-primary uppercase tracking-[0.2em] text-xs font-semibold">
                    Section 01 / Overview
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-kano-dark leading-tight" style={serif}>
                  A coordinated delivery system for Kano's environment.
                </h2>
              </div>
              <div className="lg:col-span-2 space-y-5 text-gray-700 leading-relaxed text-lg">
                <p>
                  The Ministry works through a network of specialised agencies, parastatals and donor-supported
                  programme units. Each delivery partner carries a defined mandate—yet operates within a single,
                  integrated framework aligned to the Ministry's six strategic pillars.
                </p>
                <p>
                  Together they extend the Ministry's reach into every one of Kano State's 44 Local Government
                  Areas, translating policy into measurable environmental outcomes for over 15 million citizens.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {['Accountable', 'Data-driven', 'Community-anchored', 'Internationally aligned'].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kano-primary/10 text-kano-primary text-sm font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Sectors */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-kano-accent" />
                <span className="text-kano-primary uppercase tracking-[0.2em] text-xs font-semibold">
                  Section 02 / Mandate Sectors
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-kano-dark leading-tight mb-4" style={serif}>
                Eight sectors. One integrated mandate.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our agencies operate across eight interlinked sectors—each addressing a distinct environmental
                challenge while feeding into the Ministry's unified strategic framework.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {keySectors.map((sector, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${sector.tone}`}
                  />
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${sector.tone} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {sector.icon}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-mono">
                    Sector {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-bold text-kano-dark text-base leading-snug group-hover:text-kano-primary transition-colors">
                    {sector.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agencies grid */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-kano-accent" />
                <span className="text-kano-primary uppercase tracking-[0.2em] text-xs font-semibold">
                  Section 03 / Delivery Agencies
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-kano-dark leading-tight mb-4" style={serif}>
                Meet our agencies and programme units.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Each agency operates under formal government mandate with independent leadership, dedicated
                funding lines and clear performance indicators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agencies.map((a, i) => (
                <article
                  key={i}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${a.accent} opacity-70 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-mono font-semibold text-kano-dark">
                        {a.code}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-kano-accent/95 text-xs font-semibold text-kano-dark">
                        {a.mandate}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/95 backdrop-blur text-kano-primary flex items-center justify-center shadow-lg">
                          {a.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-xl leading-tight" style={serif}>
                            {a.title}
                          </h3>
                          <p className="text-white/80 text-xs">{a.full}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow">{a.description}</p>
                    <Button
                      variant="outline"
                      className="w-full border-kano-primary text-kano-primary hover:bg-kano-primary hover:text-white font-semibold group/btn"
                      asChild
                    >
                      {a.external ? (
                        <a href={a.link} target="_blank" rel="noopener noreferrer">
                          Visit Agency Portal
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      ) : (
                        <Link to={a.link}>
                          Explore Agency
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 bg-gradient-to-br from-kano-primary via-kano-secondary to-kano-dark overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,193,7,0.2),_transparent_55%)]" />
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-10 bg-kano-accent" />
                <span className="text-kano-accent uppercase tracking-[0.2em] text-xs font-semibold">
                  Partner with the Ministry
                </span>
                <span className="h-px w-10 bg-kano-accent" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-5 leading-tight" style={serif}>
                Delivering a cleaner, greener, climate-resilient Kano.
              </h2>
              <p className="text-white/85 text-lg mb-8 leading-relaxed">
                Organisations, donors and communities can engage directly with our delivery agencies to
                co-design, co-fund and co-implement environmental programmes across Kano State.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-kano-accent hover:bg-kano-accent/90 text-kano-dark font-semibold px-8"
                >
                  <Link to="/contact">
                    Contact the Ministry
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white hover:text-kano-dark font-semibold px-8"
                >
                  <Link to="/get-involved">Get Involved</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Agencies;
