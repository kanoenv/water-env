import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Newspaper, Clock, Tag } from "lucide-react";
import { newsItems } from "@/data/news";

const RecentNews = () => {
  const latest = newsItems.slice(0, 2);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Blueprint grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-custom relative">
        {/* Editorial header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14 pb-8 border-b border-slate-200">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-kano-primary" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-kano-primary">
                Section 05 / Newsroom
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700">Live Feed</span>
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 leading-tight"
              style={{ fontFamily: "'Merriweather', Georgia, serif" }}
            >
              Latest from the <span className="text-kano-primary italic">Ministry</span>.
            </h2>
            <p className="text-slate-500 mt-3 max-w-2xl">
              Official communiqués, project updates and press releases from the Kano State Ministry of
              Water Resources, Environment and Climate Change.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/news/press-releases"
              className="inline-flex items-center gap-2 text-kano-primary font-semibold border-b-2 border-kano-primary/20 hover:border-kano-primary transition-all pb-1"
            >
              View full newsroom <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {latest.map((item, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <Link
                key={item.id}
                to={`/news/press-releases#${item.id}`}
                className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-kano-primary/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500"
              >
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-kano-primary via-kano-primary to-kano-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.cover}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

                  {/* Category pill */}
                  <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
                    <Tag className="w-3 h-3 text-kano-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-kano-primary">
                      {item.category}
                    </span>
                  </div>

                  {/* Article number */}
                  <div className="absolute top-5 right-5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      No.
                    </span>
                    <span className="ml-1 text-xs font-mono font-bold text-slate-900">{num}</span>
                  </div>

                  {/* Date badge (bottom-left) */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
                    <div className="bg-kano-primary rounded-lg px-3 py-2 text-center shadow-lg border border-white/20">
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-90">
                        {item.displayDate.split(" ")[0]}
                      </div>
                      <div
                        className="text-2xl font-serif leading-none"
                        style={{ fontFamily: "'Merriweather', Georgia, serif" }}
                      >
                        {item.displayDate.split(" ")[1]?.replace(",", "")}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold">{item.displayDate}</div>
                      <div className="text-xs opacity-90 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Official Release
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-kano-primary transition-colors">
                    {item.title}
                  </h3>

                  <div className="w-10 h-px bg-slate-200 group-hover:w-20 group-hover:bg-kano-primary transition-all duration-500 mb-4" />

                  <p className="text-slate-600 leading-relaxed line-clamp-3 mb-6">{item.excerpt}</p>

                  {/* Footer meta */}
                  <div className="flex items-center justify-between pt-5 border-t border-dashed border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Newspaper className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                        MWRECC · Press
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-kano-primary font-semibold text-sm">
                      Read release
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
