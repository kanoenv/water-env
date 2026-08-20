import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, Users, Newspaper, FileText, Mail, Phone, MapPin,
  AlertTriangle, LogIn, Building, TreeDeciduous, Leaf, Sprout,
  Droplets, ShieldCheck, ExternalLink, ChevronRight, Send, ArrowUp,
  Clock, Globe
} from 'lucide-react';
import { Input } from '@/components/ui/input';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const quickLinks = [
    { to: '/about', label: 'About the Ministry', icon: Info },
    { to: '/programs', label: 'Our Programs', icon: TreeDeciduous },
    { to: '/news', label: 'News & Updates', icon: Newspaper },
    { to: '/resources', label: 'Resources', icon: FileText },
    { to: '/contact', label: 'Contact Us', icon: Mail },
    { to: '/report-issue', label: 'Report an Issue', icon: AlertTriangle },
    { to: '/climate-actor-registry', label: 'Climate-Actor Registry', icon: Users },
  ];

  const agencies = [
    { to: '/programs/remasab', label: 'REMASAB', icon: Building },
    { to: '/programs/weccma', label: 'WECCMA', icon: Building },
    { to: '/programs/skp', label: 'Sustainable Kano Project', icon: Leaf },
    { to: '/programs/knap', label: 'Kano Afforestation Project', icon: Sprout },
    { href: 'https://kanoacresal.org', label: 'ACRESAL', icon: Building, external: true },
  ];

  const socialLinks = [
    { href: 'https://facebook.com/kanoenvironment', label: 'Facebook', color: 'hover:bg-[#1877F2]' },
    { href: 'https://x.com/kanoenvironment', label: 'X (Twitter)', color: 'hover:bg-white hover:text-kano-primary' },
    { href: 'https://instagram.com/kanoenvironment', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600' },
    { href: 'https://www.youtube.com/@KanoEnvironment', label: 'YouTube', color: 'hover:bg-[#FF0000]' },
  ];

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-2.5">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[hsl(45,100%,51%)]">
        {children}
      </h4>
      <div className="flex items-center gap-1">
        <span className="h-px w-8 bg-[hsl(45,100%,51%)]" />
        <span className="h-px w-3 bg-[hsl(45,100%,51%,0.4)]" />
      </div>
    </div>
  );

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[hsl(122,39%,30%)] via-[hsl(122,39%,26%)] to-[hsl(122,42%,20%)] text-white">
      {/* Top gold accent */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[hsl(45,100%,51%)] to-transparent" />

      {/* Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, white 1.2px, transparent 1.2px), radial-gradient(circle at 70% 60%, white 1.2px, transparent 1.2px)',
          backgroundSize: '90px 90px',
        }}
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-[hsl(45,100%,51%)]/10 blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Brand */}
        <div className="border-b border-white/10 py-12 md:py-14">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:gap-8 md:text-left">
            <div className="relative shrink-0">
              <div className="absolute inset-0 scale-125 rounded-full bg-[hsl(45,100%,51%)]/20 blur-2xl" />
              <div className="relative rounded-full bg-gradient-to-br from-[hsl(45,100%,64%)] via-[hsl(45,100%,51%)] to-[hsl(45,100%,40%)] p-[3px] shadow-[0_14px_44px_-12px_rgba(255,193,7,0.55)]">
                <img
                  src="/kano-ministry-seal.png"
                  alt="Kano State Ministry of Water Resources, Environment and Climate Change official seal"
                  className="h-24 w-24 rounded-full bg-white object-cover md:h-28 md:w-28"
                  loading="lazy"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 rounded-full border-2 border-white/25 bg-[hsl(45,100%,51%)] p-1.5 text-[hsl(122,42%,20%)] shadow-lg">
                <ShieldCheck className="h-4 w-4" />
              </span>
            </div>

            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(45,100%,51%)]/30 bg-[hsl(45,100%,51%)]/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(45,100%,51%)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(45,100%,51%)]" />
                Verified Official Government Portal
              </div>
              <h3 className="font-serif text-xl font-bold leading-snug tracking-tight md:text-2xl lg:text-[1.75rem]">
                Kano State Ministry of Water Resources,<br className="hidden lg:block" /> Environment and Climate Change
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-white/70">
                Safeguarding water, protecting the environment, and building climate resilience for every community in Kano State.
              </p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 md:py-14">
          {/* Contact */}
          <div className="space-y-5 lg:col-span-3">
            <SectionTitle>Contact</SectionTitle>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 rounded-md bg-white/10 p-1.5">
                  <MapPin className="h-4 w-4 text-[hsl(45,100%,51%)]" />
                </span>
                <span className="text-sm leading-relaxed text-white/75">
                  Block 5, Audu Bako Secretariat,<br />Kano State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-md bg-white/10 p-1.5">
                  <Phone className="h-4 w-4 text-[hsl(45,100%,51%)]" />
                </span>
                <a href="https://wa.me/2348030719901" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/75 transition-colors hover:text-white">
                  +234 803 071 9901
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-md bg-white/10 p-1.5">
                  <Mail className="h-4 w-4 text-[hsl(45,100%,51%)]" />
                </span>
                <a href="mailto:reports@environment.kn.gov.ng" className="break-all text-sm font-medium text-white/75 transition-colors hover:text-white">
                  reports@environment.kn.gov.ng
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-md bg-white/10 p-1.5">
                  <Clock className="h-4 w-4 text-[hsl(45,100%,51%)]" />
                </span>
                <span className="text-sm text-white/75">Mon – Fri · 8:00 AM – 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="space-y-5 lg:col-span-3">
            <SectionTitle>Quick Links</SectionTitle>
            <ul className="space-y-1">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 -mx-2 text-sm text-white/75 transition-all hover:bg-white/5 hover:text-white"
                    >
                      <Icon className="h-3.5 w-3.5 text-[hsl(45,100%,51%)]/70 transition-colors group-hover:text-[hsl(45,100%,51%)]" />
                      <span className="text-white/75 group-hover:text-white">{link.label}</span>
                      <ChevronRight className="ml-auto h-3.5 w-3.5 -translate-x-1 text-[hsl(45,100%,51%)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Agencies */}
          <div className="space-y-5 lg:col-span-3">
            <SectionTitle>Agencies & Projects</SectionTitle>
            <ul className="space-y-1">
              {agencies.map((agency) => {
                const Icon = agency.icon;
                const cls = 'group flex items-center gap-2.5 rounded-md px-2 py-1.5 -mx-2 text-sm text-white/75 transition-all hover:bg-white/5 hover:text-white';
                return (
                  <li key={agency.label}>
                    {agency.external ? (
                      <a href={agency.href} target="_blank" rel="noopener noreferrer" className={cls}>
                        <Icon className="h-3.5 w-3.5 text-[hsl(45,100%,51%)]/70 transition-colors group-hover:text-[hsl(45,100%,51%)]" />
                        <span>{agency.label}</span>
                        <ExternalLink className="ml-auto h-3 w-3 text-[hsl(45,100%,51%)] opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    ) : (
                      <Link to={agency.to || '#'} className={cls}>
                        <Icon className="h-3.5 w-3.5 text-[hsl(45,100%,51%)]/70 transition-colors group-hover:text-[hsl(45,100%,51%)]" />
                        <span>{agency.label}</span>
                        <ChevronRight className="ml-auto h-3.5 w-3.5 -translate-x-1 text-[hsl(45,100%,51%)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter + social */}
          <div className="space-y-5 lg:col-span-3">
            <SectionTitle>Stay Connected</SectionTitle>
            <p className="text-sm leading-relaxed text-white/70">
              Ministry updates, climate alerts and environmental news — delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl border-white/20 bg-white/10 pr-12 text-white placeholder:text-white/45 focus:border-[hsl(45,100%,51%)] focus-visible:ring-[hsl(45,100%,51%,0.3)]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-[hsl(45,100%,51%)] p-2 text-[hsl(122,42%,20%)] transition-all hover:bg-[hsl(45,100%,61%)] hover:scale-105"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {subscribed && (
                <p className="animate-fade-in text-xs font-medium text-[hsl(45,100%,51%)]">Thank you for subscribing.</p>
              )}
            </form>

            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`group rounded-xl border border-white/15 bg-white/10 p-2.5 transition-all duration-300 hover:scale-110 hover:border-transparent ${social.color}`}
                >
                  {social.label === 'Facebook' && (
                    <svg className="h-[18px] w-[18px] text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  )}
                  {social.label === 'X (Twitter)' && (
                    <svg className="h-[18px] w-[18px] text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  )}
                  {social.label === 'Instagram' && (
                    <svg className="h-[18px] w-[18px] text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                  )}
                  {social.label === 'YouTube' && (
                    <svg className="h-[18px] w-[18px] text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>
                  )}
                </a>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4">
              <Link
                to="/admin-login"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75 transition-all hover:border-[hsl(45,100%,51%)]/40 hover:text-white"
              >
                <LogIn size={14} className="text-[hsl(45,100%,51%)] transition-transform group-hover:translate-x-0.5" />
                Staff Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Mission strip */}
        <div className="border-y border-white/10 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-[hsl(45,100%,51%)]" />
              Water security for every household
            </span>
            <span className="hidden h-4 w-px bg-white/15 md:block" />
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[hsl(45,100%,51%)]" />
              A greener, climate-resilient Kano
            </span>
            <span className="hidden h-4 w-px bg-white/15 md:block" />
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[hsl(45,100%,51%)]" />
              Transparent environmental governance
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 md:py-7">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-xs text-white/70 md:text-sm">
                © {currentYear} Kano State Ministry of Water Resources, Environment and Climate Change. All rights reserved.
              </p>
              <p className="text-[11px] text-white/50">
                Powered by{' '}
                <a href="https://dualintelligenceict.com" target="_blank" rel="noopener noreferrer" className="text-[hsl(45,100%,51%)] transition-colors hover:text-[hsl(45,100%,64%)]">
                  Dual Intelligence ICT Services, Kano
                </a>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs md:text-sm">
              <Link to="/privacy" className="text-white/70 transition-colors hover:text-[hsl(45,100%,51%)]">Privacy Policy</Link>
              <span className="hidden h-3 w-px bg-white/15 md:inline-block" />
              <Link to="/terms" className="text-white/70 transition-colors hover:text-[hsl(45,100%,51%)]">Terms of Service</Link>
              <span className="hidden h-3 w-px bg-white/15 md:inline-block" />
              <Link to="/accessibility" className="text-white/70 transition-colors hover:text-[hsl(45,100%,51%)]">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-white/10 p-2.5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-[hsl(45,100%,51%)] hover:bg-[hsl(45,100%,51%)] hover:text-[hsl(122,42%,20%)] md:bottom-6 md:right-6"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;
