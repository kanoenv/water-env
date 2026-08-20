import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, Award, Target, Globe, TreePine, Sprout, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
const heroNursery = { url: '/hero/ministry-nursery-rows.jpg' };
const heroFieldVisit = { url: '/hero/ministry-field-visit.jpg' };
const heroCommissioner = { url: '/hero/ministry-commissioner-planting.jpg' };
const heroSeedlings = { url: '/hero/ministry-seedling-beds.jpg' };
const heroWaterTreatment = { url: '/hero/hero-water-treatment.jpg' };
const beautificationPark = { url: '/hero/beautification-park.jpg' };
const beautificationLights = { url: '/hero/beautification-lights.jpg' };

interface HomeBanner {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  background_image_url: string;
  stats: Array<{ value: string; label: string; icon: string }>;
  duration_ms: number;
}

const iconMap = { Globe, Target, Award, TreePine, Sprout, Users };

const FRAMES: HomeBanner[] = [
  {
    id: '1',
    eyebrow: '10 Million Trees Planting Campaign · 2026',
    title: "Join Kano's",
    highlight: '10 Million Trees 2026 Drive',
    subtitle:
      'Apply now to receive free seedlings, training and a digital tracker. Together with the Ministry of Water Resources, Environment and Climate Change, we are growing 20 million trees across all 44 LGAs by 2030.',
    cta_text: 'Apply to the 2026 Campaign',
    cta_link: '/programs/ten-million-trees/apply',
    secondary_cta_text: 'Campaign Details',
    secondary_cta_link: '/programs/ten-million-trees',
    background_image_url: heroNursery.url,
    stats: [
      { value: '20M', label: 'Trees Target by 2030', icon: 'TreePine' },
      { value: '10M', label: '2026 Campaign Goal', icon: 'Sprout' },
      { value: '44', label: 'LGAs Covered', icon: 'Globe' },
    ],
    duration_ms: 20000,
  },
  {
    id: '2',
    eyebrow: 'Kano Water Project · Securing Water for All',
    title: 'Clean, Reliable Water for',
    highlight: 'Every Kano Household',
    subtitle:
      'The Kano Water Project is delivering modern treatment plants, expanded distribution networks and 24/7 supply across the state. Learn more about our flagship water security initiative.',
    cta_text: 'Visit kanowaterproject.com',
    cta_link: 'https://kanowaterproject.com',
    secondary_cta_text: 'Learn About Our Work',
    secondary_cta_link: '/agencies',
    background_image_url: heroWaterTreatment.url,
    stats: [
      { value: '24/7', label: 'Water Supply Target', icon: 'Globe' },
      { value: '44', label: 'LGAs Served', icon: 'Target' },
      { value: '100%', label: 'Coverage Goal', icon: 'Award' },
    ],
    duration_ms: 10000,
  },
  {
    id: '3',
    eyebrow: 'Kano Beautification Initiative',
    title: 'Greener Parks,',
    highlight: 'Beautiful Public Spaces',
    subtitle:
      'New playgrounds, landscaped gardens and recreation areas — the Kano Beautification programme is transforming neighbourhoods into vibrant, family-friendly spaces.',
    cta_text: 'Explore Beautification',
    cta_link: '/programs/urban-greening',
    secondary_cta_text: 'Get Involved',
    secondary_cta_link: '/get-involved',
    background_image_url: beautificationPark.url,
    stats: [
      { value: '50+', label: 'Parks Upgraded', icon: 'TreePine' },
      { value: '20+', label: 'Recreation Sites', icon: 'Users' },
      { value: '44', label: 'LGAs Reached', icon: 'Globe' },
    ],
    duration_ms: 10000,
  },
  {
    id: '4',
    eyebrow: 'Kano Beautification · City Lights',
    title: 'Illuminating Kano,',
    highlight: 'Celebrating Our Heritage',
    subtitle:
      'Decorative street lighting, roundabout art installations and cultural displays — beautifying our city while honouring Kano\'s rich identity under the leadership of His Excellency Alhaji Abba Kabir Yusuf.',
    cta_text: 'See the Transformation',
    cta_link: '/programs/urban-greening',
    secondary_cta_text: 'Contact the Ministry',
    secondary_cta_link: '/contact',
    background_image_url: beautificationLights.url,
    stats: [
      { value: '100+', label: 'Installations', icon: 'Award' },
      { value: '24/7', label: 'City Lighting', icon: 'Globe' },
      { value: '8', label: 'Major Roundabouts', icon: 'Target' },
    ],
    duration_ms: 10000,
  },
];

