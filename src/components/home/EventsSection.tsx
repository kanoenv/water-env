import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import waterInfrastructure from '@/assets/hero/hero-water-infrastructure.jpg.asset.json';
import waterTreatment from '@/assets/hero/hero-water-treatment.jpg.asset.json';

const events = [
  {
    id: 1,
    title: 'Urban Water Infrastructure Rehabilitation — Kano Metropolis',
    date: 'August 15, 2026',
    time: '9:00 AM – 2:00 PM',
    location: 'Tamburawa Water Treatment Complex, Kano',
    description:
      'Rehabilitation of distribution networks, metering zones and non-revenue water reduction to expand reliable potable water access across the metropolis.',
    attendees: '200+ Expected',
    tag: 'Water Security',
    image: waterInfrastructure.url,
    link: '/pillars/water-supply-sanitation',
  },
  {
    id: 2,
    title: 'Water Quality & Basin Monitoring Programme Launch',
    date: 'September 02, 2026',
    time: '10:00 AM – 1:00 PM',
    location: 'Hadejia-Jama\u2019are Basin Field Station',
    description:
      'Launch of real-time hydrological monitoring, water quality surveillance and catchment protection across the Hadejia-Jama\u2019are and Komadugu-Yobe basins.',
    attendees: '300+ Expected',
    tag: 'Integrated Water Resources',
    image: waterTreatment.url,
    link: '/pillars/integrated-water-resources',
  },
];

const EventsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-kano-primary" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-primary">Water & Climate Programmes</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 leading-tight" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              From source to tap, for every <span className="text-kano-primary italic">community</span>.
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl">Field programmes protecting water resources, expanding safe water access and building climate resilience across Kano State.</p>
          </div>
          <Link
            to="/news/events"
            className="inline-flex items-center gap-2 text-kano-primary font-semibold border-b-2 border-kano-primary/20 hover:border-kano-primary transition-all pb-1"
          >
            View all programmes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event) => (
            <article
              key={event.id}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-kano-primary/30 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-kano-primary">
                  {event.tag}
                </span>
                <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
                  <div className="bg-kano-primary rounded-lg px-3 py-2 text-center shadow-lg">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-90">
                      {event.date.split(' ')[0]}
                    </div>
                    <div className="text-2xl font-bold leading-none">
                      {event.date.split(' ')[1].replace(',', '')}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{event.date}</div>
                    <div className="text-xs opacity-90">{event.time}</div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-kano-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">{event.description}</p>

                <div className="flex flex-wrap gap-6 text-sm text-slate-600 mb-8 pb-6 border-b border-slate-100">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-kano-primary" /> {event.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Users className="w-4 h-4 text-kano-primary" /> {event.attendees}
                  </span>
                </div>

                <Button asChild variant="outline" className="border-kano-primary text-kano-primary hover:bg-kano-primary hover:text-white group/btn">
                  <Link to={event.link}>
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
