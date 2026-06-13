import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreePine, CheckCircle, Award, Sprout, ArrowRight, Calendar } from 'lucide-react';
import heroSeedlings from '@/assets/hero/ministry-seedling-beds.jpg.asset.json';

const FiveMillionTrees = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main className="pt-16">
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${heroSeedlings.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/85 to-emerald-800/75" />
        <div className="relative container-custom max-w-5xl text-center">
          <Badge className="bg-amber-400/20 text-amber-100 border-amber-300/40 mb-6 px-4 py-2 text-base backdrop-blur">
            <CheckCircle className="w-4 h-4 mr-2" /> Campaign Concluded · 2025
          </Badge>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Merriweather', Georgia, serif" }}
          >
            5 Million Trees Campaign Successfully Concluded
          </h1>
          <p className="text-xl text-emerald-50/95 max-w-3xl mx-auto mb-8">
            Thank you to every organisation, school, faith group and volunteer who made the 2025 Five Million Trees Planting Campaign a reality.
            Applications are now closed — our focus has shifted to monitoring and the 2026 10 Million Trees drive.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
              <Link to="/programs/ten-million-trees">
                Join the 2026 Campaign <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 text-white hover:bg-white hover:text-emerald-900 bg-transparent"
            >
              <Link to="/monitoring/tree-planting">View Survival Tracker</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50/50">
        <div className="container-custom grid md:grid-cols-3 gap-6 max-w-5xl">
          {[
            { icon: TreePine, value: '5,000,000+', label: 'Trees Distributed & Planted' },
            { icon: Award, value: '75%', label: 'Verified Survival Rate' },
            { icon: Sprout, value: '44', label: 'LGAs Reached Across Kano' },
          ].map((s, i) => (
            <Card key={i} className="border-emerald-100">
              <CardContent className="p-8 text-center">
                <s.icon className="w-10 h-10 text-emerald-700 mx-auto mb-3" />
                <div className="text-4xl font-bold text-emerald-900">{s.value}</div>
                <div className="text-gray-600 mt-2">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-4xl text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-emerald-700" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's Next: 10 Million Trees in 2026</h2>
          <p className="text-lg text-gray-600 mb-8">
            Building on the success of 2025, the Ministry of Water Resources, Environment and Climate Change is opening applications for the 10 Million Trees
            Planting Campaign — part of our 20 million trees vision by 2030.
          </p>
          <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white">
            <Link to="/programs/ten-million-trees/apply">Apply for the 2026 Campaign</Link>
          </Button>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default FiveMillionTrees;
