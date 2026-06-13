import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreePine, Target, CheckCircle, ArrowRight, Calendar, Users, Sprout, Leaf, MapPin } from 'lucide-react';
import heroNursery from '@/assets/hero/ministry-nursery-rows.jpg.asset.json';
import heroField from '@/assets/hero/ministry-field-visit.jpg.asset.json';
import heroMango from '@/assets/hero/ministry-mango.jpg.asset.json';
import heroSeedlings from '@/assets/hero/ministry-seedling-beds.jpg.asset.json';
import heroPlanting from '@/assets/hero/ministry-commissioner-planting.jpg.asset.json';
import heroGreening from '@/assets/hero/hero-greening.jpg.asset.json';

const steps = [
  { title: 'Register', desc: 'Complete the official organisation application.' },
  { title: 'Review & Approval', desc: 'Ministry reviewers verify eligibility within 14 days.' },
  { title: 'Seed Distribution', desc: 'Approved organisations receive seedlings and batch codes.' },
  { title: 'Plant & Track', desc: 'Log every planting in the digital tracker — location, species, photos.' },
  { title: 'Survival Audit', desc: 'Quarterly survival checks and certificates of recognition.' },
];

const gallery = [
  { src: heroNursery.url, caption: 'State nursery rows' },
  { src: heroSeedlings.url, caption: 'Seedling beds' },
  { src: heroPlanting.url, caption: 'Community planting' },
  { src: heroField.url, caption: 'Ministry field visits' },
  { src: heroMango.url, caption: 'Fruit-bearing species' },
  { src: heroGreening.url, caption: 'Urban greening' },
];

const TenMillionTrees = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main className="pt-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${heroNursery.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/80 to-emerald-800/70" />
        <div className="relative container-custom max-w-5xl text-center px-4">
          <Badge className="bg-white/15 text-white border-white/30 mb-5 px-3 py-1.5 text-sm sm:text-base backdrop-blur">
            <TreePine className="w-4 h-4 mr-2" /> 2026 Flagship Campaign
          </Badge>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
            10 Million Trees Planting Campaign
          </h1>
          <p className="text-base sm:text-xl text-emerald-50/95 max-w-3xl mx-auto mb-7">
            A coordinated, transparent and community-led drive to plant ten million trees across Kano State in 2026 — part of our 20 million trees vision by 2030.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 w-full sm:w-auto">
              <Link to="/programs/ten-million-trees/apply">Apply Now <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/60 text-white hover:bg-white hover:text-emerald-900 bg-transparent w-full sm:w-auto">
              <Link to="/monitoring/tree-planting">View Live Tracker</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-16 bg-emerald-50/50">
        <div className="container-custom px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: Target, value: '10,000,000', label: 'Trees Goal in 2026' },
            { icon: Users, value: '500+', label: 'Partner Organisations' },
            { icon: Sprout, value: '90%+', label: 'Survival Commitment' },
          ].map((s, i) => (
            <Card key={i} className="border-emerald-100">
              <CardContent className="p-6 sm:p-8 text-center">
                <s.icon className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-700 mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold text-emerald-900">{s.value}</div>
                <div className="text-sm sm:text-base text-gray-600 mt-2">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature image + text */}
      <section className="py-12 sm:py-20">
        <div className="container-custom px-4 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl">
          <div className="order-2 lg:order-1">
            <Badge className="bg-emerald-100 text-emerald-800 mb-3">Why It Matters</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Rebuilding Kano's Green Cover</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              Decades of desertification, urban expansion and biomass demand have stripped Kano of its tree cover.
              The 10 Million Trees Planting Campaign is the largest coordinated reforestation effort the state has ever launched.
            </p>
            <ul className="space-y-3">
              {[
                'Indigenous and fruit-bearing species selected per zone',
                'Free seedlings for approved organisations and schools',
                'Digital tracker with GPS, photos and batch codes',
                'Quarterly survival audits by ministry monitors',
              ].map((t, i) => (
                <li key={i} className="flex gap-3 text-gray-700 text-sm sm:text-base">
                  <Leaf className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 sm:gap-4">
            <img src={heroSeedlings.url} alt="Seedling beds prepared at the state nursery" className="rounded-xl shadow-lg aspect-square object-cover w-full" loading="lazy" />
            <img src={heroPlanting.url} alt="Commissioner planting a tree at a community event" className="rounded-xl shadow-lg aspect-square object-cover w-full mt-6 sm:mt-8" loading="lazy" />
            <img src={heroMango.url} alt="Mango seedlings ready for distribution" className="rounded-xl shadow-lg aspect-square object-cover w-full" loading="lazy" />
            <img src={heroField.url} alt="Ministry field monitoring visit" className="rounded-xl shadow-lg aspect-square object-cover w-full mt-6 sm:mt-8" loading="lazy" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container-custom px-4 max-w-5xl">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 mb-3">Process</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 p-4 sm:p-6 rounded-xl border border-emerald-100 bg-white hover:shadow-md transition">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm sm:text-base">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-xl font-semibold text-gray-900">{s.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">{s.desc}</p>
                </div>
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 self-center hidden sm:block flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 sm:py-20">
        <div className="container-custom px-4 max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 mb-3">From the Field</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Campaign in Pictures</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-2xl mx-auto">
              Real images from our nurseries, schools and planting sites across Kano State.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {gallery.map((g, i) => (
              <figure key={i} className="relative overflow-hidden rounded-xl shadow-md group">
                <img
                  src={g.src}
                  alt={g.caption}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs sm:text-sm p-2 sm:p-3 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
        <div className="container-custom px-4 text-center max-w-3xl">
          <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-emerald-200" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Applications Now Open</h2>
          <p className="text-base sm:text-lg text-emerald-100 mb-6 sm:mb-8">
            Join schools, NGOs, faith groups, corporates and community associations already enrolled.
          </p>
          <Button asChild size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 w-full sm:w-auto">
            <Link to="/programs/ten-million-trees/apply">Start Your Application</Link>
          </Button>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default TenMillionTrees;
