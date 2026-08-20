import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { newsItems } from '@/data/news';

const PressReleases = () => {
  const [expandedId, setExpandedId] = useState<string | null>(
    typeof window !== 'undefined' && window.location.hash
      ? window.location.hash.slice(1)
      : newsItems[0]?.id ?? null
  );
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && refs.current[hash]) {
      refs.current[hash]!.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setExpandedId(hash);
    }
  }, []);

  const toggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-kano-primary to-emerald-800 py-16">
          <div className="container-custom">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Press Releases</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Official statements and announcements from the Ministry of Water Resources, Environment and Climate Change.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom max-w-5xl">
            <div className="space-y-8">
              {newsItems.map((item) => {
                const expanded = expandedId === item.id;
                return (
                  <Card
                    key={item.id}
                    ref={(el) => (refs.current[item.id] = el as HTMLDivElement | null)}
                    id={item.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300 scroll-mt-24"
                  >
                    {item.cover && (
                      <div className="aspect-[16/8] w-full overflow-hidden bg-gray-100">
                        <img src={item.cover} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                        <span className="bg-kano-primary/10 text-kano-primary px-3 py-1 rounded-full font-semibold">
                          {item.category}
                        </span>
                        <span className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-2" /> {item.displayDate}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug">{item.title}</h2>
                      <p className="text-gray-700 mb-4 text-lg">{item.excerpt}</p>

                      {expanded && (
                        <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                          {item.content.map((p, i) => (
                            <p key={i} className="text-gray-700 leading-relaxed">
                              {p}
                            </p>
                          ))}

                          {item.images && item.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
                              {item.images.map((src, i) => (
                                <div key={i} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                  <img
                                    src={src}
                                    alt={`${item.title} – photo ${i + 1}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {item.signoff && (
                            <div className="pt-4 text-gray-800">
                              {item.signoff.map((line, i) => (
                                <p key={i} className={i === 0 ? 'font-semibold' : ''}>
                                  {line}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <Button
                        variant="outline"
                        onClick={() => toggle(item.id)}
                        className="mt-6 flex items-center gap-2"
                      >
                        {expanded ? (
                          <>
                            <ChevronUp className="h-4 w-4" /> Read Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" /> Read More
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PressReleases;