const HeroSection = () => {
  const [active, setActive] = useState(0);
  const frame = FRAMES[active];

  const next = () => setActive((p) => (p + 1) % FRAMES.length);
  const prev = () => setActive((p) => (p - 1 + FRAMES.length) % FRAMES.length);

  useEffect(() => {
    const id = setTimeout(next, frame.duration_ms);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <section className="relative min-h-[88vh] lg:min-h-screen flex items-stretch overflow-hidden bg-kano-dark">
      <div className="absolute inset-0">
        {FRAMES.map((f, i) => (
          <div
            key={f.id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${f.background_image_url}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-kano-dark/95 via-kano-dark/75 to-kano-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-kano-dark/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(76,175,80,0.18),_transparent_55%)]" />
      </div>

      <div className="container-custom relative z-10 flex flex-col justify-center py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 xl:col-span-7 space-y-7">
            <div className="flex items-center gap-3 animate-fade-in">
              <span className="h-px w-10 bg-kano-accent" />
              <span className="text-kano-accent uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold">
                {frame.eyebrow}
              </span>
            </div>

            <h1
              className="text-white font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight animate-slide-in"
              style={{ fontFamily: "'Merriweather', Georgia, serif" }}
            >
              {frame.title}
              <span className="block text-kano-accent mt-2">{frame.highlight}</span>
            </h1>

            <p className="text-slate-200/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-light">
              {frame.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button
                asChild
                className="bg-kano-primary hover:bg-kano-primary/90 text-white px-7 py-6 rounded-md shadow-xl shadow-kano-primary/30 transition-all duration-300 group"
              >
                <Link to={frame.cta_link} className="flex items-center gap-2">
                  <span className="font-semibold tracking-wide">{frame.cta_text}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white hover:text-kano-dark px-7 py-6 rounded-md transition-all duration-300 group"
              >
                <Link to={frame.secondary_cta_link} className="flex items-center gap-2">
                  <span className="font-semibold tracking-wide">{frame.secondary_cta_text}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 xl:col-span-5 lg:pl-8">
            <div className="bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-kano-accent font-semibold">Impact at a glance</p>
                  <p className="text-white/70 text-sm mt-1">Updated quarterly</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-kano-primary/20 border border-kano-primary/40 flex items-center justify-center">
                  <Award className="w-5 h-5 text-kano-accent" />
                </div>
              </div>
              <div className="space-y-5">
                {frame.stats.map((s, i) => {
                  const Icon = iconMap[s.icon as keyof typeof iconMap] || Globe;
                  return (
                    <div key={i} className="flex items-center gap-4 pb-5 last:pb-0 border-b last:border-0 border-white/10">
                      <div className="w-12 h-12 rounded-lg bg-kano-primary/15 border border-kano-primary/30 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-kano-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl sm:text-3xl font-bold text-white leading-none">{s.value}</div>
                        <div className="text-slate-300 text-sm mt-1">{s.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 flex items-center justify-between border-t border-white/15 pt-6">
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white hover:text-kano-dark transition-all flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white hover:text-kano-dark transition-all flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="text-white/70 text-sm font-mono tracking-wider">
              <span className="text-white font-semibold">{String(active + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(FRAMES.length).padStart(2, '0')}</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {FRAMES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-[3px] transition-all duration-500 ${
                  i === active ? 'w-12 bg-kano-accent' : 'w-6 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
