import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumbs?: Crumb[];
}

const DEFAULT_BG = '/lovable-uploads/3535207a-22a2-4c6f-927f-fe7c22998e18.png';

const PageHero: React.FC<PageHeroProps> = ({
  eyebrow = 'Ministry of Water Resources, Environment and Climate Change',
  title,
  subtitle,
  backgroundImage = DEFAULT_BG,
  breadcrumbs = [],
}) => {
  return (
    <section
      className="relative bg-kano-dark overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-kano-dark/95 via-kano-dark/80 to-kano-dark/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(76,175,80,0.18),_transparent_55%)]" />

      <div className="container-custom relative z-10 py-20 lg:py-28">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-white/70 mb-6 flex-wrap gap-y-1">
          <Link to="/" className="hover:text-kano-accent transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          {breadcrumbs.map((c, i) => (
            <React.Fragment key={i}>
              <ChevronRight className="w-3.5 h-3.5 mx-2 text-white/40" />
              {c.href ? (
                <Link to={c.href} className="hover:text-kano-accent transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-10 bg-kano-accent" />
          <span className="text-kano-accent uppercase tracking-[0.2em] text-xs font-semibold">{eyebrow}</span>
        </div>

        <h1
          className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-4xl"
          style={{ fontFamily: "'Merriweather', Georgia, serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-200/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mt-5 font-light">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-kano-primary via-kano-accent to-kano-primary" />
    </section>
  );
};

export default PageHero;
