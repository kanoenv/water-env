import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play, Film } from 'lucide-react';

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  description: string;
  date: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 'v0',
    youtubeId: 'AgHQKGgnjBA',
    title: 'Ministry Highlight — Field Short',
    category: 'Ministry Short',
    description:
      'A short highlight from the Ministry of Water Resources, Environment and Climate Change field operations.',
    date: 'August 2026',
  },
  {
    id: 'v0b',
    youtubeId: '-H0ho7B2mKc',
    title: 'Water Resources & Climate Action Update',
    category: 'Ministry Feature',
    description:
      'A feature update on water resources delivery and climate action programmes across Kano State.',
    date: 'August 2026',
  },
  {
    id: 'v1',
    youtubeId: '0yRrhaF0TGQ',
    title: 'Kano State Ministry — Field Update',
    category: 'Ministry Documentary',
    description:
      'A field update from the Ministry of Water Resources, Environment and Climate Change showcasing recent work across Kano State.',
    date: 'July 2026',
  },
  {
    id: 'v2',
    youtubeId: 'p_sWLnwfyLM',
    title: 'Kano State Environmental Transformation',
    category: 'Official Documentary',
    description:
      'How the Ministry is transforming Kano State through innovative environmental policies and climate action programmes.',
    date: 'June 2026',
  },
];

const VideoCard: React.FC<{ v: VideoItem }> = ({ v }) => {
  const [play, setPlay] = useState(false);
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-500">
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-slate-900">
          {play ? (
            <iframe
              src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
              title={v.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button
                onClick={() => setPlay(true)}
                aria-label={`Play ${v.title}`}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="w-20 h-20 rounded-full bg-kano-primary hover:bg-kano-primary/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-9 h-9 ml-1" />
                </span>
              </button>
            </>
          )}
        </AspectRatio>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-kano-primary font-semibold mb-2">
          <Film className="w-3.5 h-3.5" />
          {v.category}
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{v.date}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
          {v.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
      </div>
    </article>
  );
};

const Videos: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <PageHero
        eyebrow="Documentary & Video Library"
        title="Ministry Documentaries & Field Videos"
        subtitle="Watch official documentaries, field updates, and campaign highlights from the Kano State Ministry of Water Resources, Environment and Climate Change."
        breadcrumbs={[{ label: 'Documentary & Videos' }]}
      />
      <main className="flex-grow container-custom py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} v={v} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Videos;
